
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Camera, CheckCircle, Package, AlertTriangle, Clock, Truck, ArrowRight } from 'lucide-react';
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

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    toast({
      title: "Foto Berhasil Diambil",
      description: "Bukti pengiriman telah tersimpan",
    });
  };

  const handleCompleteDelivery = async () => {
    if (!selectedPackageId || !recipientName.trim() || !photoTaken) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Pastikan foto bukti dan nama penerima sudah diisi",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    markAsDelivered(selectedPackageId, recipientName.trim(), 'photo_taken');
    
    // Reset form
    setSelectedPackageId(null);
    setRecipientName('');
    setPhotoTaken(false);
    setIsProcessing(false);
    setDialogOpen(false);

    toast({
      title: "Pengiriman Selesai",
      description: "Paket berhasil ditandai sebagai terkirim",
    });

    // Check if all packages are processed and trigger auto progress
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  const handleMarkAsPending = async (packageId: string) => {
    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const reason = 'Tidak dapat terkirim';
    markAsPending(packageId, reason);
    
    setIsProcessing(false);

    toast({
      title: "Paket Pending",
      description: "Paket telah ditandai sebagai pending",
    });

    // Check if all packages are processed and trigger auto progress
    setTimeout(() => {
      onStepComplete?.();
    }, 500);
  };

  const openDeliveryDialog = (packageId: string) => {
    setSelectedPackageId(packageId);
    setRecipientName('');
    setPhotoTaken(false);
    setDialogOpen(true);
  };

  const inDeliveryItems = deliveryPackages.filter(pkg => 
    !deliveredPackages.some(delivered => delivered.id === pkg.id) &&
    !pendingPackages.some(pending => pending.id === pkg.id)
  );

  const completedDeliveries = deliveredPackages.filter(pkg => 
    deliveryPackages.some(delivery => delivery.id === pkg.id)
  );

  const totalPackages = deliveryPackages.length;
  const completedCount = deliveredPackages.length + pendingPackages.length;
  const deliveryProgress = totalPackages > 0 ? (completedCount / totalPackages) * 100 : 0;

  if (deliveryPackages.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Belum ada paket untuk dikirim. Silakan selesaikan proses scan terlebih dahulu.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-orange-800">
            <Truck className="h-6 w-6" />
            Progress Pengantaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Paket Selesai</span>
            <span className="font-bold text-orange-600">{completedCount}/{totalPackages}</span>
          </div>
          <Progress value={deliveryProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">{inDeliveryItems.length}</div>
              <div className="text-sm text-gray-600">Sedang Antar</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{deliveredPackages.length}</div>
              <div className="text-sm text-gray-600">Terkirim</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-yellow-600">{pendingPackages.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Items */}
      {inDeliveryItems.length === 0 && deliveryPackages.length > 0 ? (
        <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 font-medium text-lg">
            🎉 Semua paket sudah selesai diproses! Pengantaran hari ini telah selesai.
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Paket untuk Diantar ({inDeliveryItems.length})
            </CardTitle>
            <CardDescription>
              Pilih aksi untuk setiap paket: Tandai sebagai terkirim atau pending
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inDeliveryItems.map((item, index) => (
              <div 
                key={item.id} 
                className="p-4 border-2 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{item.trackingNumber}</p>
                      <Badge variant={item.isCOD ? "default" : "secondary"} className="mt-1">
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600 bg-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Dalam Pengantaran
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Dialog open={dialogOpen && selectedPackageId === item.id} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => openDeliveryDialog(item.id)}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 h-12"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Terkirim
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Selesaikan Pengiriman
                        </DialogTitle>
                        <DialogDescription>
                          Paket: <strong>{item.trackingNumber}</strong>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="recipient">Nama Penerima</Label>
                          <Input
                            id="recipient"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Masukkan nama penerima"
                            disabled={isProcessing}
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label>Foto Bukti Pengiriman</Label>
                          <Button 
                            onClick={handleTakePhoto}
                            variant={photoTaken ? "outline" : "default"}
                            className={`w-full h-12 ${photoTaken ? 'border-green-300 bg-green-50 text-green-700' : ''}`}
                            disabled={isProcessing}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            {photoTaken ? 'Foto Sudah Diambil ✓' : 'Ambil Foto Bukti'}
                          </Button>
                        </div>

                        <Button 
                          onClick={handleCompleteDelivery}
                          disabled={!recipientName.trim() || !photoTaken || isProcessing}
                          className="w-full h-12 bg-green-600 hover:bg-green-700"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Memproses...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Selesaikan Pengiriman
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleMarkAsPending(item.id)}
                    disabled={isProcessing}
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-12"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Paket Terkirim ({completedDeliveries.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {completedDeliveries.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-semibold text-green-600">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Penerima: {item.recipientName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.deliveredAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={item.isCOD ? "default" : "secondary"} className="text-xs">
                      {item.isCOD ? 'COD' : 'Non COD'}
                    </Badge>
                    <Badge className="text-xs bg-green-100 text-green-800 border-green-300">
                      Terkirim
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Continue Button - Only show when all packages are completed */}
      {inDeliveryItems.length === 0 && deliveryPackages.length > 0 && (
        <Card className="card-modern border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-xl">
          <CardContent className="pt-6">
            <Button 
              onClick={() => onStepComplete?.()}
              size="lg"
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <CheckCircle className="h-6 w-6 mr-3" />
              Selesai - Lanjut ke Tahap Berikutnya
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DeliveryTracking;
