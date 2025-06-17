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
  currentStep: 'input' | 'scan' | 'delivery' | 'pending' | 'performance';
  setCurrentStep: (step: 'input' | 'scan' | 'delivery' | 'pending' | 'performance') => void;
  dailyPackages: Package[];
  setDailyPackages: (packages: Package[]) => void;
  scannedPackages: ScannedPackage[];
  setScannedPackages: (packages: ScannedPackage[]) => void;
  deliveryPackages: Package[];
  setDeliveryPackages: (packages: Package[]) => void;
  deliveredPackages: DeliveredPackage[];
  setDeliveredPackages: (packages: DeliveredPackage[]) => void;
  pendingPackages: PendingPackage[];
  setPendingPackages: (packages: PendingPackage[]) => void;
  canProceedToScan: () => boolean;
  canProceedToDelivery: () => boolean;
  canProceedToPending: () => boolean;
  canProceedToPerformance: () => boolean;
  addScannedPackage: (trackingNumber: string, isCOD: boolean) => boolean;
  removeScannedPackage: (id: string) => void;
  startDelivery: () => void;
  markAsDelivered: (packageId: string, recipientName: string, proofPhoto: string) => void;
  markAsPending: (packageId: string, reason: string) => void;
  returnAllPendingToWarehouse: (leaderName: string, returnPhoto: string) => void;
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

  const canProceedToScan = () => dailyPackages.length > 0;
  const canProceedToDelivery = () => scannedPackages.length > 0;
  const canProceedToPending = () => deliveryPackages.length > 0;
  const canProceedToPerformance = () => true;

  const addScannedPackage = (trackingNumber: string, isCOD: boolean) => {
    const packageExists = dailyPackages.find(pkg => pkg.trackingNumber === trackingNumber);
    if (!packageExists) return false;

    const newPackage: ScannedPackage = {
      ...packageExists,
      scanTime: new Date(),
      status: 'scanned'
    };

    setScannedPackages(prev => [...prev, newPackage]);
    return true;
  };

  const removeScannedPackage = (id: string) => {
    setScannedPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const startDelivery = () => {
    setDeliveryPackages(scannedPackages.map(pkg => ({
      id: pkg.id,
      trackingNumber: pkg.trackingNumber,
      isCOD: pkg.isCOD
    })));
    setCurrentStep('delivery');
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
      setDeliveryPackages(prev => prev.filter(p => p.id !== packageId));
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
      setDeliveryPackages(prev => prev.filter(p => p.id !== packageId));
    }
  };

  const returnAllPendingToWarehouse = (leaderName: string, returnPhoto: string) => {
    setPendingPackages(prev => prev.map(pkg => ({
      ...pkg,
      leaderName,
      returnPhoto,
      returnedAt: new Date()
    })));
  };

  const autoProgressToNextStep = () => {
    if (currentStep === 'input' && canProceedToScan()) {
      setCurrentStep('scan');
    } else if (currentStep === 'scan' && canProceedToDelivery()) {
      setCurrentStep('delivery');
    } else if (currentStep === 'delivery' && canProceedToPending()) {
      setCurrentStep('pending');
    } else if (currentStep === 'pending') {
      setCurrentStep('performance');
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
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }
  return context;
};