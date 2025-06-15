
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Users, Package, CheckCircle } from 'lucide-react';

interface WorkSummaryStatsProps {
  totalCouriers: number;
  activeCouriers: number;
  totalPackages: number;
  deliveredPackages: number;
  completionRate: number;
}

const WorkSummaryStats = ({ 
  totalCouriers, 
  activeCouriers, 
  totalPackages, 
  deliveredPackages, 
  completionRate 
}: WorkSummaryStatsProps) => {
  return (
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
            <p className="text-2xl font-bold">{activeCouriers}</p>
            <p className="text-sm text-gray-600">Kurir Aktif</p>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{totalPackages}</p>
            <p className="text-sm text-gray-600">Total Paket</p>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{deliveredPackages}</p>
            <p className="text-sm text-gray-600">Paket Selesai</p>
          </div>
          
          <div className="text-center p-4 border rounded-lg">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Tingkat Penyelesaian</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkSummaryStats;
