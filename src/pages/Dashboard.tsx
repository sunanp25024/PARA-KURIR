import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users,
  DollarSign,
  Bell,
  AlertCircle,
  Camera,
  Scan,
  Search,
  Filter,
  UserCheck,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  LogIn,
  LogOut
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, Pie, PieChart as RechartsePie, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Layout from '@/components/Layout';
import DailyPackageInput from '@/components/DailyPackageInput';
import ScanPackageManager from '@/components/ScanPackageManager';
import DeliveryTracking from '@/components/DeliveryTracking';
import PendingReturnPackages from '@/components/PendingReturnPackages';
import DailyPerformanceSummary from '@/components/DailyPerformanceSummary';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const renderDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'kurir':
        return <KurirDashboard />;
      case 'pic':
        return <PICDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'master-admin':
        return <MasterAdminDashboard />;
      default:
        return <div>Role tidak dikenali</div>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang, {user?.name}</p>
        </div>
        
        {renderDashboardContent()}
      </div>
    </Layout>
  );
};

// Chart configuration
const chartConfig = {
  terkirim: { label: "Terkirim", color: "#10b981" },
  pending: { label: "Pending", color: "#f59e0b" },
  return: { label: "Return", color: "#ef4444" },
  total: { label: "Total", color: "#3b82f6" },
};

// Sample data for charts
const dailyData = [
  { date: "Sen", terkirim: 120, pending: 15, return: 8 },
  { date: "Sel", terkirim: 135, pending: 12, return: 6 },
  { date: "Rab", terkirim: 142, pending: 18, return: 10 },
  { date: "Kam", terkirim: 128, pending: 20, return: 12 },
  { date: "Jum", terkirim: 155, pending: 8, return: 5 },
  { date: "Sab", terkirim: 98, pending: 25, return: 15 },
  { date: "Min", terkirim: 85, pending: 30, return: 18 },
];

const monthlyData = [
  { month: "Jan", total: 3500, terkirim: 3150, return: 350 },
  { month: "Feb", total: 3800, terkirim: 3420, return: 380 },
  { month: "Mar", total: 4200, terkirim: 3780, return: 420 },
  { month: "Apr", total: 3900, terkirim: 3510, return: 390 },
];

const performanceData = [
  { name: "Terkirim", value: 85, color: "#10b981" },
  { name: "Return", value: 10, color: "#ef4444" },
  { name: "Pending", value: 5, color: "#f59e0b" },
];

