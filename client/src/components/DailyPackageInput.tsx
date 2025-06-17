
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
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
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    const savedData = sessionStorage.getItem(`dailyPackageData_${sessionId}`);
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

    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`dailyPackageData_${sessionId}`, JSON.stringify(packageData));
    
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
  };

  const handleProceedToScan = () => {
    toast({
      title: "Melanjutkan ke Scan Paket",
      description: "Beralih ke tahap scan dan kelola paket",
    });
    
    // Auto progress to next step
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="card-modern shadow-xl border border-border/50">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">Input Data Paket Harian</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Masukkan jumlah paket yang akan dikirim hari ini
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="total" className="text-sm font-semibold text-foreground">
                Total Paket
              </Label>
              <Input
                id="total"
                type="number"
                value={totalPackages}
                onChange={(e) => setTotalPackages(e.target.value)}
                placeholder="0"
                min="0"
                disabled={isDataSaved}
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="cod" className="text-sm font-semibold text-foreground">
                Paket COD
              </Label>
              <Input
                id="cod"
                type="number"
                value={codPackages}
                onChange={(e) => setCodPackages(e.target.value)}
                placeholder="0"
                min="0"
                disabled={isDataSaved}
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="nonCod" className="text-sm font-semibold text-foreground">
                Paket Non COD
              </Label>
              <Input
                id="nonCod"
                type="number"
                value={nonCodPackages}
                onChange={(e) => setNonCodPackages(e.target.value)}
                placeholder="0"
                min="0"
                disabled={isDataSaved}
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {total > 0 && (
            <Card className="glass-card p-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-3">Validasi Data</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Total Paket:</span>
                    <span className="text-xl font-bold text-primary">{total}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">COD + Non COD:</span>
                    <span className={`text-xl font-bold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {cod + nonCod}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {total > 0 && !isValid && (
            <Alert variant="destructive" className="animate-slide-up">
              <AlertTriangle className="h-5 w-5" />
              <AlertDescription className="text-base">
                Jumlah tidak sesuai! COD ({cod}) + Non COD ({nonCod}) = {cod + nonCod}, 
                seharusnya sama dengan Total Paket ({total})
              </AlertDescription>
            </Alert>
          )}

          {isValid && !isDataSaved && (
            <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-slide-up">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium text-base">
                Data valid! Total: {total}, COD: {cod}, Non COD: {nonCod}
              </AlertDescription>
            </Alert>
          )}

          {isDataSaved && (
            <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-slide-up">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium text-lg">
                Data paket harian berhasil disimpan! Total: {total}, COD: {cod}, Non COD: {nonCod}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {!isDataSaved ? (
              <Button 
                onClick={handleSaveData}
                disabled={!isValid}
                className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
              >
                <Package className="h-5 w-5 mr-2" />
                Simpan Data Paket
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleProceedToScan}
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Lanjut ke Scan Paket
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 text-lg font-medium border-2 hover:bg-muted/50 transition-all duration-200 px-8"
                >
                  Reset Data
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPackageInput;
