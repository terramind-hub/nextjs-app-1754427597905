'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Edit3, Check, X, Calendar, Flag } from 'lucide-react';
import { TodoItemProps } from '@/types/todo';
import { formatDate, formatRelativeTime, isOverdue, getPriorityColor, validateTodoText } from '@/utils/helpers';

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    const validation = validateTodoText(editText);
    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    onEdit(todo.id, editText);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const priorityColor = getPriorityColor(todo.priority);
  const isDueDateOverdue = todo.dueDate && isOverdue(todo.dueDate);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} group`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 mt-0.5
            ${todo.completed 
              ? 'bg-primary-600 border-primary-600 text-white' 
              : 'border-gray-300 hover:border-primary-400'
            }
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                ref={editInputRef}
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                maxLength={500}
              />
              {error && (
                <p className="text-red-500 text-sm animate-fade-in">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="btn-primary text-sm py-1 px-3"
                  disabled={!editText.trim()}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary text-sm py-1 px-3"
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`todo-text ${todo.completed ? 'completed' : ''} cursor-pointer flex-1`}
                  onClick={() => setIsEditing(true)}
                  title="Click to edit"
                >
                  {todo.text}
                </p>
                
                {/* Priority indicator */}
                {todo.priority && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColor}`}>
                    <Flag className="w-3 h-3 mr-1" />
                    {todo.priority}
                  </span>
                )}
              </div>
              
              {/* Due date and metadata */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  {todo.dueDate && (
                    <span className={`flex items-center gap-1 ${
                      isDueDateOverdue && !todo.completed ? 'text-red-600 font-medium' : ''
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {formatDate(todo.dueDate)}
                      {isDueDateOverdue && !todo.completed && ' (Overdue)'}
                    </span>
                  )}
                  <span>Created {formatRelativeTime(todo.createdAt)}</span>
                  {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                    <span>• Updated {formatRelativeTime(todo.updatedAt)}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200 rounded"
              title="Edit todo"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 rounded"
              title="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;