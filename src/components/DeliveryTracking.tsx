
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, CheckCircle, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DeliveryItem {
  id: string;
  trackingNumber: string;
  isCOD: boolean;
  recipientName?: string;
  proofPhoto?: string;
  deliveredAt?: Date;
  status: 'in-delivery' | 'delivered';
}

const DeliveryTracking = () => {
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load scanned packages from localStorage
  React.useEffect(() => {
    const scannedPackages = JSON.parse(localStorage.getItem('scannedPackages') || '[]');
    const items: DeliveryItem[] = scannedPackages.map((pkg: any) => ({
      id: pkg.id,
      trackingNumber: pkg.trackingNumber,
      isCOD: pkg.isCOD,
      status: 'in-delivery'
    }));
    setDeliveryItems(items);
  }, []);

  const handleTakePhoto = () => {
    // Simulate taking photo
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

    setDeliveryItems(prev => prev.map(item => 
      item.id === selectedItem 
        ? { 
            ...item, 
            status: 'delivered' as const,
            recipientName: recipientName.trim(),
            proofPhoto: 'taken',
            deliveredAt: new Date()
          }
        : item
    ));

    // Reset form
    setSelectedItem(null);
    setRecipientName('');
    setPhotoTaken(false);

    toast({
      title: "Pengiriman Selesai",
      description: "Status paket berhasil diupdate menjadi terkirim",
    });
  };

  const inDeliveryItems = deliveryItems.filter(item => item.status === 'in-delivery');
  const deliveredItems = deliveryItems.filter(item => item.status === 'delivered');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Sedang Dalam Pengantaran ({inDeliveryItems.length})
          </CardTitle>
          <CardDescription>Kelola paket yang sedang dalam proses pengiriman</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {inDeliveryItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada paket dalam pengantaran
            </div>
          ) : (
            <div className="space-y-3">
              {inDeliveryItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedItem(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <Badge variant={item.isCOD ? "default" : "secondary"}>
                        {item.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                    </div>
                    <Badge variant="outline">Dalam Pengantaran</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Form */}
          {selectedItem && (
            <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-medium mb-4">Selesaikan Pengiriman</h4>
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

                <Button 
                  onClick={handleCompleteDelivery}
                  disabled={!recipientName.trim() || !photoTaken}
                  className="w-full"
                >
                  Selesaikan Pengiriman
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivered Items */}
      {deliveredItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Paket Terkirim ({deliveredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deliveredItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Penerima: {item.recipientName}</p>
                      <p className="text-sm text-gray-600">
                        Terkirim: {item.deliveredAt?.toLocaleString('id-ID')}
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
