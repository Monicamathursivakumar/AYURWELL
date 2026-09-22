import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import FoodExplorer from './pages/FoodExplorer.jsx';
import Community from './pages/Community.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/food" element={<FoodExplorer />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
