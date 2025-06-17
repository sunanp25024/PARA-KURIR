-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  user_id text unique not null,
  name text not null,
  email text unique not null,
  role text not null check (role in ('master_admin', 'admin', 'pic', 'kurir')),
  wilayah text not null,
  area text not null,
  lokasi_kerja text not null,
  phone text not null,
  status text default 'aktif' check (status in ('aktif', 'nonaktif')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create packages table
create table public.packages (
  id uuid default uuid_generate_v4() primary key,
  resi_number text unique not null,
  kurir_id text not null,
  kurir_name text not null,
  pengirim text not null,
  penerima text not null,
  alamat_pengirim text not null,
  alamat_penerima text not null,
  status_pengiriman text not null,
  tanggal_pickup date not null,
  tanggal_terkirim date,
  berat decimal not null,
  nilai_cod decimal default 0,
  bukti_kirim_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create kurir_activities table
create table public.kurir_activities (
  id uuid default uuid_generate_v4() primary key,
  kurir_id text not null,
  kurir_name text not null,
  activity_type text not null,
  description text not null,
  lokasi text not null,
  waktu timestamp with time zone not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create attendance table
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  kurir_id text not null,
  kurir_name text not null,
  tanggal date not null,
  jam_masuk time not null,
  jam_keluar time,
  lokasi_absen text not null,
  status text not null,
  total_jam decimal default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create approval_requests table
create table public.approval_requests (
  id uuid default uuid_generate_v4() primary key,
  requester_id text not null,
  requester_name text not null,
  request_type text not null,
  target_admin_id text,
  request_data jsonb not null,
  current_data jsonb,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_by text,
  approved_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_users_updated_at
  before update on users
  for each row execute function update_updated_at_column();

create trigger update_packages_updated_at
  before update on packages
  for each row execute function update_updated_at_column();

-- Create indexes for better performance
create index users_user_id_idx on users(user_id);
create index users_email_idx on users(email);
create index users_role_idx on users(role);
create index packages_resi_number_idx on packages(resi_number);
create index packages_kurir_id_idx on packages(kurir_id);
create index packages_status_idx on packages(status_pengiriman);
create index kurir_activities_kurir_id_idx on kurir_activities(kurir_id);
create index kurir_activities_waktu_idx on kurir_activities(waktu);
create index attendance_kurir_id_idx on attendance(kurir_id);
create index attendance_tanggal_idx on attendance(tanggal);
create index approval_requests_status_idx on approval_requests(status);
create index approval_requests_requester_id_idx on approval_requests(requester_id);