
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface DailyPackageInputProps {
  onStepComplete?: () => void;
}

const DailyPackageInput: React.FC<DailyPackageInputProps> = ({ onStepComplete }) => {
  const { setDailyPackages } = useWorkflow();
  const [totalPackages, setTotalPackages] = useState('');
  const [codPackages, setCodPackages] = useState('');
  const [nonCodPackages, setNonCodPackages] = useState('');
  const [isDataSaved, setIsDataSaved] = useState(false);

  useEffect(() => {
    // Load existing data
    const savedData = localStorage.getItem('dailyPackageData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setTotalPackages(data.totalPackages.toString());
      setCodPackages(data.codPackages.toString());
      setNonCodPackages(data.nonCodPackages.toString());
      setIsDataSaved(true);
    }
  }, []);

  const handleSaveData = () => {
    const total = parseInt(totalPackages) || 0;
    const cod = parseInt(codPackages) || 0;
    const nonCod = parseInt(nonCodPackages) || 0;

    if (total === 0) {
      toast({
        title: "Error",
        description: "Total paket harus lebih dari 0",
        variant: "destructive"
      });
      return;
    }

    if (cod + nonCod !== total) {
      toast({
        title: "Error Sinkronisasi",
        description: `Total COD (${cod}) + Non COD (${nonCod}) = ${cod + nonCod} tidak sama dengan Total Paket (${total})`,
        variant: "destructive"
      });
      return;
    }

    const packageData = {
      totalPackages: total,
      codPackages: cod,
      nonCodPackages: nonCod,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('dailyPackageData', JSON.stringify(packageData));
    
    // Generate daily packages for workflow context
    const dailyPackages = Array.from({ length: total }, (_, i) => ({
      id: `daily_${Date.now()}_${i}`,
      trackingNumber: `PKG${String(i + 1).padStart(3, '0')}`,
      isCOD: i < cod
    }));
    
    setDailyPackages(dailyPackages);
    
    // Clear any existing scanned packages when new data is input
    localStorage.removeItem('scannedPackages');
    
    setIsDataSaved(true);
    
    toast({
      title: "Data Tersimpan",
      description: `Total paket hari ini: ${total} (COD: ${cod}, Non COD: ${nonCod})`,
    });

    // Auto progress to next step
    setTimeout(() => {
      onStepComplete?.();
    }, 1000);
  };

  const handleReset = () => {
    setTotalPackages('');
    setCodPackages('');
    setNonCodPackages('');
    setIsDataSaved(false);
    setDailyPackages([]);
    localStorage.removeItem('dailyPackageData');
    localStorage.removeItem('scannedPackages');
    
    toast({
      title: "Data Direset",
      description: "Semua data paket harian telah dihapus",
    });
  };

  const total = parseInt(totalPackages) || 0;
  const cod = parseInt(codPackages) || 0;
  const nonCod = parseInt(nonCodPackages) || 0;
  const isValid = total > 0 && (cod + nonCod === total);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Data Input Paket Harian
        </CardTitle>
        <CardDescription>Input jumlah total paket yang akan dikirim hari ini</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="total">Total Paket</Label>
            <Input
              id="total"
              type="number"
              value={totalPackages}
              onChange={(e) => setTotalPackages(e.target.value)}
              placeholder="0"
              disabled={isDataSaved}
            />
          </div>
          <div>
            <Label htmlFor="cod">Paket COD</Label>
            <Input
              id="cod"
              type="number"
              value={codPackages}
              onChange={(e) => setCodPackages(e.target.value)}
              placeholder="0"
              disabled={isDataSaved}
            />
          </div>
          <div>
            <Label htmlFor="nonCod">Paket Non COD</Label>
            <Input
              id="nonCod"
              type="number"
              value={nonCodPackages}
              onChange={(e) => setNonCodPackages(e.target.value)}
              placeholder="0"
              disabled={isDataSaved}
            />
          </div>
        </div>

        {/* Validation Alert */}
        {total > 0 && !isValid && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Jumlah tidak sesuai! COD ({cod}) + Non COD ({nonCod}) = {cod + nonCod}, 
              seharusnya sama dengan Total Paket ({total})
            </AlertDescription>
          </Alert>
        )}

        {isValid && !isDataSaved && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Data valid! Total: {total}, COD: {cod}, Non COD: {nonCod}
            </AlertDescription>
          </Alert>
        )}

        {isDataSaved && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Data paket harian sudah tersimpan. Total: {total}, COD: {cod}, Non COD: {nonCod}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          {!isDataSaved ? (
            <Button 
              onClick={handleSaveData} 
              disabled={!isValid}
              className="flex-1"
            >
              Simpan Data Paket
            </Button>
          ) : (
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="flex-1"
            >
              Reset & Input Ulang
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPackageInput;
