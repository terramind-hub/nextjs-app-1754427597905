'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No todos match your current filter</p>
        <p className="text-sm mt-2">Try changing your filter or add a new todo</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      
      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onEdit={onEditTodo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;