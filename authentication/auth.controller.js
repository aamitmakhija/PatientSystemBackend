const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    let { username, password } = req.body;
    console.log('Received login request with username:', username);

    // Trim the username and password to remove any extra spaces
    username = username.trim();
    password = password.trim();

    // Ensure username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Case-insensitive query to find the user by username
        const user = await User.findOne({
            username: new RegExp('^' + username + '$', 'i'),  // Case-insensitive regex search
        });

        // Log if user is not found
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Authentication failed' });
        }

        // Verify the entered password matches the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Authentication failed' });
        }

        // Generate JWT token with user details, including role
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        console.log('Login successful, sending token.');
        
        // Send the JWT token and success message as response
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};