import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Package {
  id: string;
  trackingNumber: string;
  isCOD: boolean;
}

interface ScannedPackage extends Package {
  scanTime: Date;
  status: 'scanned';
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
  
  // Daily packages (from input step) - template packages
  dailyPackages: Package[];
  setDailyPackages: (packages: Package[]) => void;
  
  // Scanned packages (from scan step)
  scannedPackages: ScannedPackage[];
  setScannedPackages: (packages: ScannedPackage[]) => void;
  
  // Delivery packages (packages ready for delivery)
  deliveryPackages: Package[];
  setDeliveryPackages: (packages: Package[]) => void;
  
  // Delivered packages
  deliveredPackages: DeliveredPackage[];
  setDeliveredPackages: (packages: DeliveredPackage[]) => void;
  
  // Pending packages
  pendingPackages: PendingPackage[];
  setPendingPackages: (packages: PendingPackage[]) => void;
  
  // Navigation helpers
  canProceedToScan: () => boolean;
  canProceedToDelivery: () => boolean;
  canProceedToPending: () => boolean;
  canProceedToPerformance: () => boolean;
  
  // Action helpers
  addScannedPackage: (trackingNumber: string, isCOD: boolean) => boolean;
  removeScannedPackage: (id: string) => void;
  startDelivery: () => void;
  markAsDelivered: (packageId: string, recipientName: string, proofPhoto: string) => void;
  markAsPending: (packageId: string, reason: string) => void;
  returnAllPendingToWarehouse: (leaderName: string, returnPhoto: string) => void;
  
  // Auto progression
  autoProgressToNextStep: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'scan' | 'delivery' | 'pending' | 'performance'>('input');
  const [dailyPackages, setDailyPackages] = useState<Package[]>([]);
  const [scannedPackages, setScannedPackages] = useState<ScannedPackage[]>([]);
  const [deliveryPackages, setDeliveryPackages] = useState<Package[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<DeliveredPackage[]>([]);
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);

  // Load data from sessionStorage on mount - tab-specific workflow data
  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    const savedDailyPackages = sessionStorage.getItem(`dailyPackages_${sessionId}`);
    const savedScannedPackages = sessionStorage.getItem(`scannedPackages_${sessionId}`);
    const savedDeliveryPackages = sessionStorage.getItem(`deliveryPackages_${sessionId}`);
    const savedDeliveredPackages = sessionStorage.getItem(`deliveredPackages_${sessionId}`);
    const savedPendingPackages = sessionStorage.getItem(`pendingPackages_${sessionId}`);
    const savedCurrentStep = sessionStorage.getItem(`currentWorkflowStep_${sessionId}`);

    if (savedDailyPackages) setDailyPackages(JSON.parse(savedDailyPackages));
    if (savedScannedPackages) {
      const packages = JSON.parse(savedScannedPackages);
      setScannedPackages(packages.map((pkg: any) => ({
        ...pkg,
        scanTime: new Date(pkg.scanTime)
      })));
    }
    if (savedDeliveryPackages) setDeliveryPackages(JSON.parse(savedDeliveryPackages));
    if (savedDeliveredPackages) setDeliveredPackages(JSON.parse(savedDeliveredPackages));
    if (savedPendingPackages) setPendingPackages(JSON.parse(savedPendingPackages));
    if (savedCurrentStep) setCurrentStep(savedCurrentStep as any);
  }, []);

  // Save to sessionStorage when data changes - tab-specific workflow data
  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`dailyPackages_${sessionId}`, JSON.stringify(dailyPackages));
  }, [dailyPackages]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`scannedPackages_${sessionId}`, JSON.stringify(scannedPackages));
  }, [scannedPackages]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`deliveryPackages_${sessionId}`, JSON.stringify(deliveryPackages));
  }, [deliveryPackages]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`deliveredPackages_${sessionId}`, JSON.stringify(deliveredPackages));
  }, [deliveredPackages]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`pendingPackages_${sessionId}`, JSON.stringify(pendingPackages));
  }, [pendingPackages]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`currentWorkflowStep_${sessionId}`, currentStep);
  }, [currentStep]);

  const canProceedToScan = () => dailyPackages.length > 0;
  const canProceedToDelivery = () => scannedPackages.length > 0;
  const canProceedToPending = () => pendingPackages.some(pkg => !pkg.returnedAt);
  const canProceedToPerformance = () => {
    const totalDelivery = deliveryPackages.length;
    const completedDelivery = deliveredPackages.length + pendingPackages.filter(pkg => pkg.returnedAt).length;
    return totalDelivery > 0 && totalDelivery === completedDelivery;
  };

  const addScannedPackage = (trackingNumber: string, isCOD: boolean): boolean => {
    // Check if package already exists
    const exists = scannedPackages.some(pkg => pkg.trackingNumber === trackingNumber);
    if (exists) {
      return false; // Package already scanned
    }

    const newPackage: ScannedPackage = {
      id: `scanned_${Date.now()}_${Math.random()}`,
      trackingNumber,
      isCOD,
      scanTime: new Date(),
      status: 'scanned'
    };

    setScannedPackages(prev => [...prev, newPackage]);
    return true; // Successfully added
  };

  const removeScannedPackage = (id: string) => {
    setScannedPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const startDelivery = () => {
    const deliveryItems = scannedPackages.map(pkg => ({
      id: pkg.id,
      trackingNumber: pkg.trackingNumber,
      isCOD: pkg.isCOD
    }));
    setDeliveryPackages(deliveryItems);
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

  const returnAllPendingToWarehouse = (leaderName: string, returnPhoto: string) => {
    setPendingPackages(prev => prev.map(pkg => 
      !pkg.returnedAt 
        ? { ...pkg, leaderName, returnPhoto, returnedAt: new Date() }
        : pkg
    ));
  };

  const autoProgressToNextStep = () => {
    console.log('Auto progress check - current step:', currentStep);
    
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
      scannedPackages,
      setScannedPackages,
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
      addScannedPackage,
      removeScannedPackage,
      startDelivery,
      markAsDelivered,
      markAsPending,
      returnAllPendingToWarehouse,
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
