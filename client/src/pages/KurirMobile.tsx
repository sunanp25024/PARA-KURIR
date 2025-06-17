
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Workflow
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import KurirWorkflow from '@/components/KurirWorkflow';

const KurirMobile = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Menunggu lokasi...');
  const [activeView, setActiveView] = useState<'dashboard' | 'workflow'>('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi mendapatkan lokasi
    setTimeout(() => {
      setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
      toast({
        title: "Lokasi Ditemukan",
        description: "Lokasi berhasil dideteksi: Jl. Thamrin No. 1, Jakarta Pusat",
      });
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
    // Simulate scanning process
    setTimeout(() => {
      toast({
        title: "Paket Berhasil Discan",
        description: "Paket INS2024001 berhasil discan dan ditambahkan ke daftar",
      });
    }, 2000);
  };

  const handleAttendance = () => {
    navigate('/attendance');
    toast({
      title: "Absensi",
      description: "Membuka halaman absensi",
    });
  };

  const handlePerformance = () => {
    navigate('/performance');
    toast({
      title: "Performa",
      description: "Membuka halaman performa kurir",
    });
  };

  const handleMessages = () => {
    navigate('/notifications');
    toast({
      title: "Pesan",
      description: "Membuka halaman pesan dan notifikasi",
    });
  };

  return (
    <Layout>
      <WorkflowProvider>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Kurir</h1>
              <p className="text-muted-foreground">
                Selamat datang di sistem kurir INSAN Mobile
              </p>
            </div>
            <Button
              onClick={handleToggleOnline}
              variant={isOnline ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-green-500'}`} />
              {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
            </Button>
          </div>

          {/* Main Navigation */}
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="workflow">
                <Workflow className="h-4 w-4 mr-2" />
                Workflow Harian
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              {/* Status & Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Status & Lokasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Lokasi Saat Ini:</p>
                    <p className="text-sm text-gray-600 mb-4">{currentLocation}</p>
                    
                    <div className="flex gap-2 mb-4">
                      <Badge variant={isOnline ? "default" : "secondary"}>
                        {isOnline ? 'Siap Terima' : 'Tidak Aktif'}
                      </Badge>
                      <Badge variant="outline">
                        📍 GPS Aktif
                      </Badge>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Refresh Lokasi",
                          description: "Memperbarui lokasi GPS...",
                        });
                        setTimeout(() => {
                          setCurrentLocation('Jl. Sudirman No. 15, Jakarta Selatan');
                          toast({
                            title: "Lokasi Diperbarui",
                            description: "Lokasi berhasil diperbarui",
                          });
                        }, 1500);
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Refresh Lokasi
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                  <CardDescription>Fitur yang sering digunakan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      onClick={handleScanPackage} 
                      className="flex flex-col gap-2 h-20"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Scan Paket</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col gap-2 h-20"
                      onClick={handleAttendance}
                    >
                      <Clock className="h-5 w-5" />
                      <span>Absen</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col gap-2 h-20"
                      onClick={handlePerformance}
                    >
                      <Truck className="h-5 w-5" />
                      <span>Performa</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col gap-2 h-20"
                      onClick={handleMessages}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Pesan</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistik Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">8</div>
                      <div className="text-sm text-blue-700">Paket Diterima</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-900">6</div>
                      <div className="text-sm text-green-700">Terkirim</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-900">2</div>
                      <div className="text-sm text-yellow-700">Dalam Proses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-900">75%</div>
                      <div className="text-sm text-purple-700">Success Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-4">
              <KurirWorkflow />
            </TabsContent>
          </Tabs>
        </div>
      </WorkflowProvider>
    </Layout>
  );
};

export default KurirMobile;
