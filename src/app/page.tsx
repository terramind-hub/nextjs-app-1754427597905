'use client';

import { useState, useEffect } from 'react';
import { TodoProvider } from '@/contexts/TodoContext';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import EmptyState from '@/components/EmptyState';
import { useTodos } from '@/hooks/useTodos';
import { FilterType } from '@/types/todo';

function TodoApp() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <TodoInput onAddTodo={addTodo} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <TodoList
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            </div>
            
            <TodoStats
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}