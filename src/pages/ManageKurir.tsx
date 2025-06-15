
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, User, Upload, Download, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import ExcelImportManager from '@/components/ExcelImportManager';
import { downloadFile } from '@/utils/downloadUtils';

const ManageKurir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [kurirs] = useState([
    {
      id: 'PISTEST2025',
      name: 'Kurir Test',
      email: 'kurir@example.com',
      phone: '081234567890',
      status: 'Aktif',
      performance: '95%',
      area: 'Jakarta Selatan',
      joinDate: '2024-01-15'
    },
    {
      id: 'KURIR001',
      name: 'Ahmad Kurniawan',
      email: 'ahmad@example.com',
      phone: '081234567891',
      status: 'Aktif',
      performance: '88%',
      area: 'Jakarta Timur',
      joinDate: '2024-02-20'
    },
    {
      id: 'KURIR002',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '081234567892',
      status: 'Tidak Aktif',
      performance: '76%',
      area: 'Jakarta Utara',
      joinDate: '2024-03-10'
    },
    {
      id: 'KURIR003',
      name: 'Citra Dewi',
      email: 'citra@example.com',
      phone: '081234567893',
      status: 'Aktif',
      performance: '92%',
      area: 'Jakarta Barat',
      joinDate: '2024-01-25'
    }
  ]);

  const handleAddKurir = () => {
    toast({
      title: "Form Tambah Kurir",
      description: "Membuka form untuk menambahkan kurir baru",
    });
    // Simulate opening add form
    console.log("Opening add courier form");
  };

  const handleDownloadTemplate = () => {
    const templateData = `ID Kurir,Nama,Email,Telepon,Area,Status,Tanggal Bergabung
KURIR004,Nama Kurir,email@example.com,081234567890,Jakarta Selatan,Aktif,2024-12-15
KURIR005,Nama Kurir 2,email2@example.com,081234567891,Jakarta Timur,Aktif,2024-12-15`;
    
    downloadFile(templateData, 'template_kurir.csv', 'text/csv;charset=utf-8;');
    
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk kurir berhasil didownload sebagai template_kurir.csv",
    });
    console.log("Downloaded kurir template");
  };

  const handleEditKurir = (kurir: any) => {
    toast({
      title: "Edit Kurir",
      description: `Membuka form edit untuk ${kurir.name}`,
    });
    console.log("Editing courier:", kurir);
  };

  const handleDeleteKurir = (kurir: any) => {
    toast({
      title: "Konfirmasi Hapus",
      description: `Menghapus kurir ${kurir.name}? Aksi ini tidak dapat dibatalkan.`,
      variant: "destructive"
    });
    console.log("Deleting courier:", kurir);
  };

  const handleViewDetails = (kurir: any) => {
    toast({
      title: "Detail Kurir",
      description: `Menampilkan detail lengkap untuk ${kurir.name}`,
    });
    console.log("Viewing courier details:", kurir);
  };

  const filteredKurirs = kurirs.filter(kurir =>
    kurir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Kurir</h1>
            <p className="text-gray-600">Manajemen kurir dan performa</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadTemplate} className="gap-2">
              <Download className="h-4 w-4" />
              Template Excel
            </Button>
            <Button variant="outline" onClick={() => setShowExcelImport(true)} className="gap-2">
              <Upload className="h-4 w-4" />
              Import Excel
            </Button>
            <Button onClick={handleAddKurir}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kurir
            </Button>
          </div>
        </div>

        {/* Excel Import Section */}
        {showExcelImport && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Import Data Kurir</CardTitle>
                <Button variant="outline" onClick={() => setShowExcelImport(false)}>
                  Tutup
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ExcelImportManager />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Daftar Kurir
            </CardTitle>
            <CardDescription>
              Total: {kurirs.length} kurir terdaftar | Aktif: {kurirs.filter(k => k.status === 'Aktif').length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari kurir berdasarkan nama, ID, atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredKurirs.map((kurir) => (
                <div key={kurir.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{kurir.name}</p>
                      <p className="text-sm text-gray-600">{kurir.id}</p>
                      <p className="text-sm text-gray-500">{kurir.email}</p>
                      <p className="text-xs text-gray-400">{kurir.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <Badge variant={kurir.status === 'Aktif' ? 'default' : 'secondary'} className="mb-1">
                        {kurir.status}
                      </Badge>
                      <p className="text-sm text-gray-500">Performa: {kurir.performance}</p>
                      <p className="text-sm text-gray-500">Area: {kurir.area}</p>
                      <p className="text-xs text-gray-400">Bergabung: {kurir.joinDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(kurir)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditKurir(kurir)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteKurir(kurir)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredKurirs.length === 0 && (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada kurir yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManageKurir;
