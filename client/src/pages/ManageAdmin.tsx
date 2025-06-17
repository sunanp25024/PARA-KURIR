import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Shield, Filter, MoreHorizontal, UserPlus, Upload, Download, Eye, ToggleLeft, ToggleRight, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import EditAdminForm from '@/components/forms/EditAdminForm';
import { useApprovals } from '@/hooks/useApprovals';

interface Admin {
  id: string;
  name: string;
  email: string;
  status: 'Aktif' | 'Nonaktif';
  lastLogin: string;
  area: string;
  role: 'Super Admin' | 'Admin' | 'Admin Area';
  createdAt: string;
  phone?: string;
}

const ManageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    area: ''
  });

  // Get current user info from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const currentUser = {
    id: user.user_id || 'ADMIN2025',
    name: user.name || 'Admin User',
    role: user.role || 'admin'
  };

  const { createApprovalRequest, pendingRequests } = useApprovals();

  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 'ADMIN2025',
      name: 'Admin User',
      email: 'admin@example.com',
      status: 'Aktif',
      lastLogin: '2024-06-14',
      area: 'Jakarta',
      role: 'Super Admin',
      createdAt: '2024-01-15',
      phone: '+62812345678'
    },
    {
      id: 'ADMIN2026',
      name: 'Admin Bandung',
      email: 'admin.bandung@example.com',
      status: 'Aktif',
      lastLogin: '2024-06-13',
      area: 'Bandung',
      role: 'Admin Area',
      createdAt: '2024-02-20',
      phone: '+62812345679'
    },
    {
      id: 'ADMIN2027',
      name: 'Admin Surabaya',
      email: 'admin.surabaya@example.com',
      status: 'Nonaktif',
      lastLogin: '2024-06-10',
      area: 'Surabaya',
      role: 'Admin Area',
      createdAt: '2024-03-10',
      phone: '+62812345680'
    },
    {
      id: 'ADMIN2028',
      name: 'Admin Central',
      email: 'admin.central@example.com',
      status: 'Aktif',
      lastLogin: '2024-06-14',
      area: 'Jakarta',
      role: 'Admin',
      createdAt: '2024-04-05',
      phone: '+62812345681'
    }
  ]);

  // Check if current user needs approval for actions
  const needsApproval = currentUser.role === 'admin';

  const handleAddAdmin = async () => {
    if (needsApproval) {
      // Create approval request for adding admin
      await createApprovalRequest(
        currentUser.id,
        currentUser.name,
        'create_admin',
        newAdminData
      );
      setIsAddDialogOpen(false);
      setNewAdminData({ name: '', email: '', phone: '', role: '', area: '' });
    } else {
      // Direct action for Master Admin
      const newAdmin: Admin = {
        id: `ADMIN${Date.now()}`,
        name: newAdminData.name,
        email: newAdminData.email,
        phone: newAdminData.phone,
        role: newAdminData.role as Admin['role'],
        area: newAdminData.area,
        status: 'Aktif',
        lastLogin: '',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setAdmins([...admins, newAdmin]);
      setIsAddDialogOpen(false);
      setNewAdminData({ name: '', email: '', phone: '', role: '', area: '' });
      
      toast({
        title: "Admin Ditambahkan",
        description: "Admin baru berhasil ditambahkan ke sistem.",
      });
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAdmin = async (updatedAdmin: Admin) => {
    if (needsApproval) {
      // Create approval request for editing admin
      await createApprovalRequest(
        currentUser.id,
        currentUser.name,
        'edit_admin',
        updatedAdmin,
        updatedAdmin.id,
        selectedAdmin
      );
      setIsEditDialogOpen(false);
      setSelectedAdmin(null);
    } else {
      // Direct action for Master Admin
      setAdmins(admins.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
      setIsEditDialogOpen(false);
      setSelectedAdmin(null);
      toast({
        title: "Admin Diperbarui",
        description: `Data admin ${updatedAdmin.name} berhasil diperbarui`,
      });
    }
  };

  const handleToggleStatus = async (admin: Admin) => {
    const newStatus: 'Aktif' | 'Nonaktif' = admin.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    
    if (needsApproval) {
      // Create approval request for toggle status
      await createApprovalRequest(
        currentUser.id,
        currentUser.name,
        'toggle_status',
        { newStatus },
        admin.id,
        admin
      );
    } else {
      // Direct action for Master Admin
      const updatedAdmin = { ...admin, status: newStatus };
      setAdmins(admins.map(a => a.id === admin.id ? updatedAdmin : a));
      
      toast({
        title: "Status Admin Diubah",
        description: `Status admin ${admin.name} berhasil diubah menjadi ${newStatus}`,
      });
    }
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAdmin = async () => {
    if (!selectedAdmin) return;
    
    if (needsApproval) {
      // Create approval request for deleting admin
      await createApprovalRequest(
        currentUser.id,
        currentUser.name,
        'delete_admin',
        { adminId: selectedAdmin.id },
        selectedAdmin.id,
        selectedAdmin
      );
      setShowDeleteDialog(false);
      setSelectedAdmin(null);
    } else {
      // Direct action for Master Admin
      setAdmins(admins.filter(a => a.id !== selectedAdmin.id));
      setShowDeleteDialog(false);
      setSelectedAdmin(null);
      toast({
        title: "Admin Dihapus",
        description: `Admin ${selectedAdmin.name} telah dihapus dari sistem`,
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDetailDialog(true);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk admin berhasil didownload.",
    });
    console.log("Downloading admin template");
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    const matchesArea = areaFilter === 'all' || admin.area === areaFilter;
    
    return matchesSearch && matchesStatus && matchesArea;
  });

  const areas = Array.from(new Set(admins.map(admin => admin.area)));
  const activeAdmins = admins.filter(admin => admin.status === 'Aktif').length;
  const totalAdmins = admins.length;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'destructive';
      case 'Admin': return 'default';
      case 'Admin Area': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Admin</h1>
            <p className="text-gray-600">Manajemen akun administrator sistem</p>
            {needsApproval && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-600">
                  Sebagai Admin, semua perubahan memerlukan persetujuan Master Admin
                </span>
              </div>
            )}
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
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              {needsApproval ? 'Request Tambah Admin' : 'Tambah Admin'}
            </Button>
          </div>
        </div>

        {/* Pending Requests Alert */}
        {needsApproval && pendingRequests.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">
                    Anda memiliki {pendingRequests.length} request yang sedang menunggu persetujuan
                  </p>
                  <p className="text-sm text-orange-600">
                    Request Anda akan diproses oleh Master Admin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Excel Import Section */}
        {showExcelImport && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Import Data Admin</CardTitle>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalAdmins}</p>
                  <p className="text-sm text-gray-600">Total Admin</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">{activeAdmins}</p>
                  <p className="text-sm text-gray-600">Admin Aktif</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">{totalAdmins - activeAdmins}</p>
                  <p className="text-sm text-gray-600">Admin Nonaktif</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">{areas.length}</p>
                  <p className="text-sm text-gray-600">Area Coverage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Daftar Administrator
            </CardTitle>
            <CardDescription>
              Total: {admins.length} Admin terdaftar | Aktif: {activeAdmins}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari admin berdasarkan nama, ID, atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Area</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[50px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{admin.name}</p>
                            <p className="text-sm text-gray-500">{admin.id}</p>
                            <p className="text-sm text-gray-500">{admin.email}</p>
                            <p className="text-xs text-gray-400">{admin.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(admin.role)}>
                          {admin.role}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <span className="text-sm">{admin.area}</span>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={admin.status === 'Aktif' ? 'default' : 'secondary'}>
                          {admin.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <span className="text-sm text-gray-600">{admin.lastLogin}</span>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                            <DropdownMenuItem onClick={() => handleViewDetails(admin)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditAdmin(admin)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {needsApproval ? 'Request Edit' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(admin)}>
                              {admin.status === 'Aktif' ? (
                                <>
                                  <ToggleLeft className="mr-2 h-4 w-4" />
                                  {needsApproval ? 'Request Nonaktifkan' : 'Nonaktifkan'}
                                </>
                              ) : (
                                <>
                                  <ToggleRight className="mr-2 h-4 w-4" />
                                  {needsApproval ? 'Request Aktifkan' : 'Aktifkan'}
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteAdmin(admin)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              {needsApproval ? 'Request Hapus' : 'Hapus'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredAdmins.length === 0 && (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada admin yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Admin Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {needsApproval ? 'Request Tambah Admin Baru' : 'Tambah Admin Baru'}
              </DialogTitle>
              <DialogDescription>
                {needsApproval 
                  ? 'Request untuk menambahkan administrator baru akan dikirim ke Master Admin untuk persetujuan.'
                  : 'Tambahkan administrator baru ke sistem.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nama</Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  className="col-span-3" 
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Telepon</Label>
                <Input 
                  id="phone" 
                  className="col-span-3" 
                  value={newAdminData.phone}
                  onChange={(e) => setNewAdminData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select value={newAdminData.role} onValueChange={(value) => setNewAdminData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Admin Area">Admin Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="area" className="text-right">Area</Label>
                <Select value={newAdminData.area} onValueChange={(value) => setNewAdminData(prev => ({ ...prev, area: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddAdmin}>
                {needsApproval ? 'Kirim Request' : 'Tambah Admin'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Admin Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {needsApproval ? 'Request Edit Admin' : 'Edit Admin'}
              </DialogTitle>
              <DialogDescription>
                {needsApproval 
                  ? 'Request untuk mengubah data admin akan dikirim ke Master Admin untuk persetujuan.'
                  : 'Ubah data admin di bawah ini'
                }
              </DialogDescription>
            </DialogHeader>
            {selectedAdmin && (
              <EditAdminForm
                admin={selectedAdmin}
                onSubmit={handleUpdateAdmin}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detail Admin</DialogTitle>
            </DialogHeader>
            {selectedAdmin && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedAdmin.name}</h3>
                    <p className="text-gray-500">{selectedAdmin.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{selectedAdmin.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telepon</label>
                    <p className="text-sm">{selectedAdmin.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <Badge variant={getRoleBadgeVariant(selectedAdmin.role)}>
                      {selectedAdmin.role}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge variant={selectedAdmin.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedAdmin.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Area</label>
                    <p className="text-sm">{selectedAdmin.area}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bergabung</label>
                    <p className="text-sm">{selectedAdmin.createdAt}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-sm">{selectedAdmin.lastLogin}</p>
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
              <AlertDialogTitle>
                {needsApproval ? 'Konfirmasi Request Hapus Admin' : 'Konfirmasi Hapus Admin'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {needsApproval 
                  ? `Apakah Anda yakin ingin mengirim request untuk menghapus admin "${selectedAdmin?.name}"? Request akan dikirim ke Master Admin untuk persetujuan.`
                  : `Apakah Anda yakin ingin menghapus admin "${selectedAdmin?.name}"? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.`
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteAdmin} className="bg-red-600 hover:bg-red-700">
                {needsApproval ? 'Kirim Request' : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ManageAdmin;
