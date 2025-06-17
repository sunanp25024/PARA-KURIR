import React from 'react';
import { useRealtime } from './RealtimeProvider';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

export const RealtimeStatus: React.FC = () => {
  const { isConnected } = useRealtime();

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
        {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        {isConnected ? 'Terhubung' : 'Terputus'}
      </Badge>
    </div>
  );
};