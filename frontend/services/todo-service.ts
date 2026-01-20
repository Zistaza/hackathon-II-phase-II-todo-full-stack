// Task service for handling todo API calls

import { apiInstance, API_BASE_URL } from '../lib/api';
import { Task, TaskCreate, TaskUpdate } from '../types';
import axios from 'axios';
import { getCookie } from '../lib/cookies';

// Get the current user ID from cookies
const getCurrentUserId = (): string | null => {
  const userDataStr = getCookie('userData');
  if (userDataStr) {
    try {
      const user = JSON.parse(decodeURIComponent(userDataStr));
      return user.id;
    } catch (error) {
      console.error('Failed to parse user data from cookie:', error);
      return null;
    }
  }
  return null;
};

export const todoService = {
  // Get all tasks for the authenticated user
  getTasks: async (): Promise<Task[]> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await apiInstance.get<Task[]>(`/${userId}/tasks`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  // Create a new task
  createTask: async (taskData: TaskCreate): Promise<Task> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await apiInstance.post<Task>(`/${userId}/tasks`, taskData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  // Get a specific task by ID
  getTaskById: async (taskId: string): Promise<Task> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await apiInstance.get<Task>(`/${userId}/tasks/${taskId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  },

  // Update a task
  updateTask: async (taskId: string, taskData: TaskUpdate): Promise<Task> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await apiInstance.put<Task>(`/${userId}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  // Delete a task
  deleteTask: async (taskId: string): Promise<void> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      await apiInstance.delete(`/${userId}/tasks/${taskId}`);
    } catch (error: any) {
      console.error('Delete task error:', error);
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Failed to delete task');
    }
  },

  // Toggle task completion status
  toggleTaskCompletion: async (taskId: string): Promise<{ id: string; completed: boolean; message: string }> => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await apiInstance.patch(`/${userId}/tasks/${taskId}/complete`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to toggle task completion');
    }
  },
};