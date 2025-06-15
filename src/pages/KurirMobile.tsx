
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Camera, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle,
  Truck,
  Phone,
  MessageSquare,
  Navigation
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const KurirMobile = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Menunggu lokasi...');
  const [activeDeliveries, setActiveDeliveries] = useState([
    {
      id: 'PKG001',
      recipient: 'Budi Santoso',
      address: 'Jl. Sudirman No. 123, Jakarta',
      phone: '081234567890',
      type: 'COD',
      amount: 'Rp 150.000'
    },
    {
      id: 'PKG002', 
      recipient: 'Siti Nurhaliza',
      address: 'Jl. Gatot Subroto No. 45, Jakarta',
      phone: '081987654321',
      type: 'Regular',
      amount: '-'
    }
  ]);

  useEffect(() => {
    // Simulasi mendapatkan lokasi
    setTimeout(() => {
      setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
    }, 2000);
  }, []);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Status Offline" : "Status Online",
      description: isOnline ? "Anda sedang offline" : "Anda sedang online dan siap menerima pesanan",
    });
  };

  const handleScanPackage = () => {
    toast({
      title: "Kamera Aktif",
      description: "Arahkan kamera ke QR Code paket",
    });
  };

  const handleTakePhoto = (packageId: string) => {
    toast({
      title: "Foto Bukti Pengiriman",
      description: `Foto bukti untuk ${packageId} berhasil diambil`,
    });
  };

  const handleCompleteDelivery = (packageId: string) => {
    setActiveDeliveries(prev => prev.filter(pkg => pkg.id !== packageId));
    toast({
      title: "Pengiriman Selesai",
      description: `Paket ${packageId} berhasil dikirim`,
    });
  };

  const handleNavigate = (address: string) => {
    toast({
      title: "Navigasi Aktif",
      description: `Membuka navigasi ke: ${address}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 max-w-md mx-auto overflow-x-hidden">
      {/* Header - Fixed height to prevent overlap */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">INSAN MOBILE KURIR</h1>
              <p className="text-sm text-gray-600 truncate">Kurir: Ahmad Kurniawan</p>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className="flex items-center gap-2 px-3 py-2 text-sm h-10 shrink-0"
              size="sm"
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
              <span>{isOnline ? 'OFFLINE' : 'ONLINE'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status & Location - Better spacing */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <span className="text-sm font-medium">Lokasi Saat Ini:</span>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed break-words">{currentLocation}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant={isOnline ? "default" : "secondary"} className="text-xs px-2 py-1">
              {isOnline ? 'Siap Terima' : 'Tidak Aktif'}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1">
              {activeDeliveries.length} Paket
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Better grid spacing */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleScanPackage} 
              className="flex flex-col gap-2 h-20 text-sm p-3"
            >
              <Camera className="h-5 w-5" />
              <span>Scan Paket</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 text-sm p-3"
            >
              <Clock className="h-5 w-5" />
              <span>Absen</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 text-sm p-3"
            >
              <Truck className="h-5 w-5" />
              <span>Performa</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 text-sm p-3"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Pesan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries - Better layout */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-5 w-5" />
            Pengiriman Aktif ({activeDeliveries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Tidak ada pengiriman aktif</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border border-l-4 border-l-blue-500 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{delivery.id}</p>
                        <p className="text-sm text-gray-600 truncate">{delivery.recipient}</p>
                      </div>
                      <Badge 
                        variant={delivery.type === 'COD' ? 'default' : 'secondary'}
                        className="text-xs shrink-0 px-2 py-1"
                      >
                        {delivery.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500 shrink-0" />
                        <p className="text-sm text-gray-600 break-words leading-relaxed">{delivery.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                        <p className="text-sm text-gray-600">{delivery.phone}</p>
                      </div>
                      {delivery.type === 'COD' && (
                        <div className="bg-green-50 p-2 rounded-md">
                          <span className="text-sm font-medium text-green-700">
                            Tagihan: {delivery.amount}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleNavigate(delivery.address)}
                        className="p-2 h-10 text-xs flex items-center justify-center"
                        title="Navigate"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTakePhoto(delivery.id)}
                        className="p-2 h-10 text-xs flex items-center justify-center"
                        title="Take Photo"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="p-2 h-10 text-xs flex items-center justify-center"
                        title="Complete"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KurirMobile;
