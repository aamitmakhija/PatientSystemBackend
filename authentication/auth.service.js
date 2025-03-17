const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },  // Payload with user details
        process.env.JWT_SECRET,  // Secret key for encoding
        { expiresIn: '1h' }      // Token expiry time
    );
};


exports.register = async (data) => {
    const { username, name, password, role } = data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists with this username');
    }

 
    const user = new User({ username, name, password, role });
    await user.save();

   
    const token = generateToken(user);
    return { id: user._id, username: user.username, name: user.name, role: user.role, token };
};

exports.login = async (data) => {
    const { username, password } = data;

    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    const token = generateToken(user);
    return { id: user._id, username: user.username, name: user.name, role: user.role, token };
};