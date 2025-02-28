const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Ensure environment variables are loaded for tests
require('dotenv').config({ path: '.env.test' });

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  console.log('MongoDB in-memory server URI:', mongoUri);  // Log MongoDB URI for debugging
  
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});