import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';

export interface ApprovalRequest {
  id: string;
  requester_id: string;
  requester_name: string;
  request_type: string;
  target_admin_id: string | null;
  request_data: any;
  current_data: any | null;
  status: 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  notes: string | null;
}
import { toast } from '@/hooks/use-toast';

export const useApprovals = () => {
  const [pendingRequests, setPendingRequests] = useState<ApprovalRequest[]>([]);
  const [allRequests, setAllRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const requests = await apiService.getPendingApprovalRequests();
      setPendingRequests(requests);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data pending requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const requests = await apiService.getApprovalRequests();
      setAllRequests(requests);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengambil data approval requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createApprovalRequest = async (
    requesterId: string,
    requesterName: string,
    requestType: ApprovalRequest['request_type'],
    requestData: any,
    targetAdminId?: string,
    currentData?: any
  ) => {
    try {
      await apiService.createApprovalRequest({
        requester_id: requesterId,
        requester_name: requesterName,
        request_type: requestType,
        request_data: JSON.stringify(requestData),
        target_admin_id: targetAdminId,
        current_data: currentData ? JSON.stringify(currentData) : null
      });
      
      toast({
        title: "Request Terkirim",
        description: "Permintaan telah dikirim ke Master Admin untuk persetujuan",
      });
      
      // Refresh pending requests
      await fetchPendingRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim request untuk persetujuan",
        variant: "destructive"
      });
    }
  };

  const createBulkImportApprovalRequest = async (
    requesterId: string,
    requesterName: string,
    requestType: 'import_pic_data' | 'import_kurir_data',
    importData: any[]
  ) => {
    try {
      await apiService.createApprovalRequest({
        requester_id: requesterId,
        requester_name: requesterName,
        request_type: requestType,
        request_data: JSON.stringify({
          importData: importData,
          totalRecords: importData.length
        }),
        target_admin_id: null,
        current_data: null
      });
      
      toast({
        title: "Import Request Terkirim",
        description: `Permintaan import ${importData.length} data telah dikirim ke Master Admin untuk persetujuan`,
      });
      
      // Refresh pending requests
      await fetchPendingRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim import request untuk persetujuan",
        variant: "destructive"
      });
    }
  };

  const approveRequest = async (requestId: string, approverId: string, notes?: string) => {
    try {
      await apiService.updateApprovalRequest(requestId, {
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        notes: notes
      });
      toast({
        title: "Request Disetujui",
        description: "Permintaan telah disetujui dan perubahan telah diterapkan",
      });
      
      // Refresh requests
      await fetchPendingRequests();
      await fetchAllRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyetujui request",
        variant: "destructive"
      });
    }
  };

  const rejectRequest = async (requestId: string, approverId: string, notes?: string) => {
    try {
      await approvalService.updateRequestStatus(requestId, 'rejected', approverId, notes);
      toast({
        title: "Request Ditolak",
        description: "Permintaan telah ditolak",
        variant: "destructive"
      });
      
      // Refresh requests
      await fetchPendingRequests();
      await fetchAllRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menolak request",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchAllRequests();
  }, []);

  return {
    pendingRequests,
    allRequests,
    loading,
    fetchPendingRequests,
    fetchAllRequests,
    createApprovalRequest,
    createBulkImportApprovalRequest,
    approveRequest,
    rejectRequest
  };
};
