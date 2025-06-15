
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
    <div className="min-h-screen bg-gray-50 px-2 py-3 sm:px-4 sm:py-4 max-w-md mx-auto">
      {/* Header - Responsive spacing */}
      <Card className="mb-3 sm:mb-4">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl font-bold truncate">INSAN MOBILE KURIR</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Kurir: Ahmad Kurniawan</p>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm h-auto sm:h-9 shrink-0"
              size="sm"
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
              <span className="hidden xs:inline">{isOnline ? 'OFFLINE' : 'ONLINE'}</span>
              <span className="xs:hidden">{isOnline ? 'OFF' : 'ON'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status & Location - Improved spacing */}
      <Card className="mb-3 sm:mb-4">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-0.5 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Lokasi Saat Ini:</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6 mb-3 break-words">{currentLocation}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant={isOnline ? "default" : "secondary"} className="text-xs">
              {isOnline ? 'Siap Terima' : 'Tidak Aktif'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {activeDeliveries.length} Paket
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Responsive grid */}
      <Card className="mb-3 sm:mb-4">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button 
              onClick={handleScanPackage} 
              className="flex flex-col gap-1 sm:gap-2 h-16 sm:h-20 text-xs sm:text-sm"
            >
              <Camera className="h-4 w-4 sm:h-6 sm:w-6" />
              <span>Scan Paket</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 sm:gap-2 h-16 sm:h-20 text-xs sm:text-sm"
            >
              <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
              <span>Absen</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 sm:gap-2 h-16 sm:h-20 text-xs sm:text-sm"
            >
              <Truck className="h-4 w-4 sm:h-6 sm:w-6" />
              <span>Performa</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 sm:gap-2 h-16 sm:h-20 text-xs sm:text-sm"
            >
              <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6" />
              <span>Pesan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries - Improved responsive design */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            Pengiriman Aktif ({activeDeliveries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs sm:text-sm">Tidak ada pengiriman aktif</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base truncate">{delivery.id}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{delivery.recipient}</p>
                      </div>
                      <Badge 
                        variant={delivery.type === 'COD' ? 'default' : 'secondary'}
                        className="text-xs shrink-0"
                      >
                        {delivery.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-gray-500 shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-600 break-words">{delivery.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-600 break-all">{delivery.phone}</p>
                      </div>
                      {delivery.type === 'COD' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium text-green-600 break-words">
                            Tagihan: {delivery.amount}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1 sm:gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleNavigate(delivery.address)}
                        className="p-2 h-auto text-xs"
                        title="Navigate"
                      >
                        <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTakePhoto(delivery.id)}
                        className="p-2 h-auto text-xs"
                        title="Take Photo"
                      >
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="p-2 h-auto text-xs"
                        title="Complete"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
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