const FilterSection = ({ role }: { role: string }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Filter & Pencarian
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Wilayah" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="bandung">Bandung</SelectItem>
            <SelectItem value="surabaya">Surabaya</SelectItem>
            <SelectItem value="medan">Medan</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jaksel">Jakarta Selatan</SelectItem>
            <SelectItem value="jakut">Jakarta Utara</SelectItem>
            <SelectItem value="jaktim">Jakarta Timur</SelectItem>
            <SelectItem value="jakbar">Jakarta Barat</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="tidak-aktif">Tidak Aktif</SelectItem>
            <SelectItem value="cuti">Cuti</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Cari ID Kurir..." className="pl-10" />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Cari Nama..." className="pl-10" />
        </div>
        
        <Button className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Cari
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Real-time Attendance Activity Component
const RealtimeAttendanceActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-600" />
        Aktivitas Absensi Terkini
      </CardTitle>
      <CardDescription>Update check-in/out kurir. Termasuk lokasi kerja kurir.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { 
            name: 'Budi Santoso', 
            id: 'PISTEST2025',
            action: 'check-out',
            location: 'Jakarta Pusat Hub (Thamrin)',
            time: 'sekitar 6 jam',
            icon: LogOut,
            color: 'text-red-600'
          },
          { 
            name: 'Charlie Van Houten', 
            id: 'KURIR003',
            action: 'melaporkan keterlambatan',
            location: 'Surabaya Timur Hub (Cawang)',
            time: 'sekitar 2 jam yang lalu',
            icon: Clock,
            color: 'text-yellow-600'
          },
          { 
            name: 'Ani Yudhoyono', 
            id: 'KURIR002',
            action: 'check-in',
            location: 'Bandung Kota Hub (Kota)',
            time: 'sekitar 3 jam yang lalu',
            icon: LogIn,
            color: 'text-green-600'
          },
          { 
            name: 'Budi Santoso', 
            id: 'PISTEST2025',
            action: 'check-in',
            location: 'Jakarta Pusat Hub (Thamrin)',
            time: 'sekitar 3 jam yang lalu',
            icon: LogIn,
            color: 'text-green-600'
          }
        ].map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <IconComponent className={`h-5 w-5 mt-0.5 ${activity.color}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.name}</span>
                  <Badge variant="outline" className="text-xs">{activity.id}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.action} di {activity.location}
                </p>
                <p className="text-xs text-gray-500">
                  dalam waktu {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

// Courier Performance Summary Component
const CourierPerformanceSummary = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-green-600" />
        Ringkasan Penyelesaian Kerja Kurir
      </CardTitle>
      <CardDescription>Laporan ringkas setelah kurir menyelesaikan tugas harian.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          {
            name: 'Ani Yudhoyono',
            id: 'KURIR002',
            hub: 'Bandung Kota Hub (Kota)',
            delivered: 45,
            success: 40,
            return: 5,
            pending: 0,
            time: '7 jam'
          },
          {
            name: 'Budi Santoso',
            id: 'PISTEST2025',
            hub: 'Jakarta Pusat Hub (Thamrin)',
            delivered: 50,
            success: 48,
            return: 2,
            pending: 0,
            time: '6 jam'
          },
          {
            name: 'Dewi Persik',
            id: 'KURIR004',
            hub: 'Medan Barat Hub',
            delivered: 55,
            success: 55,
            return: 0,
            pending: 0,
            time: '17 jam yang lalu'
          }
        ].map((kurir, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <BarChart3 className="h-5 w-5 mt-0.5 text-blue-600" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{kurir.name}</span>
                <Badge variant="outline" className="text-xs">{kurir.id}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">Dari Hub: <span className="font-medium text-blue-600">{kurir.hub}</span></p>
              <div className="text-sm">
                <span>Menyelesaikan pekerjaan: </span>
                <span className="font-bold">{kurir.delivered}</span>
                <span> paket dibawa, </span>
                <span className="font-bold text-green-600">{kurir.success}</span>
                <span> terkirim, </span>
                <span className="font-bold text-red-600">{kurir.return}</span>
                <span> retur/pending.</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">dalam waktu sekitar {kurir.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const KurirDashboard = () => {
  const [todayStats] = useState({
    totalPackages: 15,
    delivered: 12,
    pending: 0,
    failed: 3,
    successRate: 80
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paket Hari Ini</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalPackages}</div>
            <p className="text-xs text-muted-foreground">Total paket input</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.delivered}</div>
            <p className="text-xs text-muted-foreground">Paket berhasil dikirim</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.failed}</div>
            <p className="text-xs text-muted-foreground">Paket dikembalikan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Sukses</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Tingkat keberhasilan</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Workflow Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Harian Kurir</CardTitle>
          <CardDescription>Kelola semua aktivitas pengiriman Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="input">Input Paket</TabsTrigger>
              <TabsTrigger value="scan">Scan & Kelola</TabsTrigger>
              <TabsTrigger value="delivery">Pengantaran</TabsTrigger>
              <TabsTrigger value="return">Pending/Return</TabsTrigger>
              <TabsTrigger value="summary">Performa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="mt-6">
              <DailyPackageInput />
            </TabsContent>
            
            <TabsContent value="scan" className="mt-6">
              <ScanPackageManager />
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-6">
              <DeliveryTracking />
            </TabsContent>
            
            <TabsContent value="return" className="mt-6">
              <PendingReturnPackages />
            </TabsContent>
            
            <TabsContent value="summary" className="mt-6">
              <DailyPerformanceSummary />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions for other roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Paket terkirim</p>
                <p className="text-xs text-gray-600">PKG123456789 - 10:30</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Camera className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Foto bukti diambil</p>
                <p className="text-xs text-gray-600">PKG987654321 - 09:15</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Scan className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Paket di-scan</p>
                <p className="text-xs text-gray-600">PKG555444333 - 08:45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips & Motivasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">💡 Tip Hari Ini</p>
                <p className="text-sm text-blue-600">
                  Pastikan selalu mengambil foto bukti pengiriman yang jelas dan verifikasi nama penerima
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">🎯 Target Harian</p>
                <p className="text-sm text-green-600">
                  Anda sudah mencapai {todayStats.successRate}% dari target. Keep going!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PICDashboard = () => {
  const [areaStats] = useState({
    activeKurir: 5,
    deliveredToday: 45,
    totalCOD: 2850000,
    successRate: 88,
    attendanceToday: 4,
    totalPackagesNational: 1250
  });

  return (
    <div className="space-y-6">
      <FilterSection role="pic" />
      
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paket Terkirim</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areaStats.totalPackagesNational}</div>
            <p className="text-xs text-muted-foreground">Nasional hari ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kurir Aktif</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areaStats.activeKurir}</div>
            <p className="text-xs text-muted-foreground">Dalam area</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absensi Hari Ini</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areaStats.attendanceToday}/{areaStats.activeKurir}</div>
            <p className="text-xs text-muted-foreground">Kurir hadir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total COD</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {areaStats.totalCOD.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Hari ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Sukses</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areaStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Area performance</p>
          </CardContent>
        </Card>
      </div>

      {/* New Real-time Monitoring Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealtimeAttendanceActivity />
        <CourierPerformanceSummary />
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Harian</TabsTrigger>
          <TabsTrigger value="weekly">Mingguan</TabsTrigger>
          <TabsTrigger value="monthly">Bulanan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performa Harian</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="terkirim" fill="#10b981" />
                      <Bar dataKey="pending" fill="#f59e0b" />
                      <Bar dataKey="return" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribusi Status Paket</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsePie>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsePie>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trend Mingguan</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="terkirim" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="return" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performa Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="#3b82f6" />
                    <Bar dataKey="terkirim" fill="#10b981" />
                    <Bar dataKey="return" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdminDashboard = () => {
  const [adminStats] = useState({
    totalKurir: 25,
    totalPIC: 8,
    deliveredToday: 850,
    pendingApproval: 3,
    successRate: 87,
    attendanceToday: 22,
    totalPackagesNational: 2150
  });

  return (
    <div className="space-y-6">
      <FilterSection role="admin" />
      
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paket Terkirim</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalPackagesNational}</div>
            <p className="text-xs text-muted-foreground">Nasional hari ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kurir</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalKurir}</div>
            <p className="text-xs text-muted-foreground">Kurir terdaftar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absensi Hari Ini</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.attendanceToday}/{adminStats.totalKurir}</div>
            <p className="text-xs text-muted-foreground">Kurir hadir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.pendingApproval}</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Sukses</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Keseluruhan</p>
          </CardContent>
        </Card>
      </div>

      {/* New Real-time Monitoring Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealtimeAttendanceActivity />
        <CourierPerformanceSummary />
      </div>

      {/* Charts similar to PIC but with broader scope */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Harian</TabsTrigger>
          <TabsTrigger value="weekly">Mingguan</TabsTrigger>
          <TabsTrigger value="monthly">Bulanan</TabsTrigger>
          <TabsTrigger value="area">Per Area</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performa Regional Harian</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="terkirim" fill="#10b981" />
                      <Bar dataKey="pending" fill="#f59e0b" />
                      <Bar dataKey="return" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribusi Status Regional</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsePie>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsePie>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="area" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performa Per Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { area: 'Jakarta Selatan', kurir: 8, delivered: 320, rate: 92 },
                  { area: 'Jakarta Timur', kurir: 6, delivered: 245, rate: 85 },
                  { area: 'Jakarta Pusat', kurir: 4, delivered: 180, rate: 88 },
                  { area: 'Jakarta Barat', kurir: 4, delivered: 165, rate: 82 },
                  { area: 'Jakarta Utara', kurir: 3, delivered: 125, rate: 78 }
                ].map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{area.area}</p>
                        <p className="text-sm text-gray-600">{area.kurir} kurir aktif</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{area.delivered} paket</p>
                      <Badge variant={area.rate >= 85 ? 'default' : 'secondary'}>
                        {area.rate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MasterAdminDashboard = () => {
  const [masterStats] = useState({
    totalAdmin: 3,
    totalPIC: 8,
    totalKurir: 45,
    deliveredToday: 2850,
    pendingApproval: 5,
    attendanceToday: 42,
    totalPackagesNational: 5200,
    successRateNational: 89
  });

  return (
    <div className="space-y-6">
      <FilterSection role="master-admin" />
      
      {/* National Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paket Nasional</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.totalPackagesNational}</div>
            <p className="text-xs text-muted-foreground">Terkirim hari ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.totalAdmin}</div>
            <p className="text-xs text-muted-foreground">Admin aktif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PIC</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.totalPIC}</div>
            <p className="text-xs text-muted-foreground">PIC aktif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kurir</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.totalKurir}</div>
            <p className="text-xs text-muted-foreground">Kurir aktif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absensi Nasional</CardTitle>
            <UserCheck className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.attendanceToday}/{masterStats.totalKurir}</div>
            <p className="text-xs text-muted-foreground">Kurir hadir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Persetujuan</CardTitle>
            <Bell className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masterStats.pendingApproval}</div>
            <p className="text-xs text-muted-foreground">Menunggu</p>
          </CardContent>
        </Card>
      </div>

      {/* New Real-time Monitoring Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealtimeAttendanceActivity />
        <CourierPerformanceSummary />
      </div>

      {/* National Performance Charts */}
      <Tabs defaultValue="national" className="w-full">
        <TabsList>
          <TabsTrigger value="national">Nasional</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="monthly">Bulanan</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="national" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performa Nasional Harian</CardTitle>
                <CardDescription>Data pengiriman seluruh Indonesia</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="terkirim" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="return" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribusi Status Nasional</CardTitle>
                <CardDescription>Persentase status pengiriman</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsePie>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsePie>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performa Per Wilayah</CardTitle>
              <CardDescription>Monitoring kinerja seluruh wilayah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: 'Jakarta', admin: 1, pic: 3, kurir: 25, delivered: 1250, rate: 89 },
                  { region: 'Bandung', admin: 1, pic: 2, kurir: 8, delivered: 420, rate: 85 },
                  { region: 'Surabaya', admin: 1, pic: 2, kurir: 8, delivered: 380, rate: 87 },
                  { region: 'Medan', admin: 0, pic: 1, kurir: 4, delivered: 180, rate: 82 }
                ].map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{region.region}</p>
                        <p className="text-sm text-gray-600">
                          {region.admin} Admin • {region.pic} PIC • {region.kurir} Kurir
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{region.delivered}</p>
                      <p className="text-sm text-gray-600">paket hari ini</p>
                      <Badge variant={region.rate >= 85 ? 'default' : 'secondary'} className="mt-1">
                        {region.rate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Monitoring & Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Persetujuan Menunggu</CardTitle>
            <CardDescription>Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Admin', action: 'Tambah Kurir Baru', requester: 'ADMIN001', priority: 'High' },
                { type: 'Admin', action: 'Update Area PIC', requester: 'ADMIN002', priority: 'Medium' },
                { type: 'PIC', action: 'Request Tambah Kurir', requester: 'PIC005', priority: 'Low' }
              ].map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div>
                    <p className="font-medium">{approval.type} - {approval.action}</p>
                    <p className="text-sm text-gray-600">Dari: {approval.requester}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={approval.priority === 'High' ? 'destructive' : approval.priority === 'Medium' ? 'secondary' : 'outline'}>
                      {approval.priority}
                    </Badge>
                    <Button size="sm" variant="outline">Tolak</Button>
                    <Button size="sm">Setuju</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time System Activity</CardTitle>
            <CardDescription>Live monitoring seluruh sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { activity: 'ADMIN002 menambahkan PIC baru', time: '2 menit lalu', type: 'admin' },
                { activity: '15 kurir check-in untuk shift pagi', time: '5 menit lalu', type: 'attendance' },
                { activity: 'PIC Jakarta Selatan update target harian', time: '8 menit lalu', type: 'update' },
                { activity: 'System backup completed successfully', time: '15 menit lalu', type: 'system' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
