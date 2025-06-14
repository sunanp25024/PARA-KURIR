
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, X, Check, Clock, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Approval = () => {
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      type: 'Tambah Kurir',
      requestedBy: 'ADMIN2025',
      details: 'Permintaan menambah kurir baru: Ahmad Kurniawan',
      timestamp: '2 jam yang lalu',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Update Area',
      requestedBy: 'PIC2025',
      details: 'Perubahan area kerja kurir PISTEST2025 ke Jakarta Timur',
      timestamp: '4 jam yang lalu',
      status: 'pending'
    },
    {
      id: 3,
      type: 'Hapus Kurir',
      requestedBy: 'ADMIN2025',
      details: 'Permintaan menghapus kurir KURIR002 - tidak aktif',
      timestamp: '1 hari yang lalu',
      status: 'pending'
    }
  ]);

  const handleApprove = (id: number) => {
    setApprovals(prev => 
      prev.map(approval => 
        approval.id === id 
          ? { ...approval, status: 'approved' }
          : approval
      )
    );
    toast({
      title: "Permintaan Disetujui",
      description: "Permintaan telah disetujui dan akan diproses.",
    });
  };

  const handleReject = (id: number) => {
    setApprovals(prev => 
      prev.map(approval => 
        approval.id === id 
          ? { ...approval, status: 'rejected' }
          : approval
      )
    );
    toast({
      title: "Permintaan Ditolak",
      description: "Permintaan telah ditolak.",
      variant: "destructive"
    });
  };

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const processedApprovals = approvals.filter(a => a.status !== 'pending');

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Persetujuan</h1>
          <p className="text-gray-600">Kelola permintaan yang memerlukan persetujuan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovals.length}</div>
              <p className="text-xs text-muted-foreground">Permintaan pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disetujui Hari Ini</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Permintaan disetujui</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ditolak Hari Ini</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Permintaan ditolak</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Permintaan Menunggu Persetujuan
            </CardTitle>
            <CardDescription>
              {pendingApprovals.length} permintaan memerlukan persetujuan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">{approval.type}</p>
                      <p className="text-sm text-gray-600">{approval.details}</p>
                      <p className="text-xs text-gray-500">
                        Diminta oleh: {approval.requestedBy} • {approval.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReject(approval.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Tolak
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApprove(approval.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Setujui
                    </Button>
                  </div>
                </div>
              ))}
              
              {pendingApprovals.length === 0 && (
                <div className="text-center py-8">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada permintaan yang menunggu persetujuan</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {processedApprovals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Persetujuan</CardTitle>
              <CardDescription>Permintaan yang telah diproses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processedApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        approval.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {approval.status === 'approved' ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{approval.type}</p>
                        <p className="text-sm text-gray-600">{approval.details}</p>
                        <p className="text-xs text-gray-500">
                          Diminta oleh: {approval.requestedBy} • {approval.timestamp}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant={approval.status === 'approved' ? 'default' : 'destructive'}>
                      {approval.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Approval;
