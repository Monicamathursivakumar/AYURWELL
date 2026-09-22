import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sage-100 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Leaf size={16} className="text-sage-500" />
        <span className="font-medium">AyurWell</span>
      </div>
      <p>Ayurvedic wellness, made accessible. Prototype/demo build.</p>
    </footer>
  );
}
