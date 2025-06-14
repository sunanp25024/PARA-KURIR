
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PackageData {
  id: string;
  recipientName: string;
  address: string;
  phone: string;
  codAmount: number;
  status: 'pending' | 'delivered' | 'failed';
}

const PackageInput = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [formData, setFormData] = useState({
    recipientName: '',
    address: '',
    phone: '',
    codAmount: 0
  });

  const handleAddPackage = () => {
    if (!formData.recipientName || !formData.address || !formData.phone) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Harap lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    const newPackage: PackageData = {
      id: `PKG${Date.now()}`,
      ...formData,
      status: 'pending'
    };

    setPackages([...packages, newPackage]);
    setFormData({
      recipientName: '',
      address: '',
      phone: '',
      codAmount: 0
    });

    toast({
      title: "Paket Ditambahkan",
      description: `Paket untuk ${formData.recipientName} berhasil ditambahkan`,
    });
  };

  const handleRemovePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast({
      title: "Paket Dihapus",
      description: "Paket berhasil dihapus dari daftar",
    });
  };

  const handleStatusUpdate = (id: string, status: 'delivered' | 'failed') => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, status } : pkg
    ));
    toast({
      title: "Status Diperbarui",
      description: `Status paket berhasil diubah menjadi ${status === 'delivered' ? 'Terkirim' : 'Gagal'}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Input Paket Baru
          </CardTitle>
          <CardDescription>Tambahkan paket yang akan dikirim hari ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipientName">Nama Penerima</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                placeholder="Masukkan nama penerima"
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Masukkan alamat lengkap penerima"
            />
          </div>
          <div>
            <Label htmlFor="codAmount">Jumlah COD (Rp)</Label>
            <Input
              id="codAmount"
              type="number"
              value={formData.codAmount}
              onChange={(e) => setFormData({...formData, codAmount: Number(e.target.value)})}
              placeholder="0"
            />
          </div>
          <Button onClick={handleAddPackage} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Paket
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Daftar Paket Hari Ini ({packages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {packages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada paket yang ditambahkan
            </div>
          ) : (
            <div className="space-y-3">
              {packages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{pkg.recipientName}</p>
                    <p className="text-sm text-gray-600">{pkg.address}</p>
                    <p className="text-sm text-gray-500">{pkg.phone}</p>
                    {pkg.codAmount > 0 && (
                      <p className="text-sm font-medium text-green-600">
                        COD: Rp {pkg.codAmount.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      pkg.status === 'delivered' ? 'default' : 
                      pkg.status === 'failed' ? 'destructive' : 'secondary'
                    }>
                      {pkg.status === 'pending' && 'Pending'}
                      {pkg.status === 'delivered' && 'Terkirim'}
                      {pkg.status === 'failed' && 'Gagal'}
                    </Badge>
                    {pkg.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(pkg.id, 'delivered')}
                        >
                          Terkirim
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(pkg.id, 'failed')}
                        >
                          Gagal
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRemovePackage(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageInput;
