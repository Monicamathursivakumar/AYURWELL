import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('patient@ayurwell.com');
  const [password, setPassword] = useState('password123');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      const path = user.role === 'admin' ? '/admin' : user.role === 'doctor' ? '/doctor' : '/patient';
      navigate(path);
    } catch {
      // error is surfaced via context
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card">
        <div className="flex items-center gap-2 justify-center mb-6 text-sage-600 dark:text-sage-300">
          <Leaf size={22} />
          <span className="font-semibold text-lg">Welcome back</span>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-sage-600 dark:text-sage-400 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
