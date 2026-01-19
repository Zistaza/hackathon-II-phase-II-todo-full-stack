'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTodo } from '../../../contexts/todo-context';
import { TaskList } from '../../../components/todo/task-list';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import AnimatedButton from '../../../components/ui/animated-button';
import { FiPlus, FiHome, FiRefreshCw, FiFilter, FiCheckSquare, FiClock } from 'react-icons/fi';

export default function TasksPage() {
  const { state, fetchTasks, deleteTask, toggleTaskCompletion } = useTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = state.tasks.filter(task => task.completed).length;
  const totalCount = state.tasks.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your daily activities efficiently
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <AnimatedButton variant="outline" size="md" className="flex items-center gap-2">
                <FiHome className="w-4 h-4" />
                Back to Home
              </AnimatedButton>
            </Link>
            <Link href="/tasks/create">
              <AnimatedButton variant="default" size="md" className="flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-600">
                <FiPlus className="w-4 h-4" />
                Create Task
              </AnimatedButton>
            </Link>
          </div>
        </div>

        {/* Stats and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{totalCount - completedCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-muted-foreground" />
            <div className="flex bg-muted rounded-lg p-1">
              {(['all', 'active', 'completed'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === option
                      ? 'bg-background text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Task List Card */}
      <Card className="overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiCheckSquare className="text-primary" />
            Your Tasks
            {filter !== 'all' && (
              <span className="text-sm font-normal text-muted-foreground capitalize">
                • {filter}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            tasks={filteredTasks}
            loading={state.loading}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={(id) => window.location.href = `/tasks/${id}/edit`}
          />

          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-destructive">
                  <FiRefreshCw className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-destructive font-medium">Something went wrong</p>
                  <p className="text-destructive text-sm mt-1">{state.error}</p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="mt-3 text-destructive border-destructive hover:bg-destructive/10"
                    onClick={fetchTasks}
                  >
                    <FiRefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          )}

          {filteredTasks.length === 0 && !state.loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <FiCheckSquare className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                    ? 'No active tasks'
                    : 'No tasks yet'}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {filter === 'all'
                  ? 'Get started by creating your first task!'
                  : `Start ${filter === 'active' ? 'completing' : 'adding'} tasks to see them here.`}
              </p>
              <Link href="/tasks/create">
                <AnimatedButton variant="default" className="bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-600">
                  <FiPlus className="w-4 h-4 mr-2" />
                  Create Your First Task
                </AnimatedButton>
              </Link>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}