
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Edit, Trash2, User, Upload, Download, Eye, MoreHorizontal, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
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
import AddPICForm from '@/components/forms/AddPICForm';
import EditPICForm from '@/components/forms/EditPICForm';
import { useApprovals } from '@/hooks/useApprovals';

const ManagePIC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPIC, setSelectedPIC] = useState<any>(null);
  const { createApprovalRequest } = useApprovals();
  
  // Get user role from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const userRole = user.role || '';
  const isMasterAdmin = userRole === 'master-admin';
  const isAdmin = userRole === 'admin';
  const canManage = isMasterAdmin || isAdmin;

  const [pics, setPics] = useState([
    {
      id: 'PIC001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '081234567890',
      department: 'Customer Service',
      workLocation: 'Kantor Pusat - Jl. Sudirman',
      status: 'Aktif',
      joinDate: '2024-01-15'
    },
    {
      id: 'PIC002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '081234567891',
      department: 'Operasional',
      workLocation: 'Cabang Jakarta Timur',
      status: 'Aktif',
      joinDate: '2024-02-20'
    },
    {
      id: 'PIC003',
      name: 'Lisa Wong',
      email: 'lisa.wong@company.com',
      phone: '081234567892',
      department: 'Logistik',
      workLocation: 'Warehouse Cakung',
      status: 'Tidak Aktif',
      joinDate: '2024-03-10'
    }
  ]);

  const handleAddPIC = async (newPIC: any) => {
    if (isMasterAdmin) {
      // Master Admin can add directly
      setPics([...pics, newPIC]);
      setShowAddDialog(false);
      toast({
        title: "PIC Ditambahkan",
        description: `PIC ${newPIC.name} berhasil ditambahkan`,
      });
    } else if (isAdmin) {
      // Admin needs approval
      await createApprovalRequest(
        user.id,
        user.name,
        'create_admin', // Using existing enum, ideally should be 'create_pic'
        newPIC,
        undefined,
        undefined
      );
      setShowAddDialog(false);
    }
  };

  const handleEditPIC = (pic: any) => {
    if (!canManage) return;
    setSelectedPIC(pic);
    setShowEditDialog(true);
  };

  const handleUpdatePIC = async (updatedPIC: any) => {
    if (isMasterAdmin) {
      // Master Admin can update directly
      setPics(pics.map(p => p.id === updatedPIC.id ? updatedPIC : p));
      setShowEditDialog(false);
      setSelectedPIC(null);
      toast({
        title: "PIC Diperbarui",
        description: `Data PIC ${updatedPIC.name} berhasil diperbarui`,
      });
    } else if (isAdmin) {
      // Admin needs approval
      await createApprovalRequest(
        user.id,
        user.name,
        'edit_admin', // Using existing enum, ideally should be 'edit_pic'
        updatedPIC,
        selectedPIC.id,
        selectedPIC
      );
      setShowEditDialog(false);
      setSelectedPIC(null);
    }
  };

  const handleToggleStatus = async (pic: any) => {
    if (!canManage) return;
    
    const newStatus = pic.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
    const updatedPIC = { ...pic, status: newStatus };
    
    if (isMasterAdmin) {
      // Master Admin can toggle directly
      setPics(pics.map(p => p.id === pic.id ? updatedPIC : p));
      toast({
        title: "Status PIC Diubah",
        description: `Status PIC ${pic.name} berhasil diubah menjadi ${newStatus}`,
      });
    } else if (isAdmin) {
      // Admin needs approval
      await createApprovalRequest(
        user.id,
        user.name,
        'toggle_status',
        { id: pic.id, status: newStatus },
        pic.id,
        pic
      );
    }
  };

  const handleDeletePIC = (pic: any) => {
    if (!canManage) return;
    setSelectedPIC(pic);
    setShowDeleteDialog(true);
  };

  const confirmDeletePIC = async () => {
    if (isMasterAdmin) {
      // Master Admin can delete directly
      setPics(pics.filter(p => p.id !== selectedPIC.id));
      setShowDeleteDialog(false);
      setSelectedPIC(null);
      toast({
        title: "PIC Dihapus",
        description: `PIC ${selectedPIC.name} telah dihapus dari sistem`,
        variant: "destructive"
      });
    } else if (isAdmin) {
      // Admin needs approval
      await createApprovalRequest(
        user.id,
        user.name,
        'delete_admin', // Using existing enum, ideally should be 'delete_pic'
        { id: selectedPIC.id },
        selectedPIC.id,
        selectedPIC
      );
      setShowDeleteDialog(false);
      setSelectedPIC(null);
    }
  };

  const handleViewDetails = (pic: any) => {
    setSelectedPIC(pic);
    setShowDetailDialog(true);
  };

  const handleDownloadTemplate = () => {
    if (!canManage) return;
    
    const templateData = `ID PIC,Nama,Email,Telepon,Departemen,Lokasi Kerja,Status,Tanggal Bergabung
PIC004,Nama PIC,email@example.com,081234567890,Customer Service,Kantor Pusat - Jl. Sudirman,Aktif,2024-12-15
PIC005,Nama PIC 2,email2@example.com,081234567891,Operasional,Cabang Jakarta Timur,Aktif,2024-12-15`;
    
    downloadFile(templateData, 'template_pic.csv', 'text/csv;charset=utf-8;');
    
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk PIC berhasil didownload sebagai template_pic.csv",
    });
  };

  const filteredPICs = pics.filter(pic =>
    pic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.workLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola PIC</h1>
            <p className="text-gray-600">Manajemen Person In Charge (PIC)</p>
            {!canManage && (
              <p className="text-sm text-red-600 mt-1">Anda hanya memiliki akses read-only</p>
            )}
          </div>
          {canManage && (
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
                {isAdmin ? 'Request Tambah PIC' : 'Tambah PIC'}
              </Button>
            </div>
          )}
        </div>

        {/* Excel Import Section - Only for those who can manage */}
        {showExcelImport && canManage && (
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
              <User className="h-5 w-5" />
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
                  placeholder="Cari PIC berdasarkan nama, ID, email, departemen, atau lokasi kerja..."
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
                    <TableHead>Departemen</TableHead>
                    <TableHead>Lokasi Kerja</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bergabung</TableHead>
                    {canManage && <TableHead className="w-[50px]">Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPICs.map((pic) => (
                    <TableRow key={pic.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
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
                        <span className="font-medium">{pic.department}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{pic.workLocation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={pic.status === 'Aktif' ? 'default' : 'secondary'}>
                          {pic.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{pic.joinDate}</span>
                      </TableCell>
                      {canManage && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                              <DropdownMenuItem onClick={() => handleViewDetails(pic)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditPIC(pic)}>
                                <Edit className="mr-2 h-4 w-4" />
                                {isAdmin ? 'Request Edit' : 'Edit'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(pic)}>
                                {pic.status === 'Aktif' ? (
                                  <>
                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                    {isAdmin ? 'Request Nonaktifkan' : 'Nonaktifkan'}
                                  </>
                                ) : (
                                  <>
                                    <ToggleRight className="mr-2 h-4 w-4" />
                                    {isAdmin ? 'Request Aktifkan' : 'Aktifkan'}
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeletePIC(pic)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                {isAdmin ? 'Request Hapus' : 'Hapus'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredPICs.length === 0 && (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada PIC yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add PIC Dialog - Only for those who can manage */}
        {canManage && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isAdmin ? 'Request Tambah PIC Baru' : 'Tambah PIC Baru'}</DialogTitle>
                <DialogDescription>
                  {isAdmin 
                    ? 'Request ini akan dikirim ke Master Admin untuk persetujuan'
                    : 'Isi form di bawah untuk menambahkan PIC baru ke sistem'
                  }
                </DialogDescription>
              </DialogHeader>
              <AddPICForm
                onSubmit={handleAddPIC}
                onCancel={() => setShowAddDialog(false)}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Edit PIC Dialog - Only for those who can manage */}
        {canManage && (
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{isAdmin ? 'Request Edit PIC' : 'Edit PIC'}</DialogTitle>
                <DialogDescription>
                  {isAdmin 
                    ? 'Request perubahan ini akan dikirim ke Master Admin untuk persetujuan'
                    : 'Ubah data PIC di bawah ini'
                  }
                </DialogDescription>
              </DialogHeader>
              {selectedPIC && (
                <EditPICForm
                  pic={selectedPIC}
                  onSubmit={handleUpdatePIC}
                  onCancel={() => setShowEditDialog(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* Detail Dialog - Available for all roles */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detail PIC</DialogTitle>
            </DialogHeader>
            {selectedPIC && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {selectedPIC.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPIC.name}</h3>
                    <p className="text-gray-500">{selectedPIC.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{selectedPIC.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telepon</label>
                    <p className="text-sm">{selectedPIC.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Departemen</label>
                    <p className="text-sm">{selectedPIC.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge variant={selectedPIC.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedPIC.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bergabung</label>
                    <p className="text-sm">{selectedPIC.joinDate}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Lokasi Kerja</label>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">{selectedPIC.workLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog - Only for those who can manage */}
        {canManage && (
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isAdmin ? 'Request Hapus PIC' : 'Konfirmasi Hapus PIC'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isAdmin 
                    ? `Request penghapusan PIC "${selectedPIC?.name}" akan dikirim ke Master Admin untuk persetujuan.`
                    : `Apakah Anda yakin ingin menghapus PIC "${selectedPIC?.name}"? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.`
                  }
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeletePIC} className="bg-red-600 hover:bg-red-700">
                  {isAdmin ? 'Kirim Request' : 'Hapus'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </Layout>
  );
};

export default ManagePIC;
