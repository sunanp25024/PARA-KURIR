
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Package,
  Truck,
  Clock,
  Edit,
  Camera
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '+62 812-3456-7890',
        address: parsedUser.address || 'Jl. Thamrin No. 1, Jakarta Pusat',
        joinDate: parsedUser.joinDate || '2024-01-15'
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast({
      title: "Profil Berhasil Diperbarui",
      description: "Data profil Anda telah disimpan",
    });
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '+62 812-3456-7890',
      address: user?.address || 'Jl. Thamrin No. 1, Jakarta Pusat',
      joinDate: user?.joinDate || '2024-01-15'
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Statistik khusus untuk kurir
  const kurirStats = [
    { label: 'Total Pengantaran', value: '1,234', icon: Package, color: 'text-blue-600' },
    { label: 'Rating Rata-rata', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { label: 'Pengalaman', value: '2 Tahun', icon: Calendar, color: 'text-green-600' },
    { label: 'Area Kerja', value: 'Jakarta Pusat', icon: MapPin, color: 'text-purple-600' }
  ];

  const recentActivity = [
    { date: '2024-01-20', activity: 'Berhasil mengantarkan 15 paket', status: 'success' },
    { date: '2024-01-19', activity: 'Menyelesaikan rute Jakarta Pusat', status: 'success' },
    { date: '2024-01-18', activity: 'Rating 5 bintang dari pelanggan', status: 'success' },
    { date: '2024-01-17', activity: 'Update lokasi real-time aktif', status: 'info' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
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
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Data pribadi dan kontak yang dapat dihubungi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">
                      {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <Badge variant="secondary">
                      <Truck className="h-3 w-3 mr-1" />
                      Kurir
                    </Badge>
                    {!isEditing && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Camera className="h-3 w-3" />
                        Ubah Foto
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

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
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
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

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{profileData.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave}>Simpan Perubahan</Button>
                    <Button variant="outline" onClick={handleCancel}>Batal</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terkini</CardTitle>
                <CardDescription>Riwayat aktivitas dalam 7 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                        {activity.status === 'success' ? 'Berhasil' : 'Info'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Kurir</CardTitle>
                <CardDescription>Performa dan pencapaian Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {kurirStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full bg-white ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pencapaian</CardTitle>
                <CardDescription>Badge dan penghargaan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge className="w-full justify-center py-2">
                  <Star className="h-3 w-3 mr-1" />
                  Kurir Terbaik Bulan Ini
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2">
                  <Package className="h-3 w-3 mr-1" />
                  1000+ Paket Terkirim
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
    </Layout>
  );
};

export default Profile;
