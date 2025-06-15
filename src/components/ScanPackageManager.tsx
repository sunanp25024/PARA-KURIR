
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Package, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface ScanPackageManagerProps {
  onStepComplete?: () => void;
}

const ScanPackageManager: React.FC<ScanPackageManagerProps> = ({ onStepComplete }) => {
  const { 
    dailyPackages, 
    scannedPackages, 
    addScannedPackage, 
    removeScannedPackage,
    startDelivery 
  } = useWorkflow();
  
  const [manualInput, setManualInput] = useState('');
  const [isCODManual, setIsCODManual] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isStartingDelivery, setIsStartingDelivery] = useState(false);

  const totalScanned = scannedPackages.length;
  const codScanned = scannedPackages.filter(pkg => pkg.isCOD).length;
  const nonCodScanned = scannedPackages.filter(pkg => !pkg.isCOD).length;
  
  const dailyData = dailyPackages.length > 0 ? {
    totalPackages: dailyPackages.length,
    codPackages: dailyPackages.filter(pkg => pkg.isCOD).length,
    nonCodPackages: dailyPackages.filter(pkg => !pkg.isCOD).length
  } : { totalPackages: 0, codPackages: 0, nonCodPackages: 0 };
  
  const isCompleted = totalScanned === dailyData.totalPackages && 
                     codScanned === dailyData.codPackages && 
                     nonCodScanned === dailyData.nonCodPackages;

  const handleScanCamera = () => {
    setIsScanning(true);
    // Simulate camera scan
    setTimeout(() => {
      const mockTrackingNumber = `PKG${String(totalScanned + 1).padStart(3, '0')}`;
      const mockIsCOD = Math.random() > 0.5;
      const success = addScannedPackage(mockTrackingNumber, mockIsCOD);
      
      if (success) {
        toast({
          title: "Paket Berhasil Discan",
          description: `${mockTrackingNumber} - ${mockIsCOD ? 'COD' : 'Non COD'}`,
        });
      } else {
        toast({
          title: "Paket Duplikat",
          description: "Paket dengan nomor resi ini sudah pernah discan",
          variant: "destructive"
        });
      }
      
      setIsScanning(false);
    }, 2000);
  };

  const handleManualInput = () => {
    if (!manualInput.trim()) {
      toast({
        title: "Error",
        description: "Masukkan nomor resi terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const success = addScannedPackage(manualInput.trim(), isCODManual);
    
    if (success) {
      toast({
        title: "Paket Berhasil Discan",
        description: `${manualInput.trim()} - ${isCODManual ? 'COD' : 'Non COD'}`,
      });
      setManualInput('');
      setIsCODManual(false);
    } else {
      toast({
        title: "Paket Duplikat",
        description: "Paket dengan nomor resi ini sudah pernah discan",
        variant: "destructive"
      });
    }
  };

  const handleRemovePackage = (id: string) => {
    removeScannedPackage(id);
    toast({
      title: "Paket Dihapus",
      description: "Paket berhasil dihapus dari daftar scan",
    });
  };

  const handleStartDelivery = async () => {
    if (!isCompleted) return;
    
    setIsStartingDelivery(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    startDelivery();
    
    toast({
      title: "Pengantaran Dimulai",
      description: `${totalScanned} paket siap untuk diantarkan`,
    });

    setIsStartingDelivery(false);
    
    // Auto progress to next step
    setTimeout(() => {
      onStepComplete?.();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Scan & Kelola Paket
        </CardTitle>
        <CardDescription>Scan atau input manual paket yang akan dikirim</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dailyData.totalPackages === 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Silakan input data paket harian terlebih dahulu di tab "Input Paket"
            </AlertDescription>
          </Alert>
        )}

        {dailyData.totalPackages > 0 && (
          <>
            {/* Scanning Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Scan dengan Kamera</h4>
                <Button 
                  onClick={handleScanCamera} 
                  disabled={isScanning || isCompleted || isStartingDelivery}
                  className="w-full"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Scan Paket'}
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Input Manual</h4>
                <div className="space-y-2">
                  <Input
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Masukkan nomor resi"
                    disabled={isCompleted || isStartingDelivery}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="codManual"
                      checked={isCODManual}
                      onCheckedChange={(checked) => setIsCODManual(checked as boolean)}
                      disabled={isCompleted || isStartingDelivery}
                    />
                    <Label htmlFor="codManual">Paket COD</Label>
                  </div>
                  <Button 
                    onClick={handleManualInput} 
                    disabled={!manualInput.trim() || isCompleted || isStartingDelivery}
                    className="w-full"
                  >
                    Tambah Paket
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600">Target Total</p>
                <p className="text-xl font-bold">{dailyData.totalPackages}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Terscan</p>
                <p className="text-xl font-bold">{totalScanned}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">COD</p>
                <p className="text-xl font-bold text-green-600">{codScanned}/{dailyData.codPackages}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Non COD</p>
                <p className="text-xl font-bold text-blue-600">{nonCodScanned}/{dailyData.nonCodPackages}</p>
              </div>
            </div>

            {/* Status Alert */}
            {!isCompleted && totalScanned > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Scan belum selesai. Total scan: {totalScanned}, Target: {dailyData.totalPackages}
                  {codScanned !== dailyData.codPackages && ` | COD: ${codScanned}/${dailyData.codPackages}`}
                  {nonCodScanned !== dailyData.nonCodPackages && ` | Non COD: ${nonCodScanned}/${dailyData.nonCodPackages}`}
                </AlertDescription>
              </Alert>
            )}

            {isCompleted && !isStartingDelivery && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Semua paket sudah terscan dengan benar. Anda dapat memulai pengantaran.
                </AlertDescription>
              </Alert>
            )}

            {/* Scanned Packages List - "Paket Diproses" */}
            {scannedPackages.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Paket Diproses ({scannedPackages.length})</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {scannedPackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                      <div>
                        <p className="font-medium">{pkg.trackingNumber}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={pkg.isCOD ? "default" : "secondary"} className="text-xs">
                            {pkg.isCOD ? 'COD' : 'Non COD'}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-blue-600 border-blue-600">
                            Proses
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Scan: {pkg.scanTime.toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemovePackage(pkg.id)}
                        disabled={isCompleted || isStartingDelivery}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Start Delivery Button */}
            <Button 
              onClick={handleStartDelivery}
              disabled={!isCompleted || isStartingDelivery} 
              className="w-full"
              size="lg"
            >
              {isStartingDelivery ? 'Memulai Pengantaran...' : 
               isCompleted ? 'Mulai Pengantaran' : 
               `Scan ${dailyData.totalPackages - totalScanned} Paket Lagi`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ScanPackageManager;
