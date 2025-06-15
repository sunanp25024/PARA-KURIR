
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, Scan, Truck, AlertTriangle, TrendingUp, CheckCircle, RotateCcw, ArrowRight, Clock, Plus } from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { toast } from '@/hooks/use-toast';

const CourierWorkflowMain = () => {
  const {
    currentStep,
    setCurrentStep,
    dailyPackages,
    scannedPackages,
    deliveryPackages,
    deliveredPackages,
    pendingPackages,
    autoProgressToNextStep,
    setDailyPackages,
    setScannedPackages,
    setDeliveryPackages,
    setDeliveredPackages,
    setPendingPackages
  } = useWorkflow();

  const handleStartNewDay = () => {
    // Clear all data
    setDailyPackages([]);
    setScannedPackages([]);
    setDeliveryPackages([]);
    setDeliveredPackages([]);
    setPendingPackages([]);

    // Clear localStorage
    localStorage.removeItem('dailyPackageData');
    localStorage.removeItem('dailyPackages');
    localStorage.removeItem('scannedPackages');
    localStorage.removeItem('deliveryPackages');
    localStorage.removeItem('deliveredPackages');
    localStorage.removeItem('pendingPackages');
    localStorage.removeItem('currentWorkflowStep');

    // Reset to input step
    setCurrentStep('input');
    toast({
      title: "Hari Baru Dimulai",
      description: "Semua data telah direset. Silakan input data paket untuk hari ini."
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header dengan Progress */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Kurir
        </h1>
        <p className="text-gray-600">Dashboard siap untuk dikustomisasi</p>
      </div>

      {/* Empty Dashboard Content */}
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="w-full max-w-md border-dashed border-2 border-gray-300">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dashboard Kosong
            </h3>
            <p className="text-gray-600 mb-4">
              Dashboard siap untuk diisi dengan konten yang Anda inginkan
            </p>
            <Badge variant="outline" className="text-gray-500">
              Menunggu konfigurasi
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourierWorkflowMain;
