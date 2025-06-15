
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      {/* Premium Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Logo size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  INSAN <span className="text-blue-200">MOBILE</span>
                </h1>
                <p className="text-blue-200 text-sm font-medium">Kurir Professional System</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-yellow-300 font-medium">Ahmad Kurniawan</span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500 text-white text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Pro Driver
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className={`flex items-center gap-2 font-semibold shadow-lg transition-all duration-300 ${
                isOnline 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-emerald-200 animate-pulse'}`} />
              {isOnline ? 'OFFLINE' : 'ONLINE'}
            </Button>
          </div>
          
          {/* Premium Download Section */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadAPK}
                className="flex-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Download className="mr-2 h-5 w-5" />
                Download APK (Demo)
                <Zap className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 shadow-lg"
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
                <Smartphone className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Elegant Info Box */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3">
              <p className="text-xs text-blue-100 leading-relaxed">
                <span className="font-semibold text-yellow-300">💡 Info:</span> File APK ini adalah demo. Untuk APK yang bisa diinstall, butuh build dengan Capacitor di local machine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Elegant Status & Location */}
      <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">Lokasi Saat Ini</span>
              <p className="text-sm text-gray-600">{currentLocation}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Badge 
              variant={isOnline ? "default" : "secondary"}
              className={`px-3 py-1 font-medium ${
                isOnline 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
              }`}
            >
              {isOnline ? '🟢 Siap Terima Pesanan' : '⚫ Tidak Aktif'}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 font-medium">
              📦 {activeDeliveries.length} Paket Aktif
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Premium Quick Actions */}
      <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            ⚡ Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleScanPackage} 
              className="flex flex-col gap-3 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Camera className="h-7 w-7" />
              <span className="text-sm font-semibold">Scan Paket</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-3 h-24 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Clock className="h-7 w-7" />
              <span className="text-sm font-semibold">Absen</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-3 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Truck className="h-7 w-7" />
              <span className="text-sm font-semibold">Performa</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col gap-3 h-24 bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="h-7 w-7" />
              <span className="text-sm font-semibold">Pesan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Premium Active Deliveries */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Pengiriman Aktif ({activeDeliveries.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-10 w-10 opacity-50" />
              </div>
              <p className="text-lg font-medium">Tidak ada pengiriman aktif</p>
              <p className="text-sm text-gray-400 mt-1">Pesanan baru akan muncul di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg text-gray-800">{delivery.id}</p>
                        <p className="text-sm text-gray-600 font-medium">{delivery.recipient}</p>
                      </div>
                      <Badge 
                        variant={delivery.type === 'COD' ? 'default' : 'secondary'}
                        className={`font-semibold ${
                          delivery.type === 'COD' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                        }`}
                      >
                        {delivery.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 text-blue-600" />
                        <p className="text-sm text-gray-700 leading-relaxed">{delivery.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <p className="text-sm text-gray-700 font-medium">{delivery.phone}</p>
                      </div>
                      {delivery.type === 'COD' && (
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded">
                            <span className="text-sm font-bold text-white px-2 py-1">
                              Tagihan: {delivery.amount}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleNavigate(delivery.address)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600 shadow-md"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTakePhoto(delivery.id)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 shadow-md"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-md"
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
