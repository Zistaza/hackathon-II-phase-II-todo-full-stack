'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { todoService } from '../../../services/todo-service';
import { Task } from '../../../types';
import AnimatedButton from '../../../components/ui/animated-button';

import {FiHome} from 'react-icons/fi';


export default function DashboardPage() {
  const { state } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const tasks = await todoService.getTasks();

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = tasks.filter(task => !task.completed).length;

        setStats({
          totalTasks,
          completedTasks,
          pendingTasks
        });
      } catch (error) {
        console.error('Failed to fetch task stats:', error);
        // Set to 0 in case of error
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTaskStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {state.user?.name}!</p>
        </div>
        <Link href="/">
              <AnimatedButton variant="outline" size="md" className="flex items-center gap-2">
                <FiHome className="w-4 h-4" />
                Back to Home
              </AnimatedButton>
            </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Create, view, and manage your todo items efficiently.</p>
            <Link href="/tasks">
              <Button>View Tasks</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Get started by creating your first task.</p>
            <Link href="/tasks/create">
              <Button>Create Task</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {loading ? <span className="animate-pulse">...</span> : stats.totalTasks}
            </p>
            <p className="text-muted-foreground">Total Tasks</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-3xl font-bold text-green-500">
              {loading ? <span className="animate-pulse">...</span> : stats.completedTasks}
            </p>
            <p className="text-muted-foreground">Completed</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-3xl font-bold text-yellow-500">
              {loading ? <span className="animate-pulse">...</span> : stats.pendingTasks}
            </p>
            <p className="text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}