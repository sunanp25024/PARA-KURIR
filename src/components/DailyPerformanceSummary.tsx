
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Package, CheckCircle, AlertTriangle, Camera } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PerformanceData {
  totalPackages: number;
  delivered: number;
  pending: number;
  returned: number;
  successRate: number;
  leaderName?: string;
  returnPhotos: number;
}

const DailyPerformanceSummary = () => {
  const [performance, setPerformance] = useState<PerformanceData>({
    totalPackages: 0,
    delivered: 0,
    pending: 0,
    returned: 0,
    successRate: 0,
    returnPhotos: 0
  });

  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    // Calculate performance from localStorage data
    const dailyData = JSON.parse(localStorage.getItem('dailyPackageData') || '{"totalPackages": 0}');
    const delivered = 12; // Mock data - in real app, get from delivery tracking
    const returned = 3; // Mock data - in real app, get from pending returns
    const pending = dailyData.totalPackages - delivered - returned;
    const successRate = dailyData.totalPackages > 0 ? Math.round((delivered / dailyData.totalPackages) * 100) : 0;

    setPerformance({
      totalPackages: dailyData.totalPackages || 15, // Mock fallback
      delivered,
      pending: Math.max(0, pending),
      returned,
      successRate,
      leaderName: 'Pak Budi Santoso',
      returnPhotos: returned
    });
  }, []);

  const pieData = [
    { name: 'Terkirim', value: performance.delivered, color: '#10B981' },
    { name: 'Return', value: performance.returned, color: '#F59E0B' },
    { name: 'Pending', value: performance.pending, color: '#EF4444' }
  ];

  const barData = [
    { name: 'Target', value: performance.totalPackages },
    { name: 'Terkirim', value: performance.delivered },
    { name: 'Return', value: performance.returned }
  ];

  const getPerformanceGrade = (rate: number) => {
    if (rate >= 90) return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (rate >= 80) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (rate >= 70) return { grade: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { grade: 'D', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const gradeInfo = getPerformanceGrade(performance.successRate);

  if (!showSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Ringkasan Performa Harian
          </CardTitle>
          <CardDescription>Lihat hasil kerja Anda hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowSummary(true)}
            className="w-full"
            size="lg"
          >
            Tampilkan Hasil Performa Harian
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Header */}
      <Card className={`${gradeInfo.bgColor} border-2`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Performa Harian Anda</h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
              <p className="text-sm font-medium">Grade Performa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paket</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performance.totalPackages}</div>
            <p className="text-xs text-muted-foreground">Paket yang dibawa</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performance.delivered}</div>
            <p className="text-xs text-muted-foreground">Paket berhasil dikirim</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{performance.returned}</div>
            <p className="text-xs text-muted-foreground">Paket dikembalikan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{performance.successRate}%</div>
            <p className="text-xs text-muted-foreground">Tingkat keberhasilan</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Paket</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perbandingan Target vs Realisasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Serah Terima Return</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Leader Serah Terima</p>
                <p className="text-sm text-gray-600">{performance.leaderName}</p>
              </div>
              <Badge variant="outline">Verified</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Total Paket Return</p>
                <p className="text-sm text-gray-600">{performance.returned} paket dikembalikan</p>
              </div>
              <Badge variant="secondary">{performance.returned}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Foto Bukti Return</p>
                <p className="text-sm text-gray-600">{performance.returnPhotos} foto tersimpan</p>
              </div>
              <Camera className="h-5 w-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Harian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Target Pengiriman</span>
                <span className="text-sm">{performance.delivered}/{performance.totalPackages}</span>
              </div>
              <Progress value={(performance.delivered / performance.totalPackages) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm">{performance.successRate}%</span>
              </div>
              <Progress value={performance.successRate} className="h-2" />
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">Evaluasi Performa</h4>
              <div className="space-y-2 text-sm">
                {performance.successRate >= 90 && (
                  <p className="text-green-600">🌟 Excellent! Performa sangat baik hari ini!</p>
                )}
                {performance.successRate >= 80 && performance.successRate < 90 && (
                  <p className="text-blue-600">👍 Good job! Performa di atas rata-rata!</p>
                )}
                {performance.successRate >= 70 && performance.successRate < 80 && (
                  <p className="text-yellow-600">⚠️ Performa cukup baik, ada ruang untuk improvement</p>
                )}
                {performance.successRate < 70 && (
                  <p className="text-red-600">📈 Performa perlu ditingkatkan untuk hari besok</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badge */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Award className="h-12 w-12" />
            <div>
              <h3 className="text-xl font-bold">Performa Harian Selesai!</h3>
              <p className="text-blue-100">
                Anda telah menyelesaikan {performance.delivered} dari {performance.totalPackages} paket dengan success rate {performance.successRate}%. 
                {performance.successRate >= 80 ? ' Fantastic work!' : ' Keep it up tomorrow!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPerformanceSummary;
