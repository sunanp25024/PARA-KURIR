
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, Scan, Truck, AlertTriangle, TrendingUp, CheckCircle, RotateCcw, ArrowRight, Clock, Plus } from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DailyPackageInput from './DailyPackageInput';

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
      description: "Semua data telah direset. Silakan input data paket untuk hari ini."
    });
  };

  // Get user data from localStorage
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Profile Header Section */}
      <Card className="bg-white shadow-sm border border-slate-200/60">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/lovable-uploads/c3617b06-30d3-48da-9aba-472b87415c28.png" alt="Profile" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'BS'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                {user?.name || 'Budi Santoso'}
              </h2>
              <p className="text-slate-600 text-sm">
                {user?.id || 'PISTEST2025'} • {user?.area || 'Jakarta Pusat Hub'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Package Input Section */}
      <DailyPackageInput />
    </div>
  );
};

export default CourierWorkflowMain;
