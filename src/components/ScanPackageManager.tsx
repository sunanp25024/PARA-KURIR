
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Package, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScannedPackage {
  id: string;
  trackingNumber: string;
  isCOD: boolean;
  scanTime: Date;
}

const ScanPackageManager = () => {
  const [scannedPackages, setScannedPackages] = useState<ScannedPackage[]>([]);
  const [manualInput, setManualInput] = useState('');
  const [isCODManual, setIsCODManual] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [dailyPackageData, setDailyPackageData] = useState({
    totalPackages: 0,
    codPackages: 0,
    nonCodPackages: 0
  });

  useEffect(() => {
    // Load daily package data
    const savedData = localStorage.getItem('dailyPackageData');
    if (savedData) {
      setDailyPackageData(JSON.parse(savedData));
    }

    // Load scanned packages
    const savedScanned = localStorage.getItem('scannedPackages');
    if (savedScanned) {
      const packages = JSON.parse(savedScanned);
      setScannedPackages(packages.map((pkg: any) => ({
        ...pkg,
        scanTime: new Date(pkg.scanTime)
      })));
    }
  }, []);

  useEffect(() => {
    // Save scanned packages to localStorage
    localStorage.setItem('scannedPackages', JSON.stringify(scannedPackages));
  }, [scannedPackages]);
  
  const totalScanned = scannedPackages.length;
  const codScanned = scannedPackages.filter(pkg => pkg.isCOD).length;
  const nonCodScanned = scannedPackages.filter(pkg => !pkg.isCOD).length;
  
  const isCompleted = totalScanned === dailyPackageData.totalPackages && 
                     codScanned === dailyPackageData.codPackages && 
                     nonCodScanned === dailyPackageData.nonCodPackages;

  const handleScanCamera = () => {
    setIsScanning(true);
    // Simulate camera scan
    setTimeout(() => {
      const mockTrackingNumber = `PKG${Date.now()}`;
      addPackage(mockTrackingNumber, Math.random() > 0.5);
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

    addPackage(manualInput.trim(), isCODManual);
    setManualInput('');
    setIsCODManual(false);
  };

  const addPackage = (trackingNumber: string, isCOD: boolean) => {
    // Check for duplicates
    if (scannedPackages.some(pkg => pkg.trackingNumber === trackingNumber)) {
      toast({
        title: "Paket Duplikat",
        description: "Paket dengan nomor resi ini sudah pernah discan",
        variant: "destructive"
      });
      return;
    }

    const newPackage: ScannedPackage = {
      id: `scan_${Date.now()}`,
      trackingNumber,
      isCOD,
      scanTime: new Date()
    };

    setScannedPackages(prev => [...prev, newPackage]);
    
    toast({
      title: "Paket Berhasil Discan",
      description: `${trackingNumber} - ${isCOD ? 'COD' : 'Non COD'}`,
    });
  };

  const removePackage = (id: string) => {
    setScannedPackages(prev => prev.filter(pkg => pkg.id !== id));
    toast({
      title: "Paket Dihapus",
      description: "Paket berhasil dihapus dari daftar scan",
    });
  };

  const handleStartDelivery = () => {
    if (isCompleted) {
      // Set packages to delivery status
      localStorage.setItem('deliveryPackages', JSON.stringify(scannedPackages));
      
      toast({
        title: "Pengiriman Dimulai",
        description: `${totalScanned} paket siap untuk dikirim`,
      });
    }
  };

  const canStartDelivery = () => {
    if (dailyPackageData.totalPackages === 0) return false;
    return isCompleted;
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
        {dailyPackageData.totalPackages === 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Silakan input data paket harian terlebih dahulu di tab "Input Paket"
            </AlertDescription>
          </Alert>
        )}

        {dailyPackageData.totalPackages > 0 && (
          <>
            {/* Scanning Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Scan dengan Kamera</h4>
                <Button 
                  onClick={handleScanCamera} 
                  disabled={isScanning || canStartDelivery()}
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
                    disabled={canStartDelivery()}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="codManual"
                      checked={isCODManual}
                      onCheckedChange={(checked) => setIsCODManual(checked as boolean)}
                    />
                    <Label htmlFor="codManual">Paket COD</Label>
                  </div>
                  <Button 
                    onClick={handleManualInput} 
                    disabled={!manualInput.trim() || canStartDelivery()}
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
                <p className="text-xl font-bold">{dailyPackageData.totalPackages}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Terscan</p>
                <p className="text-xl font-bold">{totalScanned}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">COD</p>
                <p className="text-xl font-bold text-green-600">{codScanned}/{dailyPackageData.codPackages}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Non COD</p>
                <p className="text-xl font-bold text-blue-600">{nonCodScanned}/{dailyPackageData.nonCodPackages}</p>
              </div>
            </div>

            {/* Status Alert */}
            {!isCompleted && totalScanned > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Scan belum selesai. Total scan: {totalScanned}, Target: {dailyPackageData.totalPackages}
                  {codScanned !== dailyPackageData.codPackages && ` | COD: ${codScanned}/${dailyPackageData.codPackages}`}
                  {nonCodScanned !== dailyPackageData.nonCodPackages && ` | Non COD: ${nonCodScanned}/${dailyPackageData.nonCodPackages}`}
                </AlertDescription>
              </Alert>
            )}

            {isCompleted && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Semua paket sudah terscan dengan benar. Anda dapat memulai pengiriman.
                </AlertDescription>
              </Alert>
            )}

            {/* Scanned Packages List */}
            {scannedPackages.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Paket Terscan ({scannedPackages.length})</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {scannedPackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{pkg.trackingNumber}</p>
                        <p className="text-sm text-gray-600">
                          Scan: {pkg.scanTime.toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={pkg.isCOD ? "default" : "secondary"}>
                          {pkg.isCOD ? 'COD' : 'Non COD'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removePackage(pkg.id)}
                          disabled={isCompleted}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Start Delivery Button */}
            <Button 
              onClick={handleStartDelivery}
              disabled={!canStartDelivery()} 
              className="w-full"
              size="lg"
            >
              {canStartDelivery() ? 'Mulai Proses Pengiriman' : `Scan ${dailyPackageData.totalPackages - totalScanned} Paket Lagi`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ScanPackageManager;
