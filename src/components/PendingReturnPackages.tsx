
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Package, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface PendingReturnPackagesProps {
  onStepComplete?: () => void;
}

const PendingReturnPackages: React.FC<PendingReturnPackagesProps> = ({ onStepComplete }) => {
  const { pendingPackages, returnToWarehouse } = useWorkflow();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [leaderName, setLeaderName] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const pendingItems = pendingPackages.filter(pkg => !pkg.returnedAt);
  const returnedItems = pendingPackages.filter(pkg => pkg.returnedAt);

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    toast({
      title: "Foto Berhasil Diambil",
      description: "Foto bukti pengembalian telah tersimpan",
    });
  };

  const handleReturnToWarehouse = () => {
    if (!selectedPackage || !leaderName.trim() || !photoTaken) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Pastikan foto bukti dan nama leader sudah diisi",
        variant: "destructive"
      });
      return;
    }

    returnToWarehouse(selectedPackage, leaderName.trim(), 'photo_taken');
    
    // Reset form
    setSelectedPackage(null);
    setLeaderName('');
    setPhotoTaken(false);

    toast({
      title: "Paket Berhasil Dikembalikan",
      description: "Paket telah diserahkan ke leader dan dikembalikan ke gudang",
    });

    // Check if all pending packages are returned and trigger auto progress
    setTimeout(() => {
      if (pendingPackages.every(pkg => pkg.returnedAt)) {
        onStepComplete?.();
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Paket Pending/Return ({pendingItems.length})
          </CardTitle>
          <CardDescription>
            Kelola paket yang pending atau perlu dikembalikan ke gudang
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingPackages.length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tidak ada paket pending/return. Jika ada paket yang tidak dapat terkirim, 
                tandai sebagai pending di tab 'Pengantaran'
              </AlertDescription>
            </Alert>
          )}

          {pendingItems.length === 0 && pendingPackages.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>Semua paket pending sudah dikembalikan ke gudang</p>
            </div>
          )}

          {pendingItems.length > 0 && (
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedPackage === item.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Alasan: {item.reason}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={item.isCOD ? "default" : "secondary"}>
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Pending
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    onClick={() => setSelectedPackage(item.id)}
                    variant={selectedPackage === item.id ? "default" : "outline"}
                    className="w-full"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    {selectedPackage === item.id ? 'Sedang Diproses' : 'Kembalikan ke Gudang'}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Return Form - Only show when package is selected */}
          {selectedPackage && (
            <div className="mt-6 p-4 border border-orange-200 rounded-lg bg-orange-50">
              <h4 className="font-medium mb-4">
                Proses Pengembalian - {pendingPackages.find(p => p.id === selectedPackage)?.trackingNumber}
              </h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leader">Nama Leader Penerima</Label>
                  <Input
                    id="leader"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="Masukkan nama leader yang menerima paket"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto Bukti Pengembalian</Label>
                  <Button 
                    onClick={handleTakePhoto}
                    variant={photoTaken ? "outline" : "default"}
                    className="w-full"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {photoTaken ? 'Foto Sudah Diambil ✓' : 'Ambil Foto Bukti'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    onClick={handleReturnToWarehouse}
                    disabled={!leaderName.trim() || !photoTaken}
                    className="w-full"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Serahkan ke Leader
                  </Button>
                  
                  <Button 
                    onClick={() => setSelectedPackage(null)}
                    variant="outline"
                    className="w-full"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Returned Packages */}
      {returnedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Paket Sudah Dikembalikan ({returnedItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {returnedItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Leader: {item.leaderName}</p>
                      <p className="text-sm text-gray-600">
                        Dikembalikan: {item.returnedAt ? new Date(item.returnedAt).toLocaleString('id-ID') : '-'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={item.isCOD ? "default" : "secondary"}>
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Dikembalikan ✓
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PendingReturnPackages;
