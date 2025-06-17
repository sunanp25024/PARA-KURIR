import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getWebSocketUrl, createWebSocketConnection } from '@/lib/websocket';

interface RealtimeMessage {
  type: string;
  data: any;
  timestamp: string;
}

export const useRealtimeSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<RealtimeMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Create WebSocket connection with proper URL
    const wsUrl = getWebSocketUrl();
    
    const connectWebSocket = () => {
      try {
        console.log('Connecting to WebSocket:', wsUrl);
        wsRef.current = createWebSocketConnection(wsUrl);

        wsRef.current.onopen = () => {
          console.log('Real-time sync connected');
          setIsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message: RealtimeMessage = JSON.parse(event.data);
            setLastMessage(message);
            
            // Invalidate relevant queries based on message type
            switch (message.type) {
              case 'user_created':
              case 'user_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/users'] });
                break;
              case 'approval_request_created':
              case 'approval_request_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/approval-requests'] });
                queryClient.invalidateQueries({ queryKey: ['/api/approval-requests/pending'] });
                break;
              case 'kurir_activity_created':
                queryClient.invalidateQueries({ queryKey: ['/api/kurir-activities'] });
                break;
              case 'package_created':
              case 'package_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
                break;
              case 'attendance_created':
                queryClient.invalidateQueries({ queryKey: ['/api/attendance'] });
                break;
              case 'connection':
                console.log('WebSocket connection confirmed:', message.data);
                break;
              default:
                console.log('Received real-time update:', message);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        wsRef.current.onclose = () => {
          console.log('Real-time sync disconnected');
          setIsConnected(false);
          
          // Attempt to reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setIsConnected(false);
      }
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [queryClient]);

  return {
    isConnected,
    lastMessage,
    sendMessage: (message: any) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(message));
      }
    }
  };
};