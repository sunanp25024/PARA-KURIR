
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Clock, Eye, UserPlus, Edit, ToggleLeft, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useApprovals } from '@/hooks/useApprovals';
import { ApprovalRequest } from '@/services/approvalService';

const ApprovalRequests = () => {
  const { pendingRequests, allRequests, loading, approveRequest, rejectRequest } = useApprovals();
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [notes, setNotes] = useState('');

  const handleViewDetails = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setShowDetailDialog(true);
  };

  const handleApprovalAction = (request: ApprovalRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setNotes('');
    setShowApprovalDialog(true);
  };

  const confirmApprovalAction = async () => {
    if (!selectedRequest) return;

    const approverId = 'MASTER_ADMIN'; // In real app, get from auth context
    
    if (approvalAction === 'approve') {
      await approveRequest(selectedRequest.id, approverId, notes);
    } else {
      await rejectRequest(selectedRequest.id, approverId, notes);
    }
    
    setShowApprovalDialog(false);
    setSelectedRequest(null);
    setNotes('');
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'create_admin': return <UserPlus className="h-4 w-4" />;
      case 'edit_admin': return <Edit className="h-4 w-4" />;
      case 'toggle_status': return <ToggleLeft className="h-4 w-4" />;
      case 'delete_admin': return <Trash2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'create_admin': return 'Tambah Admin';
      case 'edit_admin': return 'Edit Admin';
      case 'toggle_status': return 'Ubah Status';
      case 'delete_admin': return 'Hapus Admin';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="text-green-600 bg-green-100 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderRequestTable = (requests: ApprovalRequest[], showActions = false) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request</TableHead>
          <TableHead>Pemohon</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getRequestTypeIcon(request.request_type)}
                <div>
                  <p className="font-medium">{getRequestTypeLabel(request.request_type)}</p>
                  <p className="text-sm text-gray-500">
                    {request.target_admin_id ? `Target: ${request.target_admin_id}` : 'Admin Baru'}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{request.requester_name}</p>
                <p className="text-sm text-gray-500">{request.requester_id}</p>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{new Date(request.created_at).toLocaleDateString('id-ID')}</span>
            </TableCell>
            <TableCell>
              {getStatusBadge(request.status)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(request)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {showActions && request.status === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprovalAction(request, 'approve')}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleApprovalAction(request, 'reject')}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approval Requests</h1>
          <p className="text-gray-600">Kelola permintaan persetujuan dari Admin</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{pendingRequests.length}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {allRequests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-sm text-gray-600">Disetujui</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {allRequests.filter(r => r.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-gray-600">Ditolak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Approval Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
                <TabsTrigger value="all">Semua ({allRequests.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="mt-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Tidak ada pending requests</p>
                  </div>
                ) : (
                  renderRequestTable(pendingRequests, true)
                )}
              </TabsContent>
              
              <TabsContent value="all" className="mt-4">
                {allRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada approval requests</p>
                  </div>
                ) : (
                  renderRequestTable(allRequests, false)
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detail Approval Request</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Jenis Request</Label>
                    <p className="text-sm">{getRequestTypeLabel(selectedRequest.request_type)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Pemohon</Label>
                    <p className="text-sm">{selectedRequest.requester_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Tanggal</Label>
                    <p className="text-sm">{new Date(selectedRequest.created_at).toLocaleString('id-ID')}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data Request</Label>
                  <pre className="text-xs bg-gray-100 p-3 rounded mt-1 overflow-auto max-h-32">
                    {JSON.stringify(selectedRequest.request_data, null, 2)}
                  </pre>
                </div>

                {selectedRequest.current_data && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data Saat Ini</Label>
                    <pre className="text-xs bg-gray-100 p-3 rounded mt-1 overflow-auto max-h-32">
                      {JSON.stringify(selectedRequest.current_data, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedRequest.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Catatan</Label>
                    <p className="text-sm">{selectedRequest.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Approval Dialog */}
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {approvalAction === 'approve' ? 'Setujui Request' : 'Tolak Request'}
              </DialogTitle>
              <DialogDescription>
                {approvalAction === 'approve' 
                  ? 'Anda akan menyetujui request ini dan perubahan akan diterapkan.'
                  : 'Anda akan menolak request ini.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Berikan catatan atau alasan..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                Batal
              </Button>
              <Button
                variant={approvalAction === 'approve' ? 'default' : 'destructive'}
                onClick={confirmApprovalAction}
              >
                {approvalAction === 'approve' ? 'Setujui' : 'Tolak'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ApprovalRequests;
