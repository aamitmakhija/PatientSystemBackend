const request = require('supertest');
const app = require('../server');
require('dotenv').config({ path: '.env.test' });
const { validClerkJWT, validDoctorJWT, validAdminJWT, validNurseJWT } = require('./token'); // Import tokens

describe('Authentication Tests', () => {
  test('should return 200 for valid login', async () => {
    const res = await request(app).post('/auth/login').send({
      username: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Ensure token is returned
  });

  test('should return 401 for invalid login', async () => {
    const res = await request(app).post('/auth/login').send({
      username: process.env.TEST_USER,
      password: 'wrongpassword', // Invalid password for testing
    });
    expect(res.statusCode).toBe(401); // Unauthorized for invalid login
  });
});