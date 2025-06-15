
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang, {user.name} ({user.role.replace('-', ' ').toUpperCase()})
            </p>
          </div>
          {user.role === 'master-admin' && (
            <Button onClick={handleSendNotification} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Kirim Notifikasi
            </Button>
          )}
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
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
                  className="pl-10"
                />
              </div>
              
              <Select value={wilayahFilter} onValueChange={setWilayahFilter}>
                <SelectTrigger>
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
                <SelectTrigger>
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
                <SelectTrigger>
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
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Terapkan Filter
              </Button>
            </div>
          </CardContent>
        </Card>

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

        {/* Download Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Laporan
            </CardTitle>
            <CardDescription>
              Download berbagai jenis laporan dalam format Excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" onClick={() => handleDownloadReport('Semua Laporan')} className="gap-2">
                <Download className="h-4 w-4" />
                Semua Laporan
              </Button>
              <Button variant="outline" onClick={() => handleDownloadReport('Laporan Absen')} className="gap-2">
                <Download className="h-4 w-4" />
                Laporan Absen
              </Button>
              <Button variant="outline" onClick={() => handleDownloadReport('Laporan Kinerja')} className="gap-2">
                <Download className="h-4 w-4" />
                Laporan Kinerja
              </Button>
              <Button variant="outline" onClick={() => handleDownloadReport('Laporan Pengiriman')} className="gap-2">
                <Download className="h-4 w-4" />
                Laporan Pengiriman
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Excel Import Section for Master Admin */}
        {user.role === 'master-admin' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
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
                <Button onClick={() => setShowExcelImport(true)} className="gap-2">
                  <FileText className="h-4 w-4" />
                  Buka Import Manager
                </Button>
              )}
            </CardContent>
          </Card>
        )}

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
