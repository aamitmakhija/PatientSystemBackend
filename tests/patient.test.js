const request = require('supertest');
const app = require('../server');
require('dotenv').config({ path: '.env.test' });
const { validClerkJWT } = require('./token'); // Import tokens

describe('Patient Registration Tests', () => {
  test('should successfully register a patient', async () => {
    const res = await request(app)
      .post('/api/patients/register')
      .set('Authorization', `Bearer ${validClerkJWT}`) // Using the validClerkJWT
      .send({
        name: process.env.TEST_PATIENT_NAME,
        age: process.env.TEST_PATIENT_AGE,
        servicePoint: process.env.TEST_PATIENT_SERVICE_POINT,
      });
    expect(res.statusCode).toBe(201); // Created
    expect(res.body).toHaveProperty('patientId');
  });

  test('should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/patients/register')
      .set('Authorization', `Bearer ${validClerkJWT}`)
      .send({
        name: '',
        age: 30,
      });
    expect(res.statusCode).toBe(400); // Bad Request
  });
});