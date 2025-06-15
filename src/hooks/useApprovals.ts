
import { useState, useEffect } from 'react';
import { approvalService, ApprovalRequest } from '@/services/approvalService';
import { toast } from '@/hooks/use-toast';

export const useApprovals = () => {
  const [pendingRequests, setPendingRequests] = useState<ApprovalRequest[]>([]);
  const [allRequests, setAllRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const requests = await approvalService.getPendingRequests();
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
      const requests = await approvalService.getAllRequests();
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
      await approvalService.createApprovalRequest(
        requesterId,
        requesterName,
        requestType,
        requestData,
        targetAdminId,
        currentData
      );
      
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

  const approveRequest = async (requestId: string, approverId: string, notes?: string) => {
    try {
      await approvalService.updateRequestStatus(requestId, 'approved', approverId, notes);
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
    approveRequest,
    rejectRequest
  };
};
