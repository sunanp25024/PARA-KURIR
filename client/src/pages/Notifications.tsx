
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, Clock, User, Package, Shield, Users, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import CourierSidebar from '@/components/CourierSidebar';
import { toast } from '@/hooks/use-toast';
import { useApprovals } from '@/hooks/useApprovals';

const Notifications = () => {
  const [user, setUser] = useState<any>(null);
  const { allRequests, loading } = useApprovals();
  
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getNotificationsForRole = (userRole: string) => {
    const baseNotifications = [
      {
        id: 'system-1',
        type: 'system',
        title: 'Update Sistem',
        message: 'Aplikasi telah diperbarui ke versi 1.0.1',
        timestamp: '2 jam yang lalu',
        read: true,
        icon: Bell
      }
    ];

    switch (userRole) {
      case 'master-admin':
        return [
          {
            id: 'approval-1',
            type: 'approval',
            title: 'Permintaan Approval Baru',
            message: '3 permintaan menunggu persetujuan Anda',
            timestamp: '30 menit yang lalu',
            read: false,
            icon: AlertCircle
          },
          {
            id: 'admin-1',
            type: 'admin',
            title: 'Admin Baru Ditambahkan',
            message: 'Admin baru telah berhasil ditambahkan ke sistem',
            timestamp: '1 jam yang lalu',
            read: false,
            icon: Shield
          },
          ...baseNotifications
        ];

      case 'admin':
        return [
          {
            id: 'kurir-1',
            type: 'task',
            title: 'Request Kurir Baru',
            message: 'Permintaan penambahan kurir telah dikirim untuk approval',
            timestamp: '45 menit yang lalu',
            read: false,
            icon: User
          },
          {
            id: 'approval-2',
            type: 'approval',
            title: 'Request Disetujui',
            message: 'Permintaan edit data kurir telah disetujui',
            timestamp: '1 jam yang lalu',
            read: false,
            icon: Check
          },
          ...baseNotifications
        ];

      case 'pic':
        // Generate notifications from approval requests for PIC - MONITORING ONLY
        const picNotifications = allRequests
          .filter(request => 
            request.request_type.includes('kurir') || 
            request.request_type === 'create_admin' ||
            request.request_type === 'edit_admin' ||
            request.request_type === 'toggle_status' ||
            request.request_type === 'delete_admin'
          )
          .slice(0, 5) // Limit to recent 5
          .map(request => {
            const isApproved = request.status === 'approved';
            const isRejected = request.status === 'rejected';
            const isPending = request.status === 'pending';
            
            let title = '';
            let message = '';
            let icon = Users;
            
            if (request.request_type.includes('kurir')) {
              icon = User;
              if (request.request_type === 'import_kurir_data') {
                title = isPending ? 'Monitoring: Import Data Kurir Pending' : 
                       isApproved ? 'Monitoring: Import Data Kurir Disetujui' : 'Monitoring: Import Data Kurir Ditolak';
                message = `Admin ${request.requester_name} ${isPending ? 'mengajukan' : isApproved ? 'berhasil import' : 'gagal import'} ${request.request_data?.totalRecords || 0} data kurir`;
              } else {
                const actionMap: Record<string, string> = {
                  'create_kurir': 'penambahan kurir baru',
                  'edit_kurir': 'edit data kurir',
                  'toggle_kurir_status': 'perubahan status kurir',
                  'delete_kurir': 'penghapusan kurir'
                };
                const action = actionMap[request.request_type] || 'perubahan data kurir';
                title = isPending ? 'Monitoring: Request Kurir Pending' : 
                       isApproved ? 'Monitoring: Request Kurir Disetujui' : 'Monitoring: Request Kurir Ditolak';
                message = `Admin ${request.requester_name} ${isPending ? 'mengajukan' : isApproved ? 'berhasil melakukan' : 'gagal melakukan'} ${action}`;
              }
            } else {
              icon = Shield;
              const actionMap: Record<string, string> = {
                'create_admin': 'penambahan admin baru',
                'edit_admin': 'edit data admin',
                'toggle_status': 'perubahan status admin',
                'delete_admin': 'penghapusan admin'
              };
              const action = actionMap[request.request_type] || 'perubahan data admin';
              title = isPending ? 'Monitoring: Request Admin Pending' : 
                     isApproved ? 'Monitoring: Request Admin Disetujui' : 'Monitoring: Request Admin Ditolak';
              message = `Admin ${request.requester_name} ${isPending ? 'mengajukan' : isApproved ? 'berhasil melakukan' : 'gagal melakukan'} ${action}`;
            }
            
            return {
              id: request.id,
              type: isPending ? 'monitoring-pending' : isApproved ? 'monitoring-approved' : 'monitoring-rejected',
              title,
              message,
              timestamp: new Date(request.created_at).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              read: false,
              icon,
              isMonitoringOnly: true // Flag to indicate this is monitoring only
            };
          });

        return [
          ...picNotifications,
          {
            id: 'reminder-1',
            type: 'reminder',
            title: 'Reminder Monitoring Kurir',
            message: 'Periksa aktivitas kurir di area Anda hari ini',
            timestamp: '3 jam yang lalu',
            read: true,
            icon: Clock
          },
          ...baseNotifications
        ];

      case 'kurir':
        return [
          {
            id: 'task-1',
            type: 'task',
            title: 'Tugas Pengiriman Baru',
            message: '5 paket baru telah ditambahkan ke daftar pengiriman Anda',
            timestamp: '5 menit yang lalu',
            read: false,
            icon: Package
          },
          {
            id: 'reminder-2',
            type: 'reminder',
            title: 'Reminder Check-out',
            message: 'Jangan lupa untuk check-out sebelum jam 17:00',
            timestamp: '3 jam yang lalu',
            read: true,
            icon: Clock
          },
          ...baseNotifications
        ];

      default:
        return baseNotifications;
    }
  };

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const roleNotifications = getNotificationsForRole(user.role);
      setNotifications(roleNotifications);
    }
  }, [user, allRequests]);

  const handleMarkAsRead = (id: string) => {
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

  const handleDeleteNotification = (id: string) => {
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
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      case 'admin': return 'bg-indigo-100 text-indigo-600';
      case 'monitoring-pending': return 'bg-orange-100 text-orange-600';
      case 'monitoring-approved': return 'bg-green-100 text-green-600';
      case 'monitoring-rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getNotificationStats = () => {
    const taskCount = notifications.filter(n => n.type === 'task').length;
    const systemCount = notifications.filter(n => n.type === 'system').length;
    const approvalCount = notifications.filter(n => ['approval', 'pending', 'rejected', 'monitoring-pending', 'monitoring-approved', 'monitoring-rejected'].includes(n.type)).length;
    
    return { taskCount, systemCount, approvalCount };
  };

  const { taskCount, systemCount, approvalCount } = getNotificationStats();

  if (!user) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
            </p>
            <Badge variant="outline" className="mt-2 px-3 py-1 text-sm font-medium capitalize">
              {user.role.replace('-', ' ').toUpperCase()}
            </Badge>
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
              <CardTitle className="text-sm font-medium">
                {user.role === 'pic' ? 'Approval' : user.role === 'kurir' ? 'Tugas' : 'Approval'}
              </CardTitle>
              {user.role === 'pic' ? 
                <AlertCircle className="h-4 w-4 text-orange-600" /> :
                user.role === 'kurir' ? 
                <Package className="h-4 w-4 text-green-600" /> :
                <Shield className="h-4 w-4 text-green-600" />
              }
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.role === 'pic' ? approvalCount : user.role === 'kurir' ? taskCount : approvalCount}
              </div>
              <p className="text-xs text-muted-foreground">
                {user.role === 'pic' ? 'Monitor approval' : user.role === 'kurir' ? 'Notifikasi tugas' : 'Persetujuan'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sistem</CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemCount}</div>
              <p className="text-xs text-muted-foreground">Update sistem</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Daftar Notifikasi
              {user.role === 'pic' && (
                <Badge variant="secondary" className="ml-2">Monitoring Mode</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {user.role === 'pic' 
                ? 'Monitor aktivitas approval request terkait kurir dan admin (hanya melihat, tidak bisa approve/reject)'
                : 'Semua notifikasi terbaru untuk Anda'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading && (
                <div className="text-center py-4">
                  <p className="text-gray-500">Memuat notifikasi...</p>
                </div>
              )}
              
              {!loading && notifications.map((notification) => {
                const IconComponent = notification.icon;
                const isPicMonitoringOnly = user.role === 'pic' && notification.isMonitoringOnly;
                
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
                          {!notification.read && !isPicMonitoringOnly && (
                            <Badge variant="destructive" className="text-xs">Baru</Badge>
                          )}
                          {notification.type === 'monitoring-pending' && (
                            <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">Pending</Badge>
                          )}
                          {notification.type === 'monitoring-rejected' && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">Ditolak</Badge>
                          )}
                          {notification.type === 'monitoring-approved' && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-200">Disetujui</Badge>
                          )}
                          {isPicMonitoringOnly && (
                            <Badge variant="secondary" className="text-xs">Monitor</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!isPicMonitoringOnly && (
                        <>
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
                        </>
                      )}
                      
                      {isPicMonitoringOnly && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {!loading && notifications.length === 0 && (
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
