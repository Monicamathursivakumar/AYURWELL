require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const communityRoutes = require('./routes/community');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'AyurWell API is running 🌿' });
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`🌿 AyurWell backend running at http://localhost:${PORT}`);
});
