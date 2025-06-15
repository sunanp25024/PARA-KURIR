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
    <WorkflowProvider>
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

        {/* Main Navigation */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="workflow">
              <Workflow className="h-4 w-4 mr-2" />
              Workflow Harian
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Status & Location */}
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
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
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
          </TabsContent>

          <TabsContent value="workflow">
            <KurirWorkflow />
          </TabsContent>
        </Tabs>
      </div>
    </WorkflowProvider>
  );
};

export default KurirMobile;
