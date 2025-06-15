
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Camera, Package, Trash2, CheckCircle, AlertTriangle, ArrowRight, Scan } from 'lucide-react';
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

  const scanProgress = dailyData.totalPackages > 0 ? (totalScanned / dailyData.totalPackages) * 100 : 0;

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

  if (dailyData.totalPackages === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Silakan input data paket harian terlebih dahulu di step sebelumnya.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Summary Card */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
            <Scan className="h-6 w-6" />
            Progress Scanning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Paket Terscan</span>
            <span className="font-bold text-blue-600">{totalScanned}/{dailyData.totalPackages}</span>
          </div>
          <Progress value={scanProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{totalScanned}</div>
              <div className="text-sm text-gray-600">Total Scan</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{codScanned}/{dailyData.codPackages}</div>
              <div className="text-sm text-gray-600">COD</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">{nonCodScanned}/{dailyData.nonCodPackages}</div>
              <div className="text-sm text-gray-600">Non COD</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scanning Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Scan */}
        <Card className="border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Scan dengan Kamera</CardTitle>
            <CardDescription>Scan barcode/QR code paket langsung</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleScanCamera} 
              disabled={isScanning || isCompleted || isStartingDelivery}
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5 mr-2" />
                  Mulai Scan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Manual Input */}
        <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Package className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-lg">Input Manual</CardTitle>
            <CardDescription>Ketik nomor resi secara manual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tracking">Nomor Resi</Label>
              <Input
                id="tracking"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Masukkan nomor resi"
                disabled={isCompleted || isStartingDelivery}
                className="h-12"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="codManual"
                checked={isCODManual}
                onCheckedChange={(checked) => setIsCODManual(checked as boolean)}
                disabled={isCompleted || isStartingDelivery}
              />
              <Label htmlFor="codManual" className="font-medium">Paket COD</Label>
            </div>
            <Button 
              onClick={handleManualInput} 
              disabled={!manualInput.trim() || isCompleted || isStartingDelivery}
              className="w-full h-12"
              variant="outline"
            >
              <Package className="h-4 w-4 mr-2" />
              Tambah Paket
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Messages */}
      {!isCompleted && totalScanned > 0 && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Scan belum selesai!</strong> Terscan: {totalScanned}/{dailyData.totalPackages}
            {codScanned !== dailyData.codPackages && ` | COD: ${codScanned}/${dailyData.codPackages}`}
            {nonCodScanned !== dailyData.nonCodPackages && ` | Non COD: ${nonCodScanned}/${dailyData.nonCodPackages}`}
          </AlertDescription>
        </Alert>
      )}

      {isCompleted && !isStartingDelivery && (
        <Alert className="border-green-300 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>✅ Scan selesai!</strong> Semua paket sudah terscan dengan benar. Siap untuk pengantaran.
          </AlertDescription>
        </Alert>
      )}

      {/* Scanned Packages List */}
      {scannedPackages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Paket Terscan ({scannedPackages.length})</span>
              <Badge variant="secondary" className="ml-2">
                {Math.round(scanProgress)}% Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {scannedPackages.map((pkg, index) => (
                <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{pkg.trackingNumber}</span>
                        <Badge 
                          variant={pkg.isCOD ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {pkg.isCOD ? 'COD' : 'Non COD'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Scan: {pkg.scanTime.toLocaleTimeString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemovePackage(pkg.id)}
                    disabled={isCompleted || isStartingDelivery}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <Button 
            onClick={handleStartDelivery}
            disabled={!isCompleted || isStartingDelivery} 
            className={`w-full h-16 text-lg font-semibold ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                : 'bg-gray-400'
            }`}
            size="lg"
          >
            {isStartingDelivery ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memulai Pengantaran...
              </>
            ) : isCompleted ? (
              <>
                <ArrowRight className="h-6 w-6 mr-2" />
                Mulai Pengantaran ({totalScanned} Paket)
              </>
            ) : (
              `Scan ${dailyData.totalPackages - totalScanned} Paket Lagi`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanPackageManager;
