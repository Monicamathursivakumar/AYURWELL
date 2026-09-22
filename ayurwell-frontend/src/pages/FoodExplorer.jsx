import React, { useEffect, useState } from 'react';
import { Search, Leaf } from 'lucide-react';
import { api } from '../utils/api';
import { localFoods } from '../data/foods';

export default function FoodExplorer() {
  const [foods, setFoods] = useState(localFoods);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    api
      .get('/food')
      .then((data) => setFoods(data.foods))
      .catch(() => setUsingFallback(true));
  }, []);

  const categories = ['All', ...new Set(foods.map((f) => f.category))];

  const filtered = foods.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || f.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold mb-2">Food & Wellness Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Browse Ayurvedic foods and understand their taste, energy, and dosha effects.
        </p>
        {usingFallback && (
          <p className="text-xs text-turmeric-600 mt-2">
            Showing offline demo data — start the backend for live data.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-48" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((food) => (
          <div key={food.id} className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{food.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sage-100 dark:bg-gray-700 text-sage-700 dark:text-sage-300">
                {food.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{food.benefits}</p>
            <div className="flex items-center gap-1 text-xs text-turmeric-600 dark:text-turmeric-400">
              <Leaf size={14} /> {food.energy} energy
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-10">
            No foods match your search.
          </p>
        )}
      </div>
    </div>
  );
}
