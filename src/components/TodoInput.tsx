'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Calendar, Flag } from 'lucide-react';
import { TodoInputProps, Todo } from '@/types/todo';
import { validateTodoText } from '@/utils/helpers';

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTodoText(text);
    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    const dueDateObj = dueDate ? new Date(dueDate) : undefined;
    onAddTodo(text, dueDateObj, priority);
    
    setText('');
    setDueDate('');
    setPriority('medium');
    setError('');
    setShowAdvanced(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setText('');
      setError('');
      setShowAdvanced(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              maxLength={500}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{error}</p>
            )}
          </div>
          
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-secondary flex items-center gap-2 px-3"
            title="Advanced options"
          >
            <Calendar className="w-4 h-4" />
          </button>
          
          <button
            type="submit"
            disabled={!text.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg animate-slide-in">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className="input-field"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>
        )}
      </form>
      
      <div className="text-xs text-gray-500 text-center">
        Press Enter to add • Press Escape to clear • {text.length}/500 characters
      </div>
    </div>
  );
};

export default TodoInput;