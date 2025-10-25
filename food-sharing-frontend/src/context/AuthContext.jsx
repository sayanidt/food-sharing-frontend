import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Call real API service. The API is expected to return an object like:
      // { access_token: '...', token_type: 'bearer', user: { ... } }
      const data = await apiService.login({ email, password });

      const token = data.access_token || data.token || data.accessToken;
      const userFromResponse = data.user || data;

      if (token) {
        localStorage.setItem('access_token', token);
      }

      if (userFromResponse) {
        localStorage.setItem('user', JSON.stringify(userFromResponse));
        setUser(userFromResponse);
      }

      setIsAuthenticated(true);
      return data;
    } catch (error) {
      // Bubble up error so UI can show messages from error.response.data
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Call real API service. The API is expected to return an object similar to:
      // { status: 'created', user: { ... }, access_token: '...', token_type: 'bearer' }
      const data = await apiService.register(userData);

      // Prefer explicit fields if present
      const token = data.access_token || data.token || data.accessToken;
      const userFromResponse = data.user || data;

      if (token) {
        localStorage.setItem('access_token', token);
      }

      if (userFromResponse) {
        localStorage.setItem('user', JSON.stringify(userFromResponse));
        setUser(userFromResponse);
      }

      setIsAuthenticated(true);
      return data;
    } catch (error) {
      // Bubble up error so UI can show messages from error.response.data
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
