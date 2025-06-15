
-- Create enum for approval request types
CREATE TYPE approval_request_type AS ENUM ('create_admin', 'edit_admin', 'toggle_status', 'delete_admin');

-- Create enum for approval status
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create table for approval requests
CREATE TABLE public.approval_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id TEXT NOT NULL, -- ID of admin who made the request
  requester_name TEXT NOT NULL, -- Name of admin who made the request
  request_type approval_request_type NOT NULL,
  target_admin_id TEXT, -- ID of admin being affected (null for create operations)
  request_data JSONB NOT NULL, -- Data for the requested operation
  current_data JSONB, -- Current data before the change (for edit/delete operations)
  status approval_status NOT NULL DEFAULT 'pending',
  approved_by TEXT, -- ID of master admin who approved/rejected
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT -- Optional notes from approver
);

-- Add Row Level Security
ALTER TABLE public.approval_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view all approval requests (for now - can be restricted later)
CREATE POLICY "Anyone can view approval requests" 
  ON public.approval_requests 
  FOR SELECT 
  USING (true);

-- Policy: Anyone can create approval requests
CREATE POLICY "Anyone can create approval requests" 
  ON public.approval_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Anyone can update approval requests (for approval/rejection)
CREATE POLICY "Anyone can update approval requests" 
  ON public.approval_requests 
  FOR UPDATE 
  USING (true);

-- Create index for better performance
CREATE INDEX idx_approval_requests_status ON public.approval_requests(status);
CREATE INDEX idx_approval_requests_created_at ON public.approval_requests(created_at DESC);
