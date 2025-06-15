
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  Bell,
  Calendar,
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import DailyPackageInput from '@/components/DailyPackageInput';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard INSAN</h1>
            <p className="text-muted-foreground">
              Selamat datang di sistem manajemen kurir INSAN
            </p>
          </div>
          <Button onClick={() => handleNavigate('/kurir-mobile')}>
            Mode Kurir Mobile
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Paket Harian</TabsTrigger>
            <TabsTrigger value="performance">Performa</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Paket Hari Ini</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+20% dari kemarin</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">189</div>
                  <p className="text-xs text-muted-foreground">77% tingkat keberhasilan</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">43</div>
                  <p className="text-xs text-muted-foreground">Menunggu pengiriman ulang</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Return</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">13</div>
                  <p className="text-xs text-muted-foreground">Dikembalikan ke gudang</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Couriers */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Kurir Aktif Hari Ini</CardTitle>
                  <CardDescription>Status dan performa kurir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Ahmad Kurniawan", status: "online", packages: 42, completed: 38 },
                      { name: "Siti Nurhaliza", status: "online", packages: 35, completed: 32 },
                      { name: "Budi Santoso", status: "offline", packages: 28, completed: 25 },
                      { name: "Dewi Sartika", status: "online", packages: 31, completed: 29 }
                    ].map((courier) => (
                      <div key={courier.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${courier.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <div>
                            <p className="font-medium">{courier.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {courier.completed}/{courier.packages} paket selesai
                            </p>
                          </div>
                        </div>
                        <Badge variant={courier.status === 'online' ? 'default' : 'secondary'}>
                          {courier.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                  <CardDescription>Fitur yang sering digunakan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/manage-kurir')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Kelola Kurir
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/reports')}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Laporan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/performance')}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analitik Performa
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <WorkflowProvider>
              <DailyPackageInput />
            </WorkflowProvider>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performa Bulanan</CardTitle>
                  <CardDescription>Statistik pengiriman bulan ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Paket</span>
                      <span className="font-bold">7,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tingkat Keberhasilan</span>
                      <span className="font-bold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rata-rata Waktu Kirim</span>
                      <span className="font-bold">2.3 hari</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rating Kepuasan</span>
                      <span className="font-bold">4.7/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kurir Terbaik</CardTitle>
                  <CardDescription>Ranking kurir berdasarkan performa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Ahmad Kurniawan", score: 98, packages: 1240 },
                      { name: "Siti Nurhaliza", score: 96, packages: 1180 },
                      { name: "Dewi Sartika", score: 94, packages: 1050 }
                    ].map((courier, index) => (
                      <div key={courier.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{courier.name}</p>
                            <p className="text-sm text-muted-foreground">{courier.packages} paket</p>
                          </div>
                        </div>
                        <Badge variant="default">{courier.score}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Manajemen Kurir</CardTitle>
                  <CardDescription>Kelola data dan jadwal kurir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/manage-kurir')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Data Kurir
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/attendance')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Absensi
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Approval & Monitoring</CardTitle>
                  <CardDescription>Persetujuan dan pemantauan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/approval')}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approval Request
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/notifications')}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifikasi
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sistem & Laporan</CardTitle>
                  <CardDescription>Pengaturan dan pelaporan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/reports')}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Laporan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleNavigate('/settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan Sistem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Kurir Mobile Dashboard - simplified for mobile view
const KurirDashboard = () => {
  const [isOnline, setIsOnline] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState('Menunggu lokasi...');

  React.useEffect(() => {
    // Simulasi mendapatkan lokasi
    setTimeout(() => {
      setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
    }, 2000);
  }, []);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-md mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">INSAN MOBILE</h1>
              <p className="text-sm text-gray-600">Kurir: Ahmad Kurniawan</p>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className="flex items-center gap-2"
              size="sm"
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
              {isOnline ? 'OFFLINE' : 'ONLINE'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status & Location */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Lokasi Saat Ini:</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{currentLocation}</p>
          
          <div className="flex gap-2">
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? 'Siap Terima' : 'Tidak Aktif'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button className="flex flex-col gap-2 h-20">
            <Package className="h-5 w-5" />
            Scan Paket
          </Button>
          <Button variant="outline" className="flex flex-col gap-2 h-20">
            <Clock className="h-5 w-5" />
            Absen
          </Button>
          <Button variant="outline" className="flex flex-col gap-2 h-20">
            <Truck className="h-5 w-5" />
            Performa
          </Button>
          <Button variant="outline" className="flex flex-col gap-2 h-20">
            <MessageSquare className="h-5 w-5" />
            Pesan
          </Button>
        </CardContent>
      </Card>

      {/* Workflow Section with Provider */}
      <div className="mt-4">
        <WorkflowProvider>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Input Paket Harian</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyPackageInput />
            </CardContent>
          </Card>
        </WorkflowProvider>
      </div>
    </div>
  );
};

export default Dashboard;
