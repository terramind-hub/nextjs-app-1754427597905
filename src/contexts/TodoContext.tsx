'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { TodoContextType } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const todoContextValue = useTodos();

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}