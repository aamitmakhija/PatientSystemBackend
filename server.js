const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Importing CORS package
const authRoutes = require('./authentication/auth.routes');
const patientRoutes = require('./routes/patients');
const protectedRoutes = require('./routes/protectedRoutes');

// Load environment variables
dotenv.config();
console.log('Environment variables loaded...');
console.log('MONGO_URI:', process.env.MONGO_URI);

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    console.error(err.stack);
    process.exit(1);
});

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); // No need for body-parser since express.json() is used
app.use(express.urlencoded({ extended: false }));

// CORS setup to allow all origins
app.use(cors());

// Middleware to log incoming requests and validate JSON body
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);

    if (req.headers['content-type'] && !req.headers['content-type'].includes('application/json')) {
        console.warn('Warning: Content-Type is not application/json');
    }

    console.log('Raw Request Body:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        console.warn('Warning: Request body is empty. Ensure Content-Type is set correctly in Postman.');
    }

    next();
});

// Basic health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Load routes
console.log('Setting up routes...');
try {
    // Authentication and Patient Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/patients', patientRoutes);
    app.use('/api/protected', protectedRoutes); // Ensure this is required correctly
    
    // If you have the admissions route, ensure it's available
    // app.use('/api/admissions', require('./routes/admissions')); // Uncomment if you need this route
} catch (err) {
    console.error('Error loading routes:', err.message);
}

// Graceful shutdown handler
const handleExit = (signal) => {
    console.log(`\nReceived ${signal}. Closing server gracefully...`);
    if (global.server) {
        global.server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
};

// Start the server only after MongoDB is connected
const startServer = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('MongoDB Connected...');

        const PORT = process.env.PORT || 5001;
        global.server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log('Listening for incoming requests...');
        });

        process.on('SIGINT', () => handleExit('SIGINT'));
        process.on('SIGTERM', () => handleExit('SIGTERM'));
    } catch (err) {
        console.error('Server startup failed:', err.message);
        process.exit(1);
    }
};

startServer();
