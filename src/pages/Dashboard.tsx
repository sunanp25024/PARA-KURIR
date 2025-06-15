
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  TrendingUp,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import CourierSidebar from '@/components/CourierSidebar';
import CourierWorkflowMain from '@/components/CourierWorkflowMain';
import ExcelImportManager from '@/components/ExcelImportManager';
import CourierAttendanceActivity from '@/components/CourierAttendanceActivity';
import CourierWorkSummary from '@/components/CourierWorkSummary';
import CourierPerformanceCharts from '@/components/CourierPerformanceCharts';
import { toast } from '@/hooks/use-toast';

// Komponen khusus untuk courier dashboard dengan workflow context
const CourierDashboardContent = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CourierSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <CourierWorkflowMain />
        </main>
      </div>
    </SidebarProvider>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [wilayahFilter, setWilayahFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [lokasiKerjaFilter, setLokasiKerjaFilter] = useState<string>('all');
  const [showExcelImport, setShowExcelImport] = useState(false);
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

  // Dashboard khusus untuk kurir dengan workflow terintegrasi
  if (user.role === 'kurir') {
    return (
      <Layout>
        <WorkflowProvider>
          <CourierDashboardContent />
        </WorkflowProvider>
      </Layout>
    );
  }

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Download Laporan",
      description: `Laporan ${reportType} sedang dipersiapkan untuk download.`,
    });
    console.log(`Downloading ${reportType} report`);
  };

  const handleSendNotification = () => {
    navigate('/send-notification');
  };

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
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">
                  Selamat datang, <span className="font-semibold text-blue-600">{user.name}</span>
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {user.role.replace('-', ' ').toUpperCase()}
                </p>
              </div>
              {user.role === 'master-admin' && (
                <Button onClick={handleSendNotification} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4" />
                  Kirim Notifikasi
                </Button>
              )}
            </div>
          </div>

          {/* Filter Section */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Filter className="h-5 w-5 text-blue-600" />
                Filter & Pencarian Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari ID/Password..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                
                <Select value={wilayahFilter} onValueChange={setWilayahFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Filter Wilayah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Wilayah</SelectItem>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Filter Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Area</SelectItem>
                    <SelectItem value="utara">Utara</SelectItem>
                    <SelectItem value="selatan">Selatan</SelectItem>
                    <SelectItem value="timur">Timur</SelectItem>
                    <SelectItem value="barat">Barat</SelectItem>
                    <SelectItem value="pusat">Pusat</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={lokasiKerjaFilter} onValueChange={setLokasiKerjaFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Filter Lokasi Kerja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokasi</SelectItem>
                    <SelectItem value="kantor-pusat">Kantor Pusat</SelectItem>
                    <SelectItem value="cabang-1">Cabang 1</SelectItem>
                    <SelectItem value="cabang-2">Cabang 2</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Filter className="h-4 w-4" />
                  Terapkan Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dashboardCards.map((card, index) => (
              <Card key={index} className="shadow-sm border-0 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <card.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Courier Activity Section - Only for admin and master-admin */}
          {(user.role === 'admin' || user.role === 'master-admin') && (
            <div className="space-y-6">
              <CourierAttendanceActivity />
              <CourierWorkSummary />
              <CourierPerformanceCharts />
            </div>
          )}

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Download Reports Section */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <Download className="h-5 w-5 text-green-600" />
                  Download Laporan
                </CardTitle>
                <CardDescription>
                  Download berbagai jenis laporan dalam format Excel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Semua Laporan')} 
                    className="gap-2 justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4" />
                    Semua Laporan
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Absen')} 
                    className="gap-2 justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4" />
                    Laporan Absen
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Kinerja')} 
                    className="gap-2 justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4" />
                    Laporan Kinerja
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Pengiriman')} 
                    className="gap-2 justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4" />
                    Laporan Pengiriman
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Aksi Cepat</CardTitle>
                <CardDescription>Fitur yang sering digunakan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      onClick={() => navigate(action.path)}
                      className="flex flex-col gap-2 h-20 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs text-center font-medium">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Excel Import Section for Master Admin */}
          {user.role === 'master-admin' && (
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Import Data Excel
                </CardTitle>
                <CardDescription>
                  Upload file Excel untuk menambahkan data dalam jumlah besar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showExcelImport ? (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setShowExcelImport(false)}>
                        Tutup
                      </Button>
                    </div>
                    <ExcelImportManager />
                  </div>
                ) : (
                  <Button onClick={() => setShowExcelImport(true)} className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <FileText className="h-4 w-4" />
                    Buka Import Manager
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
