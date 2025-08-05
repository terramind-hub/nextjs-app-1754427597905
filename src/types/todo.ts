export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  addTodo: (text: string, dueDate?: Date, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
  activeCount: number;
  completedCount: number;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export interface TodoInputProps {
  onAddTodo: (text: string, dueDate?: Date, priority?: Todo['priority']) => void;
}

export interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export interface TodoStatsProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
}