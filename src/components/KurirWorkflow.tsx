
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  Scan, 
  Truck, 
  AlertTriangle, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import DailyPackageInput from '@/components/DailyPackageInput';
import ScanPackageManager from '@/components/ScanPackageManager';
import DeliveryTracking from '@/components/DeliveryTracking';
import PendingReturnPackages from '@/components/PendingReturnPackages';
import DailyPerformanceSummary from '@/components/DailyPerformanceSummary';

const KurirWorkflow = () => {
  const {
    currentStep,
    setCurrentStep,
    canProceedToScan,
    canProceedToDelivery,
    canProceedToPending,
    canProceedToPerformance,
    dailyPackages,
    deliveryPackages,
    deliveredPackages,
    pendingPackages
  } = useWorkflow();

  const getStepStatus = (step: string) => {
    switch (step) {
      case 'input':
        return dailyPackages.length > 0 ? 'completed' : 'active';
      case 'scan':
        return deliveryPackages.length > 0 ? 'completed' : canProceedToScan() ? 'active' : 'disabled';
      case 'delivery':
        const totalDelivery = deliveryPackages.length;
        const completedDelivery = deliveredPackages.length + pendingPackages.length;
        return totalDelivery > 0 && totalDelivery === completedDelivery ? 'completed' : canProceedToDelivery() ? 'active' : 'disabled';
      case 'pending':
        const pendingToReturn = pendingPackages.filter(pkg => !pkg.returnedAt).length;
        return pendingToReturn === 0 && pendingPackages.length > 0 ? 'completed' : canProceedToPending() ? 'active' : 'disabled';
      case 'performance':
        return canProceedToPerformance() ? 'active' : 'disabled';
      default:
        return 'disabled';
    }
  };

  const getStepBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'disabled': return 'outline';
      default: return 'outline';
    }
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'input':
        if (canProceedToScan()) setCurrentStep('scan');
        break;
      case 'scan':
        if (canProceedToDelivery()) setCurrentStep('delivery');
        break;
      case 'delivery':
        if (canProceedToPending()) setCurrentStep('pending');
        else if (canProceedToPerformance()) setCurrentStep('performance');
        break;
      case 'pending':
        if (canProceedToPerformance()) setCurrentStep('performance');
        break;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'input': return canProceedToScan();
      case 'scan': return canProceedToDelivery();
      case 'delivery': return canProceedToPending() || canProceedToPerformance();
      case 'pending': return canProceedToPerformance();
      default: return false;
    }
  };

  const getNextStepText = () => {
    switch (currentStep) {
      case 'input': return 'Lanjut ke Scan & Kelola';
      case 'scan': return 'Lanjut ke Pengantaran';
      case 'delivery': 
        return canProceedToPending() ? 'Lanjut ke Pending/Return' : 'Lanjut ke Performa';
      case 'pending': return 'Selesaikan Pengantaran';
      default: return 'Lanjut';
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Workflow Harian Kurir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={getStepBadgeVariant(getStepStatus('input'))}>
              <Package className="h-3 w-3 mr-1" />
              Input Paket ({dailyPackages.length})
            </Badge>
            <Badge variant={getStepBadgeVariant(getStepStatus('scan'))}>
              <Scan className="h-3 w-3 mr-1" />
              Scan & Kelola ({deliveryPackages.length})
            </Badge>
            <Badge variant={getStepBadgeVariant(getStepStatus('delivery'))}>
              <Truck className="h-3 w-3 mr-1" />
              Pengantaran ({deliveredPackages.length}/{deliveryPackages.length})
            </Badge>
            <Badge variant={getStepBadgeVariant(getStepStatus('pending'))}>
              <AlertTriangle className="h-3 w-3 mr-1" />
              Pending/Return ({pendingPackages.length})
            </Badge>
            <Badge variant={getStepBadgeVariant(getStepStatus('performance'))}>
              <TrendingUp className="h-3 w-3 mr-1" />
              Performa
            </Badge>
          </div>

          {canProceedToNext() && (
            <Button onClick={handleNextStep} className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              {getNextStepText()}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Main Workflow Tabs */}
      <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="input" disabled={getStepStatus('input') === 'disabled'}>
            <Package className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="scan" disabled={getStepStatus('scan') === 'disabled'}>
            <Scan className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="delivery" disabled={getStepStatus('delivery') === 'disabled'}>
            <Truck className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="pending" disabled={getStepStatus('pending') === 'disabled'}>
            <AlertTriangle className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="performance" disabled={getStepStatus('performance') === 'disabled'}>
            <TrendingUp className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <DailyPackageInput />
        </TabsContent>

        <TabsContent value="scan">
          {!canProceedToScan() ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Silakan input data paket harian terlebih dahulu di tab 'Input Paket'
              </AlertDescription>
            </Alert>
          ) : (
            <ScanPackageManager />
          )}
        </TabsContent>

        <TabsContent value="delivery">
          {!canProceedToDelivery() ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Silakan selesaikan proses scan paket terlebih dahulu di tab 'Scan & Kelola'
              </AlertDescription>
            </Alert>
          ) : (
            <DeliveryTracking />
          )}
        </TabsContent>

        <TabsContent value="pending">
          {!canProceedToPending() && pendingPackages.length === 0 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tidak ada paket pending/return. Jika ada paket yang tidak dapat terkirim, 
                tandai sebagai pending di tab 'Pengantaran'
              </AlertDescription>
            </Alert>
          ) : (
            <PendingReturnPackages />
          )}
        </TabsContent>

        <TabsContent value="performance">
          {!canProceedToPerformance() ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Selesaikan semua paket terlebih dahulu sebelum melihat performa harian
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Semua paket telah selesai diproses! Berikut adalah ringkasan performa hari ini.
                </AlertDescription>
              </Alert>
              <DailyPerformanceSummary />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KurirWorkflow;
