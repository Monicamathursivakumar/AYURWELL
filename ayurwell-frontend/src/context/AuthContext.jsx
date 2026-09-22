import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getItem('user', null));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function login(email, password) {
    setLoading(true);
    setError('');
    try {
      const data = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setItem('user', data.user);
      setItem('token', data.token);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    setError('');
    try {
      const data = await api.post('/auth/register', payload);
      setUser(data.user);
      setItem('user', data.user);
      setItem('token', data.token);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    removeItem('user');
    removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
