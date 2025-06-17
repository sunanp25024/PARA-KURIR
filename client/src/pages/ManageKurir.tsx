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

const ManageKurir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedKurir, setSelectedKurir] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newKurirData, setNewKurirData] = useState({
    user_id: '',
    name: '',
    email: '',
    phone: '',
    role: 'Kurir',
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
      const kurirUsers = allUsers.filter(user => user.role === 'Kurir');
      setUsers(kurirUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data kurir",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isMasterAdmin = currentUser?.role === 'Master Admin';

  const handleAddKurir = async () => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat menambah kurir",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await apiService.createUser(newKurirData);
      await loadUsers();
      setIsAddDialogOpen(false);
      setNewKurirData({
        user_id: '',
        name: '',
        email: '',
        phone: '',
        role: 'Kurir',
        wilayah: '',
        area: '',
        lokasi_kerja: '',
        password: '',
        status: 'Aktif'
      });
      toast({
        title: "Berhasil",
        description: "Kurir baru berhasil ditambahkan"
      });
    } catch (error) {
      console.error('Error adding kurir:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan kurir",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditKurir = (kurir: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengedit kurir",
        variant: "destructive"
      });
      return;
    }
    setSelectedKurir(kurir);
    setIsEditDialogOpen(true);
  };

  const handleUpdateKurir = async () => {
    if (!selectedKurir) return;

    try {
      setIsLoading(true);
      await apiService.updateUser(selectedKurir.id, selectedKurir);
      await loadUsers();
      setIsEditDialogOpen(false);
      toast({
        title: "Berhasil",
        description: "Data kurir berhasil diperbarui"
      });
    } catch (error) {
      console.error('Error updating kurir:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data kurir",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (kurir: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengubah status kurir",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const newStatus = kurir.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
      await apiService.updateUser(kurir.id, { status: newStatus });
      await loadUsers();
      toast({
        title: "Berhasil",
        description: `Status kurir berhasil diubah menjadi ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status kurir",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKurir = async () => {
    if (!selectedKurir || !isMasterAdmin) return;

    try {
      setIsLoading(true);
      await apiService.deleteUser(selectedKurir.id);
      await loadUsers();
      setShowDeleteDialog(false);
      toast({
        title: "Berhasil",
        description: "Kurir berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting kurir:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus kurir",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (kurir: User) => {
    setSelectedKurir(kurir);
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
            <h1 className="text-3xl font-bold">Manage Kurir</h1>
            <p className="text-gray-600">Kelola data kurir pengiriman</p>
          </div>
          {isMasterAdmin && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Kurir
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

        {/* Kurir Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Kurir ({filteredUsers.length})</CardTitle>
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
                                <DropdownMenuItem onClick={() => handleEditKurir(user)}>
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
                                    setSelectedKurir(user);
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

        {/* Add Kurir Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Kurir Baru</DialogTitle>
              <DialogDescription>
                Lengkapi data kurir baru di bawah ini
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={newKurirData.user_id}
                  onChange={(e) => setNewKurirData({...newKurirData, user_id: e.target.value})}
                  placeholder="Contoh: KURIR002"
                />
              </div>
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={newKurirData.name}
                  onChange={(e) => setNewKurirData({...newKurirData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newKurirData.email}
                  onChange={(e) => setNewKurirData({...newKurirData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={newKurirData.phone}
                  onChange={(e) => setNewKurirData({...newKurirData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={newKurirData.area}
                  onChange={(e) => setNewKurirData({...newKurirData, area: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lokasi_kerja">Lokasi Kerja</Label>
                <Input
                  id="lokasi_kerja"
                  value={newKurirData.lokasi_kerja}
                  onChange={(e) => setNewKurirData({...newKurirData, lokasi_kerja: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newKurirData.password}
                  onChange={(e) => setNewKurirData({...newKurirData, password: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddKurir} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Kurir Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Kurir</DialogTitle>
              <DialogDescription>
                Perbarui data kurir
              </DialogDescription>
            </DialogHeader>
            {selectedKurir && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit_name">Nama Lengkap</Label>
                  <Input
                    id="edit_name"
                    value={selectedKurir.name}
                    onChange={(e) => setSelectedKurir({...selectedKurir, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_email">Email</Label>
                  <Input
                    id="edit_email"
                    type="email"
                    value={selectedKurir.email}
                    onChange={(e) => setSelectedKurir({...selectedKurir, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_phone">Nomor Telepon</Label>
                  <Input
                    id="edit_phone"
                    value={selectedKurir.phone}
                    onChange={(e) => setSelectedKurir({...selectedKurir, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_area">Area</Label>
                  <Input
                    id="edit_area"
                    value={selectedKurir.area}
                    onChange={(e) => setSelectedKurir({...selectedKurir, area: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_lokasi_kerja">Lokasi Kerja</Label>
                  <Input
                    id="edit_lokasi_kerja"
                    value={selectedKurir.lokasi_kerja}
                    onChange={(e) => setSelectedKurir({...selectedKurir, lokasi_kerja: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUpdateKurir} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detail Kurir</DialogTitle>
            </DialogHeader>
            {selectedKurir && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">User ID</Label>
                    <p>{selectedKurir.user_id}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nama Lengkap</Label>
                    <p>{selectedKurir.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Email</Label>
                    <p>{selectedKurir.email}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nomor Telepon</Label>
                    <p>{selectedKurir.phone}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Area</Label>
                    <p>{selectedKurir.area}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Wilayah</Label>
                    <p>{selectedKurir.wilayah}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Lokasi Kerja</Label>
                    <p>{selectedKurir.lokasi_kerja}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Status</Label>
                    <Badge variant={selectedKurir.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedKurir.status}
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
                Apakah Anda yakin ingin menghapus kurir "{selectedKurir?.name}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteKurir} className="bg-red-600 hover:bg-red-700">
                {isLoading ? 'Menghapus...' : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ManageKurir;