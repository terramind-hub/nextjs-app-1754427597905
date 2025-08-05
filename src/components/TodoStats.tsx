'use client';

import React from 'react';
import { BarChart3, CheckCircle, Circle, Target } from 'lucide-react';
import { TodoStatsProps } from '@/types/todo';

const TodoStats: React.FC<TodoStatsProps> = ({
  totalCount,
  activeCount,
  completedCount,
}) => {
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const stats = [
    {
      icon: Target,
      label: 'Total Tasks',
      value: totalCount,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Circle,
      label: 'Active',
      value: activeCount,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: completedCount,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BarChart3,
      label: 'Completion Rate',
      value: `${completionRate}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-lg p-4 text-center animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>
      
      {totalCount > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completionRate}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;