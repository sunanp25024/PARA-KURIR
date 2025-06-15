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
  User,
  Camera,
  MessageSquare,
  Navigation,
  Workflow,
  Scan,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import DailyPackageInput from '@/components/DailyPackageInput';
import KurirWorkflow from '@/components/KurirWorkflow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Menunggu lokasi...');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    // Simulasi mendapatkan lokasi untuk kurir
    if (user?.role === 'kurir') {
      setTimeout(() => {
        setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
      }, 2000);
    }
  }, [user]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Status Offline" : "Status Online",
      description: isOnline ? "Anda sedang offline" : "Anda sedang online dan siap menerima pesanan",
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Dashboard khusus untuk kurir dengan bottom tab navigation
  if (user.role === 'kurir') {
    return (
      <Layout>
        <WorkflowProvider>
          <div className="flex flex-col h-screen bg-gray-50">
            {/* Header - Fixed at top */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900">Dashboard Kurir</h1>
                <p className="text-xs text-gray-500">INSAN Mobile Express</p>
              </div>
              <Button
                onClick={handleToggleOnline}
                variant={isOnline ? "destructive" : "default"}
                className="flex items-center gap-2 h-8 px-3"
                size="sm"
              >
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
                <span className="text-xs">{isOnline ? 'OFFLINE' : 'ONLINE'}</span>
              </Button>
            </div>

            {/* Status Card - Compact */}
            <div className="px-4 py-3 bg-white border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-700">Lokasi Saat Ini</p>
                    <p className="text-xs text-gray-500 truncate max-w-48">{currentLocation}</p>
                  </div>
                </div>
                <Badge variant={isOnline ? "default" : "secondary"} className="text-xs">
                  {isOnline ? 'Aktif' : 'Offline'}
                </Badge>
              </div>
            </div>

            {/* Stats Overview - Horizontal scroll */}
            <div className="px-4 py-3 bg-white border-b">
              <div className="flex gap-3 overflow-x-auto">
                <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg min-w-24">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Paket</span>
                  </div>
                  <div className="text-lg font-bold text-blue-900">15</div>
                </div>

                <div className="flex-shrink-0 bg-green-50 p-3 rounded-lg min-w-24">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-800">Selesai</span>
                  </div>
                  <div className="text-lg font-bold text-green-900">12</div>
                </div>

                <div className="flex-shrink-0 bg-orange-50 p-3 rounded-lg min-w-24">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-xs font-medium text-orange-800">Pending</span>
                  </div>
                  <div className="text-lg font-bold text-orange-900">3</div>
                </div>

                <div className="flex-shrink-0 bg-purple-50 p-3 rounded-lg min-w-24">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Rating</span>
                  </div>
                  <div className="text-lg font-bold text-purple-900">4.8</div>
                </div>
              </div>
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="input" className="h-full flex flex-col">
                {/* Tab Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <TabsContent value="input" className="mt-0 p-4">
                    <DailyPackageInput onStepComplete={() => {}} />
                  </TabsContent>

                  <TabsContent value="scan" className="mt-0 p-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Scan className="h-5 w-5" />
                          Scan & Kelola Paket
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Fitur scan akan tersedia setelah input paket selesai.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="delivery" className="mt-0 p-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Pengantaran
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Fitur pengantaran akan tersedia setelah scan selesai.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pending" className="mt-0 p-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Pending/Return
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Kelola paket yang pending atau perlu di-return.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance" className="mt-0 p-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Performa Harian
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Lihat ringkasan performa hari ini.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>

                {/* Bottom Tab Navigation - Fixed at bottom */}
                <div className="bg-white border-t shadow-lg">
                  <TabsList className="w-full h-16 grid grid-cols-5 bg-white rounded-none border-0">
                    <TabsTrigger 
                      value="input" 
                      className="flex flex-col gap-1 h-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Package className="h-5 w-5" />
                      <span className="text-xs">Input</span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="scan" 
                      className="flex flex-col gap-1 h-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Scan className="h-5 w-5" />
                      <span className="text-xs">Scan</span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="delivery" 
                      className="flex flex-col gap-1 h-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Truck className="h-5 w-5" />
                      <span className="text-xs">Kirim</span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="pending" 
                      className="flex flex-col gap-1 h-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <AlertTriangle className="h-5 w-5" />
                      <span className="text-xs">Pending</span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="performance" 
                      className="flex flex-col gap-1 h-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-xs">Performa</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </div>
        </WorkflowProvider>
      </Layout>
    );
  }

  // Dashboard untuk role lainnya (master-admin, admin, pic) tetap sama
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
