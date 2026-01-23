// Task service for handling todo API calls

import { apiInstance } from '../lib/api';
import { Task, TaskCreate, TaskUpdate } from '../types';
import { getCookie, removeCookie } from '../lib/cookies';

// Get the current user ID from cookies
const getCurrentUserId = (): string | null => {
  const userDataStr = getCookie('userData');
  if (userDataStr) {
    try {
      let user;
      try {
        user = JSON.parse(userDataStr);
      } catch {
        user = JSON.parse(decodeURIComponent(userDataStr));
      }
      console.log('Retrieved user ID:', user.id);
      return user.id;
    } catch (error) {
      console.error('Failed to parse user data from cookie:', error);
      return null;
    }
  }
  console.log('No userData cookie found');
  return null;
};

export const todoService = {
  getTasks: async (): Promise<Task[]> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      if (typeof userId !== 'string' || userId.length < 10 || /[^\w\-]/.test(userId)) {
        console.error('Invalid user ID format:', userId);
        throw new Error('Invalid user ID format');
      }

      const url = `/api/${userId}/tasks`;
      const response = await apiInstance.get<Task[]>(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      if (error.response?.status === 404) {
        console.error('404 error - User ID may be invalid or user does not exist:', userId);
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('User account not found. Please log in again.');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch tasks');
    }
  },

  createTask: async (taskData: TaskCreate): Promise<Task> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      const response = await apiInstance.post<Task>(`/api/${userId}/tasks`, taskData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating task:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to create task');
    }
  },

  getTaskById: async (taskId: string): Promise<Task> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      const response = await apiInstance.get<Task>(`/api/${userId}/tasks/${taskId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching task by ID:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch task');
    }
  },

  updateTask: async (taskId: string, taskData: TaskUpdate): Promise<Task> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      const response = await apiInstance.put<Task>(`/api/${userId}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating task:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to update task');
    }
  },

  deleteTask: async (taskId: string): Promise<void> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      await apiInstance.delete(`/api/${userId}/tasks/${taskId}`);
    } catch (error: any) {
      console.error('Delete task error:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Failed to delete task');
    }
  },

  toggleTaskCompletion: async (taskId: string): Promise<{ id: string; completed: boolean; message: string }> => {
    let userId: string | null = null;

    try {
      userId = getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');

      const response = await apiInstance.patch(`/api/${userId}/tasks/${taskId}/complete`);
      return response.data;
    } catch (error: any) {
      console.error('Error toggling task completion:', error);
      if (error.response?.status === 401) {
        removeCookie('authToken');
        removeCookie('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to toggle task completion');
    }
  },
};
