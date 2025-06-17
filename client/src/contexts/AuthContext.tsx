import React, { createContext, useContext, useState } from 'react';

// Simplified types for initial setup
type User = {
  id: string;
  email: string;
};

type UserProfile = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  wilayah: string;
  area: string;
  lokasi_kerja: string;
  phone: string;
  status: string;
  avatar_url?: string;
};

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any; data: any }>;
  uploadAvatar: (file: File) => Promise<{ error: any; data: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

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
      setUserProfile({
        id: result.user.id,
        user_id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        wilayah: result.user.wilayah || 'Jakarta',
        area: result.user.area || 'Pusat',
        lokasi_kerja: result.user.lokasi_kerja || 'Kantor Pusat',
        phone: result.user.phone || '081234567890',
        status: result.user.status || 'aktif'
      });
      setSession(result.session);
      
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    return { data: null, error: 'Sign up not implemented yet' };
  };

  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in', data: null };
    return { data: null, error: null };
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: 'No user logged in', data: null };
    return { data: null, error: null };
  };

  const value = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    uploadAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};