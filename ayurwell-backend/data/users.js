// Simple in-memory "database" of users for the demo prototype.
// Passwords below are the bcrypt hash of "password123" for every demo account.
const bcrypt = require('bcryptjs');

const demoHash = bcrypt.hashSync('password123', 8);

let users = [
  {
    id: 1,
    name: 'Anjali Sharma',
    email: 'patient@ayurwell.com',
    password: demoHash,
    role: 'patient',
    dosha: 'Vata-Pitta',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Dr. Ramesh Iyer',
    email: 'doctor@ayurwell.com',
    password: demoHash,
    role: 'doctor',
    specialization: 'Ayurvedic Nutrition',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@ayurwell.com',
    password: demoHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

let nextId = 4;

module.exports = {
  users,
  getNextId: () => nextId++,
};
