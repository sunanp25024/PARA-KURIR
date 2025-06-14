
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const ManageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins] = useState([
    {
      id: 'ADMIN2025',
      name: 'Admin User',
      email: 'admin@example.com',
      status: 'Aktif',
      lastLogin: '2024-06-14',
      area: 'Jakarta'
    },
    {
      id: 'ADMIN2026',
      name: 'Admin Bandung',
      email: 'admin.bandung@example.com',
      status: 'Aktif',
      lastLogin: '2024-06-13',
      area: 'Bandung'
    }
  ]);

  const handleAddAdmin = () => {
    toast({
      title: "Fitur Segera Hadir",
      description: "Fitur tambah admin akan segera tersedia.",
    });
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Admin</h1>
            <p className="text-gray-600">Manajemen akun administrator</p>
          </div>
          <Button onClick={handleAddAdmin}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Admin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Daftar Administrator
            </CardTitle>
            <CardDescription>
              Total: {admins.length} admin terdaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredAdmins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-600">{admin.id}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={admin.status === 'Aktif' ? 'default' : 'secondary'}>
                        {admin.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">Area: {admin.area}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManageAdmin;
