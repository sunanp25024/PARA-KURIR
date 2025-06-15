
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, CheckCircle, Package, AlertTriangle, Clock, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface DeliveryTrackingProps {
  onStepComplete?: () => void;
}

const DeliveryTracking: React.FC<DeliveryTrackingProps> = ({ onStepComplete }) => {
  const {
    deliveryPackages,
    deliveredPackages,
    pendingPackages,
    markAsDelivered,
    markAsPending
  } = useWorkflow();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [pendingReason, setPendingReason] = useState('');

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    toast({
      title: "Foto Berhasil Diambil",
      description: "Bukti pengiriman telah tersimpan",
    });
  };

  const handleCompleteDelivery = () => {
    if (!selectedItem || !recipientName.trim() || !photoTaken) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Pastikan foto bukti dan nama penerima sudah diisi",
        variant: "destructive"
      });
      return;
    }

    markAsDelivered(selectedItem, recipientName.trim(), 'photo_taken');
    
    // Reset form
    setSelectedItem(null);
    setRecipientName('');
    setPhotoTaken(false);

    toast({
      title: "Pengiriman Selesai",
      description: "Paket berhasil ditandai sebagai terkirim",
    });

    // Check if all packages are processed and trigger auto progress
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  const handleMarkAsPending = (packageId?: string) => {
    const targetPackageId = packageId || selectedItem;
    if (!targetPackageId) return;

    const reason = pendingReason.trim() || 'Tidak dapat terkirim';
    markAsPending(targetPackageId, reason);
    
    // Reset form if it was the selected item
    if (targetPackageId === selectedItem) {
      setSelectedItem(null);
      setRecipientName('');
      setPhotoTaken(false);
      setPendingReason('');
    }

    toast({
      title: "Paket Pending/Return",
      description: "Paket telah ditandai sebagai pending/return",
    });

    // Check if all packages are processed and trigger auto progress
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  const handleMarkAsReturn = (packageId?: string) => {
    const targetPackageId = packageId || selectedItem;
    if (!targetPackageId) return;

    const reason = 'Return ke gudang';
    markAsPending(targetPackageId, reason);
    
    // Reset form if it was the selected item
    if (targetPackageId === selectedItem) {
      setSelectedItem(null);
      setRecipientName('');
      setPhotoTaken(false);
      setPendingReason('');
    }

    toast({
      title: "Paket Return",
      description: "Paket telah ditandai untuk dikembalikan ke gudang",
    });

    // Check if all packages are processed and trigger auto progress
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  const inDeliveryItems = deliveryPackages.filter(pkg => 
    !deliveredPackages.some(delivered => delivered.id === pkg.id) &&
    !pendingPackages.some(pending => pending.id === pkg.id)
  );

  const completedDeliveries = deliveredPackages.filter(pkg => 
    deliveryPackages.some(delivery => delivery.id === pkg.id)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Pengantaran Aktif ({inDeliveryItems.length})
          </CardTitle>
          <CardDescription>
            Kelola proses pengantaran paket. Setiap paket dapat ditandai sebagai: Terkirim, Pending, atau Return.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveryPackages.length === 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Belum ada paket untuk dikirim. Silakan selesaikan proses scan terlebih dahulu di tab "Scan & Kelola".
              </AlertDescription>
            </Alert>
          )}

          {inDeliveryItems.length === 0 && deliveryPackages.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>Semua paket sudah selesai diproses</p>
            </div>
          )}

          {inDeliveryItems.length > 0 && (
            <div className="space-y-3">
              {inDeliveryItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedItem === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <Badge variant={item.isCOD ? "default" : "secondary"}>
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                    </div>
                    <Badge variant="outline">Dalam Pengantaran</Badge>
                  </div>

                  {/* Quick Action Buttons for each package */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedItem(item.id)}
                      variant={selectedItem === item.id ? "default" : "outline"}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Terkirim
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMarkAsPending(item.id)}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMarkAsReturn(item.id)}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Return
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Form - Only show when item is selected for "Terkirim" */}
          {selectedItem && (
            <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-medium mb-4">Proses Pengantaran - {deliveryPackages.find(p => p.id === selectedItem)?.trackingNumber}</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Nama Penerima</Label>
                  <Input
                    id="recipient"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Masukkan nama penerima"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto Bukti Pengiriman</Label>
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
                    onClick={handleCompleteDelivery}
                    disabled={!recipientName.trim() || !photoTaken}
                    className="w-full"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Selesaikan Pengiriman
                  </Button>
                  
                  <Button 
                    onClick={() => setSelectedItem(null)}
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

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Paket Terkirim ({completedDeliveries.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedDeliveries.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Penerima: {item.recipientName}</p>
                      <p className="text-sm text-gray-600">
                        Terkirim: {new Date(item.deliveredAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={item.isCOD ? "default" : "secondary"}>
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Terkirim ✓
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

export default DeliveryTracking;
