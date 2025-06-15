
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Package {
  id: string;
  trackingNumber: string;
  isCOD: boolean;
}

interface DeliveredPackage extends Package {
  recipientName: string;
  proofPhoto: string;
  deliveredAt: Date;
}

interface PendingPackage extends Package {
  reason: string;
  leaderName?: string;
  returnPhoto?: string;
  returnedAt?: Date;
}

interface WorkflowContextType {
  // Current step
  currentStep: 'input' | 'scan' | 'delivery' | 'pending' | 'performance';
  setCurrentStep: (step: 'input' | 'scan' | 'delivery' | 'pending' | 'performance') => void;
  
  // Daily packages (from input step)
  dailyPackages: Package[];
  setDailyPackages: (packages: Package[]) => void;
  
  // Delivery packages (from scan step)
  deliveryPackages: Package[];
  setDeliveryPackages: (packages: Package[]) => void;
  
  // Delivered packages
  deliveredPackages: DeliveredPackage[];
  setDeliveredPackages: (packages: DeliveredPackage[]) => void;
  
  // Pending/Return packages
  pendingPackages: PendingPackage[];
  setPendingPackages: (packages: PendingPackage[]) => void;
  
  // Navigation helpers
  canProceedToScan: () => boolean;
  canProceedToDelivery: () => boolean;
  canProceedToPending: () => boolean;
  canProceedToPerformance: () => boolean;
  
  // Action helpers
  markAsDelivered: (packageId: string, recipientName: string, proofPhoto: string) => void;
  markAsPending: (packageId: string, reason: string) => void;
  returnToWarehouse: (packageId: string, leaderName: string, returnPhoto: string) => void;
  
  // Auto progression
  autoProgressToNextStep: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'scan' | 'delivery' | 'pending' | 'performance'>('input');
  const [dailyPackages, setDailyPackages] = useState<Package[]>([]);
  const [deliveryPackages, setDeliveryPackages] = useState<Package[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<DeliveredPackage[]>([]);
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDailyPackages = localStorage.getItem('dailyPackages');
    const savedDeliveryPackages = localStorage.getItem('deliveryPackages');
    const savedDeliveredPackages = localStorage.getItem('deliveredPackages');
    const savedPendingPackages = localStorage.getItem('pendingPackages');
    const savedCurrentStep = localStorage.getItem('currentWorkflowStep');

    if (savedDailyPackages) setDailyPackages(JSON.parse(savedDailyPackages));
    if (savedDeliveryPackages) setDeliveryPackages(JSON.parse(savedDeliveryPackages));
    if (savedDeliveredPackages) setDeliveredPackages(JSON.parse(savedDeliveredPackages));
    if (savedPendingPackages) setPendingPackages(JSON.parse(savedPendingPackages));
    if (savedCurrentStep) setCurrentStep(savedCurrentStep as any);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('dailyPackages', JSON.stringify(dailyPackages));
  }, [dailyPackages]);

  useEffect(() => {
    localStorage.setItem('deliveryPackages', JSON.stringify(deliveryPackages));
  }, [deliveryPackages]);

  useEffect(() => {
    localStorage.setItem('deliveredPackages', JSON.stringify(deliveredPackages));
  }, [deliveredPackages]);

  useEffect(() => {
    localStorage.setItem('pendingPackages', JSON.stringify(pendingPackages));
  }, [pendingPackages]);

  useEffect(() => {
    localStorage.setItem('currentWorkflowStep', currentStep);
  }, [currentStep]);

  const canProceedToScan = () => dailyPackages.length > 0;
  const canProceedToDelivery = () => deliveryPackages.length > 0;
  const canProceedToPending = () => pendingPackages.some(pkg => !pkg.returnedAt);
  const canProceedToPerformance = () => {
    const totalPackages = deliveryPackages.length;
    const completedPackages = deliveredPackages.length + pendingPackages.filter(pkg => pkg.returnedAt).length;
    return totalPackages > 0 && totalPackages === completedPackages;
  };

  const markAsDelivered = (packageId: string, recipientName: string, proofPhoto: string) => {
    const pkg = deliveryPackages.find(p => p.id === packageId);
    if (pkg) {
      const deliveredPkg: DeliveredPackage = {
        ...pkg,
        recipientName,
        proofPhoto,
        deliveredAt: new Date()
      };
      setDeliveredPackages(prev => [...prev, deliveredPkg]);
    }
  };

  const markAsPending = (packageId: string, reason: string) => {
    const pkg = deliveryPackages.find(p => p.id === packageId);
    if (pkg) {
      const pendingPkg: PendingPackage = {
        ...pkg,
        reason
      };
      setPendingPackages(prev => [...prev, pendingPkg]);
    }
  };

  const returnToWarehouse = (packageId: string, leaderName: string, returnPhoto: string) => {
    setPendingPackages(prev => prev.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, leaderName, returnPhoto, returnedAt: new Date() }
        : pkg
    ));
  };

  const autoProgressToNextStep = () => {
    console.log('Auto progress check - current step:', currentStep);
    console.log('Daily packages:', dailyPackages.length);
    console.log('Delivery packages:', deliveryPackages.length);
    console.log('Delivered packages:', deliveredPackages.length);
    console.log('Pending packages:', pendingPackages.length);
    
    switch (currentStep) {
      case 'input':
        if (canProceedToScan()) {
          console.log('Auto progressing from input to scan');
          setCurrentStep('scan');
        }
        break;
      case 'scan':
        if (canProceedToDelivery()) {
          console.log('Auto progressing from scan to delivery');
          setCurrentStep('delivery');
        }
        break;
      case 'delivery':
        const totalDelivery = deliveryPackages.length;
        const processedDelivery = deliveredPackages.length + pendingPackages.length;
        if (totalDelivery > 0 && totalDelivery === processedDelivery) {
          if (canProceedToPending()) {
            console.log('Auto progressing from delivery to pending');
            setCurrentStep('pending');
          } else if (canProceedToPerformance()) {
            console.log('Auto progressing from delivery to performance');
            setCurrentStep('performance');
          }
        }
        break;
      case 'pending':
        if (canProceedToPerformance()) {
          console.log('Auto progressing from pending to performance');
          setCurrentStep('performance');
        }
        break;
    }
  };

  return (
    <WorkflowContext.Provider value={{
      currentStep,
      setCurrentStep,
      dailyPackages,
      setDailyPackages,
      deliveryPackages,
      setDeliveryPackages,
      deliveredPackages,
      setDeliveredPackages,
      pendingPackages,
      setPendingPackages,
      canProceedToScan,
      canProceedToDelivery,
      canProceedToPending,
      canProceedToPerformance,
      markAsDelivered,
      markAsPending,
      returnToWarehouse,
      autoProgressToNextStep
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
