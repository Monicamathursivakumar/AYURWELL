import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await register(form);
      const path = user.role === 'admin' ? '/admin' : user.role === 'doctor' ? '/doctor' : '/patient';
      navigate(path);
    } catch {
      // error surfaced via context
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card">
        <div className="flex items-center gap-2 justify-center mb-6 text-sage-600 dark:text-sage-300">
          <Leaf size={22} />
          <span className="font-semibold text-lg">Create your account</span>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full name</label>
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">I am a</label>
            <select
              className="input-field"
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-sage-600 dark:text-sage-400 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
