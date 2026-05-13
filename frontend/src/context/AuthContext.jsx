import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

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

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('wts_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('wts_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    setUser(userData);
    localStorage.setItem('wts_user', JSON.stringify(userData));
    return data;
  };

  const register = async (credentials) => {
    const data = await registerUser(credentials);
    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    setUser(userData);
    localStorage.setItem('wts_user', JSON.stringify(userData));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wts_user');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
