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
    <div className="w-full bg-glass backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-modern">
      <div className="safe-area-top" />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">INSAN Mobile</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Kurir Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-sm border ${
              isOnline 
                ? 'bg-emerald-50/80 border-emerald-200/50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700/50 dark:text-emerald-300' 
                : 'bg-red-50/80 border-red-200/50 text-red-700 dark:bg-red-900/30 dark:border-red-700/50 dark:text-red-300'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3" />
                  <span className="text-xs font-semibold">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  <span className="text-xs font-semibold">Offline</span>
                </>
              )}
            </div>
            
            <div className="px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};