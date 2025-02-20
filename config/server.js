const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
console.log('Environment variables loaded...');

// Handle uncaught exceptions and log errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1); // Optionally exit the process if there's an uncaught error
});

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Basic test route to check if the API is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define application routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/admissions', require('./routes/admissions'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    console.error(err.stack);
    server.close(() => {
        process.exit(1); // Optionally exit the process after cleanup
    });
});

// Start the server and listen for requests
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown on receiving SIGINT (Ctrl+C) or SIGTERM
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});