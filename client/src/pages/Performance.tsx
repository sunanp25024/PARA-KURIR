
import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Package, 
  Star, 
  Clock, 
  Target,
  Award,
  MapPin,
  Truck,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const Performance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Data performa
  const performanceData = {
    daily: {
      paketsDelivered: 15,
      successRate: 93.3,
      averageRating: 4.8,
      onTimeDelivery: 86.7,
      totalDistance: 45.2,
      workingHours: 8.5
    },
    weekly: {
      paketsDelivered: 89,
      successRate: 91.0,
      averageRating: 4.7,
      onTimeDelivery: 88.8,
      totalDistance: 312.5,
      workingHours: 42
    },
    monthly: {
      paketsDelivered: 387,
      successRate: 92.5,
      averageRating: 4.8,
      onTimeDelivery: 89.2,
      totalDistance: 1245.8,
      workingHours: 168
    }
  };

  const currentData = performanceData[selectedPeriod as keyof typeof performanceData];

  const achievements = [
    { title: 'Kurir Terbaik Bulan Ini', description: 'Performa tertinggi di area Jakarta Pusat', date: '2024-01-01', icon: Award, color: 'text-yellow-500' },
    { title: '1000+ Paket Terkirim', description: 'Mencapai milestone pengantaran', date: '2024-01-15', icon: Package, color: 'text-blue-500' },
    { title: 'Rating 5 Bintang', description: 'Mendapat rating sempurna dari pelanggan', date: '2024-01-18', icon: Star, color: 'text-green-500' },
    { title: 'Pengantaran Tepat Waktu', description: '95% pengantaran sesuai jadwal', date: '2024-01-20', icon: Clock, color: 'text-purple-500' }
  ];

  const recentFeedback = [
    { customer: 'Budi S.', rating: 5, comment: 'Kurir sangat ramah dan paket sampai dengan selamat', date: '2024-01-20' },
    { customer: 'Sari M.', rating: 5, comment: 'Pengantaran cepat dan profesional', date: '2024-01-19' },
    { customer: 'Ahmad R.', rating: 4, comment: 'Bagus, tapi agak terlambat dari jadwal', date: '2024-01-18' },
    { customer: 'Lisa K.', rating: 5, comment: 'Pelayanan excellent! Terima kasih', date: '2024-01-17' }
  ];

  const targets = [
    { label: 'Paket Bulanan', current: 387, target: 400, unit: 'paket' },
    { label: 'Rating Rata-rata', current: 4.8, target: 4.5, unit: 'bintang' },
    { label: 'Ketepatan Waktu', current: 89.2, target: 90, unit: '%' },
    { label: 'Jarak Tempuh', current: 1245.8, target: 1200, unit: 'km' }
  ];

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex h-screen bg-background">
      <CourierSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="space-y-6">
            {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performa Kurir</h1>
            <p className="text-muted-foreground">
              Pantau dan tingkatkan performa pengantaran Anda
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={selectedPeriod === 'daily' ? 'default' : 'outline'} 
                   className="cursor-pointer" 
                   onClick={() => setSelectedPeriod('daily')}>
              Harian
            </Badge>
            <Badge variant={selectedPeriod === 'weekly' ? 'default' : 'outline'} 
                   className="cursor-pointer" 
                   onClick={() => setSelectedPeriod('weekly')}>
              Mingguan
            </Badge>
            <Badge variant={selectedPeriod === 'monthly' ? 'default' : 'outline'} 
                   className="cursor-pointer" 
                   onClick={() => setSelectedPeriod('monthly')}>
              Bulanan
            </Badge>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paket Terkirim</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.paketsDelivered}</div>
              <p className="text-xs text-muted-foreground">
                +12% dari periode sebelumnya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Target: 90%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Rata-rata</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.averageRating}</div>
              <p className="text-xs text-muted-foreground">
                Dari 5 bintang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ketepatan Waktu</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.onTimeDelivery}%</div>
              <p className="text-xs text-muted-foreground">
                Pengantaran tepat waktu
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="targets">Target & KPI</TabsTrigger>
            <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Statistik Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Jarak Tempuh</span>
                    <span className="font-bold">{currentData.totalDistance} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jam Kerja</span>
                    <span className="font-bold">{currentData.workingHours} jam</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rata-rata per Hari</span>
                    <span className="font-bold">
                      {selectedPeriod === 'daily' ? currentData.paketsDelivered : 
                       selectedPeriod === 'weekly' ? Math.round(currentData.paketsDelivered / 7) :
                       Math.round(currentData.paketsDelivered / 30)} paket
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Efisiensi Rute</span>
                    <span className="font-bold">85%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tren Performa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Pengantaran Berhasil</span>
                      <span>{currentData.successRate}%</span>
                    </div>
                    <Progress value={currentData.successRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Kepuasan Pelanggan</span>
                      <span>{(currentData.averageRating / 5 * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={currentData.averageRating / 5 * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Ketepatan Waktu</span>
                      <span>{currentData.onTimeDelivery}%</span>
                    </div>
                    <Progress value={currentData.onTimeDelivery} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="targets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Target & KPI Bulanan
                </CardTitle>
                <CardDescription>
                  Pantau pencapaian target bulanan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {targets.map((target, index) => {
                    const percentage = Math.min((target.current / target.target) * 100, 100);
                    const isAchieved = target.current >= target.target;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{target.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {target.current} / {target.target} {target.unit}
                            </span>
                            {isAchieved && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={percentage} className={`h-2 ${getProgressColor(target.current, target.target)}`} />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{percentage.toFixed(1)}%</span>
                            <span>{isAchieved ? 'Target Tercapai!' : `Sisa ${(target.target - target.current).toFixed(1)} ${target.unit}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Pencapaian & Penghargaan
                </CardTitle>
                <CardDescription>
                  Badge dan pencapaian yang telah Anda raih
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full bg-white ${achievement.color}`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Feedback Pelanggan Terbaru
                </CardTitle>
                <CardDescription>
                  Ulasan dan komentar dari pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{feedback.customer}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">"{feedback.comment}"</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
