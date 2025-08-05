'use client';

import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 text-gray-300 mx-auto mb-4 flex items-center justify-center text-4xl">✓</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No todos yet
          </h3>
          <p className="text-gray-500">
            Start by adding your first task above. Stay organized and get things done!
          </p>
        </div>
        
        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">+</span>
            <span>Add new todos with the input field above</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">✓</span>
            <span>Mark tasks as complete when done</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>✏️</span>
            <span>Click on any task to edit it</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">
            💡 <strong>Pro tip:</strong> Use keyboard shortcuts! Press Enter to add tasks quickly, 
            and Escape to cancel editing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;