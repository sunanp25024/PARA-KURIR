
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Edit, Trash2, Users, Upload, Download, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import ExcelImportManager from '@/components/ExcelImportManager';
import { downloadFile } from '@/utils/downloadUtils';

const ManagePIC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [pics] = useState([
    {
      id: 'PIC2025',
      name: 'PIC User',
      email: 'pic@example.com',
      phone: '081234567890',
      status: 'Aktif',
      kurirCount: 5,
      area: 'Jakarta Selatan',
      joinDate: '2024-01-15',
      lastLogin: '2024-12-15 10:30'
    },
    {
      id: 'PIC2026',
      name: 'PIC Bandung',
      email: 'pic.bandung@example.com',
      phone: '081234567891',
      status: 'Aktif',
      kurirCount: 8,
      area: 'Bandung',
      joinDate: '2024-02-20',
      lastLogin: '2024-12-14 15:45'
    },
    {
      id: 'PIC2027',
      name: 'Ahmad Rahman',
      email: 'ahmad.pic@example.com',
      phone: '081234567892',
      status: 'Tidak Aktif',
      kurirCount: 3,
      area: 'Jakarta Timur',
      joinDate: '2024-03-10',
      lastLogin: '2024-12-10 09:15'
    },
    {
      id: 'PIC2028',
      name: 'Siti Nurhaliza',
      email: 'siti.pic@example.com',
      phone: '081234567893',
      status: 'Aktif',
      kurirCount: 12,
      area: 'Surabaya',
      joinDate: '2024-01-25',
      lastLogin: '2024-12-15 08:20'
    }
  ]);

  const handleAddPIC = () => {
    toast({
      title: "Form Tambah PIC",
      description: "Membuka form untuk menambahkan PIC baru",
    });
    console.log("Opening add PIC form");
  };

  const handleDownloadTemplate = () => {
    const templateData = `ID PIC,Nama,Email,Telepon,Area,Status,Tanggal Bergabung
PIC2029,Nama PIC,email@example.com,081234567890,Jakarta Selatan,Aktif,2024-12-15
PIC2030,Nama PIC 2,email2@example.com,081234567891,Jakarta Timur,Aktif,2024-12-15`;
    
    downloadFile(templateData, 'template_pic.csv', 'text/csv;charset=utf-8;');
    
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk PIC berhasil didownload sebagai template_pic.csv",
    });
    console.log("Downloaded PIC template");
  };

  const handleEditPIC = (pic: any) => {
    toast({
      title: "Edit PIC",
      description: `Membuka form edit untuk ${pic.name}`,
    });
    console.log("Editing PIC:", pic);
  };

  const handleDeletePIC = (pic: any) => {
    toast({
      title: "Konfirmasi Hapus",
      description: `Menghapus PIC ${pic.name}? Aksi ini tidak dapat dibatalkan.`,
      variant: "destructive"
    });
    console.log("Deleting PIC:", pic);
  };

  const handleViewDetails = (pic: any) => {
    toast({
      title: "Detail PIC",
      description: `Menampilkan detail lengkap untuk ${pic.name}`,
    });
    console.log("Viewing PIC details:", pic);
  };

  const filteredPICs = pics.filter(pic =>
    pic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola PIC</h1>
            <p className="text-gray-600">Manajemen Person in Charge</p>
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
            <Button onClick={handleAddPIC}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah PIC
            </Button>
          </div>
        </div>

        {/* Excel Import Section */}
        {showExcelImport && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Import Data PIC</CardTitle>
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
              <Users className="h-5 w-5" />
              Daftar PIC
            </CardTitle>
            <CardDescription>
              Total: {pics.length} PIC terdaftar | Aktif: {pics.filter(p => p.status === 'Aktif').length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari PIC berdasarkan nama, ID, email, atau area..."
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
                    <TableHead>PIC</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Jumlah Kurir</TableHead>
                    <TableHead>Login Terakhir</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead className="w-[50px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPICs.map((pic) => (
                    <TableRow key={pic.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {pic.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{pic.name}</p>
                            <p className="text-sm text-gray-500">{pic.id}</p>
                            <p className="text-sm text-gray-500">{pic.email}</p>
                            <p className="text-xs text-gray-400">{pic.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{pic.area}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={pic.status === 'Aktif' ? 'default' : 'secondary'}>
                          {pic.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-600">{pic.kurirCount} Kurir</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{pic.lastLogin}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{pic.joinDate}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(pic)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPIC(pic)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeletePIC(pic)} className="text-red-600">
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
              
              {filteredPICs.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada PIC yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManagePIC;
