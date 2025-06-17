import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check if push notifications are supported
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
      getCurrentSubscription();
    }
  }, []);

  const getCurrentSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const currentSubscription = await registration.pushManager.getSubscription();
      setSubscription(currentSubscription);
    } catch (error) {
      console.error('Error getting current subscription:', error);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      throw new Error('Push notifications not supported');
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') {
      await subscribeToPush();
    }

    return permission;
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // VAPID public key (you'll need to generate this in your Supabase project)
      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9hmKBEl62iUYgUivxIkv69yViEuiBIa40HI80NM9hmKB';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      setSubscription(subscription);

      // Save subscription to Supabase
      if (user) {
        await saveSubscriptionToServer(subscription);
      }

      return subscription;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      throw error;
    }
  };

  const saveSubscriptionToServer = async (subscription: PushSubscription) => {
    try {
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: user?.id,
          subscription: subscription.toJSON(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const unsubscribe = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);

        // Remove from server
        if (user) {
          await supabase
            .from('push_subscriptions')
            .delete()
            .eq('user_id', user.id);
        }
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      throw error;
    }
  };

  const sendNotification = async (title: string, body: string, data?: any) => {
    if (!isSupported || permission !== 'granted') {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-96x96.png',
        vibrate: [100, 50, 100],
        data,
        actions: [
          {
            action: 'view',
            title: 'View'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribeToPush,
    unsubscribe,
    sendNotification
  };
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}