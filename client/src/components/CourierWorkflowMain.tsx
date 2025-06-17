
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
    
    // Clear sessionStorage for this session
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.removeItem(`dailyPackageData_${sessionId}`);
    sessionStorage.removeItem(`dailyPackages_${sessionId}`);
    sessionStorage.removeItem(`scannedPackages_${sessionId}`);
    sessionStorage.removeItem(`deliveryPackages_${sessionId}`);
    sessionStorage.removeItem(`deliveredPackages_${sessionId}`);
    sessionStorage.removeItem(`pendingPackages_${sessionId}`);
    sessionStorage.removeItem(`currentWorkflowStep_${sessionId}`);
    
    // Reset to input step
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

  const getStepBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getStepIcon = (step: string, status: string) => {
    const iconClass = "h-4 w-4";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        {/* Modern Header */}
        <div className="card-modern p-6 shadow-xl border border-border/50 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Workflow Harian Kurir
              </h1>
              <p className="text-muted-foreground text-lg mt-1">Kelola paket harian dengan efisien</p>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="glass-card p-4 rounded-xl mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-foreground">Progress Harian</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{Math.round(getStepProgress())}%</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <Progress value={getStepProgress()} className="h-3 bg-secondary" />
          </div>
        </div>

        {/* Modern Step Navigation */}
        <Card className="card-modern shadow-xl border border-border/50 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/50">
              {steps.map((step, index) => {
                const status = getStepStatus(step.key);
                const isActive = currentStep === step.key;
                
                return (
                  <div 
                    key={step.key}
                    onClick={() => {
                      if (status !== 'pending') setCurrentStep(step.key as 'input' | 'scan' | 'delivery' | 'pending' | 'performance');
                    }}
                    className={`p-6 text-center transition-all duration-300 cursor-pointer relative ${
                      isActive 
                        ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-primary' 
                        : status === 'completed'
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20'
                        : status === 'pending'
                        ? 'bg-muted/30 cursor-not-allowed opacity-60'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    {/* Step Number */}
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center font-bold text-sm ${
                      status === 'completed' 
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-primary text-primary-foreground animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    {/* Step Icon */}
                    <div className="flex justify-center mb-3">
                      {getStepIcon(step.key, status)}
                    </div>
                    
                    {/* Step Info */}
                    <div className={`font-semibold text-sm mb-2 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {step.label}
                    </div>
                    
                    {step.count !== '' && (
                      <Badge 
                        variant={status === 'completed' ? 'default' : isActive ? 'secondary' : 'outline'}
                        className="text-xs font-medium"
                      >
                        {step.count}
                      </Badge>
                    )}
                    
                    {/* Active Step Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Header */}
        <Card className="card-modern shadow-lg border border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl">
                  {getStepIcon(currentStep, 'active')}
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    {currentStep === 'input' && 'Input Data Paket'}
                    {currentStep === 'scan' && 'Scan & Kelola Paket'}
                    {currentStep === 'delivery' && 'Proses Pengantaran'}
                    {currentStep === 'pending' && 'Kelola Paket Pending'}
                    {currentStep === 'performance' && 'Ringkasan Performa'}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {currentStep === 'input' && 'Masukkan daftar paket yang akan dikirim hari ini'}
                    {currentStep === 'scan' && 'Scan barcode/QR code untuk verifikasi paket'}
                    {currentStep === 'delivery' && 'Proses pengiriman dan dokumentasi'}
                    {currentStep === 'pending' && 'Kelola paket yang belum terkirim'}
                    {currentStep === 'performance' && 'Lihat ringkasan pencapaian hari ini'}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                Langkah {['input', 'scan', 'delivery', 'pending', 'performance'].indexOf(currentStep) + 1} dari 5
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Area */}
        <div className="animate-slide-up">
          {getStepComponent()}
        </div>
      </div>
    </div>
  );
};

export default CourierWorkflowMain;
