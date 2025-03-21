const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Import middleware at top level
const authenticateToken = require('./middleware/authmiddleware');
const authorizeRole = require('./middleware/authorizeRole');

// Import routes at top level
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const clerkRoutes = require('./routes/clerk');
const patientRoutes = require('./routes/patient');
const nurseRoutes = require('./routes/nurse');
const pathologistRoutes = require('./routes/pathalogist');
const admissionRoutes = require('./routes/admissions');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Debug Logging
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

// Initialize server function
const initializeServer = async () => {
    try {
        await connectDB();
        console.log('MongoDB Connected.');
        
        // Set up routes
        app.get('/', (req, res) => {
            res.send('API is running...');
        });

        app.use('/api/auth', authRoutes);
        app.use('/api/admin', authenticateToken, authorizeRole(['admin']), adminRoutes);
        app.use('/api/clerk', authenticateToken, authorizeRole(['clerk']), clerkRoutes);
        app.use('/api/patients', authenticateToken, authorizeRole(['doctor', 'admin']), patientRoutes);
        app.use('/api/nurse', authenticateToken, authorizeRole(['nurse']), nurseRoutes);
        app.use('/api/pathologist', authenticateToken, authorizeRole(['pathologist']), pathologistRoutes);
        app.use('/api/admissions',  authenticateToken, authorizeRole(['doctor']), admissionRoutes);

    } catch (err) {
        console.error('Server initialization failed:', err.message);
        throw err; // Propagate error to caller
    }
};

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

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const startServer = async () => {
        try {
            console.log('Connecting to MongoDB...');
            await initializeServer();
            console.log('Setting up routes...');

            const PORT = process.env.PORT || 5001;
            console.log(`Attempting to start server on port ${PORT}...`);

            global.server = app.listen(PORT, '0.0.0.0', () => {
                console.log(`Server successfully started on port ${PORT}`);
            });

            process.on('SIGINT', () => handleExit('SIGINT'));
            process.on('SIGTERM', () => handleExit('SIGTERM'));
        } catch (err) {
            console.error('Server startup failed:', err.message);
            process.exit(1);
        }
    };

    startServer();
}

module.exports = app;