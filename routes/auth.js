const express = require('express');
const User = require('../models/User'); // User model
const bcrypt = require('bcryptjs'); // for password comparison
const jwt = require('jsonwebtoken'); // for generating JWT tokens
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Check if the username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: '1h' } // expiration time
        );

        // Respond with the token
        return res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;