'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTodo } from '../../../../contexts/todo-context';
import { TaskForm } from '../../../../components/todo/task-form';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

export default function CreateTaskPage() {
  const router = useRouter();
  const { createTask } = useTodo();

  const handleSubmit = async (taskData: { title: string; description: string | null }) => {
    try {
      await createTask(taskData);
      router.push('/tasks');
      router.refresh();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/tasks" className="text-blue-600 hover:underline">
          ← Back to Tasks
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={() => router.push('/tasks')}
            submitButtonText="Create Task"
          />
        </CardContent>
      </Card>
    </div>
  );
}