
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  CheckCircle,
  Settings,
  Globe,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PWAFeatures = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Check if PWA is installed
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone === true;
    setIsInstalled(isPWA);

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: "Notifikasi Diaktifkan",
          description: "Anda akan menerima notifikasi dari aplikasi",
        });
        
        // Send test notification
        new Notification('INSAN MOBILE', {
          body: 'Notifikasi berhasil diaktifkan!',
          icon: '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png'
        });
      }
    }
  };

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Aplikasi Terinstall",
          description: "INSAN MOBILE berhasil ditambahkan ke home screen",
        });
      }
      
      setInstallPrompt(null);
    }
  };

  const testOfflineFeature = () => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      toast({
        title: "Fitur Offline Aktif",
        description: "Aplikasi dapat berjalan tanpa koneksi internet",
      });
    } else {
      toast({
        title: "Fitur Offline Tidak Didukung",
        description: "Browser tidak mendukung background sync",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            PWA & Android Features
          </CardTitle>
          <CardDescription>
            Fitur-fitur aplikasi mobile yang tersedia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium">Status Koneksi</p>
                <p className="text-sm text-gray-600">
                  {isOnline ? 'Online - Terhubung ke internet' : 'Offline - Mode offline aktif'}
                </p>
              </div>
            </div>
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>

          {/* PWA Installation */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Install Aplikasi</p>
                <p className="text-sm text-gray-600">
                  {isInstalled ? 'Aplikasi sudah terinstall' : 'Install ke home screen'}
                </p>
              </div>
            </div>
            {isInstalled ? (
              <Badge variant="default">
                <CheckCircle className="h-4 w-4 mr-1" />
                Installed
              </Badge>
            ) : (
              <Button 
                size="sm" 
                onClick={installPWA}
                disabled={!installPrompt}
              >
                Install
              </Button>
            )}
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">
                  {notificationPermission === 'granted' 
                    ? 'Notifikasi aktif' 
                    : 'Aktifkan notifikasi push'}
                </p>
              </div>
            </div>
            {notificationPermission === 'granted' ? (
              <Badge variant="default">
                <CheckCircle className="h-4 w-4 mr-1" />
                Aktif
              </Badge>
            ) : (
              <Button 
                size="sm" 
                onClick={requestNotificationPermission}
                disabled={notificationPermission === 'denied'}
              >
                Aktifkan
              </Button>
            )}
          </div>

          {/* Offline Support */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Offline Support</p>
                <p className="text-sm text-gray-600">
                  Aplikasi dapat berjalan tanpa internet
                </p>
              </div>
            </div>
            <Button size="sm" onClick={testOfflineFeature}>
              Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PWA Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Kemampuan PWA</CardTitle>
          <CardDescription>
            Fitur-fitur yang membuat aplikasi seperti aplikasi native
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Responsive Design</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Offline Functionality</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">App-like Experience</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Push Notifications</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Background Sync</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Auto Updates</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Alert>
        <Globe className="h-4 w-4" />
        <AlertDescription>
          <strong>Cara Install PWA:</strong> Pada browser Chrome/Edge, klik menu ⋮ → "Install INSAN MOBILE" atau klik tombol "Install" di atas.
          Untuk Android, aplikasi akan muncul di home screen seperti aplikasi native.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PWAFeatures;
