
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, Package, FolderDown, Archive, ClipboardList, BarChart3, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { downloadFile, generateSampleData, generateComprehensiveReport, downloadMultipleFiles, generateTemplateFiles } from '@/utils/downloadUtils';

const Reports = () => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadReport = (reportType: string) => {
    const data = generateSampleData(reportType);
    const filename = `laporan_${reportType.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
    
    downloadFile(data, filename, 'text/csv;charset=utf-8;');
    
    toast({
      title: "Download Berhasil",
      description: `Laporan ${reportType} berhasil didownload sebagai ${filename}`,
    });
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
        description: `${files.length} file laporan telah berhasil diunduh`,
      });
    } catch (error) {
      toast({
        title: "Download Gagal",
        description: "Terjadi kesalahan saat mengunduh laporan komprehensif",
        variant: "destructive"
      });
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
        description: `${templates.length} template telah diunduh`,
      });
    } catch (error) {
      toast({
        title: "Download Template Gagal",
        description: "Terjadi kesalahan saat mengunduh template",
        variant: "destructive"
      });
    }
  };

  const handleCreateCustomReport = () => {
    toast({
      title: "Fitur Custom Report",
      description: "Membuat laporan custom dengan periode tertentu",
    });
    // Simulate creating a custom report
    setTimeout(() => {
      const data = generateSampleData('Custom');
      const filename = `laporan_custom_${new Date().toISOString().split('T')[0]}.csv`;
      downloadFile(data, filename, 'text/csv;charset=utf-8;');
      
      toast({
        title: "Laporan Custom Selesai",
        description: `Laporan custom berhasil dibuat dan didownload sebagai ${filename}`,
      });
    }, 2000);
  };

  const handleSelectPeriod = () => {
    toast({
      title: "Pilih Periode",
      description: "Fitur pemilihan periode grafik akan segera tersedia",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200/60">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Laporan</h1>
          <p className="text-slate-600 text-lg">Analisis dan laporan kinerja tim kurir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-slate-200/60" onClick={() => handleDownloadReport('Harian')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Harian</CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Pengiriman hari ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-slate-200/60" onClick={() => handleDownloadReport('Mingguan')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Mingguan</CardTitle>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">549</div>
              <p className="text-xs text-muted-foreground">Pengiriman minggu ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-slate-200/60" onClick={() => handleDownloadReport('Bulanan')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Bulanan</CardTitle>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,156</div>
              <p className="text-xs text-muted-foreground">Pengiriman bulan ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-slate-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.9%</div>
              <p className="text-xs text-muted-foreground">Tingkat keberhasilan</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Comprehensive Download Section */}
        <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
              <div className="p-2 bg-green-50 rounded-lg">
                <FolderDown className="h-6 w-6 text-green-600" />
              </div>
              Download Laporan Komprehensif
            </CardTitle>
            <CardDescription className="text-slate-600">
              Download paket lengkap semua laporan dan dokumentasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Comprehensive Download */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-800 mb-3">Download Semua Laporan</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Paket lengkap berisi semua laporan dan dokumentasi yang diperlukan
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs justify-center">📋 Laporan Absensi</Badge>
                    <Badge variant="secondary" className="text-xs justify-center">📊 Laporan Kinerja</Badge>
                    <Badge variant="secondary" className="text-xs justify-center">📦 Laporan Pengiriman</Badge>
                    <Badge variant="secondary" className="text-xs justify-center">📸 Foto Bukti</Badge>
                    <Badge variant="secondary" className="text-xs justify-center">✅ Resi Terkirim</Badge>
                    <Badge variant="secondary" className="text-xs justify-center">⏳ Resi Pending</Badge>
                  </div>
                </div>
                <Archive className="h-16 w-16 text-green-600 opacity-20 ml-4" />
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
                    Mengunduh 6 File...
                  </>
                ) : (
                  <>
                    <FolderDown className="h-5 w-5" />
                    Download Semua (6 File Lengkap)
                  </>
                )}
              </Button>
            </div>

            {/* Template Download */}
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Template Import Data</h4>
                  <p className="text-sm text-slate-600">Template untuk input data kurir, paket, dan absensi</p>
                </div>
                <Button 
                  onClick={handleDownloadTemplates}
                  variant="outline"
                  className="gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                  <Download className="h-4 w-4" />
                  Template (4 File)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Laporan Individual
              </CardTitle>
              <CardDescription>Unduh laporan terpisah sesuai kebutuhan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Laporan Kinerja Harian', desc: 'Data pengiriman dan kinerja hari ini', type: 'Harian', icon: ClipboardList, color: 'border-blue-200 text-blue-700 hover:bg-blue-50' },
                { title: 'Laporan Kinerja Mingguan', desc: 'Ringkasan kinerja 7 hari terakhir', type: 'Mingguan', icon: TrendingUp, color: 'border-green-200 text-green-700 hover:bg-green-50' },
                { title: 'Laporan Kinerja Bulanan', desc: 'Analisis lengkap kinerja bulan ini', type: 'Bulanan', icon: BarChart3, color: 'border-purple-200 text-purple-700 hover:bg-purple-50' },
                { title: 'Laporan Custom', desc: 'Buat laporan dengan periode tertentu', type: 'Custom', icon: FileText, color: 'border-orange-200 text-orange-700 hover:bg-orange-50' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <report.icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-gray-600">{report.desc}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={report.type === 'Custom' ? handleCreateCustomReport : () => handleDownloadReport(report.type)}
                    className={`gap-2 ${report.color}`}
                  >
                    <Download className="h-4 w-4" />
                    {report.type === 'Custom' ? 'Buat' : 'Unduh'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Grafik Performa</CardTitle>
              <CardDescription>Visualisasi data kinerja tim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-700 mb-4 font-medium">Grafik Performa Aktif</p>
                <p className="text-sm text-gray-600 mb-4">Menampilkan data real-time kinerja kurir</p>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">92.9%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">85</div>
                      <div className="text-xs text-gray-600">Hari Ini</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">45</div>
                      <div className="text-xs text-gray-600">Kurir Aktif</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSelectPeriod}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Pilih Periode
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md border-slate-200/60 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Riwayat Laporan</CardTitle>
            <CardDescription>Laporan yang telah dibuat sebelumnya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Laporan Harian - 15 Desember 2024', date: '2 jam lalu', type: 'Harian' },
                { name: 'Laporan Mingguan - Minggu ke-50', date: '1 hari lalu', type: 'Mingguan' },
                { name: 'Laporan Bulanan - November 2024', date: '3 hari lalu', type: 'Bulanan' },
                { name: 'Download Komprehensif - Semua Data', date: '3 hari lalu', type: 'Comprehensive' },
                { name: 'Laporan Custom - Q4 2024', date: '1 minggu lalu', type: 'Custom' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={report.type === 'Comprehensive' ? handleDownloadComprehensive : () => handleDownloadReport(report.type)}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Ulang
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
