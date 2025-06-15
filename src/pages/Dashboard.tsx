
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
  Download,
  FolderDown,
  Archive,
  FileImage,
  ClipboardList,
  RefreshCw
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
import { downloadFile, generateSampleData, generateComprehensiveReport, downloadMultipleFiles, generateTemplateFiles } from '@/utils/downloadUtils';

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
  const [isDownloading, setIsDownloading] = useState(false);
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
    const data = generateSampleData(reportType);
    const filename = `laporan_${reportType.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    
    downloadFile(data, filename, 'text/csv;charset=utf-8;');
    
    toast({
      title: "Download Berhasil",
      description: `Laporan ${reportType} berhasil didownload sebagai ${filename}`,
    });
    console.log(`Downloaded ${reportType} report as ${filename}`);
  };

  const handleDownloadComprehensive = async () => {
    setIsDownloading(true);
    
    try {
      const files = generateComprehensiveReport();
      
      toast({
        title: "Memulai Download Komprehensif",
        description: `Mengunduh ${files.length} file laporan lengkap...`,
      });

      await downloadMultipleFiles(files);
      
      toast({
        title: "Download Lengkap Berhasil!",
        description: `${files.length} file laporan telah berhasil diunduh: Absensi, Kinerja, Pengiriman, Resi Terkirim, Resi Pending, dan Metadata Foto`,
      });
      
      console.log(`Downloaded comprehensive report with ${files.length} files`);
    } catch (error) {
      toast({
        title: "Download Gagal",
        description: "Terjadi kesalahan saat mengunduh laporan komprehensif",
        variant: "destructive"
      });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTemplates = async () => {
    try {
      const templates = generateTemplateFiles();
      
      toast({
        title: "Mengunduh Template",
        description: `Mengunduh ${templates.length} template file...`,
      });

      await downloadMultipleFiles(templates);
      
      toast({
        title: "Template Berhasil Diunduh!",
        description: `${templates.length} template telah diunduh: Data Kurir, Input Paket, Absensi, dan Laporan Kinerja`,
      });
      
      console.log(`Downloaded ${templates.length} template files`);
    } catch (error) {
      toast({
        title: "Download Template Gagal",
        description: "Terjadi kesalahan saat mengunduh template",
        variant: "destructive"
      });
      console.error('Template download error:', error);
    }
  };

  const handleSendNotification = () => {
    navigate('/send-notification');
  };

  // Dashboard untuk role lainnya (master-admin, admin, pic) tetap sama
  const getDashboardCards = () => {
    switch (user.role) {
      case 'master-admin':
        return [
          { title: 'Total Admin', value: '5', icon: Shield, description: 'Admin aktif', color: 'bg-blue-50 text-blue-600' },
          { title: 'Total PIC', value: '12', icon: Users, description: 'PIC terdaftar', color: 'bg-green-50 text-green-600' },
          { title: 'Total Kurir', value: '45', icon: User, description: 'Kurir aktif', color: 'bg-purple-50 text-purple-600' },
          { title: 'Pending Approval', value: '3', icon: Bell, description: 'Menunggu persetujuan', color: 'bg-orange-50 text-orange-600' }
        ];
      case 'admin':
        return [
          { title: 'Total PIC', value: '12', icon: Users, description: 'PIC terdaftar', color: 'bg-green-50 text-green-600' },
          { title: 'Total Kurir', value: '45', icon: User, description: 'Kurir aktif', color: 'bg-purple-50 text-purple-600' },
          { title: 'Paket Hari Ini', value: '156', icon: Package, description: 'Total paket', color: 'bg-blue-50 text-blue-600' },
          { title: 'Status Approval', value: '2', icon: Bell, description: 'Menunggu review', color: 'bg-orange-50 text-orange-600' }
        ];
      case 'pic':
        return [
          { title: 'Total Kurir', value: '8', icon: User, description: 'Kurir di area', color: 'bg-purple-50 text-purple-600' },
          { title: 'Paket Hari Ini', value: '32', icon: Package, description: 'Total paket', color: 'bg-blue-50 text-blue-600' },
          { title: 'Laporan Pending', value: '1', icon: FileText, description: 'Belum selesai', color: 'bg-yellow-50 text-yellow-600' },
          { title: 'Notifikasi', value: '5', icon: Bell, description: 'Pesan baru', color: 'bg-red-50 text-red-600' }
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'master-admin':
        return [
          { label: 'Manage Admin', path: '/manage-admin', icon: Shield, color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' },
          { label: 'Manage PIC', path: '/manage-pic', icon: Users, color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' },
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User, color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200' },
          { label: 'Persetujuan', path: '/approval', icon: Bell, color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' }
        ];
      case 'admin':
        return [
          { label: 'Manage PIC', path: '/manage-pic', icon: Users, color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' },
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User, color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200' },
          { label: 'Status Approval', path: '/approval-status', icon: Bell, color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' },
          { label: 'Notifikasi', path: '/notifications', icon: Bell, color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' }
        ];
      case 'pic':
        return [
          { label: 'Manage Kurir', path: '/manage-kurir', icon: User, color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200' },
          { label: 'Laporan', path: '/reports', icon: FileText, color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' },
          { label: 'Notifikasi', path: '/notifications', icon: Bell, color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' },
          { label: 'Settings', path: '/settings', icon: Settings, color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200' }
        ];
      default:
        return [];
    }
  };

  const dashboardCards = getDashboardCards();
  const quickActions = getQuickActions();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-lg">
                  Selamat datang, <span className="font-semibold text-blue-600">{user.name}</span>
                </p>
                <Badge variant="outline" className="mt-2 px-3 py-1 text-sm font-medium capitalize border-blue-200 text-blue-700">
                  {user.role.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              {user.role === 'master-admin' && (
                <Button onClick={handleSendNotification} size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
                  <MessageSquare className="h-5 w-5" />
                  Kirim Notifikasi
                </Button>
              )}
            </div>
          </div>

          {/* Filter Section */}
          <Card className="shadow-md border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Filter className="h-5 w-5 text-blue-600" />
                </div>
                Filter & Pencarian Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Cari ID/Password..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                
                <Select value={wilayahFilter} onValueChange={setWilayahFilter}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500">
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
                  <SelectTrigger className="border-slate-200 focus:border-blue-500">
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
                  <SelectTrigger className="border-slate-200 focus:border-blue-500">
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
                
                <Button 
                  onClick={() => {
                    toast({
                      title: "Filter Diterapkan",
                      description: `Filter: Wilayah=${wilayahFilter}, Area=${areaFilter}, Lokasi=${lokasiKerjaFilter}`,
                    });
                  }}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Filter className="h-4 w-4" />
                  Terapkan Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dashboardCards.map((card, index) => (
              <Card key={index} className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  toast({
                    title: card.title,
                    description: `Menampilkan detail ${card.title}: ${card.value}`,
                  });
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">{card.title}</CardTitle>
                  <div className={`p-3 rounded-xl ${card.color} group-hover:scale-110 transition-transform`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{card.value}</div>
                  <p className="text-sm text-slate-500">{card.description}</p>
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

          {/* Enhanced Download & Action Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Comprehensive Download Section */}
            <Card className="lg:col-span-2 shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FolderDown className="h-6 w-6 text-green-600" />
                  </div>
                  Download Laporan Lengkap
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Download laporan komprehensif dengan semua data yang diperlukan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Download Button */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800 mb-2">Download Semua Laporan</h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Unduh paket lengkap berisi: Absensi, Kinerja, Pengiriman, Foto Bukti, Resi Terkirim & Pending
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">Laporan Absensi</Badge>
                        <Badge variant="secondary" className="text-xs">Laporan Kinerja</Badge>
                        <Badge variant="secondary" className="text-xs">Laporan Pengiriman</Badge>
                        <Badge variant="secondary" className="text-xs">Foto Bukti</Badge>
                        <Badge variant="secondary" className="text-xs">Resi Terkirim</Badge>
                        <Badge variant="secondary" className="text-xs">Resi Pending</Badge>
                      </div>
                    </div>
                    <Archive className="h-12 w-12 text-green-600 opacity-20" />
                  </div>
                  <Button 
                    onClick={handleDownloadComprehensive}
                    disabled={isDownloading}
                    size="lg"
                    className="w-full gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-md"
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Mengunduh...
                      </>
                    ) : (
                      <>
                        <FolderDown className="h-5 w-5" />
                        Download Semua (6 File)
                      </>
                    )}
                  </Button>
                </div>

                {/* Individual Downloads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Absen')} 
                    className="gap-2 justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <ClipboardList className="h-4 w-4" />
                    Laporan Absen
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Kinerja')} 
                    className="gap-2 justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Laporan Kinerja
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Laporan Pengiriman')} 
                    className="gap-2 justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Package className="h-4 w-4" />
                    Laporan Pengiriman
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport('Semua Laporan')} 
                    className="gap-2 justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    <FileText className="h-4 w-4" />
                    Ringkasan Umum
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template & Quick Actions */}
            <div className="space-y-6">
              {/* Template Download */}
              <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg text-slate-800">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <FileImage className="h-5 w-5 text-yellow-600" />
                    </div>
                    Template Import
                  </CardTitle>
                  <CardDescription>Template untuk input data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleDownloadTemplates}
                    variant="outline"
                    className="w-full gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Download className="h-4 w-4" />
                    Download Template (4 File)
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">Aksi Cepat</CardTitle>
                  <CardDescription>Fitur yang sering digunakan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        onClick={() => {
                          navigate(action.path);
                          toast({
                            title: "Navigasi",
                            description: `Menuju ke ${action.label}`,
                          });
                        }}
                        className={`flex flex-col gap-2 h-20 border ${action.color} transition-all duration-200 hover:shadow-md`}
                      >
                        <action.icon className="h-5 w-5" />
                        <span className="text-xs text-center font-medium">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Excel Import Section for Master Admin */}
          {user.role === 'master-admin' && (
            <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  Import Data Excel
                </CardTitle>
                <CardDescription className="text-slate-600">
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
                  <Button 
                    onClick={() => setShowExcelImport(true)} 
                    size="lg"
                    className="gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md"
                  >
                    <FileText className="h-5 w-5" />
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
