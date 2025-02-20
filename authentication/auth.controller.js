const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model for fetching user data

// Handle user login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare provided password with stored hash
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT with user details
        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiry
        );

        // Send token as response
        return res.json({ token });
    } catch (error) {
        // Catch any errors and send a 500 response
        console.error(error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
};