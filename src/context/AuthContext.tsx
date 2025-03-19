import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '../types/auth';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      try {
        const decoded = JSON.parse(atob(storedAccessToken.split('.')[1]));
        setUser({ userId: decoded.userId, role: decoded.role });
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = (newAccessToken: string) => {
    localStorage.setItem('accessToken', newAccessToken);
    setAccessToken(newAccessToken);
    try {
      const decoded = JSON.parse(atob(newAccessToken.split('.')[1]));
      setUser({ userId: decoded.userId, role: decoded.role });
    } catch (error) {
      console.error("error decoding token");
      logout();
    }
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('refreshToken');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`).catch(console.error);
    navigate('/login');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken) {
        try {
          const decoded = JSON.parse(atob(accessToken.split('.')[1]));
          const expiry = decoded.exp * 1000-60000; // 1 minute before expiry
          if (Date.now() > expiry) {
            refreshTokenFn();
          }
        } catch (error) {
          console.error("error during token expiration check");
          logout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [accessToken]);

  const refreshTokenFn = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, { refreshToken });
      const newAccessToken = response.headers.authorization.split(' ')[1];
      login(newAccessToken);
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};