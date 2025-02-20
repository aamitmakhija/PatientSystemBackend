const express = require('express');
const { login } = require('./auth.controller');
const authenticateToken = require('../middlewares/authMiddleware'); // Import authentication middleware

const router = express.Router();

// Login route - authenticates user and sends token
router.post('/login', login);

// Protected route - only accessible with a valid token
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;