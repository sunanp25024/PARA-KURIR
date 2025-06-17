import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
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
    soundNotifications: true,
    vibrationNotifications: true,
    
    // Lokasi
    gpsTracking: true,
    autoLocation: true,
    offlineMode: false,
    
    // Tampilan
    darkMode: false,
    language: 'id',
    fontSize: 'medium',
    
    // Performa
    autoSync: true,
    dataCompression: true,
    batteryOptimization: true,
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua perubahan pengaturan telah disimpan.",
    });
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
                        Terima notifikasi push dari aplikasi
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi melalui email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sound</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan suara notifikasi
                      </p>
                    </div>
                    <Switch
                      checked={settings.soundNotifications}
                      onCheckedChange={(checked) => handleSettingChange('soundNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Vibration</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan getaran notifikasi
                      </p>
                    </div>
                    <Switch
                      checked={settings.vibrationNotifications}
                      onCheckedChange={(checked) => handleSettingChange('vibrationNotifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Lokasi & GPS */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Lokasi & GPS
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
                        Aktifkan pelacakan GPS untuk pengantaran
                      </p>
                    </div>
                    <Switch
                      checked={settings.gpsTracking}
                      onCheckedChange={(checked) => handleSettingChange('gpsTracking', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Location</Label>
                      <p className="text-sm text-muted-foreground">
                        Deteksi lokasi otomatis saat pengantaran
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoLocation}
                      onCheckedChange={(checked) => handleSettingChange('autoLocation', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Simpan data saat tidak ada koneksi
                      </p>
                    </div>
                    <Switch
                      checked={settings.offlineMode}
                      onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tampilan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Tampilan
                  </CardTitle>
                  <CardDescription>
                    Sesuaikan tampilan dan tema aplikasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan mode gelap untuk mata yang nyaman
                      </p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bahasa</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ukuran Font</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={settings.fontSize}
                      onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                    >
                      <option value="small">Kecil</option>
                      <option value="medium">Sedang</option>
                      <option value="large">Besar</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Performa */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5" />
                    Performa
                  </CardTitle>
                  <CardDescription>
                    Optimalkan performa dan penggunaan baterai
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Sync</Label>
                      <p className="text-sm text-muted-foreground">
                        Sinkronisasi data otomatis dengan server
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoSync}
                      onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Compression</Label>
                      <p className="text-sm text-muted-foreground">
                        Kompres data untuk menghemat bandwidth
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataCompression}
                      onCheckedChange={(checked) => handleSettingChange('dataCompression', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Battery Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Optimalkan penggunaan baterai
                      </p>
                    </div>
                    <Switch
                      checked={settings.batteryOptimization}
                      onCheckedChange={(checked) => handleSettingChange('batteryOptimization', checked)}
                    />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;