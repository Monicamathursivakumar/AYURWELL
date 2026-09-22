import React, { useEffect, useState } from 'react';
import { Users, Salad, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [tab, setTab] = useState('users');
  const [error, setError] = useState('');

  function loadUsers() {
    api.get('/users').then((d) => setUsers(d.users)).catch((e) => setError(e.message));
  }
  function loadFoods() {
    api.get('/food').then((d) => setFoods(d.foods)).catch((e) => setError(e.message));
  }

  useEffect(() => {
    loadUsers();
    loadFoods();
  }, []);

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteFood(id) {
    try {
      await api.delete(`/food/${id}`);
      loadFoods();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-1">Admin Panel</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Oversee users and food content.</p>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === 'users' ? 'bg-sage-600 text-white' : 'bg-sage-100 dark:bg-gray-800'}`}
        >
          <Users size={14} className="inline mr-1" /> Users ({users.length})
        </button>
        <button
          onClick={() => setTab('foods')}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === 'foods' ? 'bg-sage-600 text-white' : 'bg-sage-100 dark:bg-gray-800'}`}
        >
          <Salad size={14} className="inline mr-1" /> Foods ({foods.length})
        </button>
      </div>

      {tab === 'users' && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-sage-100 dark:border-gray-700">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-sage-50 dark:border-gray-800 last:border-0">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 capitalize">{u.role}</td>
                  <td className="py-2 text-right">
                    <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'foods' && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-sage-100 dark:border-gray-700">
                <th className="py-2">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Energy</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {foods.map((f) => (
                <tr key={f.id} className="border-b border-sage-50 dark:border-gray-800 last:border-0">
                  <td className="py-2">{f.name}</td>
                  <td className="py-2">{f.category}</td>
                  <td className="py-2">{f.energy}</td>
                  <td className="py-2 text-right">
                    <button onClick={() => deleteFood(f.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
