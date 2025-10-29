const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Atlas',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from CI/CD Pipeline with MongoDB Atlas!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Users route (example with database)
app.get('/api/users', async (req, res) => {
  try {
    // This would typically come from your database
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;