
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, TrendingUp, Package } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Reports = () => {
  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Unduhan Dimulai",
      description: `Laporan ${reportType} sedang diunduh.`,
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Harian</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Pengiriman hari ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Mingguan</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Pengiriman minggu ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Bulanan</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Pengiriman bulan ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
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
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Laporan Kinerja Harian</p>
                  <p className="text-sm text-gray-600">Data pengiriman dan kinerja hari ini</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Harian')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Laporan Kinerja Mingguan</p>
                  <p className="text-sm text-gray-600">Ringkasan kinerja 7 hari terakhir</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Mingguan')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Laporan Kinerja Bulanan</p>
                  <p className="text-sm text-gray-600">Analisis lengkap kinerja bulan ini</p>
                </div>
                <Button size="sm" onClick={() => handleDownloadReport('Bulanan')}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Laporan Custom</p>
                  <p className="text-sm text-gray-600">Buat laporan dengan periode tertentu</p>
                </div>
                <Button size="sm" variant="outline">
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
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Grafik akan muncul setelah ada data pengiriman</p>
                <Button variant="outline">
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
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada riwayat laporan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
