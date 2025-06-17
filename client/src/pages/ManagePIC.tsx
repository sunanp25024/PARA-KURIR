import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, ToggleLeft, ToggleRight, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { apiService, type User } from '@/services/apiService';
import { useAuth } from '@/hooks/useAuth';

const ManagePIC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPIC, setSelectedPIC] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPICData, setNewPICData] = useState({
    user_id: '',
    name: '',
    email: '',
    phone: '',
    role: 'PIC',
    wilayah: '',
    area: '',
    lokasi_kerja: '',
    password: '',
    status: 'Aktif'
  });

  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const allUsers = await apiService.getUsers();
      const picUsers = allUsers.filter(user => user.role === 'PIC');
      setUsers(picUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data PIC",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isMasterAdmin = currentUser?.role === 'Master Admin';

  const handleAddPIC = async () => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat menambah PIC",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await apiService.createUser(newPICData);
      await loadUsers();
      setIsAddDialogOpen(false);
      setNewPICData({
        user_id: '',
        name: '',
        email: '',
        phone: '',
        role: 'PIC',
        wilayah: '',
        area: '',
        lokasi_kerja: '',
        password: '',
        status: 'Aktif'
      });
      toast({
        title: "Berhasil",
        description: "PIC baru berhasil ditambahkan"
      });
    } catch (error) {
      console.error('Error adding PIC:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan PIC",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPIC = (pic: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengedit PIC",
        variant: "destructive"
      });
      return;
    }
    setSelectedPIC(pic);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePIC = async () => {
    if (!selectedPIC) return;

    try {
      setIsLoading(true);
      await apiService.updateUser(selectedPIC.id, selectedPIC);
      await loadUsers();
      setIsEditDialogOpen(false);
      toast({
        title: "Berhasil",
        description: "Data PIC berhasil diperbarui"
      });
    } catch (error) {
      console.error('Error updating PIC:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data PIC",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (pic: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengubah status PIC",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const newStatus = pic.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
      await apiService.updateUser(pic.id, { status: newStatus });
      await loadUsers();
      toast({
        title: "Berhasil",
        description: `Status PIC berhasil diubah menjadi ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status PIC",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePIC = async () => {
    if (!selectedPIC || !isMasterAdmin) return;

    try {
      setIsLoading(true);
      await apiService.deleteUser(selectedPIC.id);
      await loadUsers();
      setShowDeleteDialog(false);
      toast({
        title: "Berhasil",
        description: "PIC berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting PIC:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus PIC",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (pic: User) => {
    setSelectedPIC(pic);
    setShowDetailDialog(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.user_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesArea = areaFilter === 'all' || user.area === areaFilter;
    
    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage PIC</h1>
            <p className="text-gray-600">Kelola data Person in Charge</p>
          </div>
          {isMasterAdmin && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah PIC
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter & Pencarian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama, email, atau ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Area</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Bandung">Bandung</SelectItem>
                  <SelectItem value="Surabaya">Surabaya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* PIC Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar PIC ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Lokasi Kerja</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.user_id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.area}</TableCell>
                      <TableCell>{user.lokasi_kerja}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Aktif' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {isMasterAdmin && (
                              <>
                                <DropdownMenuItem onClick={() => handleEditPIC(user)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                                  {user.status === 'Aktif' ? (
                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                  ) : (
                                    <ToggleRight className="mr-2 h-4 w-4" />
                                  )}
                                  {user.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setSelectedPIC(user);
                                    setShowDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Hapus
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add PIC Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah PIC Baru</DialogTitle>
              <DialogDescription>
                Lengkapi data PIC baru di bawah ini
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={newPICData.user_id}
                  onChange={(e) => setNewPICData({...newPICData, user_id: e.target.value})}
                  placeholder="Contoh: PIC2028"
                />
              </div>
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={newPICData.name}
                  onChange={(e) => setNewPICData({...newPICData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPICData.email}
                  onChange={(e) => setNewPICData({...newPICData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={newPICData.phone}
                  onChange={(e) => setNewPICData({...newPICData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={newPICData.area}
                  onChange={(e) => setNewPICData({...newPICData, area: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lokasi_kerja">Lokasi Kerja</Label>
                <Input
                  id="lokasi_kerja"
                  value={newPICData.lokasi_kerja}
                  onChange={(e) => setNewPICData({...newPICData, lokasi_kerja: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPICData.password}
                  onChange={(e) => setNewPICData({...newPICData, password: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddPIC} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit PIC Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit PIC</DialogTitle>
              <DialogDescription>
                Perbarui data PIC
              </DialogDescription>
            </DialogHeader>
            {selectedPIC && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit_name">Nama Lengkap</Label>
                  <Input
                    id="edit_name"
                    value={selectedPIC.name}
                    onChange={(e) => setSelectedPIC({...selectedPIC, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_email">Email</Label>
                  <Input
                    id="edit_email"
                    type="email"
                    value={selectedPIC.email}
                    onChange={(e) => setSelectedPIC({...selectedPIC, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_phone">Nomor Telepon</Label>
                  <Input
                    id="edit_phone"
                    value={selectedPIC.phone}
                    onChange={(e) => setSelectedPIC({...selectedPIC, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_area">Area</Label>
                  <Input
                    id="edit_area"
                    value={selectedPIC.area}
                    onChange={(e) => setSelectedPIC({...selectedPIC, area: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_lokasi_kerja">Lokasi Kerja</Label>
                  <Input
                    id="edit_lokasi_kerja"
                    value={selectedPIC.lokasi_kerja}
                    onChange={(e) => setSelectedPIC({...selectedPIC, lokasi_kerja: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUpdatePIC} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detail PIC</DialogTitle>
            </DialogHeader>
            {selectedPIC && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">User ID</Label>
                    <p>{selectedPIC.user_id}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nama Lengkap</Label>
                    <p>{selectedPIC.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Email</Label>
                    <p>{selectedPIC.email}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nomor Telepon</Label>
                    <p>{selectedPIC.phone}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Area</Label>
                    <p>{selectedPIC.area}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Wilayah</Label>
                    <p>{selectedPIC.wilayah}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Lokasi Kerja</Label>
                    <p>{selectedPIC.lokasi_kerja}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Status</Label>
                    <Badge variant={selectedPIC.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedPIC.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setShowDetailDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus PIC "{selectedPIC?.name}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePIC} className="bg-red-600 hover:bg-red-700">
                {isLoading ? 'Menghapus...' : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ManagePIC;