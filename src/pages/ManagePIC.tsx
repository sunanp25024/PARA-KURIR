
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Users, Upload, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import ExcelImportManager from '@/components/ExcelImportManager';

const ManagePIC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [pics] = useState([
    {
      id: 'PIC2025',
      name: 'PIC User',
      email: 'pic@example.com',
      status: 'Aktif',
      kurirCount: 5,
      area: 'Jakarta Selatan'
    },
    {
      id: 'PIC2026',
      name: 'PIC Bandung',
      email: 'pic.bandung@example.com',
      status: 'Aktif',
      kurirCount: 8,
      area: 'Bandung'
    }
  ]);

  const handleAddPIC = () => {
    toast({
      title: "Fitur Segera Hadir",
      description: "Fitur tambah PIC akan segera tersedia.",
    });
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Template Excel untuk PIC berhasil didownload.",
    });
    console.log("Downloading PIC template");
  };

  const filteredPICs = pics.filter(pic =>
    pic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pic.id.toLowerCase().includes(searchTerm.toLowerCase())
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
              Total: {pics.length} PIC aktif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari PIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredPICs.map((pic) => (
                <div key={pic.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{pic.name}</p>
                      <p className="text-sm text-gray-600">{pic.id}</p>
                      <p className="text-sm text-gray-500">{pic.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={pic.status === 'Aktif' ? 'default' : 'secondary'}>
                        {pic.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{pic.kurirCount} Kurir</p>
                      <p className="text-sm text-gray-500">Area: {pic.area}</p>
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

export default ManagePIC;
