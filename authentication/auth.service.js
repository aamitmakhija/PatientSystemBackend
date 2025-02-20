const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Function to generate a JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },  // Payload with user details
        process.env.JWT_SECRET,  // Secret key for encoding
        { expiresIn: '1h' }      // Token expiry time
    );
};

// Register a new user
exports.register = async (data) => {
    const { username, name, password, role } = data;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists with this username');
    }

    // Create a new user document
    const user = new User({ username, name, password, role });
    await user.save();

    // Generate and return the token along with user details
    const token = generateToken(user);
    return { id: user._id, username: user.username, name: user.name, role: user.role, token };
};

// Login an existing user
exports.login = async (data) => {
    const { username, password } = data;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Compare the entered password with the stored hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    // Generate and return the token along with user details
    const token = generateToken(user);
    return { id: user._id, username: user.username, name: user.name, role: user.role, token };
};