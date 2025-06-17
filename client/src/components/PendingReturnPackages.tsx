
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface PendingReturnPackagesProps {
  onStepComplete?: () => void;
}

const PendingReturnPackages: React.FC<PendingReturnPackagesProps> = ({ onStepComplete }) => {
  const { pendingPackages, returnAllPendingToWarehouse } = useWorkflow();
  const [leaderName, setLeaderName] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingItems = pendingPackages.filter(pkg => !pkg.returnedAt);
  const returnedItems = pendingPackages.filter(pkg => pkg.returnedAt);

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    toast({
      title: "Foto Berhasil Diambil",
      description: "Foto bukti pengembalian telah tersimpan",
    });
  };

  const handleReturnAllToWarehouse = async () => {
    if (pendingItems.length === 0) {
      toast({
        title: "Tidak Ada Paket",
        description: "Tidak ada paket pending untuk dikembalikan",
        variant: "destructive"
      });
      return;
    }

    if (!leaderName.trim() || !photoTaken) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Pastikan foto bukti dan nama leader sudah diisi",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return all pending packages to warehouse
    returnAllPendingToWarehouse(leaderName.trim(), 'photo_taken');
    
    // Reset form
    setLeaderName('');
    setPhotoTaken(false);
    setIsProcessing(false);

    toast({
      title: "Semua Paket Berhasil Dikembalikan",
      description: `${pendingItems.length} paket telah diserahkan ke leader dan dikembalikan ke gudang`,
    });

    // Trigger auto progress after all packages are returned
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Paket Pending ({pendingItems.length})
          </CardTitle>
          <CardDescription>
            Kelola paket yang pending dan perlu dikembalikan ke gudang
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingPackages.length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tidak ada paket pending. Jika ada paket yang tidak dapat terkirim, 
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

          {/* List of Pending Packages */}
          {pendingItems.length > 0 && (
            <>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Daftar Paket Pending:</h4>
                {pendingItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg bg-orange-50 border-orange-200">
                    <div className="flex items-center justify-between">
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
                  </div>
                ))}
              </div>

              {/* Single Return Form for All Packages */}
              <div className="mt-6 p-4 border border-orange-200 rounded-lg bg-orange-50">
                <h4 className="font-medium mb-4">
                  Kembalikan Semua Paket ke Gudang ({pendingItems.length} paket)
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="leader">Nama Leader Penerima</Label>
                    <Input
                      id="leader"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="Masukkan nama leader yang menerima paket"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Foto Bukti Pengembalian</Label>
                    <Button 
                      onClick={handleTakePhoto}
                      variant={photoTaken ? "outline" : "default"}
                      className="w-full"
                      disabled={isProcessing}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {photoTaken ? 'Foto Sudah Diambil ✓' : 'Ambil Foto Bukti'}
                    </Button>
                  </div>

                  <Button 
                    onClick={handleReturnAllToWarehouse}
                    disabled={!leaderName.trim() || !photoTaken || isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Sedang Memproses...' : `Serahkan ${pendingItems.length} Paket ke Leader`}
                  </Button>
                </div>
              </div>
            </>
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
