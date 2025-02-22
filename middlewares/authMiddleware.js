const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header and remove 'Bearer ' part
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is provided, return an access denied error
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded token (userId, role, etc.) to the request object
        next();  // Allow the request to proceed to the next handler
    } catch (err) {
        // If the token is invalid or expired, return a 403 error
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;