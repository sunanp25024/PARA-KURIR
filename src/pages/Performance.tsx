
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Package, CheckCircle, Clock, Star, Target, Award } from 'lucide-react';
import Layout from '@/components/Layout';

const Performance = () => {
  const monthlyStats = {
    totalDeliveries: 245,
    successful: 220,
    failed: 25,
    averageTime: 35,
    rating: 4.2,
    targetAchievement: 88
  };

  const weeklyData = [
    { day: 'Sen', delivered: 8, target: 10 },
    { day: 'Sel', delivered: 12, target: 10 },
    { day: 'Rab', delivered: 9, target: 10 },
    { day: 'Kam', delivered: 11, target: 10 },
    { day: 'Jum', delivered: 7, target: 10 },
    { day: 'Sab', delivered: 6, target: 8 },
    { day: 'Min', delivered: 4, target: 6 }
  ];

  const achievements = [
    { title: 'Pengiriman Terbanyak', description: '15 paket dalam sehari', date: '2025-06-10', icon: Package },
    { title: 'Perfect Rating', description: '5.0 bintang 7 hari berturut', date: '2025-06-08', icon: Star },
    { title: 'Speed Demon', description: 'Rata-rata 25 menit per pengiriman', date: '2025-06-05', icon: Clock }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performa</h1>
          <p className="text-gray-600">Analisis kinerja dan pencapaian Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengiriman</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.totalDeliveries}</div>
              <p className="text-xs text-muted-foreground">Bulan ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berhasil Dikirim</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.successful}</div>
              <p className="text-xs text-muted-foreground">
                Sukses rate: {Math.round((monthlyStats.successful / monthlyStats.totalDeliveries) * 100)}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Waktu</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.averageTime} min</div>
              <p className="text-xs text-muted-foreground">Per pengiriman</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.rating}</div>
              <p className="text-xs text-muted-foreground">Dari 5 bintang</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performa Mingguan
              </CardTitle>
              <CardDescription>7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{day.delivered}/{day.target}</span>
                        <span>{Math.round((day.delivered / day.target) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(day.delivered / day.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target & Pencapaian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Target Pengiriman Harian</p>
                  <p className="text-sm text-gray-600">10 paket/hari</p>
                </div>
                <Badge variant="default">8/10</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Target Success Rate</p>
                  <p className="text-sm text-gray-600">95%</p>
                  <Progress value={90} className="h-2 mt-2" />
                </div>
                <Badge variant="default">90%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Target Rating</p>
                  <p className="text-sm text-gray-600">4.5 bintang</p>
                  <Progress value={93} className="h-2 mt-2" />
                </div>
                <Badge variant="secondary">4.2</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Target Pencapaian Bulanan</p>
                  <p className="text-sm text-gray-600">250 paket/bulan</p>
                  <Progress value={monthlyStats.targetAchievement} className="h-2 mt-2" />
                </div>
                <Badge variant="default">{monthlyStats.targetAchievement}%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Pencapaian Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Pelanggan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                  <p className="text-sm text-gray-600">"Kurir sangat ramah dan paket sampai dengan cepat!"</p>
                  <p className="text-xs text-gray-500 mt-1">- Siti Nurhaliza, 2025-06-13</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1,2,3,4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium">4.0</span>
                  </div>
                  <p className="text-sm text-gray-600">"Pengiriman tepat waktu, good job!"</p>
                  <p className="text-xs text-gray-500 mt-1">- Ahmad Kurniawan, 2025-06-12</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                  <p className="text-sm text-gray-600">"Pelayanan excellent, terima kasih!"</p>
                  <p className="text-xs text-gray-500 mt-1">- Budi Santoso, 2025-06-11</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Performance;
