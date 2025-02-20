const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        // connect to the database using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        // Log error and exit if the connection fails
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;