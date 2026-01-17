/**
 * Frontend authentication service for Better Auth integration
 */
class AuthService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
    this.tokenKey = 'auth_token';
  }

  /**
   * Store authentication token in localStorage
   */
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  /**
   * Retrieve authentication token from localStorage
   */
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Remove authentication token from localStorage
   */
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired
    try {
      const payload = this.parseJWT(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if token is about to expire (within 5 minutes)
   */
  isTokenExpiringSoon() {
    const token = this.getToken();
    if (!token) {
      return true; // Consider as expiring if no token
    }

    try {
      const payload = this.parseJWT(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const fiveMinutes = 5 * 60; // 5 minutes in seconds
      return payload.exp - currentTime < fiveMinutes;
    } catch (error) {
      return true; // If we can't parse the token, assume it's problematic
    }
  }

  /**
   * Get remaining time until token expires (in seconds)
   */
  getTokenRemainingTime() {
    const token = this.getToken();
    if (!token) {
      return 0;
    }

    try {
      const payload = this.parseJWT(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return Math.max(0, payload.exp - currentTime);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Parse JWT token to extract payload
   */
  parseJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }

  /**
   * Get current user info from token
   */
  getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = this.parseJWT(token);
      return {
        user_id: payload.sub || payload.user_id,
        email: payload.user_email || payload.email,
        is_authenticated: true
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh token simulation (since refresh tokens are out of scope per spec)
   * In a real implementation, this would call a refresh endpoint
   * For this implementation, we'll just return the current status
   */
  async refreshTokenSimulation() {
    // Since refresh tokens are explicitly out of scope per spec,
    // we'll just return current token status
    const token = this.getToken();

    if (!token) {
      return { needsReauthentication: true };
    }

    // Check if token is expiring soon
    if (this.isTokenExpiringSoon()) {
      // In a real app with refresh tokens, we would call the refresh endpoint
      // For this implementation, we indicate that re-authentication is needed
      return {
        needsReauthentication: true,
        message: "Token expiring soon, please re-authenticate"
      };
    }

    // Token is still valid
    return {
      needsReauthentication: false,
      remainingTime: this.getTokenRemainingTime()
    };
  }

  /**
   * Register a new user
   */
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();

      // Store the token if provided in response
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login existing user
   */
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();

      // Store the token if provided in response
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout current user
   */
  async logout() {
    try {
      // Call backend logout endpoint if needed
      await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json',
        }
      }).catch(() => {}); // Ignore logout errors

      // Remove token from local storage
      this.removeToken();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Make authenticated API request
   */
  async makeAuthenticatedRequest(url, options = {}) {
    const token = this.getToken();

    if (!token) {
      throw new Error('No authentication token available');
    }

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(url, mergedOptions);

    if (response.status === 401) {
      // Token might be expired, remove it
      this.removeToken();
      throw new Error('Authentication required');
    }

    return response;
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;