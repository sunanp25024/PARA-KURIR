-- Enable Row Level Security (RLS) for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE kurir_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Master admin can view all users" ON users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role = 'master_admin'
  )
);
CREATE POLICY "Admin can view users in their area" ON users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'master_admin')
  )
);

-- Approval requests policies  
CREATE POLICY "Users can view their own approval requests" ON approval_requests FOR SELECT USING (
  requester_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text)
);
CREATE POLICY "Master admin can view all approval requests" ON approval_requests FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role = 'master_admin'
  )
);
CREATE POLICY "Users can create approval requests" ON approval_requests FOR INSERT WITH CHECK (
  requester_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text)
);

-- Kurir activities policies
CREATE POLICY "Kurir can view their own activities" ON kurir_activities FOR SELECT USING (
  kurir_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text AND role = 'kurir')
);
CREATE POLICY "Admin and above can view all activities" ON kurir_activities FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'pic', 'master_admin')
  )
);
CREATE POLICY "Kurir can create their own activities" ON kurir_activities FOR INSERT WITH CHECK (
  kurir_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text AND role = 'kurir')
);

-- Packages policies
CREATE POLICY "Kurir can view their own packages" ON packages FOR SELECT USING (
  kurir_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text AND role = 'kurir')
);
CREATE POLICY "Admin and above can view all packages" ON packages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'pic', 'master_admin')
  )
);
CREATE POLICY "Admin and above can manage packages" ON packages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'pic', 'master_admin')
  )
);

-- Attendance policies
CREATE POLICY "Kurir can view their own attendance" ON attendance FOR SELECT USING (
  kurir_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text AND role = 'kurir')
);
CREATE POLICY "Admin and above can view all attendance" ON attendance FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'pic', 'master_admin')
  )
);
CREATE POLICY "Kurir can create their own attendance" ON attendance FOR INSERT WITH CHECK (
  kurir_id IN (SELECT id FROM users WHERE user_id = auth.uid()::text AND role = 'kurir')
);

-- Storage policies for delivery photos
INSERT INTO storage.buckets (id, name, public) VALUES ('delivery-photos', 'delivery-photos', true);

CREATE POLICY "Authenticated users can upload delivery photos" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'delivery-photos' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can view delivery photos" ON storage.objects FOR SELECT USING (
  bucket_id = 'delivery-photos'
);

CREATE POLICY "Kurir can update their own delivery photos" ON storage.objects FOR UPDATE USING (
  bucket_id = 'delivery-photos' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admin can delete delivery photos" ON storage.objects FOR DELETE USING (
  bucket_id = 'delivery-photos' AND 
  EXISTS (
    SELECT 1 FROM users u WHERE u.user_id = auth.uid()::text AND u.role IN ('admin', 'master_admin')
  )
);