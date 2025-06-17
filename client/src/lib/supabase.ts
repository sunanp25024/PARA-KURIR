
// Supabase has been completely migrated to Neon PostgreSQL
// This file is kept only for type compatibility

export interface Database {
  public: {
    Tables: {
      [key: string]: any;
    }
  }
}

// All database operations now use server-side API routes with Neon PostgreSQL
export const supabase = null; // Explicitly set to null to prevent usage
