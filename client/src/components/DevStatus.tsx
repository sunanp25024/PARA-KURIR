import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';

export const DevStatus = () => {
  const [wsConnected, setWsConnected] = useState(false);
  const [hmrStatus, setHmrStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  useEffect(() => {
    // Check WebSocket connection to our API
    const checkWsConnection = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}/ws-api`);
        ws.onopen = () => {
          setWsConnected(true);
          ws.close();
        };
        ws.onerror = () => setWsConnected(false);
        ws.onclose = () => setWsConnected(false);
      } catch {
        setWsConnected(false);
      }
    };

    // Check HMR status
    if (import.meta.hot) {
      setHmrStatus('connected');
      import.meta.hot.on('vite:beforeUpdate', () => {
        setHmrStatus('connecting');
        setTimeout(() => setHmrStatus('connected'), 500);
      });
    } else {
      setHmrStatus('disconnected');
    }

    checkWsConnection();
    const interval = setInterval(checkWsConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded-lg text-xs space-y-1">
      <div className="flex items-center gap-2">
        {wsConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
        <span>WebSocket: {wsConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
      <div className="flex items-center gap-2">
        <Activity size={12} className={hmrStatus === 'connected' ? 'text-green-400' : 'text-yellow-400'} />
        <span>HMR: {hmrStatus}</span>
      </div>
    </div>
  );
};