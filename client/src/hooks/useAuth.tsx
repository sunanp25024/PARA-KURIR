
// This hook has been completely replaced by AuthContext
// Import and use useAuth from '@/contexts/AuthContext' instead

import { useAuth as useAuthContext } from '@/contexts/AuthContext';

export const useAuth = useAuthContext;
