
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PendingPackage {
  id: string;
  trackingNumber: string;
  isCOD: boolean;
  reason: string;
  returnPhoto?: string;
  leaderName?: string;
  returnedAt?: Date;
  status: 'pending' | 'returned';
}

const PendingReturnPackages = () => {
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [leaderName, setLeaderName] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [returnCounts, setReturnCounts] = useState({
    codCount: 0,
    nonCodCount: 0
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPendingPackage = () => {
    if (!returnReason.trim()) {
      toast({
        title: "Error",
        description: "Masukkan alasan paket tidak terkirim",
        variant: "destructive"
      });
      return;
    }

    const trackingNumber = `PENDING${Date.now()}`;
    const newPackage: PendingPackage = {
      id: `pending_${Date.now()}`,
      trackingNumber,
      isCOD: Math.random() > 0.5, // Random for demo
      reason: returnReason.trim(),
      status: 'pending'
    };

    setPendingPackages(prev => [...prev, newPackage]);
    setReturnReason('');
    
    toast({
      title: "Paket Pending Ditambahkan",
      description: `${trackingNumber} berhasil ditambahkan ke daftar pending`,
    });
  };

  const handleTakeReturnPhoto = () => {
    setPhotoTaken(true);
    toast({
      title: "Foto Bukti Return",
      description: "Foto bukti pengembalian ke gudang berhasil diambil",
    });
  };

  const handleReturnToWarehouse = () => {
    if (!selectedPackage || !leaderName.trim() || !photoTaken) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Pastikan foto bukti dan nama leader sudah diisi",
        variant: "destructive"
      });
      return;
    }

    setPendingPackages(prev => prev.map(pkg => 
      pkg.id === selectedPackage 
        ? {
            ...pkg,
            status: 'returned' as const,
            leaderName: leaderName.trim(),
            returnPhoto: 'taken',
            returnedAt: new Date()
          }
        : pkg
    ));

    // Reset form
    setSelectedPackage(null);
    setLeaderName('');
    setPhotoTaken(false);

    toast({
      title: "Paket Dikembalikan",
      description: "Paket berhasil diserahkan ke leader gudang",
    });
  };

  const updateReturnCounts = () => {
    const returnedPackages = pendingPackages.filter(pkg => pkg.status === 'returned');
    const codCount = returnedPackages.filter(pkg => pkg.isCOD).length;
    const nonCodCount = returnedPackages.filter(pkg => !pkg.isCOD).length;
    
    setReturnCounts({ codCount, nonCodCount });
  };

  React.useEffect(() => {
    updateReturnCounts();
  }, [pendingPackages]);

  const pendingItems = pendingPackages.filter(pkg => pkg.status === 'pending');
  const returnedItems = pendingPackages.filter(pkg => pkg.status === 'returned');

  return (
    <div className="space-y-6">
      {/* Add Pending Package */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Tambah Paket Pending/Return
          </CardTitle>
          <CardDescription>Input paket yang tidak dapat terkirim</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reason">Alasan Tidak Terkirim</Label>
            <Input
              id="reason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Contoh: Alamat tidak ditemukan, penerima tidak ada"
            />
          </div>
          <Button onClick={handleAddPendingPackage} className="w-full">
            Tambah ke Pending
          </Button>
        </CardContent>
      </Card>

      {/* Pending Packages List */}
      <Card>
        <CardHeader>
          <CardTitle>Paket Pending/Return ({pendingItems.length})</CardTitle>
          <CardDescription>Daftar paket yang perlu dikembalikan ke gudang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada paket pending
            </div>
          ) : (
            <div className="space-y-3">
              {pendingItems.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPackage === pkg.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{pkg.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Alasan: {pkg.reason}</p>
                      <Badge variant={pkg.isCOD ? "default" : "secondary"}>
                        {pkg.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      Pending Return
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Return Form */}
          {selectedPackage && (
            <div className="mt-6 p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <h4 className="font-medium mb-4">Kembalikan ke Gudang</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leader">Nama Leader Serah Terima</Label>
                  <Input
                    id="leader"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="Masukkan nama leader gudang"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto Bukti Pengembalian</Label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleTakeReturnPhoto}
                      variant={photoTaken ? "outline" : "default"}
                      className="flex-1"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {photoTaken ? 'Foto Sudah Diambil ✓' : 'Ambil Foto'}
                    </Button>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={() => setPhotoTaken(true)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleReturnToWarehouse}
                  disabled={!leaderName.trim() || !photoTaken}
                  className="w-full"
                >
                  Kembalikan ke Gudang
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Return Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Total Paket Return</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Return</p>
              <p className="text-2xl font-bold">{returnedItems.length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">COD Return</p>
              <p className="text-2xl font-bold text-green-600">{returnCounts.codCount}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Non COD Return</p>
              <p className="text-2xl font-bold text-blue-600">{returnCounts.nonCodCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Returned Items History */}
      {returnedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Paket Dikembalikan ({returnedItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {returnedItems.map((pkg) => (
                <div key={pkg.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{pkg.trackingNumber}</p>
                      <p className="text-sm text-gray-600">Alasan: {pkg.reason}</p>
                      <p className="text-sm text-gray-600">Leader: {pkg.leaderName}</p>
                      <p className="text-sm text-gray-600">
                        Dikembalikan: {pkg.returnedAt?.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={pkg.isCOD ? "default" : "secondary"}>
                        {pkg.isCOD ? 'COD' : 'Non COD'}
                      </Badge>
                      <Badge variant="outline" className="text-gray-600 border-gray-600">
                        Dikembalikan ✓
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PendingReturnPackages;
