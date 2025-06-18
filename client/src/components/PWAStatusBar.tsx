import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const PWAStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="safe-area-top" />
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm" />
              <span className="text-sm font-bold">INSAN Mobile</span>
            </div>
            <div className="h-4 w-px bg-slate-600"></div>
            <span className="text-xs text-slate-300 font-medium">Kurir Management</span>
          </div>
          <div className="flex items-center space-x-3 text-xs font-medium">
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-red-400" />
                  <span className="text-red-400">Offline</span>
                </>
              )}
            </div>
            <div className="h-3 w-px bg-slate-600"></div>
            <span className="text-white">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};