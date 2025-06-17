-- Enable Row Level Security on all tables
alter table public.users enable row level security;
alter table public.packages enable row level security;
alter table public.kurir_activities enable row level security;
alter table public.attendance enable row level security;
alter table public.approval_requests enable row level security;

-- Create policies for users table
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid()::text = user_id);

create policy "Master admin can view all users"
  on public.users for select
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'master_admin'
      and status = 'aktif'
    )
  );

create policy "Admin can view users in their hierarchy"
  on public.users for select
  using (
    exists (
      select 1 from public.users as admin_user
      where admin_user.user_id = auth.uid()::text
      and admin_user.role in ('admin', 'master_admin')
      and admin_user.status = 'aktif'
      and (
        admin_user.role = 'master_admin'
        or (admin_user.role = 'admin' and users.role in ('pic', 'kurir'))
      )
    )
  );

create policy "Master admin can create users"
  on public.users for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'master_admin'
      and status = 'aktif'
    )
  );

create policy "Admin can create subordinate users"
  on public.users for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'admin'
      and status = 'aktif'
    )
    and role in ('pic', 'kurir')
  );

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);

create policy "Master admin can update all users"
  on public.users for update
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'master_admin'
      and status = 'aktif'
    )
  );

create policy "Admin can update subordinate users"
  on public.users for update
  using (
    exists (
      select 1 from public.users as admin_user
      where admin_user.user_id = auth.uid()::text
      and admin_user.role = 'admin'
      and admin_user.status = 'aktif'
      and users.role in ('pic', 'kurir')
    )
  );

-- Create policies for packages table
create policy "Users can view packages based on role"
  on public.packages for select
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
      and (
        role in ('master_admin', 'admin', 'pic')
        or (role = 'kurir' and kurir_id = auth.uid()::text)
      )
    )
  );

create policy "Authorized users can create packages"
  on public.packages for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role in ('master_admin', 'admin', 'pic', 'kurir')
      and status = 'aktif'
    )
  );

create policy "Users can update packages based on role"
  on public.packages for update
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
      and (
        role in ('master_admin', 'admin', 'pic')
        or (role = 'kurir' and kurir_id = auth.uid()::text)
      )
    )
  );

-- Create policies for kurir_activities table
create policy "Users can view activities based on role"
  on public.kurir_activities for select
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
      and (
        role in ('master_admin', 'admin', 'pic')
        or (role = 'kurir' and kurir_id = auth.uid()::text)
      )
    )
  );

create policy "Kurir can create their own activities"
  on public.kurir_activities for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'kurir'
      and status = 'aktif'
    )
    and kurir_id = auth.uid()::text
  );

create policy "Authorized users can create activities"
  on public.kurir_activities for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role in ('master_admin', 'admin', 'pic')
      and status = 'aktif'
    )
  );

-- Create policies for attendance table
create policy "Users can view attendance based on role"
  on public.attendance for select
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
      and (
        role in ('master_admin', 'admin', 'pic')
        or (role = 'kurir' and kurir_id = auth.uid()::text)
      )
    )
  );

create policy "Kurir can create their own attendance"
  on public.attendance for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'kurir'
      and status = 'aktif'
    )
    and kurir_id = auth.uid()::text
  );

create policy "Authorized users can create attendance"
  on public.attendance for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role in ('master_admin', 'admin', 'pic')
      and status = 'aktif'
    )
  );

create policy "Users can update attendance based on role"
  on public.attendance for update
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
      and (
        role in ('master_admin', 'admin', 'pic')
        or (role = 'kurir' and kurir_id = auth.uid()::text)
      )
    )
  );

-- Create policies for approval_requests table
create policy "Users can view their own approval requests"
  on public.approval_requests for select
  using (requester_id = auth.uid()::text);

create policy "Master admin can view all approval requests"
  on public.approval_requests for select
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'master_admin'
      and status = 'aktif'
    )
  );

create policy "Users can create approval requests"
  on public.approval_requests for insert
  with check (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
    )
    and requester_id = auth.uid()::text
  );

create policy "Master admin can update approval requests"
  on public.approval_requests for update
  using (
    exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'master_admin'
      and status = 'aktif'
    )
  );