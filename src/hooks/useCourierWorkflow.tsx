
import { useState, useEffect, useCallback } from 'react';
import { courierService, DailyPackage } from '@/services/courierService';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export type WorkflowStep = 'input' | 'scan' | 'delivery' | 'pending' | 'performance';

interface UseCourierWorkflowReturn {
  // State
  currentStep: WorkflowStep;
  dailyPackages: DailyPackage[];
  loading: boolean;
  
  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  createDailyPackages: (totalPackages: number, codPackages: number) => Promise<boolean>;
  updatePackageStatus: (packageId: string, status: DailyPackage['status'], additionalData?: Partial<DailyPackage>) => Promise<boolean>;
  deletePackage: (packageId: string) => Promise<boolean>;
  refreshPackages: () => Promise<void>;
  
  // Computed values
  scannedPackages: DailyPackage[];
  deliveryPackages: DailyPackage[];
  deliveredPackages: DailyPackage[];
  pendingPackages: DailyPackage[];
  returnedPackages: DailyPackage[];
  
  // Progress checks
  canProceedToScan: () => boolean;
  canProceedToDelivery: () => boolean;
  canProceedToPending: () => boolean;
  canProceedToPerformance: () => boolean;
}

export const useCourierWorkflow = (): UseCourierWorkflowReturn => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('input');
  const [dailyPackages, setDailyPackages] = useState<DailyPackage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch packages when user changes or component mounts
  const refreshPackages = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const packages = await courierService.getDailyPackages(user.id);
      setDailyPackages(packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data paket",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshPackages();
  }, [refreshPackages]);

  // Real-time subscription for package changes
  useEffect(() => {
    if (!user) return;

    const subscription = courierService.subscribeToPackageChanges(user.id, (payload) => {
      console.log('Package change received:', payload);
      refreshPackages();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, refreshPackages]);

  // Create daily packages for input step
  const createDailyPackages = async (totalPackages: number, codPackages: number): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const packages: Omit<DailyPackage, 'id' | 'created_at' | 'updated_at'>[] = [];
      
      for (let i = 0; i < totalPackages; i++) {
        packages.push({
          courier_id: user.id,
          tracking_number: `PKG${String(i + 1).padStart(3, '0')}${Date.now()}`,
          recipient_name: `Penerima ${i + 1}`,
          address: `Alamat ${i + 1}`,
          is_cod: i < codPackages,
          cod_amount: i < codPackages ? Math.floor(Math.random() * 500000) + 50000 : 0,
          status: 'input'
        });
      }

      const success = await courierService.createDailyPackages(packages);
      if (success) {
        await refreshPackages();
        toast({
          title: "Berhasil",
          description: `${totalPackages} paket berhasil dibuat`,
        });
      }
      return success;
    } catch (error) {
      console.error('Error creating packages:', error);
      toast({
        title: "Error",
        description: "Gagal membuat paket harian",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update package status
  const updatePackageStatus = async (
    packageId: string, 
    status: DailyPackage['status'], 
    additionalData: Partial<DailyPackage> = {}
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const success = await courierService.updatePackageStatus(packageId, status, additionalData);
      if (success) {
        await refreshPackages();
        
        // Update daily summary
        if (user) {
          await courierService.updateDailySummary(user.id, new Date().toISOString().split('T')[0]);
        }
      }
      return success;
    } catch (error) {
      console.error('Error updating package status:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete package
  const deletePackage = async (packageId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const success = await courierService.deletePackage(packageId);
      if (success) {
        await refreshPackages();
      }
      return success;
    } catch (error) {
      console.error('Error deleting package:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Computed values
  const scannedPackages = dailyPackages.filter(pkg => pkg.status === 'scanned');
  const deliveryPackages = dailyPackages.filter(pkg => pkg.status === 'in_delivery');
  const deliveredPackages = dailyPackages.filter(pkg => pkg.status === 'delivered');
  const pendingPackages = dailyPackages.filter(pkg => pkg.status === 'pending');
  const returnedPackages = dailyPackages.filter(pkg => pkg.status === 'returned');

  // Progress checks
  const canProceedToScan = () => dailyPackages.length > 0;
  const canProceedToDelivery = () => scannedPackages.length > 0 || deliveryPackages.length > 0;
  const canProceedToPending = () => pendingPackages.length > 0;
  const canProceedToPerformance = () => {
    const totalProcessed = deliveredPackages.length + returnedPackages.length;
    return totalProcessed > 0 && totalProcessed === dailyPackages.length;
  };

  return {
    // State
    currentStep,
    dailyPackages,
    loading,
    
    // Actions
    setCurrentStep,
    createDailyPackages,
    updatePackageStatus,
    deletePackage,
    refreshPackages,
    
    // Computed values
    scannedPackages,
    deliveryPackages,
    deliveredPackages,
    pendingPackages,
    returnedPackages,
    
    // Progress checks
    canProceedToScan,
    canProceedToDelivery,
    canProceedToPending,
    canProceedToPerformance
  };
};
