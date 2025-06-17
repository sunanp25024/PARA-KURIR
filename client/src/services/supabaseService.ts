// This service has been migrated to server-side API routes
// All database operations now use /api endpoints instead of Supabase client

export class SupabaseService {
  // This service is deprecated - use server API routes instead
  constructor() {
    console.log('SupabaseService is deprecated - database operations moved to server');
  }
}

export const supabaseService = new SupabaseService();