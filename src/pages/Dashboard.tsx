
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle,
  BarChart3,
  MapPin,
  Calendar,
  Users,
  Settings,
  Bell,
  FileText,
  Shield,
  User
} from 'lucide-react';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import DailyPackageInput from '@/components/DailyPackageInput';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Dashboard untuk role kurir
  if (user.role === 'kurir') {
    return (
      <Layout>
        <WorkflowProvider>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Kurir</h1>
                <p className="text-muted-foreground">
                  Selamat datang, {user.name}
                </p>
              </div>
              <Button
                onClick={() => navigate('/kurir-mobile')}
                className="flex items-center gap-2"
              >
                <Truck className="h-4 w-4" />
                Mode Mobile
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paket Hari Ini</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">+2 dari kemarin</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">80% success rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Perlu tindak lanjut</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Performa bulan ini</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Fitur yang sering digunakan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => navigate('/kurir-mobile')} 
                    className="flex flex-col gap-2 h-20"
                  >
                    <Truck className="h-5 w-5" />
                    <span>Mode Kurir</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/attendance')}
                    className="flex flex-col gap-2 h-20"
                  >
                    <Clock className="h-5 w-5" />
                    <span>Absen</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/performance')}
                    className="flex flex-col gap-2 h-20"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Performa</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/profile')}
                    className="flex flex-col gap-2 h-20"
                  >
                    <User className="h-5 w-5" />
                    <span>Profil</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Paket Harian */}
            <Card>
              <CardHeader>
                <CardTitle>Input Paket Harian</CardTitle>
                <CardDescription>Masukkan data paket yang akan diantarkan hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyPackageInput onStepComplete={() => {}} />
              </CardContent>
            </Card>
          </div>
        </WorkflowProvider>
      </Layout>
    );
  }

  // Dashboard untuk role lainnya (master-admin, admin, pic)
  const getDashboardCards = () => {
    switch (user.role) {
      case 'master-admin':
        return [
          { title: 'Total Admin', value: '5', icon: Shield, description: 'Admin aktif' },
          { title: 'Total PIC', value: '12', icon: Users, description: 'PIC terdaftar' },
          { title: 'Total Kurir', value: '45', icon: User, description: 'Kurir aktif' },
          { title: 'Pending Approval', value: '3', icon: Bell, description: 'Menunggu persetujuan' }
        ];
      case 'admin':
        return [
          { title: 'Total PIC', value: '12', icon: Users, description: 'PIC terdaftar' },
          { title: 'Total Kurir', value: '45', icon: User, description: 'Kurir aktif' },
          { title: 'Paket Hari Ini', value: '156', icon: Package, description: 'Total paket' },
          { title: 'Status Approval', value: '2', icon: Bell, description: 'Menunggu review' }
        ];
      case 'pic':
        return [
          { title: 'Total Kurir', value: '8', icon: User, description: 'Kurir di area' },
          { title: 'Paket Hari Ini', value: '32', icon: Package, description: 'Total paket' },
          { title: 'Laporan Pending', value: '1', icon: FileText, description: 'Belum selesai' },
          { title: 'Notifikasi', value: '5', icon: Bell, description: 'Pesan baru' }
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'master-admin':
        return [
          { label: 'Manage Admin', path: '/manage-admin', icon: Shield },
          { label: 'Manage PIC', path: '/manage-pic', icon: Users },
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User },
          { label: 'Persetujuan', path: '/approval', icon: Bell }
        ];
      case 'admin':
        return [
          { label: 'Manage PIC', path: '/manage-pic', icon: Users },
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User },
          { label: 'Status Approval', path: '/approval-status', icon: Bell },
          { label: 'Notifikasi', path: '/notifications', icon: Bell }
        ];
      case 'pic':
        return [
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User },
          { label: 'Laporan', path: '/reports', icon: FileText },
          { label: 'Notifikasi', path: '/notifications', icon: Bell },
          { label: 'Settings', path: '/settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const dashboardCards = getDashboardCards();
  const quickActions = getQuickActions();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang, {user.name} ({user.role.replace('-', ' ').toUpperCase()})
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Fitur yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  onClick={() => navigate(action.path)}
                  className="flex flex-col gap-2 h-20"
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
