const express = require('express');
const { login } = require('../authentication/auth.controller');  
const authenticateToken = require('../middlewares/authMiddleware');  
const authorizeRole = require('../middlewares/authorizeRole');  

const router = express.Router();

// Login route - authenticates user and sends token
router.post('/login', login);

// Admin-specific route (only accessible by admin users)
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Admin route accessed' });
});

module.exports = router;