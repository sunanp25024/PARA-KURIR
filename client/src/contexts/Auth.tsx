import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SessionManager } from '@/utils/sessionUtils';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for existing user session on app start - use sessionStorage for tab isolation
  useEffect(() => {
    const savedUser = SessionManager.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        return { data: null, error: error.error || 'Login failed' };
      }

      const result = await response.json();
      setUser(result.user);
      
      // Save user data to sessionStorage for tab-specific persistence
      SessionManager.setCurrentUser(result.user);
      
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    SessionManager.clearSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}