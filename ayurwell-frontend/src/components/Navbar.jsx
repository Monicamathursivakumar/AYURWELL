import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const dashboardPath =
    user?.role === 'admin' ? '/admin' : user?.role === 'doctor' ? '/doctor' : '/patient';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-sage-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-sage-700 dark:text-sage-300 text-lg">
          <Leaf size={22} /> AyurWell
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/food" className="hover:text-sage-600 dark:hover:text-sage-400">Food Explorer</Link>
          <Link to="/community" className="hover:text-sage-600 dark:hover:text-sage-400">Community</Link>
          {user && (
            <Link to={dashboardPath} className="hover:text-sage-600 dark:hover:text-sage-400">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-sage-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <button onClick={handleLogout} className="hidden md:flex items-center gap-1 btn-primary text-sm">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/login" className="hidden md:flex btn-primary text-sm">Login</Link>
          )}

          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <Link to="/food" onClick={() => setOpen(false)}>Food Explorer</Link>
          <Link to="/community" onClick={() => setOpen(false)}>Community</Link>
          {user && <Link to={dashboardPath} onClick={() => setOpen(false)}>Dashboard</Link>}
          {user ? (
            <button onClick={handleLogout} className="btn-primary w-fit">Logout</button>
          ) : (
            <Link to="/login" className="btn-primary w-fit" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
