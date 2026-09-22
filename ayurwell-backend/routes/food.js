const express = require('express');
const router = express.Router();

const { foods } = require('../data/foods');
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/food - list all foods (supports ?category= & ?search=)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = foods;

  if (category) {
    result = result.filter(
      (f) => f.category.toLowerCase() === String(category).toLowerCase()
    );
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter((f) => f.name.toLowerCase().includes(q));
  }

  res.json({ count: result.length, foods: result });
});

// GET /api/food/:id
router.get('/:id', (req, res) => {
  const food = foods.find((f) => f.id === Number(req.params.id));
  if (!food) return res.status(404).json({ error: 'Food item not found' });
  res.json({ food });
});

// POST /api/food - admin only, add a new food item
router.post('/', verifyToken, requireRole('admin'), (req, res) => {
  const { name, category, taste, energy, doshaEffect, benefits, image } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'name and category are required' });
  }
  const newFood = {
    id: foods.length ? Math.max(...foods.map((f) => f.id)) + 1 : 1,
    name,
    category,
    taste: taste || [],
    energy: energy || 'Neutral',
    doshaEffect: doshaEffect || {},
    benefits: benefits || '',
    image: image || '',
  };
  foods.push(newFood);
  res.status(201).json({ food: newFood });
});

// PUT /api/food/:id - admin only, update a food item
router.put('/:id', verifyToken, requireRole('admin'), (req, res) => {
  const food = foods.find((f) => f.id === Number(req.params.id));
  if (!food) return res.status(404).json({ error: 'Food item not found' });
  Object.assign(food, req.body, { id: food.id });
  res.json({ food });
});

// DELETE /api/food/:id - admin only
router.delete('/:id', verifyToken, requireRole('admin'), (req, res) => {
  const idx = foods.findIndex((f) => f.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Food item not found' });
  const [removed] = foods.splice(idx, 1);
  res.json({ message: 'Food item deleted', food: removed });
});

module.exports = router;
