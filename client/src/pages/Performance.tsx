import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Package, 
  Clock, 
  Star, 
  Target, 
  Award,
  MapPin,
  Truck,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const Performance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Data performa
  const performanceData = {
    daily: {
      totalPackages: 45,
      delivered: 42,
      pending: 2,
      returned: 1,
      successRate: 93.3,
      avgDeliveryTime: '28 menit'
    },
    weekly: {
      totalPackages: 285,
      delivered: 270,
      pending: 10,
      returned: 5,
      successRate: 94.7,
      avgDeliveryTime: '25 menit'
    },
    monthly: {
      totalPackages: 1250,
      delivered: 1180,
      pending: 45,
      returned: 25,
      successRate: 94.4,
      avgDeliveryTime: '26 menit'
    }
  };

  const currentData = performanceData[selectedPeriod as keyof typeof performanceData];

  const achievements = [
    { icon: Star, title: 'Kurir Terbaik', description: 'Bulan Juni 2024', color: 'text-yellow-500' },
    { icon: Target, title: 'Target Tercapai', description: '95% Success Rate', color: 'text-green-500' },
    { icon: Award, title: 'Pengantaran Cepat', description: 'Rata-rata 26 menit', color: 'text-blue-500' },
  ];

  const weeklyTrends = [
    { day: 'Sen', packages: 45, success: 95 },
    { day: 'Sel', packages: 52, success: 98 },
    { day: 'Rab', packages: 38, success: 92 },
    { day: 'Kam', packages: 60, success: 97 },
    { day: 'Jum', packages: 55, success: 94 },
    { day: 'Sab', packages: 35, success: 91 },
  ];

  const feedback = [
    {
      customer: 'Ibu Sari',
      rating: 5,
      comment: 'Pengantaran sangat cepat dan kurir ramah!',
      date: '16 Jun 2024'
    },
    {
      customer: 'Pak Ahmad',
      rating: 4,
      comment: 'Barang sampai dengan selamat, terima kasih.',
      date: '15 Jun 2024'
    }
  ];

  const getSuccessColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 90) return 'bg-blue-500';
    if (percentage >= 80) return 'bg-yellow-500';
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
                <Badge 
                  variant={selectedPeriod === 'daily' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setSelectedPeriod('daily')}
                >
                  Harian
                </Badge>
                <Badge 
                  variant={selectedPeriod === 'weekly' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setSelectedPeriod('weekly')}
                >
                  Mingguan
                </Badge>
                <Badge 
                  variant={selectedPeriod === 'monthly' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setSelectedPeriod('monthly')}
                >
                  Bulanan
                </Badge>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">Total Paket</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{currentData.totalPackages}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedPeriod === 'daily' ? 'Hari ini' : 
                     selectedPeriod === 'weekly' ? 'Minggu ini' : 'Bulan ini'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Terkirim</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{currentData.delivered}</div>
                  <Progress value={(currentData.delivered / currentData.totalPackages) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{currentData.successRate}%</div>
                  <div className={`w-full h-2 rounded-full mt-2 ${getSuccessColor(currentData.successRate)}`} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium">Avg. Delivery</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{currentData.avgDeliveryTime}</div>
                  <p className="text-xs text-muted-foreground mt-1">Per paket</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="trends" className="space-y-6">
              <TabsList>
                <TabsTrigger value="trends">Tren Mingguan</TabsTrigger>
                <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tren Performa Mingguan</CardTitle>
                    <CardDescription>
                      Grafik pengantaran dan tingkat keberhasilan per hari
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyTrends.map((day, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 text-sm font-medium">{day.day}</div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{day.packages} paket</span>
                              <span className="text-muted-foreground">{day.success}% berhasil</span>
                            </div>
                            <Progress value={day.success} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        <achievement.icon className={`h-12 w-12 mx-auto mb-4 ${achievement.color}`} />
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback Pelanggan</CardTitle>
                    <CardDescription>
                      Ulasan dan rating dari pelanggan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {feedback.map((review, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.customer}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">"{review.comment}"</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{review.date}</span>
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