const express = require('express');
const router = express.Router();

const { users } = require('../data/users');
const { verifyToken, requireRole } = require('../middleware/auth');

function sanitize(user) {
  const { password, ...safe } = user;
  return safe;
}

// GET /api/users - admin only, list all users
router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ count: users.length, users: users.map(sanitize) });
});

// GET /api/users/patients - doctor or admin, list all patients
router.get('/patients', verifyToken, requireRole('doctor', 'admin'), (req, res) => {
  const patients = users.filter((u) => u.role === 'patient').map(sanitize);
  res.json({ count: patients.length, patients });
});

// PUT /api/users/me - update own profile (e.g. dosha info)
router.put('/me', verifyToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { name, dosha, specialization } = req.body;
  if (name) user.name = name;
  if (dosha) user.dosha = dosha;
  if (specialization) user.specialization = specialization;

  res.json({ user: sanitize(user) });
});

// DELETE /api/users/:id - admin only
router.delete('/:id', verifyToken, requireRole('admin'), (req, res) => {
  const idx = users.findIndex((u) => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const [removed] = users.splice(idx, 1);
  res.json({ message: 'User deleted', user: sanitize(removed) });
});

module.exports = router;
