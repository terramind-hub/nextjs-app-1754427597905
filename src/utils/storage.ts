import { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos';

export function loadTodos(): Todo[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    
    // Convert date strings back to Date objects
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
    }));
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
  }
}