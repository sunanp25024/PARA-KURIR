import { useEffect, useState } from 'react';
import { apiService, type User } from '@/services/apiService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userId = localStorage.getItem('currentUserId');
        if (userId) {
          const userData = await apiService.getUserByUserId(userId);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const signIn = async (userId: string, password: string) => {
    try {
      const userData = await apiService.getUserByUserId(userId);
      if (userData) {
        localStorage.setItem('currentUserId', userId);
        setUser(userData);
        return { user: userData, error: null };
      }
      return { user: null, error: 'Invalid credentials' };
    } catch (error) {
      return { user: null, error: 'Login failed' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('currentUserId');
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};