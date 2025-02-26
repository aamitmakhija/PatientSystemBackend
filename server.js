const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authenticateToken = require('./middleware/authmiddleware');
const authorizeRole = require('./middleware/authorizeRole');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth')); // Add this line to include the auth route
app.use('/api/admin', authenticateToken, authorizeRole(['admin']), require('./routes/admin')); // Admin routes

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the Server
const startServer = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await connectDB();
        console.log('MongoDB Connected.');
        const PORT = process.env.PORT || 5001;
        global.server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server successfully started on port ${PORT}`);
        });
    } catch (err) {
        console.error('Server startup failed:', err.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;