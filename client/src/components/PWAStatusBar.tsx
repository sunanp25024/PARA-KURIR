import React from 'react';
import { Wifi, WifiOff, Download, Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export const PWAStatusBar: React.FC = () => {
  const { isOnline, syncStatus, pendingSync, forceSyncNow } = useOfflineSync();
  const { permission, requestPermission } = usePushNotifications();

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <Download className="h-4 w-4 animate-spin" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    if (syncStatus === 'syncing') return 'Syncing...';
    if (syncStatus === 'success') return 'Synced';
    if (syncStatus === 'error') return 'Sync failed';
    if (!isOnline && pendingSync > 0) return `${pendingSync} offline`;
    return isOnline ? 'Online' : 'Offline';
  };

  const getStatusColor = () => {
    if (syncStatus === 'syncing') return 'bg-blue-500';
    if (syncStatus === 'success') return 'bg-green-500';
    if (syncStatus === 'error') return 'bg-red-500';
    if (!isOnline) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`${getStatusColor()} text-white border-0`}>
            <div className="flex items-center gap-1">
              {getSyncStatusIcon()}
              <span className="text-xs font-medium">{getStatusText()}</span>
            </div>
          </Badge>
          
          {!isOnline && pendingSync > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={forceSyncNow}
              disabled={!isOnline}
              className="h-6 px-2 text-xs"
            >
              Retry Sync
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {permission === 'default' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={requestPermission}
              className="h-6 px-2 text-xs text-blue-600"
            >
              Enable Notifications
            </Button>
          )}
          
          <div className="text-xs text-gray-500">
            INSAN Mobile
          </div>
        </div>
      </div>
    </div>
  );
};