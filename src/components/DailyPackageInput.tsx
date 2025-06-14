
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DailyPackageInput = () => {
  const [packageData, setPackageData] = useState({
    totalPackages: 0,
    codPackages: 0,
    nonCodPackages: 0
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: number) => {
    setPackageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isDataSynced = packageData.codPackages + packageData.nonCodPackages === packageData.totalPackages;
  const showWarning = packageData.totalPackages > 0 && !isDataSynced;

  const handleSubmit = () => {
    if (!isDataSynced) {
      toast({
        title: "Data Tidak Sinkron",
        description: "Total COD + Non COD harus sama dengan Total Paket",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    localStorage.setItem('dailyPackageData', JSON.stringify(packageData));
    
    toast({
      title: "Data Tersimpan",
      description: "Data input paket harian berhasil disimpan",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Data Input Paket Harian
        </CardTitle>
        <CardDescription>Input total paket yang akan dibawa hari ini</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="totalPackages">Total Paket</Label>
            <Input
              id="totalPackages"
              type="number"
              value={packageData.totalPackages}
              onChange={(e) => handleInputChange('totalPackages', Number(e.target.value))}
              placeholder="0"
              disabled={isSubmitted}
            />
          </div>
          <div>
            <Label htmlFor="codPackages">Paket COD</Label>
            <Input
              id="codPackages"
              type="number"
              value={packageData.codPackages}
              onChange={(e) => handleInputChange('codPackages', Number(e.target.value))}
              placeholder="0"
              disabled={isSubmitted}
            />
          </div>
          <div>
            <Label htmlFor="nonCodPackages">Paket Non COD</Label>
            <Input
              id="nonCodPackages"
              type="number"
              value={packageData.nonCodPackages}
              onChange={(e) => handleInputChange('nonCodPackages', Number(e.target.value))}
              placeholder="0"
              disabled={isSubmitted}
            />
          </div>
        </div>

        {showWarning && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Peringatan: Total COD ({packageData.codPackages}) + Non COD ({packageData.nonCodPackages}) = {packageData.codPackages + packageData.nonCodPackages} 
              tidak sama dengan Total Paket ({packageData.totalPackages})
            </AlertDescription>
          </Alert>
        )}

        {isDataSynced && packageData.totalPackages > 0 && (
          <Alert>
            <Package className="h-4 w-4" />
            <AlertDescription>
              Data tersinkronisasi dengan benar: {packageData.totalPackages} paket total
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={!isDataSynced || packageData.totalPackages === 0 || isSubmitted}
          className="w-full"
        >
          {isSubmitted ? 'Data Sudah Disimpan' : 'Simpan Data Paket Harian'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyPackageInput;
