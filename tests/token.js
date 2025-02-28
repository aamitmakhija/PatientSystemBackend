// token.js
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.test' });

// Function to generate mock JWT tokens for different roles
const generateMockToken = (role) => {
  const payload = { userId: 'testUserId', role: role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Generate mock tokens for different roles
const validClerkJWT = generateMockToken('clerk');
const validDoctorJWT = generateMockToken('doctor');
const validAdminJWT = generateMockToken('admin');
const validNurseJWT = generateMockToken('nurse'); // Added nurse token for role-based access tests

module.exports = { validClerkJWT, validDoctorJWT, validAdminJWT, validNurseJWT };