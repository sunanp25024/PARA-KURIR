
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  wilayah: string;
  area: string;
  lokasi_kerja: string;
  phone: string;
  status: string;
}

interface Package {
  id: string;
  resi_number: string;
  kurir_id: string;
  kurir_name: string;
  pengirim: string;
  penerima: string;
  alamat_pengirim: string;
  alamat_penerima: string;
  status_pengiriman: string;
  tanggal_pickup: string;
  tanggal_terkirim: string;
  berat: number;
  nilai_cod: number;
}

interface Activity {
  id: string;
  kurir_id: string;
  kurir_name: string;
  activity_type: string;
  description: string;
  lokasi: string;
  waktu: string;
  status: string;
}

interface Attendance {
  id: string;
  kurir_id: string;
  kurir_name: string;
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
  lokasi_absen: string;
  status: string;
  total_jam: number;
}

export const useSupabaseData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('kurir_activities')
        .select('*')
        .order('waktu', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .order('tanggal', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setAttendance(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchUsers(),
      fetchPackages(),
      fetchActivities(),
      fetchAttendance()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Real-time subscriptions
  useEffect(() => {
    const packagesChannel = supabase
      .channel('packages_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'packages' },
        () => fetchPackages()
      )
      .subscribe();

    const activitiesChannel = supabase
      .channel('activities_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'kurir_activities' },
        () => fetchActivities()
      )
      .subscribe();

    const attendanceChannel = supabase
      .channel('attendance_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'attendance' },
        () => fetchAttendance()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(packagesChannel);
      supabase.removeChannel(activitiesChannel);
      supabase.removeChannel(attendanceChannel);
    };
  }, []);

  return {
    users,
    packages,
    activities,
    attendance,
    loading,
    refreshData,
    fetchUsers,
    fetchPackages,
    fetchActivities,
    fetchAttendance
  };
};
