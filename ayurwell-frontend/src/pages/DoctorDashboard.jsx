import React, { useEffect, useState } from 'react';
import { Users, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../utils/api';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/users/patients')
      .then((data) => setPatients(data.patients))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-1">Welcome, Dr. {user?.name?.split(' ').pop() || ''} 🩺</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Manage and review your patients.</p>

      <div className="card mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-sage-100 dark:bg-gray-700 flex items-center justify-center">
          <Users size={22} className="text-sage-600 dark:text-sage-300" />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Patients</p>
          <p className="text-2xl font-semibold">{patients.length}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Stethoscope size={18} className="text-sage-600 dark:text-sage-300" /> Patient List
        </h2>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        {patients.length === 0 && !error ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No patients registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-sage-100 dark:border-gray-700">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Dosha</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-b border-sage-50 dark:border-gray-800 last:border-0">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.email}</td>
                    <td className="py-2">{p.dosha || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
