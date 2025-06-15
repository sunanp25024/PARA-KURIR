
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Package, 
  Scan, 
  Truck, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle,
  RotateCcw,
  Clock,
  Bell,
  MapPin,
  BarChart3,
  Camera,
  FileText
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

  const getCurrentStepCard = () => {
    switch (currentStep) {
      case 'input':
        return {
          title: 'Input Data Paket Harian',
          subtitle: 'Masukkan data paket yang akan diantarkan hari ini',
          icon: Package,
          buttonText: 'Input Data Paket',
          buttonIcon: FileText,
          color: 'from-blue-500 to-blue-600'
        };
      case 'scan':
        return {
          title: 'Scan & Kelola Paket',
          subtitle: `Scan barcode paket untuk memulai pengantaran (${deliveryPackages.length}/${dailyPackages.length} paket terscan)`,
          icon: Scan,
          buttonText: 'Mulai Scan Barcode',
          buttonIcon: Camera,
          color: 'from-green-500 to-green-600'
        };
      case 'delivery':
        return {
          title: 'Proses Pengantaran',
          subtitle: `Antarkan paket ke alamat tujuan (${deliveredPackages.length}/${deliveryPackages.length} paket terkirim)`,
          icon: Truck,
          buttonText: 'Mulai Pengantaran',
          buttonIcon: MapPin,
          color: 'from-orange-500 to-orange-600'
        };
      case 'pending':
        return {
          title: 'Kelola Paket Pending',
          subtitle: `Proses paket yang belum terkirim (${pendingPackages.length} paket pending)`,
          icon: Clock,
          buttonText: 'Kelola Pending',
          buttonIcon: AlertTriangle,
          color: 'from-yellow-500 to-yellow-600'
        };
      case 'performance':
        return {
          title: 'Ringkasan Performa Harian',
          subtitle: 'Lihat laporan dan statistik pengantaran hari ini',
          icon: TrendingUp,
          buttonText: 'Lihat Performa',
          buttonIcon: BarChart3,
          color: 'from-purple-500 to-purple-600'
        };
      default:
        return null;
    }
  };

  const stepCard = getCurrentStepCard();
  
  // Calculate completion percentages
  const totalPackages = dailyPackages.length;
  const codPackages = dailyPackages.filter(pkg => pkg.isCOD).length;
  const deliveredCount = deliveredPackages.length;
  const pendingCount = pendingPackages.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        
        {/* Profile Header Card - Lebih kompak */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14 border-4 border-blue-100">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-500 text-white text-lg font-bold">
                    BS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Budi Santoso</h1>
                  <p className="text-slate-600">ID: PISTEST2025 - Jakarta Pusat Hub</p>
                  <Badge className="mt-1 bg-blue-100 text-blue-700 border-blue-200">
                    KURIR
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Banner - Hanya saat step input */}
        {currentStep === 'input' && (
          <Alert className="bg-orange-50 border-orange-200 shadow-sm">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium">
              Jangan lupa untuk melakukan absensi sebelum memulai aktivitas pengantaran!
              <Button variant="link" className="p-0 h-auto ml-2 text-orange-700 underline">
                Absen Sekarang
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Current Step Card - Design yang lebih clean */}
        {stepCard && (
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${stepCard.color} p-6 text-white`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <stepCard.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{stepCard.title}</h2>
                    <p className="text-white/90">{stepCard.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {currentStep !== 'performance' ? (
                  <Button 
                    size="lg" 
                    className={`w-full h-12 bg-gradient-to-r ${stepCard.color} hover:opacity-90 shadow-lg`}
                    onClick={() => {
                      // This will trigger the component render which handles the step logic
                    }}
                  >
                    <stepCard.buttonIcon className="h-5 w-5 mr-2" />
                    {stepCard.buttonText}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        🎉 Selamat! Semua paket hari ini telah selesai diproses.
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={handleStartNewDay}
                      size="lg"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Mulai Hari Baru
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards - Grid yang lebih rapi */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/95 backdrop-blur-sm shadow-md border-0">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalPackages}</div>
              <p className="text-sm text-slate-600">Total Paket</p>
              <Badge variant="secondary" className="mt-2 text-xs">100%</Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-md border-0">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">💰</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{codPackages}</div>
              <p className="text-sm text-slate-600">COD</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {totalPackages > 0 ? Math.round((codPackages / totalPackages) * 100) : 0}%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-md border-0">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{deliveredCount}</div>
              <p className="text-sm text-slate-600">Terkirim</p>
              <Badge variant="default" className="mt-2 text-xs bg-green-600">
                {totalPackages > 0 ? Math.round((deliveredCount / totalPackages) * 100) : 0}%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-md border-0">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{pendingCount}</div>
              <p className="text-sm text-slate-600">Pending</p>
              <Badge variant="outline" className="mt-2 text-xs border-orange-300 text-orange-600">
                {totalPackages > 0 ? Math.round((pendingCount / totalPackages) * 100) : 0}%
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="min-h-[400px]">
          {currentStep === 'input' && <DailyPackageInput onStepComplete={autoProgressToNextStep} />}
          
          {currentStep === 'scan' && (
            dailyPackages.length === 0 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Silakan input data paket harian terlebih dahulu.
                </AlertDescription>
              </Alert>
            ) : (
              <ScanPackageManager onStepComplete={autoProgressToNextStep} />
            )
          )}
          
          {currentStep === 'delivery' && (
            deliveryPackages.length === 0 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Silakan selesaikan proses scan paket terlebih dahulu.
                </AlertDescription>
              </Alert>
            ) : (
              <DeliveryTracking onStepComplete={autoProgressToNextStep} />
            )
          )}
          
          {currentStep === 'pending' && (
            pendingPackages.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Tidak ada paket pending. Melanjutkan ke ringkasan performa...
                </AlertDescription>
              </Alert>
            ) : (
              <PendingReturnPackages onStepComplete={autoProgressToNextStep} />
            )
          )}
          
          {currentStep === 'performance' && <DailyPerformanceSummary />}
        </div>
      </div>
    </div>
  );
};

export default CourierWorkflowMain;
