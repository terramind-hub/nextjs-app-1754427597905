'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterType } from '@/types/todo';
import { generateId } from '@/utils/helpers';
import { loadTodos, saveTodos } from '@/utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = loadTodos();
    setTodos(savedTodos);
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (isLoaded) {
      saveTodos(todos);
    }
  }, [todos, isLoaded]);

  // Filter todos based on current filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Calculate counts
  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  // Add new todo
  const addTodo = useCallback((text: string, dueDate?: Date, priority?: Todo['priority']) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate,
      priority,
    };

    setTodos(prev => [newTodo, ...prev]);
  }, []);

  // Toggle todo completion status
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Edit todo text
  const editTodo = useCallback((id: string, text: string) => {
    if (text.trim() === '') return;

    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, text: text.trim(), updatedAt: new Date() }
        : todo
    ));
  }, []);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  return {
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
  };
}