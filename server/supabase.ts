import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not found, falling back to local auth');
}

export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    role?: string;
    wilayah?: string;
    area?: string;
    lokasi_kerja?: string;
    phone?: string;
  };
}

export const authenticateWithSupabase = async (email: string, password: string): Promise<{
  user: SupabaseUser | null;
  error: string | null;
}> => {
  if (!supabaseAdmin) {
    return { user: null, error: 'Supabase not configured' };
  }

  try {
    // Try to sign in with Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      return { user: null, error: error?.message || 'Authentication failed' };
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email || email,
        user_metadata: data.user.user_metadata || {}
      },
      error: null
    };
  } catch (error) {
    return { user: null, error: 'Supabase authentication error' };
  }
};