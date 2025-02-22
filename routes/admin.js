const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');  // Admin role middleware

// Create a new user (admin-only route)
router.post('/create-user', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    const { username, name, password, role } = req.body;

    if (!username || !name || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create new user
        const newUser = new User({
            username,
            name,
            password,
            role,
        });

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an existing user (admin-only route)
router.put('/update-user/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    const { username, name, password, role } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user fields
        if (username) user.username = username;
        if (name) user.name = name;
        if (password) user.password = password;
        if (role) user.role = role;

        // Save the updated user
        await user.save();
        res.json({ message: 'User updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a user (admin-only route)
router.delete('/delete-user/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;