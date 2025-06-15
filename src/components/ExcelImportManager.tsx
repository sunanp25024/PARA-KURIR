
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExcelImportManager = () => {
  const [importType, setImportType] = useState('kurir');
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Error",
        description: "Hanya file Excel (.xlsx, .xls) yang diperbolehkan",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      const mockData = generateMockData(importType);
      setUploadedData(mockData);
      setIsProcessing(false);
      
      toast({
        title: "File Berhasil Diupload",
        description: `${mockData.length} data berhasil dimuat dari file Excel`,
      });
    }, 2000);
  };

  const generateMockData = (type: string) => {
    switch (type) {
      case 'kurir':
        return [
          { id: 'KURIR001', nama: 'Ahmad Kurniawan', area: 'Jakarta Selatan', status: 'Valid' },
          { id: 'KURIR002', nama: 'Budi Santoso', area: 'Jakarta Timur', status: 'Valid' },
          { id: 'KURIR003', nama: 'Charlie Van Houten', area: 'Bandung', status: 'Error - Area tidak ditemukan' },
        ];
      case 'pic':
        return [
          { id: 'PIC001', nama: 'Dewi Sartika', wilayah: 'Jakarta', status: 'Valid' },
          { id: 'PIC002', nama: 'Eko Prasetyo', wilayah: 'Bandung', status: 'Valid' },
        ];
      case 'admin':
        return [
          { id: 'ADMIN001', nama: 'Fajar Sidik', wilayah: 'Jakarta', status: 'Valid' },
          { id: 'ADMIN002', nama: 'Gita Savitri', wilayah: 'Surabaya', status: 'Valid' },
        ];
      default:
        return [];
    }
  };

  const handleImportData = () => {
    setIsProcessing(true);
    
    // Simulate data import
    setTimeout(() => {
      const validData = uploadedData.filter(item => item.status === 'Valid');
      
      toast({
        title: "Import Berhasil",
        description: `${validData.length} data berhasil diimport ke sistem`,
      });
      
      setUploadedData([]);
      setIsProcessing(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const downloadTemplate = () => {
    // Simulate template download
    toast({
      title: "Template Downloaded",
      description: `Template ${importType} berhasil didownload`,
    });
    console.log(`Downloading template for ${importType}`);
  };

  const importHistory = [
    { type: 'Kurir', count: 25, date: '2024-06-14', status: 'success' },
    { type: 'PIC', count: 8, date: '2024-06-13', status: 'success' },
    { type: 'Admin', count: 3, date: '2024-06-12', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Data Excel
          </CardTitle>
          <CardDescription>
            Upload file Excel untuk menambahkan data user dalam jumlah besar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tipe Data</label>
              <Select value={importType} onValueChange={setImportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kurir">Data Kurir</SelectItem>
                  <SelectItem value="pic">Data PIC</SelectItem>
                  <SelectItem value="admin">Data Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={downloadTemplate} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              Drag & drop file Excel atau klik untuk memilih
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? 'Memproses...' : 'Pilih File Excel'}
            </Button>
          </div>
          
          {uploadedData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Preview Data ({uploadedData.length} baris)</h3>
                <Button onClick={handleImportData} disabled={isProcessing}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Mengimport...' : 'Import Data'}
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>{importType === 'kurir' ? 'Area' : 'Wilayah'}</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.area || item.wilayah}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === 'Valid' ? 'default' : 'destructive'}
                          className="flex items-center gap-1"
                        >
                          {item.status === 'Valid' ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Riwayat Import
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importHistory.map((history, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Import {history.type}</p>
                  <p className="text-sm text-gray-600">{history.count} data • {history.date}</p>
                </div>
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Berhasil
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcelImportManager;
