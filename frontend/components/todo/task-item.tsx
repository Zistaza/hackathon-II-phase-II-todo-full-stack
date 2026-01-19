'use client';

import React from 'react';
import { Task } from '../../types';
import { Button } from '../ui/button';
import AnimatedButton from '../ui/animated-button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheck, FiCalendar } from 'react-icons/fi';

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleCompletion,
  onDelete,
  onEdit
}) => {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-xl border transition-all duration-300 ${
        task.completed
          ? 'bg-muted/50 border-emerald-200/30 dark:border-emerald-800/50 shadow-sm'
          : 'bg-card border-border shadow-sm hover:shadow-md'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            <motion.button
              whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
              onClick={() => onToggleCompletion(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-input hover:border-primary dark:border-input dark:hover:border-primary'
              }`}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold truncate ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}>
                  {task.title}
                </h3>
                {task.completed && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <FiCheck className="w-3 h-3 mr-1" />
                    Completed
                  </span>
                )}
              </div>

              {task.description && (
                <p className={`text-sm mt-1 break-words max-h-12 overflow-hidden ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
                {task.completed && (
                  <div className="flex items-center gap-1">
                    <FiCheck className="w-3 h-3" />
                    <span>Completed: {new Date(task.updated_at || task.created_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Link href={`/tasks/${task.id}/edit`}>
              <AnimatedButton
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
                aria-label="Edit task"
              >
                <FiEdit2 className="w-4 h-4" />
              </AnimatedButton>
            </Link>
            <AnimatedButton
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive border-destructive/20 dark:hover:bg-destructive/10 dark:hover:text-destructive dark:border-destructive/30"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <FiTrash2 className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Progress indicator bar */}
      {!task.completed && (
        <div className="h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
      )}
    </motion.div>
  );
};