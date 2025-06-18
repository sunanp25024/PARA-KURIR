import React, { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '@/contexts/Auth';

export const RealtimeSync: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const connectWebSocket = () => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws-api`;
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log('Real-time synchronization connected');
        
        // Send user authentication
        if (user) {
          wsRef.current?.send(JSON.stringify({
            type: 'auth',
            userId: user.id,
            role: user.role
          }));
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'package_update':
              queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
              if (data.userId !== user?.id) {
                toast({
                  title: "Package Updated",
                  description: `Package ${data.packageId} status changed to ${data.status}`,
                });
              }
              break;
              
            case 'attendance_update':
              queryClient.invalidateQueries({ queryKey: ['/api/attendance'] });
              if (data.userId !== user?.id) {
                toast({
                  title: "Attendance Update",
                  description: `New attendance record from ${data.kurirName}`,
                });
              }
              break;
              
            case 'activity_update':
              queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
              if (data.userId !== user?.id) {
                toast({
                  title: "Activity Update",
                  description: `New activity recorded: ${data.activityType}`,
                });
              }
              break;
              
            case 'approval_update':
              queryClient.invalidateQueries({ queryKey: ['/api/approval-requests'] });
              if (data.userId !== user?.id) {
                toast({
                  title: "Approval Request",
                  description: `New approval request: ${data.requestType}`,
                });
              }
              break;
              
            case 'user_update':
              queryClient.invalidateQueries({ queryKey: ['/api/users'] });
              break;
              
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        console.log('Real-time synchronization disconnected');
        
        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
      
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (user) {
      connectWebSocket();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isConnected 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isConnected ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Real-time Sync Active</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Reconnecting...</span>
          </>
        )}
      </div>
    </div>
  );
};