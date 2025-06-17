
import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Smartphone,
  MapPin,
  Clock,
  Moon,
  Volume2,
  Wifi,
  Battery,
  Save
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Notifikasi
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    soundAlerts: true,
    
    // Lokasi & Tracking
    gpsTracking: true,
    shareLocation: true,
    autoLocationUpdate: false,
    
    // Aplikasi
    darkMode: false,
    autoSync: true,
    offlineMode: false,
    
    // Keamanan
    biometricLogin: false,
    autoLock: true,
    
    // Kurir Spesifik
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    breakDuration: 60,
    maxDeliveryRadius: 10
  });

  const handleSave = () => {
    // Simulate saving settings
    const sessionId = sessionStorage.getItem('session_id') || Date.now().toString();
    sessionStorage.setItem(`kurirSettings_${sessionId}`, JSON.stringify(settings));
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua perubahan telah disimpan successfully",
    });
  };

  const handleToggle = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWorkingHoursChange = (type: 'start' | 'end', value: string) => {
    setSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [type]: value
      }
    }));
  };

  return (
    <div className="flex h-screen bg-background">
      <CourierSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
            <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
            <p className="text-muted-foreground">
              Kelola preferensi dan konfigurasi aplikasi Anda
            </p>
              </div>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
            Simpan Semua
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notifikasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>
                Atur preferensi notifikasi dan peringatan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi langsung di perangkat
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleToggle('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima update melalui email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleToggle('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima pesan SMS untuk update penting
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleToggle('smsNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Suara Peringatan
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan suara untuk notifikasi
                  </p>
                </div>
                <Switch
                  checked={settings.soundAlerts}
                  onCheckedChange={(checked) => handleToggle('soundAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lokasi & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi & Tracking
              </CardTitle>
              <CardDescription>
                Pengaturan pelacakan lokasi dan GPS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GPS Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan pelacakan GPS untuk navigasi
                  </p>
                </div>
                <Switch
                  checked={settings.gpsTracking}
                  onCheckedChange={(checked) => handleToggle('gpsTracking', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bagikan Lokasi</Label>
                  <p className="text-sm text-muted-foreground">
                    Izinkan dispatcher melihat lokasi Anda
                  </p>
                </div>
                <Switch
                  checked={settings.shareLocation}
                  onCheckedChange={(checked) => handleToggle('shareLocation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Update Lokasi</Label>
                  <p className="text-sm text-muted-foreground">
                    Update lokasi secara otomatis setiap 30 detik
                  </p>
                </div>
                <Switch
                  checked={settings.autoLocationUpdate}
                  onCheckedChange={(checked) => handleToggle('autoLocationUpdate', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Radius Maksimal Pengantaran (km)</Label>
                <Input
                  type="number"
                  value={settings.maxDeliveryRadius}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    maxDeliveryRadius: parseInt(e.target.value) || 10
                  }))}
                  min="1"
                  max="50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Jam Kerja */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Jam Kerja
              </CardTitle>
              <CardDescription>
                Atur jadwal kerja dan waktu istirahat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jam Mulai</Label>
                  <Input
                    type="time"
                    value={settings.workingHours.start}
                    onChange={(e) => handleWorkingHoursChange('start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jam Selesai</Label>
                  <Input
                    type="time"
                    value={settings.workingHours.end}
                    onChange={(e) => handleWorkingHoursChange('end', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Durasi Istirahat (menit)</Label>
                <Input
                  type="number"
                  value={settings.breakDuration}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    breakDuration: parseInt(e.target.value) || 60
                  }))}
                  min="30"
                  max="120"
                />
              </div>
            </CardContent>
          </Card>

          {/* Aplikasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Aplikasi
              </CardTitle>
              <CardDescription>
                Pengaturan tampilan dan sinkronisasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Mode Gelap
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Gunakan tema gelap untuk aplikasi
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleToggle('darkMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    Auto Sync
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Sinkronisasi data secara otomatis
                  </p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => handleToggle('autoSync', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Battery className="h-4 w-4" />
                    Mode Offline
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Hemat baterai dengan mode offline
                  </p>
                </div>
                <Switch
                  checked={settings.offlineMode}
                  onCheckedChange={(checked) => handleToggle('offlineMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keamanan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Keamanan
            </CardTitle>
            <CardDescription>
              Pengaturan keamanan dan privasi akun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Biometrik</Label>
                  <p className="text-sm text-muted-foreground">
                    Gunakan sidik jari atau wajah untuk login
                  </p>
                </div>
                <Switch
                  checked={settings.biometricLogin}
                  onCheckedChange={(checked) => handleToggle('biometricLogin', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Lock</Label>
                  <p className="text-sm text-muted-foreground">
                    Kunci aplikasi secara otomatis saat tidak aktif
                  </p>
                </div>
                <Switch
                  checked={settings.autoLock}
                  onCheckedChange={(checked) => handleToggle('autoLock', checked)}
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Ubah Password
              </Button>
              <Button variant="outline" className="w-full">
                Reset Pengaturan
              </Button>
            </div>
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
