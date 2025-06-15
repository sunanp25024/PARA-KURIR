
import { supabase } from '@/integrations/supabase/client';

export interface CourierProfile {
  id: string;
  name: string;
  employee_id: string;
  area: string;
  phone?: string;
  avatar_url?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyPackage {
  id: string;
  courier_id: string;
  tracking_number: string;
  recipient_name: string;
  recipient_phone?: string;
  address: string;
  is_cod: boolean;
  cod_amount: number;
  status: 'input' | 'scanned' | 'in_delivery' | 'delivered' | 'pending' | 'returned';
  scan_time?: string;
  delivery_started_at?: string;
  delivered_at?: string;
  delivered_by?: string;
  delivery_photo_url?: string;
  pending_reason?: string;
  returned_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DailySummary {
  id: string;
  courier_id: string;
  date: string;
  total_packages: number;
  cod_packages: number;
  non_cod_packages: number;
  delivered_packages: number;
  pending_packages: number;
  returned_packages: number;
  total_cod_amount: number;
  collected_cod_amount: number;
  delivery_rate: number;
  created_at: string;
  updated_at: string;
}

class CourierService {
  // Profile management
  async getCourierProfile(courierId: string): Promise<CourierProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', courierId)
        .single();

      if (error) {
        console.error('Error fetching courier profile:', error);
        return null;
      }

      return data as unknown as CourierProfile;
    } catch (error) {
      console.error('Error fetching courier profile:', error);
      return null;
    }
  }

  async updateCourierProfile(courierId: string, updates: Partial<CourierProfile>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', courierId);

      if (error) {
        console.error('Error updating courier profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating courier profile:', error);
      return false;
    }
  }

  // Package management
  async createDailyPackages(packages: Omit<DailyPackage, 'id' | 'created_at' | 'updated_at'>[]): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('daily_packages')
        .insert(packages);

      if (error) {
        console.error('Error creating daily packages:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating daily packages:', error);
      return false;
    }
  }

  async getDailyPackages(courierId: string, date?: string): Promise<DailyPackage[]> {
    try {
      let query = supabase
        .from('daily_packages')
        .select('*')
        .eq('courier_id', courierId)
        .order('created_at', { ascending: true });

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        query = query
          .gte('created_at', startOfDay.toISOString())
          .lte('created_at', endOfDay.toISOString());
      } else {
        // Default to today's packages
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        query = query
          .gte('created_at', today.toISOString())
          .lte('created_at', endOfToday.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching daily packages:', error);
        return [];
      }

      return (data || []) as unknown as DailyPackage[];
    } catch (error) {
      console.error('Error fetching daily packages:', error);
      return [];
    }
  }

  async updatePackageStatus(
    packageId: string, 
    status: DailyPackage['status'], 
    additionalData: Partial<DailyPackage> = {}
  ): Promise<boolean> {
    try {
      const updateData = {
        status,
        updated_at: new Date().toISOString(),
        ...additionalData
      };

      // Set specific timestamps based on status
      if (status === 'scanned') {
        updateData.scan_time = new Date().toISOString();
      } else if (status === 'in_delivery') {
        updateData.delivery_started_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      } else if (status === 'returned') {
        updateData.returned_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('daily_packages')
        .update(updateData)
        .eq('id', packageId);

      if (error) {
        console.error('Error updating package status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating package status:', error);
      return false;
    }
  }

  async deletePackage(packageId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('daily_packages')
        .delete()
        .eq('id', packageId);

      if (error) {
        console.error('Error deleting package:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting package:', error);
      return false;
    }
  }

  // Summary management
  async getDailySummary(courierId: string, date: string): Promise<DailySummary | null> {
    try {
      const { data, error } = await supabase
        .from('daily_summaries')
        .select('*')
        .eq('courier_id', courierId)
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching daily summary:', error);
        return null;
      }

      return data as unknown as DailySummary;
    } catch (error) {
      console.error('Error fetching daily summary:', error);
      return null;
    }
  }

  async updateDailySummary(courierId: string, date: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('update_daily_summary', {
        courier_uuid: courierId,
        summary_date: date
      });

      if (error) {
        console.error('Error updating daily summary:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error calling update_daily_summary:', error);
      return false;
    }
  }

  // Bulk operations
  async bulkUpdatePackageStatus(
    packageIds: string[], 
    status: DailyPackage['status'], 
    additionalData: Partial<DailyPackage> = {}
  ): Promise<boolean> {
    try {
      const updateData = {
        status,
        updated_at: new Date().toISOString(),
        ...additionalData
      };

      if (status === 'scanned') {
        updateData.scan_time = new Date().toISOString();
      } else if (status === 'in_delivery') {
        updateData.delivery_started_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('daily_packages')
        .update(updateData)
        .in('id', packageIds);

      if (error) {
        console.error('Error bulk updating package status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error bulk updating package status:', error);
      return false;
    }
  }

  // Real-time subscriptions
  subscribeToPackageChanges(courierId: string, callback: (payload: any) => void) {
    return supabase
      .channel('package-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_packages',
          filter: `courier_id=eq.${courierId}`
        },
        callback
      )
      .subscribe();
  }

  subscribeToSummaryChanges(courierId: string, callback: (payload: any) => void) {
    return supabase
      .channel('summary-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_summaries',
          filter: `courier_id=eq.${courierId}`
        },
        callback
      )
      .subscribe();
  }
}

export const courierService = new CourierService();
