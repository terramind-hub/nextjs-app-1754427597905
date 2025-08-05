'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <CheckSquare className="w-12 h-12 text-primary-600 mr-3" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Todo App
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        Stay organized and productive with our simple, elegant todo manager
      </p>
    </header>
  );
};

export default Header;