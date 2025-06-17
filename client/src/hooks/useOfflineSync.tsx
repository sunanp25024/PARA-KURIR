import { useState, useEffect } from 'react';
import { supabaseService } from '@/services/supabaseService';

interface OfflineData {
  id: string;
  type: 'package' | 'attendance' | 'activity';
  data: any;
  timestamp: number;
  action: 'create' | 'update' | 'delete';
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [pendingSync, setPendingSync] = useState<OfflineData[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending sync data from localStorage
    loadPendingSyncData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingSyncData = () => {
    try {
      const stored = localStorage.getItem('offline_sync_data');
      if (stored) {
        const data = JSON.parse(stored);
        setPendingSync(data);
      }
    } catch (error) {
      console.error('Error loading offline sync data:', error);
    }
  };

  const savePendingSyncData = (data: OfflineData[]) => {
    try {
      localStorage.setItem('offline_sync_data', JSON.stringify(data));
      setPendingSync(data);
    } catch (error) {
      console.error('Error saving offline sync data:', error);
    }
  };

  const addToOfflineQueue = (item: Omit<OfflineData, 'id' | 'timestamp'>) => {
    const offlineItem: OfflineData = {
      ...item,
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    const newPendingSync = [...pendingSync, offlineItem];
    savePendingSyncData(newPendingSync);

    // Show offline notification
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Data Saved Offline', {
          body: 'Your data has been saved offline and will sync when connection is restored.',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-96x96.png',
          tag: 'offline-save'
        });
      });
    }
  };

  const syncOfflineData = async () => {
    if (!isOnline || pendingSync.length === 0) return;

    setSyncStatus('syncing');

    try {
      const syncPromises = pendingSync.map(async (item) => {
        switch (item.type) {
          case 'package':
            return item.action === 'create' 
              ? supabaseService.createPackage(item.data)
              : supabaseService.updatePackage(item.data.id, item.data);
          
          case 'attendance':
            return item.action === 'create'
              ? supabaseService.createAttendance(item.data)
              : supabaseService.updateAttendance(item.data.id, item.data);
          
          case 'activity':
            return supabaseService.createKurirActivity(item.data);
          
          default:
            throw new Error(`Unknown sync type: ${item.type}`);
        }
      });

      await Promise.all(syncPromises);

      // Clear synced data
      savePendingSyncData([]);
      setSyncStatus('success');

      // Show success notification
      if ('serviceWorker' in navigator && 'Notification' in window) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Data Synced Successfully', {
            body: `${pendingSync.length} items have been synced to the server.`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-96x96.png',
            tag: 'sync-success'
          });
        });
      }

    } catch (error) {
      console.error('Error syncing offline data:', error);
      setSyncStatus('error');

      // Show error notification
      if ('serviceWorker' in navigator && 'Notification' in window) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Sync Failed', {
            body: 'Some data could not be synced. Will retry when connection improves.',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-96x96.png',
            tag: 'sync-error'
          });
        });
      }
    } finally {
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const forceSyncNow = () => {
    if (isOnline) {
      syncOfflineData();
    }
  };

  const clearOfflineData = () => {
    savePendingSyncData([]);
  };

  return {
    isOnline,
    syncStatus,
    pendingSync: pendingSync.length,
    addToOfflineQueue,
    forceSyncNow,
    clearOfflineData
  };
};