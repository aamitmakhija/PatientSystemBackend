const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    // If no token is provided, return an access denied error
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided.' });

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Attach user data to the request object
        next();  // Allow the request to proceed to the next handler
    } catch (err) {
        // If the token is invalid or expired, return a 403 error
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = authenticateToken;