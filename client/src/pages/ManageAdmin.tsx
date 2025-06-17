import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const ManageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    user_id: '',
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
    wilayah: '',
    area: '',
    lokasi_kerja: '',
    password: '',
    status: 'Aktif'
  });

  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  // Load users from database
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const allUsers = await apiService.getUsers();
      // Filter to show only Admin roles
      const adminUsers = allUsers.filter(user => 
        user.role === 'Admin' || user.role === 'Super Admin' || user.role === 'Admin Area'
      );
      setUsers(adminUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if current user is Master Admin
  const isMasterAdmin = currentUser?.role === 'Master Admin';

  // Handle Add Admin
  const handleAddAdmin = async () => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat menambah admin",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const newUser = await apiService.createUser(newAdminData);
      await loadUsers();
      setIsAddDialogOpen(false);
      setNewAdminData({
        user_id: '',
        name: '',
        email: '',
        phone: '',
        role: 'Admin',
        wilayah: '',
        area: '',
        lokasi_kerja: '',
        password: '',
        status: 'Aktif'
      });
      toast({
        title: "Berhasil",
        description: "Admin baru berhasil ditambahkan"
      });
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Admin
  const handleEditAdmin = (admin: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengedit admin",
        variant: "destructive"
      });
      return;
    }
    setSelectedAdmin(admin);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAdmin = async () => {
    if (!selectedAdmin) return;

    try {
      setIsLoading(true);
      await apiService.updateUser(selectedAdmin.id, selectedAdmin);
      await loadUsers();
      setIsEditDialogOpen(false);
      toast({
        title: "Berhasil",
        description: "Data admin berhasil diperbarui"
      });
    } catch (error) {
      console.error('Error updating admin:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Toggle Status
  const handleToggleStatus = async (admin: User) => {
    if (!isMasterAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Master Admin yang dapat mengubah status admin",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const newStatus = admin.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
      await apiService.updateUser(admin.id, { status: newStatus });
      await loadUsers();
      toast({
        title: "Berhasil",
        description: `Status admin berhasil diubah menjadi ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete Admin
  const handleDeleteAdmin = async () => {
    if (!selectedAdmin || !isMasterAdmin) return;

    try {
      setIsLoading(true);
      await apiService.deleteUser(selectedAdmin.id);
      await loadUsers();
      setShowDeleteDialog(false);
      toast({
        title: "Berhasil",
        description: "Admin berhasil dihapus"
      });
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle View Details
  const handleViewDetails = (admin: User) => {
    setSelectedAdmin(admin);
    setShowDetailDialog(true);
  };

  // Filter users based on search and filters
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
            <h1 className="text-3xl font-bold">Manage Admin</h1>
            <p className="text-gray-600">Kelola data administrator sistem</p>
          </div>
          {isMasterAdmin && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Admin
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

        {/* Admin Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Admin ({filteredUsers.length})</CardTitle>
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
                    <TableHead>Role</TableHead>
                    <TableHead>Area</TableHead>
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
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.area}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleEditAdmin(user)}>
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
                                    setSelectedAdmin(user);
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

        {/* Add Admin Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Admin Baru</DialogTitle>
              <DialogDescription>
                Lengkapi data admin baru di bawah ini
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={newAdminData.user_id}
                  onChange={(e) => setNewAdminData({...newAdminData, user_id: e.target.value})}
                  placeholder="Contoh: ADMIN2028"
                />
              </div>
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={newAdminData.phone}
                  onChange={(e) => setNewAdminData({...newAdminData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newAdminData.role} onValueChange={(value) => setNewAdminData({...newAdminData, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin Area">Admin Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={newAdminData.area}
                  onChange={(e) => setNewAdminData({...newAdminData, area: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddAdmin} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Admin Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Admin</DialogTitle>
              <DialogDescription>
                Perbarui data admin
              </DialogDescription>
            </DialogHeader>
            {selectedAdmin && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit_name">Nama Lengkap</Label>
                  <Input
                    id="edit_name"
                    value={selectedAdmin.name}
                    onChange={(e) => setSelectedAdmin({...selectedAdmin, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_email">Email</Label>
                  <Input
                    id="edit_email"
                    type="email"
                    value={selectedAdmin.email}
                    onChange={(e) => setSelectedAdmin({...selectedAdmin, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_phone">Nomor Telepon</Label>
                  <Input
                    id="edit_phone"
                    value={selectedAdmin.phone}
                    onChange={(e) => setSelectedAdmin({...selectedAdmin, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_role">Role</Label>
                  <Select value={selectedAdmin.role} onValueChange={(value) => setSelectedAdmin({...selectedAdmin, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin Area">Admin Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit_area">Area</Label>
                  <Input
                    id="edit_area"
                    value={selectedAdmin.area}
                    onChange={(e) => setSelectedAdmin({...selectedAdmin, area: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUpdateAdmin} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detail Admin</DialogTitle>
            </DialogHeader>
            {selectedAdmin && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">User ID</Label>
                    <p>{selectedAdmin.user_id}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nama Lengkap</Label>
                    <p>{selectedAdmin.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Email</Label>
                    <p>{selectedAdmin.email}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nomor Telepon</Label>
                    <p>{selectedAdmin.phone}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Role</Label>
                    <p>{selectedAdmin.role}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Area</Label>
                    <p>{selectedAdmin.area}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Wilayah</Label>
                    <p>{selectedAdmin.wilayah}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Lokasi Kerja</Label>
                    <p>{selectedAdmin.lokasi_kerja}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Status</Label>
                    <Badge variant={selectedAdmin.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedAdmin.status}
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
                Apakah Anda yakin ingin menghapus admin "{selectedAdmin?.name}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAdmin} className="bg-red-600 hover:bg-red-700">
                {isLoading ? 'Menghapus...' : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default ManageAdmin;