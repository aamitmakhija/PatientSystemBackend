function authorizeRole(requiredRoles) {
    return (req, res, next) => {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        // Check if the user's role is in the list of required roles
        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }

        // Allow access if the user has the required role
        next();
    };
}

module.exports = authorizeRole;