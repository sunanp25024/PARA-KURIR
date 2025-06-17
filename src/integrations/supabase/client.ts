
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = "https://cpuxuossynzfqmuorvkf.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdXh1b3NzeW56ZnFtdW9ydmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Nzg3MzksImV4cCI6MjA2NTU1NDczOX0.kg-LRskBDuDjh-oXgNPzZNPPJQuWj0c9HdgNVdB-6oE"

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)
