// Middleware to check if the user has the required role
function authorizeRole(requiredRoles) {
    return (req, res, next) => {
        // If user is not authenticated, return an error
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        // If user's role is not in the required roles, deny access
        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }

        // If user has the required role, allow access
        next();
    };
}

module.exports = authorizeRole;