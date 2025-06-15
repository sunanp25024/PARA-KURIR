
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Edit, Trash2, User, Upload, Download, Eye, MoreHorizontal, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import ExcelImportManager from '@/components/ExcelImportManager';
import { downloadFile } from '@/utils/downloadUtils';
import AddKurirForm from '@/components/forms/AddKurirForm';

const ManageKurir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedKurir, setSelectedKurir] = useState<any>(null);
  const [kurirs, setKurirs] = useState([
    {
      id: 'PISTEST2025',
      name: 'Kurir Test',
      email: 'kurir@example.com',
      phone: '081234567890',
      status: 'Aktif',
      performance: '95%',
      area: 'Jakarta Selatan',
      workLocation: 'Kantor Pusat - Jl. Sudirman',
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
      workLocation: 'Cabang Cakung - Jl. Raya Cakung',
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
      workLocation: 'Cabang Kelapa Gading - Mall Kelapa Gading',
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
      workLocation: 'Cabang Taman Anggrek - Central Park',
      joinDate: '2024-01-25'
    },
    {
      id: 'KURIR004',
      name: 'Dedi Rahman',
      email: 'dedi@example.com',
      phone: '081234567894',
      status: 'Aktif',
      performance: '85%',
      area: 'Jakarta Pusat',
      workLocation: 'Kantor Pusat - Menara BCA',
      joinDate: '2024-03-01'
    }
  ]);

  const handleAddKurir = (newKurir: any) => {
    setKurirs([...kurirs, newKurir]);
    setShowAddDialog(false);
  };

  const handleDownloadTemplate = () => {
    const templateData = `ID Kurir,Nama,Email,Telepon,Area,Lokasi Kerja,Status,Tanggal Bergabung
KURIR004,Nama Kurir,email@example.com,081234567890,Jakarta Selatan,Kantor Pusat - Jl. Sudirman,Aktif,2024-12-15
KURIR005,Nama Kurir 2,email2@example.com,081234567891,Jakarta Timur,Cabang Cakung - Jl. Raya Cakung,Aktif,2024-12-15`;
    
    downloadFile(templateData, 'template_kurir.csv', 'text/csv;charset=utf-8;');
    
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk kurir berhasil didownload sebagai template_kurir.csv",
    });
  };

  const handleEditKurir = (kurir: any) => {
    setSelectedKurir(kurir);
    setShowEditDialog(true);
  };

  const handleDeleteKurir = (kurir: any) => {
    setSelectedKurir(kurir);
    setShowDeleteDialog(true);
  };

  const confirmDeleteKurir = () => {
    setKurirs(kurirs.filter(k => k.id !== selectedKurir.id));
    setShowDeleteDialog(false);
    setSelectedKurir(null);
    toast({
      title: "Kurir Dihapus",
      description: `Kurir ${selectedKurir.name} telah dihapus dari sistem`,
      variant: "destructive"
    });
  };

  const handleViewDetails = (kurir: any) => {
    setSelectedKurir(kurir);
    setShowDetailDialog(true);
  };

  const filteredKurirs = kurirs.filter(kurir =>
    kurir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.workLocation.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Button onClick={() => setShowAddDialog(true)}>
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
                  placeholder="Cari kurir berdasarkan nama, ID, email, area, atau lokasi kerja..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kurir</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Lokasi Kerja</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead className="w-[50px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKurirs.map((kurir) => (
                    <TableRow key={kurir.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {kurir.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{kurir.name}</p>
                            <p className="text-sm text-gray-500">{kurir.id}</p>
                            <p className="text-sm text-gray-500">{kurir.email}</p>
                            <p className="text-xs text-gray-400">{kurir.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{kurir.area}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{kurir.workLocation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={kurir.status === 'Aktif' ? 'default' : 'secondary'}>
                          {kurir.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">{kurir.performance}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{kurir.joinDate}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(kurir)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditKurir(kurir)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteKurir(kurir)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredKurirs.length === 0 && (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada kurir yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Kurir Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Kurir Baru</DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk menambahkan kurir baru ke sistem
              </DialogDescription>
            </DialogHeader>
            <AddKurirForm
              onSubmit={handleAddKurir}
              onCancel={() => setShowAddDialog(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detail Kurir</DialogTitle>
            </DialogHeader>
            {selectedKurir && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-lg">
                      {selectedKurir.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedKurir.name}</h3>
                    <p className="text-gray-500">{selectedKurir.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{selectedKurir.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telepon</label>
                    <p className="text-sm">{selectedKurir.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Area</label>
                    <p className="text-sm">{selectedKurir.area}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge variant={selectedKurir.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedKurir.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Performance</label>
                    <p className="text-sm text-green-600 font-medium">{selectedKurir.performance}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bergabung</label>
                    <p className="text-sm">{selectedKurir.joinDate}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Lokasi Kerja</label>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">{selectedKurir.workLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus Kurir</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus kurir "{selectedKurir?.name}"? 
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteKurir} className="bg-red-600 hover:bg-red-700">
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ManageKurir;
