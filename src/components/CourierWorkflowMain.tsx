
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  Scan, 
  Truck, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle,
  RotateCcw,
  Calendar
} from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import DailyPackageInput from '@/components/DailyPackageInput';
import ScanPackageManager from '@/components/ScanPackageManager';
import DeliveryTracking from '@/components/DeliveryTracking';
import PendingReturnPackages from '@/components/PendingReturnPackages';
import DailyPerformanceSummary from '@/components/DailyPerformanceSummary';
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
      description: "Semua data telah direset. Silakan input data paket untuk hari ini.",
    });
  };

  const getStepComponent = () => {
    switch (currentStep) {
      case 'input':
        return <DailyPackageInput onStepComplete={autoProgressToNextStep} />;
      case 'scan':
        if (dailyPackages.length === 0) {
          return (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Silakan input data paket harian terlebih dahulu.
              </AlertDescription>
            </Alert>
          );
        }
        return <ScanPackageManager onStepComplete={autoProgressToNextStep} />;
      case 'delivery':
        if (deliveryPackages.length === 0) {
          return (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Silakan selesaikan proses scan paket terlebih dahulu.
              </AlertDescription>
            </Alert>
          );
        }
        return <DeliveryTracking onStepComplete={autoProgressToNextStep} />;
      case 'pending':
        if (pendingPackages.length === 0) {
          // Auto progress to performance if no pending packages
          setTimeout(() => {
            setCurrentStep('performance');
          }, 500);
          return (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Tidak ada paket pending. Melanjutkan ke ringkasan performa...
              </AlertDescription>
            </Alert>
          );
        }
        return <PendingReturnPackages onStepComplete={autoProgressToNextStep} />;
      case 'performance':
        return (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Selamat! Semua paket hari ini telah selesai diproses.
              </AlertDescription>
            </Alert>
            <DailyPerformanceSummary />
            <Card>
              <CardContent className="pt-6">
                <Button 
                  onClick={handleStartNewDay}
                  className="w-full"
                  size="lg"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Mulai Hari Baru
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Workflow Content */}
      {getStepComponent()}
    </div>
  );
};

export default CourierWorkflowMain;
