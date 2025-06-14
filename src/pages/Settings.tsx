
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Shield, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [gpsTracking, setGpsTracking] = useState(true);
  const [autoCheckIn, setAutoCheckIn] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua perubahan telah disimpan.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600">Kelola preferensi dan konfigurasi aplikasi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>Atur preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Aktifkan Notifikasi</Label>
                  <p className="text-sm text-gray-600">Terima notifikasi untuk tugas baru</p>
                </div>
                <Switch 
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-checkin">Auto Check-in</Label>
                  <p className="text-sm text-gray-600">Check-in otomatis saat tiba di area kerja</p>
                </div>
                <Switch 
                  id="auto-checkin"
                  checked={autoCheckIn}
                  onCheckedChange={setAutoCheckIn}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privasi & Keamanan
              </CardTitle>
              <CardDescription>Pengaturan privasi dan keamanan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="gps-tracking">GPS Tracking</Label>
                  <p className="text-sm text-gray-600">Izinkan pelacakan lokasi untuk pengiriman</p>
                </div>
                <Switch 
                  id="gps-tracking"
                  checked={gpsTracking}
                  onCheckedChange={setGpsTracking}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Masukkan password saat ini"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Masukkan password baru"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Preferensi Aplikasi
              </CardTitle>
              <CardDescription>Kustomisasi tampilan dan perilaku aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Input
                  id="language"
                  value="Bahasa Indonesia"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Input
                  id="timezone"
                  value="WIB (UTC+7)"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-area">Area Kerja Default</Label>
                <Input
                  id="work-area"
                  placeholder="Jakarta Selatan"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Informasi Aplikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Versi Aplikasi:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              
              <div className="flex justify-between">
                <span>Terakhir Update:</span>
                <span className="font-medium">14 Juni 2024</span>
              </div>
              
              <div className="flex justify-between">
                <span>Build:</span>
                <span className="font-medium">20240614</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSaveSettings}>
            Simpan Pengaturan
          </Button>
          <Button variant="outline">
            Reset ke Default
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
