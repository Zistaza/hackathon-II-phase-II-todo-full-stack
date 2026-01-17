/**
 * Frontend API service for making authenticated requests to the backend
 */
class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
  }

  /**
   * Get authentication token from auth service
   */
  getAuthToken() {
    if (typeof window !== 'undefined') {
      // Assuming authService is available and has getToken method
      // In a real implementation, you'd import and use your auth service
      const token = localStorage.getItem('auth_token');
      return token;
    }
    return null;
  }

  /**
   * Make an authenticated API request
   */
  async request(endpoint, options = {}) {
    const token = this.getAuthToken();

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add authorization header if token exists
    if (token) {
      defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, mergedOptions);

    // Handle 401 errors
    if (response.status === 401) {
      // Remove token if it's invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      throw new Error('Unauthorized: Please log in again');
    }

    // Throw error for other non-success status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API request failed: ${response.status}`);
    }

    return response;
  }

  /**
   * Get user's tasks
   */
  async getUserTasks(userId) {
    return this.request(`/tasks/${userId}`, {
      method: 'GET',
    });
  }

  /**
   * Create a new task for user
   */
  async createTask(userId, taskData) {
    return this.request(`/tasks/${userId}`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  /**
   * Get a specific task
   */
  async getTask(userId, taskId) {
    return this.request(`/tasks/${userId}/${taskId}`, {
      method: 'GET',
    });
  }

  /**
   * Update a specific task
   */
  async updateTask(userId, taskId, taskData) {
    return this.request(`/tasks/${userId}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  /**
   * Delete a specific task
   */
  async deleteTask(userId, taskId) {
    return this.request(`/tasks/${userId}/${taskId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Toggle task completion status
   */
  async toggleTaskCompletion(userId, taskId) {
    return this.request(`/tasks/${userId}/${taskId}/complete`, {
      method: 'PATCH',
    });
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;