'use client';

import React from 'react';
import Link from 'next/link';
import { useTodo } from '../../../contexts/todo-context';
import { TaskList } from '../../../components/todo/task-list';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function TasksPage() {
  const { state, fetchTasks, deleteTask, toggleTaskCompletion } = useTodo();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <Link href="/tasks/create">
          <Button>Create Task</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            tasks={state.tasks}
            loading={state.loading}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={deleteTask}
          />

          {state.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{state.error}</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={fetchTasks}
              >
                Retry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}