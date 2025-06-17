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

  // Simplified authentication - will be restored gradually
  const signIn = async (email: string, password: string) => {
    // Temporary mock authentication for testing
    const mockUser = { id: '1', email };
    const mockProfile = {
      id: '1',
      user_id: '1',
      name: 'Test User',
      email,
      role: 'admin',
      wilayah: 'Jakarta',
      area: 'Pusat',
      lokasi_kerja: 'Kantor Pusat',
      phone: '081234567890',
      status: 'aktif'
    };
    
    setUser(mockUser);
    setUserProfile(mockProfile);
    setSession({ user: mockUser });
    
    return { data: { user: mockUser, session: { user: mockUser } }, error: null };
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