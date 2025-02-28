const express = require('express');
const { login } = require('../authentication/auth.controller');  
const authenticateToken = require('../middlewares/authMiddleware');  
const authorizeRole = require('../middlewares/authorizeRole');  

const router = express.Router();

router.post('/login', login);

router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Admin route accessed' });
});

module.exports = router;