
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCourierWorkflow } from '@/hooks/useCourierWorkflow';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, RefreshCw } from 'lucide-react';
import DailyPackageInput from './DailyPackageInput';
import ScanPackageManager from './ScanPackageManager';
import DeliveryTracking from './DeliveryTracking';

const CourierWorkflowMain = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const {
    currentStep,
    setCurrentStep,
    dailyPackages,
    loading: workflowLoading,
    refreshPackages
  } = useCourierWorkflow();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Berhasil Logout",
        description: "Anda telah keluar dari aplikasi"
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = async () => {
    toast({
      title: "Memuat ulang data...",
      description: "Sedang menyinkronkan data terbaru"
    });
    await refreshPackages();
    toast({
      title: "Data diperbarui",
      description: "Data paket telah disinkronkan"
    });
  };

  const handleStepComplete = () => {
    if (currentStep === 'input') {
      setCurrentStep('scan');
    } else if (currentStep === 'scan') {
      setCurrentStep('delivery');
    }
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Profile Header Section */}
      <Card className="bg-white shadow-sm border border-slate-200/60">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url || "/lovable-uploads/c3617b06-30d3-48da-9aba-472b87415c28.png"} alt="Profile" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {profile?.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'KR'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                {profile?.name || 'Kurir'}
              </h2>
              <p className="text-slate-600 text-sm">
                {profile?.employee_id || 'ID Tidak Tersedia'} • {profile?.area || 'Area Tidak Tersedia'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Total Paket Hari Ini: {dailyPackages.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={workflowLoading}
              >
                <RefreshCw className={`h-4 w-4 ${workflowLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
              </Button>
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

      {currentStep === 'delivery' && (
        <DeliveryTracking onStepComplete={handleStepComplete} />
      )}
    </div>
  );
};

export default CourierWorkflowMain;
