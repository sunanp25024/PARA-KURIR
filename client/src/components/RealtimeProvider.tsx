import React from 'react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  // Initialize real-time sync connection
  useRealtimeSync();
  
  return <>{children}</>;
};