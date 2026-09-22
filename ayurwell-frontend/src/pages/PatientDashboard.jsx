import React, { useState } from 'react';
import { HeartPulse, Salad, Droplets, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getItem, setItem } from '../utils/storage';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [dosha, setDosha] = useState(() => getItem('dosha', user?.dosha || 'Not assessed'));
  const [log, setLog] = useState(() => getItem('wellnessLog', []));
  const [entry, setEntry] = useState('');

  function addEntry() {
    if (!entry.trim()) return;
    const newLog = [{ id: Date.now(), text: entry, date: new Date().toLocaleDateString() }, ...log];
    setLog(newLog);
    setItem('wellnessLog', newLog);
    setEntry('');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-1">Welcome, {user?.name?.split(' ')[0] || 'Patient'} 👋</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Here's your wellness overview.</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <div className="card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-gray-700 flex items-center justify-center">
            <HeartPulse size={20} className="text-sage-600 dark:text-sage-300" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dosha Type</p>
            <p className="font-semibold">{dosha}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-turmeric-100 dark:bg-gray-700 flex items-center justify-center">
            <Salad size={20} className="text-turmeric-600 dark:text-turmeric-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Wellness Entries</p>
            <p className="font-semibold">{log.length}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
            <Droplets size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Hydration Reminder</p>
            <p className="font-semibold">Drink warm water</p>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Moon size={18} className="text-sage-600 dark:text-sage-300" /> Log today's wellness note
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="input-field flex-1"
            placeholder="e.g. Felt energetic after morning yoga"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button className="btn-primary" onClick={addEntry}>Add</button>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">Recent entries</h2>
        {log.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No entries yet. Add your first note above.</p>
        ) : (
          <ul className="space-y-3">
            {log.map((item) => (
              <li key={item.id} className="border-b border-sage-100 dark:border-gray-700 pb-2 last:border-0">
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
