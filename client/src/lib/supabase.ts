// Supabase has been completely migrated to Neon PostgreSQL
// This file contains only type definitions for backward compatibility

export interface Database {
  public: {
    Tables: {
      [key: string]: any;
    }
  }
}

// No Supabase client - all operations use server-side API routes
console.log('Migration complete: Using Neon PostgreSQL with server-side operations');