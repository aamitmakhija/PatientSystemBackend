const express = require('express');
const User = require('../models/user');
const authenticateToken = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authorizeRole'); 

const router = express.Router();

// Controller import
const adminController = require('../controller/admincontroller');

// Define admin-specific routes
router.get('/dashboard', adminController.dashboard); // Ensure adminController has a method called dashboard

// POST route for creating a user (only accessible by admin)
router.post('/users', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { username, name, password, role } = req.body;

  if (!username || !name || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    const newUser = new User({ username, name, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for retrieving all users (only accessible by admin)
router.get('/users', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route for updating user information (only accessible by admin)
router.put('/users/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { id } = req.params;
  const { username, name, password, role } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
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
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE route for deleting a user (only accessible by admin)
router.delete('/users/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Export router once, at the end of the file
module.exports = router;