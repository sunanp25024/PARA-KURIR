
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, X, Bell } from 'lucide-react';
import Layout from '@/components/Layout';

const ApprovalStatus = () => {
  const approvalRequests = [
    {
      id: 1,
      type: 'Tambah Kurir',
      details: 'Permintaan menambah kurir baru: Budi Santoso',
      submittedAt: '2 jam yang lalu',
      status: 'pending',
      approver: 'Master Admin'
    },
    {
      id: 2,
      type: 'Update Area',
      details: 'Perubahan area kerja kurir KURIR001',
      submittedAt: '1 hari yang lalu',
      status: 'approved',
      approver: 'Master Admin'
    },
    {
      id: 3,
      type: 'Tambah PIC',
      details: 'Permintaan menambah PIC untuk area Bandung',
      submittedAt: '3 hari yang lalu',
      status: 'rejected',
      approver: 'Master Admin'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'approved':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const pendingCount = approvalRequests.filter(req => req.status === 'pending').length;
  const approvedCount = approvalRequests.filter(req => req.status === 'approved').length;
  const rejectedCount = approvalRequests.filter(req => req.status === 'rejected').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Status Persetujuan</h1>
          <p className="text-gray-600">Pantau status permintaan persetujuan Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Permintaan pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">Permintaan disetujui</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">Permintaan ditolak</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Riwayat Permintaan Persetujuan
            </CardTitle>
            <CardDescription>
              Semua permintaan yang telah Anda ajukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvalRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <p className="font-medium">{request.type}</p>
                      <p className="text-sm text-gray-600">{request.details}</p>
                      <p className="text-xs text-gray-500">
                        Diajukan {request.submittedAt} • Approver: {request.approver}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              ))}
              
              {approvalRequests.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada permintaan persetujuan</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ApprovalStatus;
