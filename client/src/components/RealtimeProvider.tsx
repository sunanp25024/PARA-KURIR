import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getWebSocketUrl } from '@/lib/websocket';

interface RealtimeContextType {
  isConnected: boolean;
  sendMessage: (message: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType | null>(null);

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const wsUrl = getWebSocketUrl();
    
    const connectWebSocket = () => {
      try {
        console.log('Connecting to WebSocket:', wsUrl);
        
        // Close existing connection if any
        if (wsRef.current) {
          wsRef.current.close();
        }
        
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          console.log('Real-time sync connected');
          setIsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            
            // Invalidate queries based on message type
            switch (message.type) {
              case 'user_created':
              case 'user_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/users'] });
                break;
              case 'approval_request_created':
              case 'approval_request_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/approval-requests'] });
                break;
              case 'package_created':
              case 'package_updated':
                queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
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
          
          // Reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000);
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        setIsConnected(false);
        
        // Retry connection after 5 seconds
        setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [queryClient]);

  const sendMessage = (message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const value: RealtimeContextType = {
    isConnected,
    sendMessage
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    return { isConnected: false, sendMessage: () => {} }; // Graceful fallback
  }
  return context;
};