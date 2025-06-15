
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCourierWorkflow } from '@/hooks/useCourierWorkflow';

interface DailyPackageInputProps {
  onStepComplete?: () => void;
}

const DailyPackageInput: React.FC<DailyPackageInputProps> = ({ onStepComplete }) => {
  const { dailyPackages, createDailyPackages, loading } = useCourierWorkflow();
  const [totalPackages, setTotalPackages] = useState('');
  const [codPackages, setCodPackages] = useState('');
  const [nonCodPackages, setNonCodPackages] = useState('');

  const isDataSaved = dailyPackages.length > 0;

  useEffect(() => {
    // Load existing data if available
    if (dailyPackages.length > 0) {
      const codCount = dailyPackages.filter(pkg => pkg.is_cod).length;
      const nonCodCount = dailyPackages.length - codCount;
      
      setTotalPackages(dailyPackages.length.toString());
      setCodPackages(codCount.toString());
      setNonCodPackages(nonCodCount.toString());
    }
  }, [dailyPackages]);

  const handleSaveData = async () => {
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

    const success = await createDailyPackages(total, cod);
    
    if (success) {
      toast({
        title: "Data Tersimpan",
        description: `Total paket hari ini: ${total} (COD: ${cod}, Non COD: ${nonCod})`,
      });
    } else {
      toast({
        title: "Error",
        description: "Gagal menyimpan data paket",
        variant: "destructive"
      });
    }
  };

  const handleProceedToScan = () => {
    toast({
      title: "Melanjutkan ke Scan Paket",
      description: "Beralih ke tahap scan dan kelola paket",
    });
    
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
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
              disabled={isDataSaved || loading}
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
              disabled={isDataSaved || loading}
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
              disabled={isDataSaved || loading}
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
              Data paket harian sudah tersimpan. Total: {dailyPackages.length}, 
              COD: {dailyPackages.filter(pkg => pkg.is_cod).length}, 
              Non COD: {dailyPackages.filter(pkg => !pkg.is_cod).length}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          {!isDataSaved ? (
            <Button 
              onClick={handleSaveData} 
              disabled={!isValid || loading}
              className="flex-1"
            >
              {loading ? 'Menyimpan...' : 'Simpan Data Paket'}
            </Button>
          ) : (
            <Button 
              onClick={handleProceedToScan} 
              className="flex-1"
              disabled={loading}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Lanjut ke Scan Paket
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPackageInput;
