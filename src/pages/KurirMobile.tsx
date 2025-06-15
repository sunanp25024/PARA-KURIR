
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Smartphone,
  Star,
  Trophy,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LoadingScreen from '@/components/LoadingScreen';
import Logo from '@/components/Logo';

const KurirMobile = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    // Simulate location loading
    setTimeout(() => {
      setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
    }, 4000);
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
    toast({
      title: "Info APK",
      description: "File APK ini adalah placeholder. Untuk APK yang bisa diinstall, silakan build dengan Capacitor di local machine Anda.",
      duration: 5000,
    });
    
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-3 py-4 pb-20">
      {/* Compact Header */}
      <Card className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-lg">
        <CardContent className="p-4">
          {/* Top Row - Logo & Online Status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white leading-tight">
                  INSAN MOBILE
                </h1>
                <p className="text-blue-200 text-xs">Kurir System</p>
              </div>
            </div>
            <Button
              onClick={handleToggleOnline}
              size="sm"
              variant={isOnline ? "destructive" : "default"}
              className={`text-xs font-semibold px-3 py-1 ${
                isOnline 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-white' : 'bg-emerald-200'}`} />
              {isOnline ? 'OFFLINE' : 'ONLINE'}
            </Button>
          </div>
          
          {/* Driver Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-yellow-300 font-medium">Ahmad Kurniawan</span>
            </div>
            <Badge variant="secondary" className="bg-emerald-500 text-white text-xs px-2 py-0.5">
              <Trophy className="h-2 w-2 mr-1" />
              Pro Driver
            </Badge>
          </div>
          
          {/* Download Button */}
          <Button
            onClick={handleDownloadAPK}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium text-sm h-9"
          >
            <Download className="mr-2 h-4 w-4" />
            Download APK
            <Zap className="ml-2 h-3 w-3" />
          </Button>
          
          {/* Info Box */}
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 mt-3">
            <p className="text-xs text-blue-100 leading-relaxed">
              <span className="font-semibold text-yellow-300">💡</span> File APK demo - butuh Capacitor build untuk install.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status & Location - Compact */}
      <Card className="mb-4 bg-white/90 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-gray-700 block">Lokasi Saat Ini</span>
              <p className="text-xs text-gray-600 truncate">{currentLocation}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge 
              variant={isOnline ? "default" : "secondary"}
              className={`text-xs px-2 py-1 ${
                isOnline 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
              }`}
            >
              {isOnline ? '🟢 Siap' : '⚫ Offline'}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs px-2 py-1">
              📦 {activeDeliveries.length} Paket
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - 2x2 Grid */}
      <Card className="mb-4 bg-white/90 backdrop-blur-sm border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-800">⚡ Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleScanPackage} 
              className="flex flex-col gap-2 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-md"
            >
              <Camera className="h-5 w-5" />
              <span className="text-xs font-medium">Scan Paket</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-0 shadow-md"
            >
              <Clock className="h-5 w-5" />
              <span className="text-xs font-medium">Absen</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white border-0 shadow-md"
            >
              <Truck className="h-5 w-5" />
              <span className="text-xs font-medium">Performa</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-2 h-20 bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white border-0 shadow-md"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-medium">Pesan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries - Mobile Optimized */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Pengiriman Aktif ({activeDeliveries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Package className="h-8 w-8 opacity-50" />
              </div>
              <p className="text-sm font-medium">Tidak ada pengiriman aktif</p>
              <p className="text-xs text-gray-400 mt-1">Pesanan baru akan muncul di sini</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base text-gray-800">{delivery.id}</p>
                        <p className="text-sm text-gray-600 font-medium truncate">{delivery.recipient}</p>
                      </div>
                      <Badge 
                        variant={delivery.type === 'COD' ? 'default' : 'secondary'}
                        className={`text-xs font-medium ml-2 ${
                          delivery.type === 'COD' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                        }`}
                      >
                        {delivery.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        <p className="text-xs text-gray-700 leading-relaxed">{delivery.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs text-gray-700 font-medium">{delivery.phone}</p>
                      </div>
                      {delivery.type === 'COD' && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-md px-2 py-1 inline-block">
                          <span className="text-xs font-bold text-white">
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
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600 h-8"
                      >
                        <Navigation className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTakePhoto(delivery.id)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 h-8"
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 h-8"
                      >
                        <CheckCircle className="h-3 w-3" />
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
