import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/auth';

// Create Auth Context
const AuthContext = createContext();

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  authenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const token = authService.getToken();
    if (token && authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      if (user) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });
      }
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authService.login(credentials);

      if (response.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: authService.getCurrentUser(),
            token: response.token
          }
        });

        return { success: true };
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Login failed'
      });
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await authService.register(userData);

      if (response.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: authService.getCurrentUser(),
            token: response.token
          }
        });

        return { success: true };
      } else {
        throw new Error('Registration failed: No token received');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Registration failed'
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // Check if token is about to expire
  const checkTokenExpiry = () => {
    return authService.isTokenExpiringSoon();
  };

  // Refresh token simulation
  const refreshToken = async () => {
    const result = await authService.refreshTokenSimulation();

    if (result.needsReauthentication) {
      // Token needs refresh, user should re-authenticate
      dispatch({
        type: 'SET_ERROR',
        payload: result.message || 'Session expired, please log in again'
      });
      return { needsReauth: true };
    }

    return { needsReauth: false, remainingTime: result.remainingTime };
  };

  // Value to provide to consumers
  const value = {
    ...state,
    login,
    register,
    logout,
    checkTokenExpiry,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;