
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, Clock, User, Package } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'Tugas Pengiriman Baru',
      message: '5 paket baru telah ditambahkan ke daftar pengiriman Anda',
      timestamp: '5 menit yang lalu',
      read: false,
      icon: Package
    },
    {
      id: 2,
      type: 'approval',
      title: 'Permintaan Disetujui',
      message: 'Permintaan perubahan area kerja telah disetujui',
      timestamp: '1 jam yang lalu',
      read: false,
      icon: Check
    },
    {
      id: 3,
      type: 'system',
      title: 'Update Sistem',
      message: 'Aplikasi telah diperbarui ke versi 1.0.1',
      timestamp: '2 jam yang lalu',
      read: true,
      icon: Bell
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Reminder Check-out',
      message: 'Jangan lupa untuk check-out sebelum jam 17:00',
      timestamp: '3 jam yang lalu',
      read: true,
      icon: Clock
    }
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Notifikasi Dibaca",
      description: "Notifikasi telah ditandai sebagai dibaca.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "Semua Notifikasi Dibaca",
      description: "Semua notifikasi telah ditandai sebagai dibaca.",
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notifikasi Dihapus",
      description: "Notifikasi telah dihapus.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-600';
      case 'approval': return 'bg-green-100 text-green-600';
      case 'system': return 'bg-purple-100 text-purple-600';
      case 'reminder': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifikasi</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">Semua notifikasi</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Belum Dibaca</CardTitle>
              <Badge variant="destructive" className="text-xs">{unreadCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">Perlu perhatian</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tugas</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.type === 'task').length}
              </div>
              <p className="text-xs text-muted-foreground">Notifikasi tugas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sistem</CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.type === 'system').length}
              </div>
              <p className="text-xs text-muted-foreground">Update sistem</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Daftar Notifikasi
            </CardTitle>
            <CardDescription>
              Semua notifikasi terbaru untuk Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div key={notification.id} className={`flex items-center justify-between p-4 border rounded-lg ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        getNotificationColor(notification.type)
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{notification.title}</p>
                          {!notification.read && (
                            <Badge variant="destructive" className="text-xs">Baru</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              {notifications.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada notifikasi</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;
