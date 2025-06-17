import { useState, useEffect } from 'react';
import { apiService, type User, type Package, type Activity, type Attendance } from '@/services/apiService';

export const useSupabaseData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await apiService.getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await apiService.getPackages();
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await apiService.getKurirActivities();
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const data = await apiService.getAttendance();
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

  return {
    users,
    packages,
    activities,
    attendance,
    loading,
    refreshData
  };
};