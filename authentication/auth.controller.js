const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    let { username, password } = req.body;
    console.log('Received login request with username:', username);

    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({
            username: new RegExp('^' + username + '$', 'i'),  // Case-insensitive regex search
        });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        console.log('Login successful, sending token.');
        
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};