
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, User } from 'lucide-react';

interface CourierWorkDetail {
  id: string;
  kurirId: string;
  kurirName: string;
  hubLocation: string;
  hubCode: string;
  totalPackages: number;
  deliveredPackages: number;
  sentPackages: number;
  returnPendingPackages: number;
  hoursAgo: number;
  status: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

interface WorkSummaryStats {
  totalCouriers: number;
  activeCouriers: number;
  totalPackages: number;
  deliveredPackages: number;
  completionRate: number;
}

const CourierWorkSummary = () => {
  const [summaryStats, setSummaryStats] = useState<WorkSummaryStats>({
    totalCouriers: 0,
    activeCouriers: 0,
    totalPackages: 0,
    deliveredPackages: 0,
    completionRate: 0
  });

  const [courierDetails, setCourierDetails] = useState<CourierWorkDetail[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockStats: WorkSummaryStats = {
      totalCouriers: 45,
      activeCouriers: 38,
      totalPackages: 1250,
      deliveredPackages: 1089,
      completionRate: 87.2
    };

    const mockCourierDetails: CourierWorkDetail[] = [
      {
        id: '1',
        kurirId: 'KURIR002',
        kurirName: 'Ani Yudhoyono',
        hubLocation: 'Bandung Kota Hub (Kota)',
        hubCode: 'BDGKOTA',
        totalPackages: 85,
        deliveredPackages: 45,
        sentPackages: 40,
        returnPendingPackages: 5,
        hoursAgo: 3,
        status: 'excellent'
      },
      {
        id: '2',
        kurirId: 'PBTEST2025',
        kurirName: 'Budi Santoso',
        hubLocation: 'Jakarta Pusat Hub (Thamrin)',
        hubCode: 'JKTPST',
        totalPackages: 100,
        deliveredPackages: 50,
        sentPackages: 48,
        returnPendingPackages: 2,
        hoursAgo: 3,
        status: 'excellent'
      },
      {
        id: '3',
        kurirId: 'KURIR004',
        kurirName: 'Dewi Persik',
        hubLocation: 'Medan Barat Hub',
        hubCode: 'MDNBRT',
        totalPackages: 90,
        deliveredPackages: 55,
        sentPackages: 55,
        returnPendingPackages: 0,
        hoursAgo: 1,
        status: 'good'
      }
    ];

    setSummaryStats(mockStats);
    setCourierDetails(mockCourierDetails);
  }, []);

  const getPackageStatusColor = (type: 'delivered' | 'sent' | 'return') => {
    switch (type) {
      case 'delivered': return 'text-blue-600';
      case 'sent': return 'text-green-600';
      case 'return': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Summary Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <TrendingUp className="h-5 w-5" />
            Ringkasan Penyelesaian Kerja Kurir
          </CardTitle>
          <CardDescription>
            Laporan ringkas setelah kurir menyelesaikan tugas harian.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{summaryStats.activeCouriers}</p>
              <p className="text-sm text-gray-600">Kurir Aktif</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{summaryStats.totalPackages}</p>
              <p className="text-sm text-gray-600">Total Paket</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{summaryStats.deliveredPackages}</p>
              <p className="text-sm text-gray-600">Paket Selesai</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{summaryStats.completionRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Tingkat Penyelesaian</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Courier Details */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {courierDetails.map((courier) => (
              <div key={courier.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-blue-600">{courier.kurirName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {courier.kurirId}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Dari Hub: <span className="font-medium text-blue-600">{courier.hubLocation}</span>
                    </p>
                    
                    <div className="text-sm">
                      <span>Menyelesaikan pekerjaan: </span>
                      <span className="font-semibold">{courier.totalPackages}</span>
                      <span> paket dibawa, </span>
                      <span className={`font-semibold ${getPackageStatusColor('delivered')}`}>
                        {courier.deliveredPackages}
                      </span>
                      <span> terkirim, </span>
                      <span className={`font-semibold ${getPackageStatusColor('return')}`}>
                        {courier.returnPendingPackages}
                      </span>
                      <span> retur/pending.</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      sekitar {courier.hoursAgo} jam yang lalu
                    </p>
                  </div>
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
