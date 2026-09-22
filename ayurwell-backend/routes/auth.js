const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { users, getNextId } = require('../data/users');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const hashed = await bcrypt.hash(password, 8);
  const newUser = {
    id: getNextId(),
    name,
    email,
    password: hashed,
    role: role && ['patient', 'doctor', 'admin'].includes(role) ? role : 'patient',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _pw, ...safeUser } = newUser;
  res.status(201).json({ user: safeUser, token });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _pw, ...safeUser } = user;
  res.json({ user: safeUser, token });
});

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password: _pw, ...safeUser } = user;
  res.json({ user: safeUser });
});

module.exports = router;
