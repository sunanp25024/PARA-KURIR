import { useState, useEffect } from 'react';
import { apiService, type User, type Package, type Activity, type Attendance } from '@/services/apiService';
import { TabIsolationManager } from '@/utils/tabIsolation';

export const useSupabaseData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Get current session user using tab isolation
  const getCurrentUser = () => {
    return TabIsolationManager.getCurrentUser();
  };

  const fetchUsers = async (user: User | null) => {
    try {
      const data = await apiService.getUsers();
      // Filter users based on current user's role and permissions
      let filteredUsers = data || [];
      
      if (user) {
        switch (user.role) {
          case 'kurir':
            // Kurir can only see their own data
            filteredUsers = data?.filter(u => u.id === user.id) || [];
            break;
          case 'pic':
            // PIC can see users in their area
            filteredUsers = data?.filter(u => 
              u.wilayah === user.wilayah && u.area === user.area
            ) || [];
            break;
          case 'admin':
            // Admin can see users in their wilayah
            filteredUsers = data?.filter(u => u.wilayah === user.wilayah) || [];
            break;
          case 'master_admin':
            // Master admin can see all users
            filteredUsers = data || [];
            break;
          default:
            filteredUsers = [];
        }
      }
      
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchPackages = async (user: User | null) => {
    try {
      const data = await apiService.getPackages();
      let filteredPackages = data || [];
      
      if (user) {
        switch (user.role) {
          case 'kurir':
            // Kurir can only see their own packages
            filteredPackages = data?.filter(p => p.kurir_id === user.id) || [];
            break;
          case 'pic':
          case 'admin':
          case 'master_admin':
            // Admin roles can see all packages (filtered by permissions on server if needed)
            filteredPackages = data || [];
            break;
          default:
            filteredPackages = [];
        }
      }
      
      setPackages(filteredPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    }
  };

  const fetchActivities = async (user: User | null) => {
    try {
      const data = await apiService.getKurirActivities();
      let filteredActivities = data || [];
      
      if (user) {
        switch (user.role) {
          case 'kurir':
            // Kurir can only see their own activities
            filteredActivities = data?.filter(a => a.kurir_id === user.id) || [];
            break;
          case 'pic':
          case 'admin':
          case 'master_admin':
            // Admin roles can see all activities
            filteredActivities = data || [];
            break;
          default:
            filteredActivities = [];
        }
      }
      
      setActivities(filteredActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    }
  };

  const fetchAttendance = async (user: User | null) => {
    try {
      const data = await apiService.getAttendance();
      let filteredAttendance = data || [];
      
      if (user) {
        switch (user.role) {
          case 'kurir':
            // Kurir can only see their own attendance
            filteredAttendance = data?.filter(a => a.kurir_id === user.id) || [];
            break;
          case 'pic':
          case 'admin':
          case 'master_admin':
            // Admin roles can see all attendance
            filteredAttendance = data || [];
            break;
          default:
            filteredAttendance = [];
        }
      }
      
      setAttendance(filteredAttendance);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setAttendance([]);
    }
  };

  const refreshData = async () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(true);
    
    // Log session info for debugging
    TabIsolationManager.logSessionInfo();
    
    try {
      await Promise.all([
        fetchUsers(user),
        fetchPackages(user),
        fetchActivities(user),
        fetchAttendance(user)
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Data loading timeout, setting loading to false');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    refreshData().finally(() => {
      clearTimeout(timeout);
    });

    return () => clearTimeout(timeout);
  }, []);

  // Listen for session storage changes (user switching) - only within same tab
  useEffect(() => {
    // Check periodically for session changes within the same tab only
    const interval = setInterval(() => {
      const newUser = getCurrentUser();
      if (newUser?.id !== currentUser?.id) {
        console.log('Session user changed, refreshing data for tab:', sessionStorage.getItem('session_id'));
        refreshData();
      }
    }, 2000); // Check every 2 seconds instead of 1

    return () => {
      clearInterval(interval);
    };
  }, [currentUser]);

  return {
    users,
    packages,
    activities,
    attendance,
    loading,
    currentUser,
    refreshData
  };
};