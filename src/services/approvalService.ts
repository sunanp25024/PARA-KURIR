
import { supabase } from '@/integrations/supabase/client';

export interface ApprovalRequest {
  id: string;
  requester_id: string;
  requester_name: string;
  request_type: 'create_admin' | 'edit_admin' | 'toggle_status' | 'delete_admin';
  target_admin_id: string | null;
  request_data: any;
  current_data: any | null;
  status: 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  notes: string | null;
}

export const approvalService = {
  // Create a new approval request
  async createApprovalRequest(
    requesterId: string,
    requesterName: string,
    requestType: ApprovalRequest['request_type'],
    requestData: any,
    targetAdminId?: string,
    currentData?: any
  ) {
    const { data, error } = await supabase
      .from('approval_requests')
      .insert([
        {
          requester_id: requesterId,
          requester_name: requesterName,
          request_type: requestType,
          target_admin_id: targetAdminId || null,
          request_data: requestData,
          current_data: currentData || null,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating approval request:', error);
      throw error;
    }

    return data;
  },

  // Get all pending approval requests
  async getPendingRequests() {
    const { data, error } = await supabase
      .from('approval_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending requests:', error);
      throw error;
    }

    return data as ApprovalRequest[];
  },

  // Get all approval requests
  async getAllRequests() {
    const { data, error } = await supabase
      .from('approval_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all requests:', error);
      throw error;
    }

    return data as ApprovalRequest[];
  },

  // Approve or reject a request
  async updateRequestStatus(
    requestId: string,
    status: 'approved' | 'rejected',
    approverId: string,
    notes?: string
  ) {
    const { data, error } = await supabase
      .from('approval_requests')
      .update({
        status,
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        notes: notes || null
      })
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Error updating request status:', error);
      throw error;
    }

    return data;
  }
};
