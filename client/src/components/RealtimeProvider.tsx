import { useRealtimeSync } from '@/hooks/useRealtimeSync';

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export const RealtimeProvider = ({ children }: RealtimeProviderProps) => {
  // Initialize real-time sync connection
  useRealtimeSync();
  
  return <>{children}</>;
};