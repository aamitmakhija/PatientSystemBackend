const express = require('express');
const { login } = require('../authentication/auth.controller');  // Make sure this is correctly imported
const authenticateToken = require('../middlewares/authMiddleware');  // Authentication middleware
const authorizeRole = require('../middlewares/authorizeRole');  // Middleware to handle role-based access control

const router = express.Router();

// Login route - authenticates user and sends token
router.post('/login', login);

// Admin-specific route (only accessible by admin users)
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Admin route accessed' });
});

module.exports = router;