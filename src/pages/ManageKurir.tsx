
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const ManageKurir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kurirs] = useState([
    {
      id: 'PISTEST2025',
      name: 'Kurir Test',
      email: 'kurir@example.com',
      status: 'Aktif',
      performance: '95%',
      area: 'Jakarta Selatan'
    },
    {
      id: 'KURIR001',
      name: 'Ahmad Kurniawan',
      email: 'ahmad@example.com',
      status: 'Aktif',
      performance: '88%',
      area: 'Jakarta Timur'
    }
  ]);

  const handleAddKurir = () => {
    toast({
      title: "Fitur Segera Hadir",
      description: "Fitur tambah kurir akan segera tersedia.",
    });
  };

  const filteredKurirs = kurirs.filter(kurir =>
    kurir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kurir.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Kurir</h1>
            <p className="text-gray-600">Manajemen kurir dan performa</p>
          </div>
          <Button onClick={handleAddKurir}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Kurir
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Daftar Kurir
            </CardTitle>
            <CardDescription>
              Total: {kurirs.length} kurir aktif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari kurir..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredKurirs.map((kurir) => (
                <div key={kurir.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{kurir.name}</p>
                      <p className="text-sm text-gray-600">{kurir.id}</p>
                      <p className="text-sm text-gray-500">{kurir.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={kurir.status === 'Aktif' ? 'default' : 'secondary'}>
                        {kurir.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">Performa: {kurir.performance}</p>
                      <p className="text-sm text-gray-500">Area: {kurir.area}</p>
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

export default ManageKurir;
