-- Create storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
  ('profile_pictures', 'profile_pictures', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('delivery_proofs', 'delivery_proofs', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']);

-- Create storage policies for profile_pictures bucket
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view profile pictures"
  on storage.objects for select
  using (bucket_id = 'profile_pictures');

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policies for delivery_proofs bucket
create policy "Kurir can upload delivery proofs"
  on storage.objects for insert
  with check (
    bucket_id = 'delivery_proofs'
    and exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'kurir'
      and status = 'aktif'
    )
  );

create policy "Authorized users can view delivery proofs"
  on storage.objects for select
  using (
    bucket_id = 'delivery_proofs'
    and exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and status = 'aktif'
    )
  );

create policy "Kurir can update their delivery proofs"
  on storage.objects for update
  using (
    bucket_id = 'delivery_proofs'
    and exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role = 'kurir'
      and status = 'aktif'
    )
  );

create policy "Admin can delete delivery proofs"
  on storage.objects for delete
  using (
    bucket_id = 'delivery_proofs'
    and exists (
      select 1 from public.users
      where user_id = auth.uid()::text
      and role in ('master_admin', 'admin')
      and status = 'aktif'
    )
  );