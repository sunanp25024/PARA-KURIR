import React from 'react';

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

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [session, setSession] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

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
      
      // Save to sessionStorage for tab isolation
      sessionStorage.setItem('user', JSON.stringify(result.user));
      sessionStorage.setItem('session_id', Date.now().toString());
      
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
    
    // Clear sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('session_id');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
    return { data: userProfile, error: null };
  };

  const uploadAvatar = async (file: File) => {
    return { data: null, error: 'Avatar upload not implemented yet' };
  };

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    uploadAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}