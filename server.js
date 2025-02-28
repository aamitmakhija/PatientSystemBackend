const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authenticateToken = require('./middleware/authmiddleware');
const authorizeRole = require('./middleware/authorizeRole');

// Import routes
const adminRoutes = require('./routes/admin');
const clerkRoutes = require('./routes/clerk');
const patientRoutes = require('./routes/patient');
const nurseRoutes = require('./routes/nurse');
const pathologistRoutes = require('./routes/pathalogist');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded bodies
app.use(cors());  // Enable CORS for cross-origin requests

// Debug Logging for Incoming Requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/auth'));  // Authentication routes
app.use('/api/admin', authenticateToken, authorizeRole(['admin']), adminRoutes);  // Admin routes, protected
app.use('/api/clerk', authenticateToken, authorizeRole(['clerk']), clerkRoutes);  // Clerk routes, protected
app.use('/api/patients', authenticateToken, authorizeRole(['doctor', 'admin']), patientRoutes);  // Role-based access for patient routes
app.use('/api/nurse', authenticateToken, authorizeRole(['nurse']), nurseRoutes);  // Nurse routes, protected
app.use('/api/pathologist', authenticateToken, authorizeRole(['pathologist']), pathologistRoutes);  // Pathologist routes, protected

// Graceful Shutdown Handler
const handleExit = (signal) => {
    console.log(`\nReceived ${signal}. Closing server...`);
    if (global.server) {
        global.server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
};

// Only start server if not in test mode (prevents conflict with Jest tests)
if (process.env.NODE_ENV !== 'test') {
    // Start the Server
    const startServer = async () => {
        try {
            console.log('Connecting to MongoDB...');
            await connectDB();  // Ensure MongoDB is connected
            console.log('MongoDB Connected.');
            console.log('Setting up routes...');

            const PORT = process.env.PORT || 5001;  // Use PORT from .env or default to 5001
            console.log(`Attempting to start server on port ${PORT}...`);

            global.server = app.listen(PORT, '0.0.0.0', () => {
                console.log(`Server successfully started on port ${PORT}`);
            });

            // Handle graceful shutdown
            process.on('SIGINT', () => handleExit('SIGINT'));  // On SIGINT (Ctrl + C)
            process.on('SIGTERM', () => handleExit('SIGTERM'));  // On SIGTERM (termination signal)
        } catch (err) {
            console.error('Server startup failed:', err.message);
            process.exit(1);
        }
    };

    startServer();
}

module.exports = app;  // Export the app for testing purposes