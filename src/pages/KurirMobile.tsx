
import React, { useState, useEffect } from 'react';
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
              {isOnline ? 'OFFLINE' : 'ONLINE'}
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
                    
                    <div className="flex gap-2">
                      <Badge variant={isOnline ? "default" : "secondary"}>
                        {isOnline ? 'Siap Terima' : 'Tidak Aktif'}
                      </Badge>
                    </div>
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
                    >
                      <Clock className="h-5 w-5" />
                      <span>Absen</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col gap-2 h-20"
                    >
                      <Truck className="h-5 w-5" />
                      <span>Performa</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex flex-col gap-2 h-20"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Pesan</span>
                    </Button>
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
