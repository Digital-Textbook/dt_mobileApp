import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import login from '@/services/api/auth/Session';
import apiClient from '@/services/api/apiClient';

const TOKEN_KEY='jwt';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    const StoredToken = await SecureStore.getItemAsync(TOKEN_KEY);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${StoredToken}`;
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    delete apiClient.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
