import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type User = Database['public']['Tables']['users']['Row'];
type InsertUser = Database['public']['Tables']['users']['Insert'];
type UpdateUser = Database['public']['Tables']['users']['Update'];

type Package = Database['public']['Tables']['packages']['Row'];
type InsertPackage = Database['public']['Tables']['packages']['Insert'];
type UpdatePackage = Database['public']['Tables']['packages']['Update'];

type KurirActivity = Database['public']['Tables']['kurir_activities']['Row'];
type InsertKurirActivity = Database['public']['Tables']['kurir_activities']['Insert'];

type Attendance = Database['public']['Tables']['attendance']['Row'];
type InsertAttendance = Database['public']['Tables']['attendance']['Insert'];
type UpdateAttendance = Database['public']['Tables']['attendance']['Update'];

type ApprovalRequest = Database['public']['Tables']['approval_requests']['Row'];
type InsertApprovalRequest = Database['public']['Tables']['approval_requests']['Insert'];
type UpdateApprovalRequest = Database['public']['Tables']['approval_requests']['Update'];

export class SupabaseService {
  // User operations
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createUser(user: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: UpdateUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Package operations
  async getPackages(kurirId?: string): Promise<Package[]> {
    let query = supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (kurirId) {
      query = query.eq('kurir_id', kurirId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const { data, error } = await supabase
      .from('packages')
      .insert(pkg)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePackage(id: string, updates: UpdatePackage): Promise<Package> {
    const { data, error } = await supabase
      .from('packages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Kurir Activities operations
  async getKurirActivities(kurirId?: string): Promise<KurirActivity[]> {
    let query = supabase
      .from('kurir_activities')
      .select('*')
      .order('waktu', { ascending: false });

    if (kurirId) {
      query = query.eq('kurir_id', kurirId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createKurirActivity(activity: InsertKurirActivity): Promise<KurirActivity> {
    const { data, error } = await supabase
      .from('kurir_activities')
      .insert(activity)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Attendance operations
  async getAttendance(kurirId?: string): Promise<Attendance[]> {
    let query = supabase
      .from('attendance')
      .select('*')
      .order('tanggal', { ascending: false });

    if (kurirId) {
      query = query.eq('kurir_id', kurirId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createAttendance(attendance: InsertAttendance): Promise<Attendance> {
    const { data, error } = await supabase
      .from('attendance')
      .insert(attendance)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAttendance(id: string, updates: UpdateAttendance): Promise<Attendance> {
    const { data, error } = await supabase
      .from('attendance')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Approval Requests operations
  async getApprovalRequests(): Promise<ApprovalRequest[]> {
    const { data, error } = await supabase
      .from('approval_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPendingApprovalRequests(): Promise<ApprovalRequest[]> {
    const { data, error } = await supabase
      .from('approval_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createApprovalRequest(request: InsertApprovalRequest): Promise<ApprovalRequest> {
    const { data, error } = await supabase
      .from('approval_requests')
      .insert(request)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateApprovalRequest(id: string, updates: UpdateApprovalRequest): Promise<ApprovalRequest> {
    const { data, error } = await supabase
      .from('approval_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Real-time subscriptions
  subscribeToUsers(callback: (payload: any) => void) {
    return supabase
      .channel('users-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' }, 
        callback
      )
      .subscribe();
  }

  subscribeToPackages(callback: (payload: any) => void) {
    return supabase
      .channel('packages-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'packages' }, 
        callback
      )
      .subscribe();
  }

  subscribeToKurirActivities(callback: (payload: any) => void) {
    return supabase
      .channel('activities-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'kurir_activities' }, 
        callback
      )
      .subscribe();
  }

  subscribeToAttendance(callback: (payload: any) => void) {
    return supabase
      .channel('attendance-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'attendance' }, 
        callback
      )
      .subscribe();
  }

  subscribeToApprovalRequests(callback: (payload: any) => void) {
    return supabase
      .channel('approvals-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'approval_requests' }, 
        callback
      )
      .subscribe();
  }

  // File upload operations
  async uploadFile(bucket: string, path: string, file: File): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
}

export const supabaseService = new SupabaseService();