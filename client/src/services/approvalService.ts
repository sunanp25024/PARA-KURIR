// Migrated to server-side API calls

export interface ApprovalRequest {
  id: string;
  requester_id: string;
  requester_name: string;
  request_type: 'create_admin' | 'edit_admin' | 'toggle_status' | 'delete_admin' | 'import_pic_data' | 'import_kurir_data';
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
    const response = await fetch('/api/approval-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requester_id: requesterId,
        requester_name: requesterName,
        request_type: requestType,
        target_admin_id: targetAdminId || null,
        request_data: requestData,
        current_data: currentData || null,
        status: 'pending'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create approval request');
    }

    return response.json();
  },

  // Create bulk approval requests for import data
  async createBulkImportApprovalRequest(
    requesterId: string,
    requesterName: string,
    requestType: 'import_pic_data' | 'import_kurir_data',
    importData: any[]
  ) {
    const response = await fetch('/api/approval-requests/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requester_id: requesterId,
        requester_name: requesterName,
        request_type: requestType,
        request_data: { import_data: importData },
        status: 'pending'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create bulk approval request');
    }

    return response.json();
  },

  // Get all approval requests
  async getApprovalRequests() {
    const response = await fetch('/api/approval-requests');
    
    if (!response.ok) {
      throw new Error('Failed to fetch approval requests');
    }

    return response.json();
  },

  // Get pending approval requests
  async getPendingApprovalRequests() {
    const response = await fetch('/api/approval-requests?status=pending');
    
    if (!response.ok) {
      throw new Error('Failed to fetch pending approval requests');
    }

    return response.json();
  },

  // Update request status
  async updateRequestStatus(
    requestId: string,
    status: 'approved' | 'rejected',
    approverId: string,
    notes?: string
  ) {
    const response = await fetch(`/api/approval-requests/${requestId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        notes: notes || null
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update request status');
    }

    return response.json();
  }
};