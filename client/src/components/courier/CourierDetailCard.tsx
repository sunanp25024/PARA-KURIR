
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

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

interface CourierDetailCardProps {
  courier: CourierWorkDetail;
}

const CourierDetailCard = ({ courier }: CourierDetailCardProps) => {
  const getPackageStatusColor = (type: 'delivered' | 'sent' | 'return') => {
    switch (type) {
      case 'delivered': return 'text-blue-600';
      case 'sent': return 'text-green-600';
      case 'return': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
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
  );
};

export default CourierDetailCard;
