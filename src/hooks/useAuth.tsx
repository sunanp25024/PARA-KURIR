
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { courierService, CourierProfile } from '@/services/courierService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: CourierProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithId: (id: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<CourierProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo
const mockUsers = {
  'MASTERADMIN2025': { email: 'masteradmin@insan.com', password: '123456', role: 'master-admin', name: 'Master Admin' },
  'ADMIN2025': { email: 'admin@insan.com', password: '123456', role: 'admin', name: 'Admin User' },
  'PIC2025': { email: 'pic@insan.com', password: '123456', role: 'pic', name: 'PIC User' },
  'PISTEST2025': { email: 'kurir@insan.com', password: '123456', role: 'kurir', name: 'Kurir Test' }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<CourierProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile data when user is authenticated
          setTimeout(async () => {
            const profileData = await courierService.getCourierProfile(session.user.id);
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        courierService.getCourierProfile(session.user.id).then(setProfile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signInWithId = async (id: string, password: string) => {
    // Check mock users for demo login
    const mockUser = mockUsers[id as keyof typeof mockUsers];
    
    if (mockUser && mockUser.password === password) {
      // For demo purposes, create a mock session
      localStorage.setItem('mockUser', JSON.stringify({
        id,
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name
      }));
      
      // Create mock user and session objects
      const mockUserObj = {
        id,
        email: mockUser.email,
        aud: 'authenticated',
        role: mockUser.role,
        email_confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_metadata: { name: mockUser.name, role: mockUser.role },
        app_metadata: { provider: 'mock', providers: ['mock'] }
      } as User;

      const mockSessionObj = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: mockUserObj
      } as Session;

      setUser(mockUserObj);
      setSession(mockSessionObj);
      setProfile({
        id,
        name: mockUser.name,
        employee_id: id,
        area: 'Demo Area',
        role: mockUser.role as any
      });

      return { error: null };
    }

    return { error: { message: 'Invalid credentials' } };
  };

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('mockUser');
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<CourierProfile>) => {
    if (!user) return false;
    
    const success = await courierService.updateCourierProfile(user.id, updates);
    if (success && profile) {
      setProfile({ ...profile, ...updates });
    }
    return success;
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signInWithId,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
