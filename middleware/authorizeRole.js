// Middleware to check the user's role
const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: Please log in.' });
      }
  
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
      }
  
      next();
    };
  };
  
  module.exports = authorizeRole;