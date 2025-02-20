const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); // Import authentication middleware
const router = express.Router();

// Dashboard route - only accessible to authenticated users
router.get('/dashboard', authenticateToken, (req, res) => {
    // Send back a welcome message with user's name and role
    res.json({ message: `Welcome ${req.user.name}, your role is ${req.user.role}` });
});

module.exports = router;