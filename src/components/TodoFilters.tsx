'use client';

import React from 'react';
import { Filter, Trash2 } from 'lucide-react';
import { TodoFiltersProps, FilterType } from '@/types/todo';

const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: activeCount + completedCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filter Tasks</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-button ${
              currentFilter === filter.key ? 'active' : 'inactive'
            }`}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white bg-opacity-20">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
          </span>
          <button
            onClick={onClearCompleted}
            className="btn-danger text-sm py-1 px-3 flex items-center gap-2"
          >
            <Trash2 className="w-3 h-3" />
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoFilters;