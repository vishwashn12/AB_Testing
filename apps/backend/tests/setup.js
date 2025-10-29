// Global test setup
jest.setTimeout(10000);

// Global teardown
afterAll(async () => {
  // Close any open connections
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});