
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DailyPackageInput from './DailyPackageInput';
import ScanPackageManager from './ScanPackageManager';

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

  const handleStepComplete = () => {
    if (currentStep === 'input') {
      setCurrentStep('scan');
    } else if (currentStep === 'scan') {
      setCurrentStep('delivery');
    }
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

      {/* Dynamic Content Based on Current Step */}
      {currentStep === 'input' && (
        <DailyPackageInput onStepComplete={handleStepComplete} />
      )}

      {currentStep === 'scan' && (
        <ScanPackageManager onStepComplete={handleStepComplete} />
      )}
    </div>
  );
};

export default CourierWorkflowMain;
