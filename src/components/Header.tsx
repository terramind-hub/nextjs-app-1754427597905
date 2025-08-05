'use client';

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
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