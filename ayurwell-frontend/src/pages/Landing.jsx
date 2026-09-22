import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Salad, Users, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Salad,
    title: 'Food & Wellness Database',
    desc: 'Explore a curated set of Ayurvedic foods with taste, energy and dosha effects.',
  },
  {
    icon: Users,
    title: 'Role-Based Dashboards',
    desc: 'Tailored experiences for patients, doctors, and administrators.',
  },
  {
    icon: Leaf,
    title: 'Community Wellness',
    desc: 'Share routines, ask questions, and learn from others on their journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Simple',
    desc: 'Lightweight auth with role-based access, built for demo and iteration.',
  },
];

export default function Landing() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 dark:bg-gray-800 text-sage-700 dark:text-sage-300 text-xs font-medium mb-6">
          <Leaf size={14} /> Ayurvedic wellness, reimagined
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">
          Welcome to <span className="text-sage-600 dark:text-sage-400">AyurWell</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          A polished prototype that brings Ayurvedic diet guidance, wellness insights, and
          community interaction into one seamless, modern experience.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/login" className="btn-primary flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </Link>
          <Link to="/food" className="btn-secondary">Explore Foods</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Icon size={20} className="text-sage-600 dark:text-sage-300" />
            </div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="card text-center">
          <h2 className="text-lg font-semibold mb-2">Try a demo account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Use password <code className="px-1.5 py-0.5 rounded bg-sage-100 dark:bg-gray-700">password123</code> with any of the emails below.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-sage-50 dark:bg-gray-700">patient@ayurwell.com</div>
            <div className="p-3 rounded-xl bg-sage-50 dark:bg-gray-700">doctor@ayurwell.com</div>
            <div className="p-3 rounded-xl bg-sage-50 dark:bg-gray-700">admin@ayurwell.com</div>
          </div>
        </div>
      </section>
    </div>
  );
}
