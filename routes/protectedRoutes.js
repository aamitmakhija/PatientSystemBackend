const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');  // Middleware for token authentication
const router = express.Router();

// Dashboard route - accessible to authenticated users only
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}, your role is ${req.user.role}` });
});

// Admin-only route
router.get('/admin', authenticateToken, (req, res) => {
    // Only allow access for users with 'admin' role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    res.json({ message: 'Admin dashboard' });
});

module.exports = router;

