const request = require('supertest');
const app = require('../server');
require('dotenv').config({ path: '.env.test' });
const { validDoctorJWT, validNurseJWT } = require('./token'); // Import tokens

describe('Role-Based Access Control', () => {
  test('should allow a doctor to access patient records', async () => {
    const res = await request(app)
      .get('/api/patients/12345')
      .set('Authorization', `Bearer ${validDoctorJWT}`);  // Using the validDoctorJWT
    expect(res.statusCode).toBe(200);  // Success
  });

  test('should prevent nurse from modifying treatment plan', async () => {
    const res = await request(app)
      .put('/api/patients/12345/treatment')
      .set('Authorization', `Bearer ${validNurseJWT}`)  // Using the validNurseJWT
      .send({ treatment: 'New treatment' });
    expect(res.statusCode).toBe(403);  // Forbidden
  });
});