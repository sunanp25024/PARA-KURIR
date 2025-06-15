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
  Navigation,
  Download,
  Smartphone
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

  const handleDownloadAPK = () => {
    // Show info about placeholder APK
    toast({
      title: "Info APK",
      description: "File APK ini adalah placeholder. Untuk APK yang bisa diinstall, silakan build dengan Capacitor di local machine Anda.",
      duration: 5000,
    });
    
    // Still trigger download for demonstration
    const link = document.createElement('a');
    link.href = '/insan-mobile-kurir.apk';
    link.download = 'INSAN-MOBILE-Kurir.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Dimulai",
      description: "File APK INSAN MOBILE Kurir sedang didownload",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold">INSAN MOBILE KURIR</h1>
              <p className="text-sm text-gray-600">Kurir: Ahmad Kurniawan</p>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
              {isOnline ? 'OFFLINE' : 'ONLINE'}
            </Button>
          </div>
          
          {/* Download APK Button with Info */}
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadAPK}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download APK (Demo)
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'INSAN MOBILE Kurir',
                    text: 'Download aplikasi kurir INSAN MOBILE',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Disalin",
                    description: "Link aplikasi berhasil disalin ke clipboard",
                  });
                }
              }}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Info about APK */}
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-800">
              <strong>Info:</strong> File APK ini adalah demo. Untuk APK yang bisa diinstall, butuh build dengan Capacitor di local machine.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status & Location */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Lokasi Saat Ini:</span>
          </div>
          <p className="text-sm text-gray-600">{currentLocation}</p>
          
          <div className="mt-3 flex gap-2">
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? 'Siap Terima Pesanan' : 'Tidak Aktif'}
            </Badge>
            <Badge variant="outline">
              {activeDeliveries.length} Paket Aktif
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleScanPackage} className="flex flex-col gap-2 h-20">
              <Camera className="h-6 w-6" />
              <span className="text-xs">Scan Paket</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <Clock className="h-6 w-6" />
              <span className="text-xs">Absen</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <Truck className="h-6 w-6" />
              <span className="text-xs">Performa</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs">Pesan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Pengiriman Aktif ({activeDeliveries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada pengiriman aktif</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{delivery.id}</p>
                        <p className="text-sm text-gray-600">{delivery.recipient}</p>
                      </div>
                      <Badge variant={delivery.type === 'COD' ? 'default' : 'secondary'}>
                        {delivery.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                        <p className="text-sm text-gray-600">{delivery.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-600">{delivery.phone}</p>
                      </div>
                      {delivery.type === 'COD' && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-green-600">
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
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTakePhoto(delivery.id)}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteDelivery(delivery.id)}
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
