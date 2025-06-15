
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Scan, 
  Truck, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Clock
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
    
    localStorage.removeItem('dailyPackageData');
    localStorage.removeItem('dailyPackages');
    localStorage.removeItem('scannedPackages');
    localStorage.removeItem('deliveryPackages');
    localStorage.removeItem('deliveredPackages');
    localStorage.removeItem('pendingPackages');
    localStorage.removeItem('currentWorkflowStep');
    
    setCurrentStep('input');
    
    toast({
      title: "Hari Baru Dimulai",
      description: "Semua data telah direset. Silakan input data paket untuk hari ini.",
    });
  };

  const getStepProgress = () => {
    const steps = ['input', 'scan', 'delivery', 'pending', 'performance'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const getStepStatus = (step: string) => {
    switch (step) {
      case 'input':
        return dailyPackages.length > 0 ? 'completed' : currentStep === 'input' ? 'active' : 'pending';
      case 'scan':
        return deliveryPackages.length > 0 ? 'completed' : currentStep === 'scan' ? 'active' : 'pending';
      case 'delivery':
        const totalDelivery = deliveryPackages.length;
        const completedDelivery = deliveredPackages.length + pendingPackages.length;
        return totalDelivery > 0 && totalDelivery === completedDelivery ? 'completed' : currentStep === 'delivery' ? 'active' : 'pending';
      case 'pending':
        const pendingToReturn = pendingPackages.filter(pkg => !pkg.returnedAt).length;
        return pendingToReturn === 0 && pendingPackages.length > 0 ? 'completed' : currentStep === 'pending' ? 'active' : 'pending';
      case 'performance':
        return currentStep === 'performance' ? 'active' : 'pending';
      default:
        return 'pending';
    }
  };

  const getStepIcon = (step: string, status: string) => {
    const iconClass = "h-6 w-6";
    if (status === 'completed') {
      return <CheckCircle className={`${iconClass} text-green-600`} />;
    }
    if (status === 'active') {
      switch (step) {
        case 'input': return <Package className={`${iconClass} text-blue-600`} />;
        case 'scan': return <Scan className={`${iconClass} text-blue-600`} />;
        case 'delivery': return <Truck className={`${iconClass} text-blue-600`} />;
        case 'pending': return <Clock className={`${iconClass} text-blue-600`} />;
        case 'performance': return <TrendingUp className={`${iconClass} text-blue-600`} />;
      }
    }
    switch (step) {
      case 'input': return <Package className={`${iconClass} text-gray-400`} />;
      case 'scan': return <Scan className={`${iconClass} text-gray-400`} />;
      case 'delivery': return <Truck className={`${iconClass} text-gray-400`} />;
      case 'pending': return <Clock className={`${iconClass} text-gray-400`} />;
      case 'performance': return <TrendingUp className={`${iconClass} text-gray-400`} />;
      default: return null;
    }
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
          <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                🎉 Selamat! Semua paket hari ini telah selesai diproses.
              </AlertDescription>
            </Alert>
            <DailyPerformanceSummary />
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleStartNewDay}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
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

  const steps = [
    { key: 'input', label: 'Input Paket', count: dailyPackages.length },
    { key: 'scan', label: 'Scan & Kelola', count: deliveryPackages.length },
    { key: 'delivery', label: 'Pengantaran', count: `${deliveredPackages.length}/${deliveryPackages.length}` },
    { key: 'pending', label: 'Pending/Return', count: pendingPackages.length },
    { key: 'performance', label: 'Performa', count: '' }
  ];

  return (
    <div className="flex-1 w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="w-full max-w-none mx-auto p-4 lg:p-6 xl:p-8 space-y-6">
        {/* Header */}
        <div className="w-full text-center py-6 lg:py-8">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Workflow Harian Kurir
          </h1>
          <p className="text-slate-600 text-sm lg:text-base xl:text-lg max-w-2xl mx-auto">
            Kelola paket harian Anda dengan mudah dan efisien
          </p>
        </div>

        {/* Progress Section - Full Width with Better Spacing */}
        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <CardContent className="p-6 lg:p-8">
            {/* Progress Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg lg:text-xl font-semibold text-slate-800">Progress Harian</h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {Math.round(getStepProgress())}%
                </span>
                <div className="text-xs text-slate-500">
                  Step {['input', 'scan', 'delivery', 'pending', 'performance'].indexOf(currentStep) + 1}/5
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={getStepProgress()} className="h-3 bg-slate-100" />
            </div>
            
            {/* Step Cards - Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
              {steps.map((step) => {
                const status = getStepStatus(step.key);
                return (
                  <div 
                    key={step.key}
                    className={`relative p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 ${
                      status === 'active' 
                        ? 'bg-blue-50 border-blue-200 shadow-lg scale-105' 
                        : status === 'completed'
                        ? 'bg-green-50 border-green-200 shadow-md'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-3 lg:mb-4">
                      {getStepIcon(step.key, status)}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs lg:text-sm font-semibold text-slate-700 text-center mb-2 lg:mb-3 leading-tight">
                      {step.label}
                    </div>
                    
                    {/* Count Badge */}
                    {step.count !== '' && (
                      <div className="flex justify-center">
                        <div className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold ${
                          status === 'completed' ? 'bg-green-100 text-green-700' :
                          status === 'active' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {step.count}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Section */}
        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-lg lg:text-xl text-slate-800">
              <div className="flex items-center gap-3">
                {getStepIcon(currentStep, 'active')}
                <span>
                  {currentStep === 'input' && 'Input Data Paket'}
                  {currentStep === 'scan' && 'Scan & Kelola Paket'}
                  {currentStep === 'delivery' && 'Proses Pengantaran'}
                  {currentStep === 'pending' && 'Kelola Paket Pending'}
                  {currentStep === 'performance' && 'Ringkasan Performa'}
                </span>
              </div>
              <div className="sm:ml-auto">
                <Badge variant="secondary" className="text-xs lg:text-sm">
                  Step {['input', 'scan', 'delivery', 'pending', 'performance'].indexOf(currentStep) + 1}/5
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Main Content - Full Width */}
        <div className="w-full min-h-[400px]">
          {getStepComponent()}
        </div>
      </div>
    </div>
  );
};

export default CourierWorkflowMain;
