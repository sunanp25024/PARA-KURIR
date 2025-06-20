import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
    // Create WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws-api`;
    
    const connectWebSocket = () => {
      try {
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          console.log('Real-time sync connected');
          setIsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message: RealtimeMessage = JSON.parse(event.data);
            setLastMessage(message);
            
            // Get current session ID for tab-specific invalidation
            const sessionId = sessionStorage.getItem('session_id');
            const currentUser = sessionStorage.getItem('user');
            
            // Only process real-time updates if user is logged in this tab
            if (!currentUser || !sessionId) {
              return;
            }
            
            // Invalidate relevant queries with session-specific keys
            switch (message.type) {
              case 'user_created':
              case 'user_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/users', sessionId] });
                break;
              case 'approval_request_created':
              case 'approval_request_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/approval-requests', sessionId] });
                queryClient.invalidateQueries({ queryKey: ['/api/approval-requests/pending', sessionId] });
                break;
              case 'kurir_activity_created':
                queryClient.invalidateQueries({ queryKey: ['/api/kurir-activities', sessionId] });
                break;
              case 'package_created':
              case 'package_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/packages', sessionId] });
                break;
              case 'attendance_created':
                queryClient.invalidateQueries({ queryKey: ['/api/attendance', sessionId] });
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