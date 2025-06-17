
-- Create users table for storing user accounts
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('master_admin', 'admin', 'pic', 'kurir')),
  wilayah TEXT,
  area TEXT,
  lokasi_kerja TEXT,
  phone TEXT,
  status TEXT DEFAULT 'aktif' CHECK (status IN ('aktif', 'tidak_aktif')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create kurir_activities table for courier activities
CREATE TABLE public.kurir_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kurir_id TEXT NOT NULL,
  kurir_name TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('absen_masuk', 'absen_keluar', 'pengiriman', 'pickup', 'istirahat')),
  description TEXT,
  lokasi TEXT,
  waktu TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'selesai' CHECK (status IN ('selesai', 'dalam_proses', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table for package deliveries
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resi_number TEXT UNIQUE NOT NULL,
  kurir_id TEXT NOT NULL,
  kurir_name TEXT NOT NULL,
  pengirim TEXT NOT NULL,
  penerima TEXT NOT NULL,
  alamat_pengirim TEXT NOT NULL,
  alamat_penerima TEXT NOT NULL,
  status_pengiriman TEXT DEFAULT 'pickup' CHECK (status_pengiriman IN ('pickup', 'dalam_perjalanan', 'terkirim', 'gagal')),
  tanggal_pickup TIMESTAMP WITH TIME ZONE,
  tanggal_terkirim TIMESTAMP WITH TIME ZONE,
  berat DECIMAL(10,2),
  nilai_cod DECIMAL(15,2) DEFAULT 0,
  catatan TEXT,
  foto_bukti_terkirim TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table for courier attendance
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kurir_id TEXT NOT NULL,
  kurir_name TEXT NOT NULL,
  tanggal DATE NOT NULL,
  jam_masuk TIME,
  jam_keluar TIME,
  lokasi_absen TEXT,
  foto_absen TEXT,
  status TEXT DEFAULT 'hadir' CHECK (status IN ('hadir', 'izin', 'sakit', 'alpha')),
  total_jam DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert dummy users for all roles
INSERT INTO public.users (user_id, email, password_hash, name, role, wilayah, area, lokasi_kerja, phone) VALUES
-- Master Admin
('MASTERADMIN2025', 'masteradmin@insanmobile.com', '$2a$10$dummy_hash_1', 'Master Administrator', 'master_admin', 'Jakarta', 'Pusat', 'Kantor Pusat - Menara BCA', '081234567800'),

-- Admin
('ADMIN2025', 'admin@insanmobile.com', '$2a$10$dummy_hash_2', 'Admin User', 'admin', 'Jakarta', 'Pusat', 'Kantor Pusat - Menara BCA', '081234567801'),
('ADMIN001', 'admin1@insanmobile.com', '$2a$10$dummy_hash_3', 'Admin Jakarta Timur', 'admin', 'Jakarta', 'Timur', 'Cabang Cakung - Jl. Raya Cakung', '081234567802'),

-- PIC
('PIC2025', 'pic@insanmobile.com', '$2a$10$dummy_hash_4', 'PIC User', 'pic', 'Jakarta', 'Selatan', 'Kantor Pusat - Jl. Sudirman', '081234567803'),
('PIC001', 'pic1@insanmobile.com', '$2a$10$dummy_hash_5', 'PIC Jakarta Utara', 'pic', 'Jakarta', 'Utara', 'Cabang Kelapa Gading - Mall Kelapa Gading', '081234567804'),
('PIC002', 'pic2@insanmobile.com', '$2a$10$dummy_hash_6', 'PIC Jakarta Barat', 'pic', 'Jakarta', 'Barat', 'Cabang Taman Anggrek - Central Park', '081234567805'),

-- Kurir
('PISTEST2025', 'kurir@insanmobile.com', '$2a$10$dummy_hash_7', 'Kurir Test', 'kurir', 'Jakarta', 'Selatan', 'Kantor Pusat - Jl. Sudirman', '081234567890'),
('KURIR001', 'ahmad@insanmobile.com', '$2a$10$dummy_hash_8', 'Ahmad Kurniawan', 'kurir', 'Jakarta', 'Timur', 'Cabang Cakung - Jl. Raya Cakung', '081234567891'),
('KURIR002', 'budi@insanmobile.com', '$2a$10$dummy_hash_9', 'Budi Santoso', 'kurir', 'Jakarta', 'Utara', 'Cabang Kelapa Gading - Mall Kelapa Gading', '081234567892'),
('KURIR003', 'citra@insanmobile.com', '$2a$10$dummy_hash_10', 'Citra Dewi', 'kurir', 'Jakarta', 'Barat', 'Cabang Taman Anggrek - Central Park', '081234567893'),
('KURIR004', 'dedi@insanmobile.com', '$2a$10$dummy_hash_11', 'Dedi Rahman', 'kurir', 'Jakarta', 'Pusat', 'Kantor Pusat - Menara BCA', '081234567894'),
('KURIR005', 'eko@insanmobile.com', '$2a$10$dummy_hash_12', 'Eko Prasetyo', 'kurir', 'Jakarta', 'Selatan', 'Cabang Kemang - Jl. Kemang Raya', '081234567895'),
('KURIR006', 'fitri@insanmobile.com', '$2a$10$dummy_hash_13', 'Fitri Sari', 'kurir', 'Jakarta', 'Timur', 'Cabang Rawamangun - Jl. Pemuda', '081234567896'),
('KURIR007', 'gani@insanmobile.com', '$2a$10$dummy_hash_14', 'Gani Wijaya', 'kurir', 'Jakarta', 'Utara', 'Cabang Ancol - Jl. Lodan Raya', '081234567897'),
('KURIR008', 'hani@insanmobile.com', '$2a$10$dummy_hash_15', 'Hani Susanti', 'kurir', 'Jakarta', 'Barat', 'Cabang Grogol - Jl. Daan Mogot', '081234567898');

-- Insert dummy attendance data for last 30 days
INSERT INTO public.attendance (kurir_id, kurir_name, tanggal, jam_masuk, jam_keluar, lokasi_absen, status, total_jam)
SELECT 
  u.user_id,
  u.name,
  CURRENT_DATE - INTERVAL '1 day' * generate_series(0, 29),
  '08:00:00'::TIME + (RANDOM() * INTERVAL '30 minutes'),
  '17:00:00'::TIME + (RANDOM() * INTERVAL '60 minutes'),
  u.lokasi_kerja,
  CASE 
    WHEN RANDOM() < 0.85 THEN 'hadir'
    WHEN RANDOM() < 0.95 THEN 'izin'
    WHEN RANDOM() < 0.98 THEN 'sakit'
    ELSE 'alpha'
  END,
  8.5 + (RANDOM() * 2 - 1) -- 7.5 to 9.5 hours
FROM public.users u
WHERE u.role = 'kurir';

-- Insert dummy package data
INSERT INTO public.packages (resi_number, kurir_id, kurir_name, pengirim, penerima, alamat_pengirim, alamat_penerima, status_pengiriman, tanggal_pickup, tanggal_terkirim, berat, nilai_cod)
VALUES
-- Packages for today
('INS240617001', 'PISTEST2025', 'Kurir Test', 'Toko ABC', 'Budi Hartono', 'Jl. Sudirman No. 1, Jakarta Selatan', 'Jl. Merdeka No. 15, Jakarta Pusat', 'terkirim', NOW() - INTERVAL '8 hours', NOW() - INTERVAL '2 hours', 2.5, 150000),
('INS240617002', 'KURIR001', 'Ahmad Kurniawan', 'PT XYZ', 'Siti Nurhaliza', 'Jl. Cakung Raya No. 10, Jakarta Timur', 'Jl. Kebon Jeruk No. 8, Jakarta Barat', 'dalam_perjalanan', NOW() - INTERVAL '3 hours', NULL, 1.2, 75000),
('INS240617003', 'KURIR002', 'Budi Santoso', 'Warung Sederhana', 'Ahmad Fadli', 'Jl. Kelapa Gading No. 5, Jakarta Utara', 'Jl. Kemang No. 12, Jakarta Selatan', 'terkirim', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '1 hour', 3.0, 200000),
('INS240617004', 'KURIR003', 'Citra Dewi', 'Online Shop DEF', 'Rina Sari', 'Jl. Taman Anggrek No. 3, Jakarta Barat', 'Jl. Menteng No. 7, Jakarta Pusat', 'pickup', NOW() - INTERVAL '1 hour', NULL, 0.8, 50000),
('INS240617005', 'KURIR004', 'Dedi Rahman', 'Toko GHI', 'Joko Susilo', 'Jl. Menara BCA No. 2, Jakarta Pusat', 'Jl. Pondok Indah No. 20, Jakarta Selatan', 'terkirim', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '30 minutes', 4.2, 300000),

-- Yesterday's packages
('INS240616001', 'PISTEST2025', 'Kurir Test', 'Marketplace JKL', 'Lisa Wang', 'Jl. Sudirman No. 1, Jakarta Selatan', 'Jl. Pluit No. 9, Jakarta Utara', 'terkirim', NOW() - INTERVAL '1 day 8 hours', NOW() - INTERVAL '1 day 2 hours', 1.5, 120000),
('INS240616002', 'KURIR001', 'Ahmad Kurniawan', 'Toko MNO', 'Bambang Suharto', 'Jl. Cakung Raya No. 10, Jakarta Timur', 'Jl. Tebet No. 14, Jakarta Selatan', 'terkirim', NOW() - INTERVAL '1 day 6 hours', NOW() - INTERVAL '1 day 1 hour', 2.8, 180000),
('INS240616003', 'KURIR005', 'Eko Prasetyo', 'Distributor PQR', 'Ani Susanti', 'Jl. Kemang Raya No. 15, Jakarta Selatan', 'Jl. Sunter No. 6, Jakarta Utara', 'terkirim', NOW() - INTERVAL '1 day 7 hours', NOW() - INTERVAL '1 day 3 hours', 3.5, 250000),

-- This week's packages
('INS240615001', 'KURIR006', 'Fitri Sari', 'Supplier STU', 'Doni Prabowo', 'Jl. Pemuda No. 8, Jakarta Timur', 'Jl. Pejompongan No. 11, Jakarta Pusat', 'terkirim', NOW() - INTERVAL '2 days 5 hours', NOW() - INTERVAL '2 days 1 hour', 2.1, 160000),
('INS240614001', 'KURIR007', 'Gani Wijaya', 'E-commerce VWX', 'Maya Sari', 'Jl. Lodan Raya No. 4, Jakarta Utara', 'Jl. Radio Dalam No. 13, Jakarta Selatan', 'terkirim', NOW() - INTERVAL '3 days 6 hours', NOW() - INTERVAL '3 days 2 hours', 1.9, 140000),
('INS240613001', 'KURIR008', 'Hani Susanti', 'Toko YZ', 'Rian Pratama', 'Jl. Daan Mogot No. 12, Jakarta Barat', 'Jl. Cempaka Putih No. 16, Jakarta Pusat', 'terkirim', NOW() - INTERVAL '4 days 4 hours', NOW() - INTERVAL '4 days 30 minutes', 2.7, 190000);

-- Insert kurir activities for today
INSERT INTO public.kurir_activities (kurir_id, kurir_name, activity_type, description, lokasi, waktu, status)
SELECT 
  u.user_id,
  u.name,
  'absen_masuk',
  'Absen masuk pagi',
  u.lokasi_kerja,
  CURRENT_DATE + TIME '08:00:00' + (RANDOM() * INTERVAL '30 minutes'),
  'selesai'
FROM public.users u WHERE u.role = 'kurir'

UNION ALL

SELECT 
  u.user_id,
  u.name,
  'pengiriman',
  'Melakukan pengiriman paket',
  'Area ' || u.area,
  CURRENT_DATE + TIME '09:00:00' + (RANDOM() * INTERVAL '8 hours'),
  CASE WHEN RANDOM() < 0.8 THEN 'selesai' ELSE 'dalam_proses' END
FROM public.users u WHERE u.role = 'kurir'

UNION ALL

SELECT 
  u.user_id,
  u.name,
  'pickup',
  'Pickup paket dari merchant',
  'Merchant Area ' || u.area,
  CURRENT_DATE + TIME '10:00:00' + (RANDOM() * INTERVAL '6 hours'),
  'selesai'
FROM public.users u WHERE u.role = 'kurir' AND RANDOM() < 0.7;

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kurir_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view all user data" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE USING (true);

-- Create RLS policies for other tables (allow all operations for now)
CREATE POLICY "Allow all operations on kurir_activities" ON public.kurir_activities FOR ALL USING (true);
CREATE POLICY "Allow all operations on packages" ON public.packages FOR ALL USING (true);
CREATE POLICY "Allow all operations on attendance" ON public.attendance FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_users_user_id ON public.users(user_id);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_packages_kurir_id ON public.packages(kurir_id);
CREATE INDEX idx_packages_status ON public.packages(status_pengiriman);
CREATE INDEX idx_attendance_kurir_id ON public.attendance(kurir_id);
CREATE INDEX idx_attendance_tanggal ON public.attendance(tanggal);
CREATE INDEX idx_kurir_activities_kurir_id ON public.kurir_activities(kurir_id);
CREATE INDEX idx_kurir_activities_waktu ON public.kurir_activities(waktu);
