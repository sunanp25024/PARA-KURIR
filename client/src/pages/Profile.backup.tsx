import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CourierLayout from '@/components/CourierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  Camera,
  Settings,
  Shield,
  Activity,
  Truck,
  Clock,
  Package,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/Auth';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+62 812-3456-7890',
    joinDate: '15 Januari 2024',
    location: 'Jakarta Timur',
    area: 'Cakung'
  });

  // Mock data untuk kurir stats
  const mockStats = {
    totalDelivered: 256,
    completionRate: 95,
    avgRating: 4.8,
    punctualityRate: 92
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    toast({
      title: "Profil Disimpan",
      description: "Perubahan profil berhasil disimpan",
    });
  };

  // Conditional layout for kurir vs other roles
  if (user?.role === 'kurir') {
    return (
      <CourierLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
              <p className="text-muted-foreground">
                Kelola informasi pribadi dan performa pengantaran Anda
              </p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profil
              </Button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
                {/* Main Profile Card */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informasi Pribadi</CardTitle>
                      <CardDescription>
                        Data pribadi dan kontak yang dapat dihubungi
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="text-xl">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold">{user?.name}</h3>
                          <Badge variant="secondary">{user?.role?.toUpperCase()}</Badge>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Camera className="h-4 w-4 mr-2" />
                            Ganti Foto
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>{profileData.name}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{profileData.email}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>{profileData.phone}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Lokasi Kerja</Label>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{profileData.location}, {profileData.area}</span>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-2">
                          <Button onClick={handleSave}>Simpan Perubahan</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Performa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {mockStats.completionRate}%
                        </div>
                        <p className="text-sm text-gray-600">Tingkat Penyelesaian</p>
                      </div>
                      <Badge variant="default" className="w-full justify-center py-2">
                        <Truck className="h-3 w-3 mr-1" />
                        {mockStats.totalDelivered} Paket Terkirim
                      </Badge>
                      <Badge variant="outline" className="w-full justify-center py-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Pengantaran Tepat Waktu
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
          </div>
        </div>
      </CourierLayout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6" style={{ animation: 'fadeIn 0.6s ease-out' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
            <p className="text-muted-foreground">
              Kelola informasi pribadi dan preferensi akun Anda
            </p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profil
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile sections for non-kurir users */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Data pribadi dan kontak yang dapat dihubungi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-xl">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{user?.name}</h3>
                    <Badge variant="secondary">{user?.role?.toUpperCase()}</Badge>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Camera className="h-4 w-4 mr-2" />
                      Ganti Foto
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Tanggal Bergabung</Label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{profileData.joinDate}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Simpan Perubahan</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;