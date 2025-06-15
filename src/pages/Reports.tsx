
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, TrendingUp, Package } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { downloadFile, generateSampleData } from '@/utils/downloadUtils';

const Reports = () => {
  const handleDownloadReport = (reportType: string) => {
    const data = generateSampleData(reportType);
    const filename = `laporan_${reportType.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
    
    downloadFile(data, filename, 'text/csv;charset=utf-8;');
    
    toast({
      title: "Download Berhasil",
      description: `Laporan ${reportType} berhasil didownload sebagai ${filename}`,
    });
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-600">Analisis dan laporan kinerja tim kurir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDownloadReport('Harian')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Harian</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Pengiriman hari ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDownloadReport('Mingguan')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Mingguan</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">549</div>
              <p className="text-xs text-muted-foreground">Pengiriman minggu ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDownloadReport('Bulanan')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Bulanan</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,156</div>
              <p className="text-xs text-muted-foreground">Pengiriman bulan ini</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.9%</div>
              <p className="text-xs text-muted-foreground">Tingkat keberhasilan</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Laporan Tersedia
              </CardTitle>
              <CardDescription>Unduh laporan dalam berbagai format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">Laporan Kinerja Harian</p>
                  <p className="text-sm text-gray-600">Data pengiriman dan kinerja hari ini</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Harian')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">Laporan Kinerja Mingguan</p>
                  <p className="text-sm text-gray-600">Ringkasan kinerja 7 hari terakhir</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Mingguan')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">Laporan Kinerja Bulanan</p>
                  <p className="text-sm text-gray-600">Analisis lengkap kinerja bulan ini</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Bulanan')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium">Laporan Custom</p>
                  <p className="text-sm text-gray-600">Buat laporan dengan periode tertentu</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleCreateCustomReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Buat
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
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

        <Card>
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
                { name: 'Laporan Custom - Q4 2024', date: '1 minggu lalu', type: 'Custom' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.type)}>
                    <Download className="h-4 w-4 mr-2" />
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
