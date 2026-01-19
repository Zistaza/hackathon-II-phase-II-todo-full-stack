'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Task } from '../../../../types';
import { todoService } from '../../../../services/todo-service';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTaskById(taskId);
        setTask(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await todoService.deleteTask(taskId);
        router.push('/tasks');
        router.refresh();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleToggleCompletion = async () => {
    try {
      const result = await todoService.toggleTaskCompletion(taskId);
      if (task) {
        setTask({
          ...task,
          completed: result.completed
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/tasks" className="text-blue-600 hover:underline">
            ← Back to Tasks
          </Link>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/tasks" className="text-blue-600 hover:underline">
            ← Back to Tasks
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Task not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/tasks" className="text-blue-600 hover:underline">
          ← Back to Tasks
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </CardTitle>
            <Button
              variant={task.completed ? 'secondary' : 'primary'}
              onClick={handleToggleCompletion}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {task.description && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Description</h3>
              <p className={`mt-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Created</h3>
              <p className="mt-1 text-gray-900">
                {new Date(task.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Updated</h3>
              <p className="mt-1 text-gray-900">
                {new Date(task.updated_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Link href={`/tasks/${task.id}/edit`}>
              <Button variant="secondary">Edit Task</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}