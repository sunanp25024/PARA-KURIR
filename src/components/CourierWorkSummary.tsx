
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WorkSummaryStats from './courier/WorkSummaryStats';
import CourierDetailCard from './courier/CourierDetailCard';

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

  return (
    <div className="space-y-6">
      <WorkSummaryStats {...summaryStats} />
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {courierDetails.map((courier) => (
              <CourierDetailCard key={courier.id} courier={courier} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierWorkSummary;
