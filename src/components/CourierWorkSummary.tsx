
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Package, CheckCircle, Clock, AlertTriangle, TrendingUp, Users } from 'lucide-react';

interface WorkSummaryData {
  totalCouriers: number;
  activeCouriers: number;
  totalPackages: number;
  deliveredPackages: number;
  pendingPackages: number;
  returnedPackages: number;
  completionRate: number;
  onTimeDeliveryRate: number;
}

interface CourierPerformance {
  id: string;
  name: string;
  packagesDelivered: number;
  totalPackages: number;
  completionRate: number;
  status: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

const CourierWorkSummary = () => {
  const [summaryData, setSummaryData] = useState<WorkSummaryData>({
    totalCouriers: 0,
    activeCouriers: 0,
    totalPackages: 0,
    deliveredPackages: 0,
    pendingPackages: 0,
    returnedPackages: 0,
    completionRate: 0,
    onTimeDeliveryRate: 0
  });

  const [topPerformers, setTopPerformers] = useState<CourierPerformance[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockSummary: WorkSummaryData = {
      totalCouriers: 45,
      activeCouriers: 38,
      totalPackages: 1250,
      deliveredPackages: 1089,
      pendingPackages: 98,
      returnedPackages: 63,
      completionRate: 87.2,
      onTimeDeliveryRate: 92.5
    };

    const mockPerformers: CourierPerformance[] = [
      {
        id: '1',
        name: 'Budi Santoso',
        packagesDelivered: 45,
        totalPackages: 48,
        completionRate: 93.8,
        status: 'excellent'
      },
      {
        id: '2',
        name: 'Siti Aminah',
        packagesDelivered: 42,
        totalPackages: 45,
        completionRate: 93.3,
        status: 'excellent'
      },
      {
        id: '3',
        name: 'Ahmad Wijaya',
        packagesDelivered: 38,
        totalPackages: 42,
        completionRate: 90.5,
        status: 'good'
      },
      {
        id: '4',
        name: 'Rina Sari',
        packagesDelivered: 35,
        totalPackages: 40,
        completionRate: 87.5,
        status: 'good'
      },
      {
        id: '5',
        name: 'Dedi Kurniawan',
        packagesDelivered: 28,
        totalPackages: 35,
        completionRate: 80.0,
        status: 'average'
      }
    ];

    setSummaryData(mockSummary);
    setTopPerformers(mockPerformers);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'needs-improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Ringkasan Penyelesaian Kerja Kurir Hari Ini
          </CardTitle>
          <CardDescription>
            Performa keseluruhan kurir pada {new Date().toLocaleDateString('id-ID')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{summaryData.activeCouriers}</p>
              <p className="text-sm text-gray-600">Kurir Aktif</p>
              <p className="text-xs text-gray-500">dari {summaryData.totalCouriers} total</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{summaryData.totalPackages}</p>
              <p className="text-sm text-gray-600">Total Paket</p>
              <p className="text-xs text-gray-500">hari ini</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{summaryData.deliveredPackages}</p>
              <p className="text-sm text-gray-600">Terkirim</p>
              <p className="text-xs text-gray-500">{summaryData.completionRate.toFixed(1)}% completion</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{summaryData.pendingPackages}</p>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xs text-gray-500">dalam proses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Tingkat Penyelesaian</span>
                <span className="text-sm">{summaryData.completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={summaryData.completionRate} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Pengiriman Tepat Waktu</span>
                <span className="text-sm">{summaryData.onTimeDeliveryRate.toFixed(1)}%</span>
              </div>
              <Progress value={summaryData.onTimeDeliveryRate} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Performer Kurir Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={performer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-gray-600">
                      {performer.packagesDelivered}/{performer.totalPackages} paket
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-lg">{performer.completionRate.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">completion rate</p>
                  </div>
                  <Badge className={getStatusColor(performer.status)}>
                    {performer.status === 'excellent' ? 'Excellent' :
                     performer.status === 'good' ? 'Good' :
                     performer.status === 'average' ? 'Average' : 'Needs Improvement'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierWorkSummary;
