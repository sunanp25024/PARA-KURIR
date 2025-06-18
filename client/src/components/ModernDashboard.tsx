import React from 'react';
import { motion } from 'framer-motion';
import { ModernLayout } from './ModernLayout';
import { ModernCard } from './ModernCard';
import { ModernButton } from './ModernButton';
import { Package, Users, TrendingUp, Clock, CheckSquare, AlertTriangle, BarChart3, UserCheck, MapPin, Calendar, Shield, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

interface ModernDashboardProps {
  userRole: string;
  userName: string;
}

export const ModernDashboard: React.FC<ModernDashboardProps> = ({ userRole, userName }) => {
  const { data: packages } = useQuery({ queryKey: ['/api/packages'] });
  const { data: users } = useQuery({ queryKey: ['/api/users'] });
  const { data: attendance } = useQuery({ queryKey: ['/api/attendance'] });
  const { data: activities } = useQuery({ queryKey: ['/api/activities'] });

  const getDashboardStats = () => {
    const totalPackages = packages?.length || 0;
    const deliveredPackages = packages?.filter((p: any) => p.status === 'delivered').length || 0;
    const pendingPackages = packages?.filter((p: any) => p.status === 'pending').length || 0;
    const activeUsers = users?.filter((u: any) => u.status === 'aktif').length || 0;
    
    return {
      totalPackages,
      deliveredPackages,
      pendingPackages,
      activeUsers,
      deliveryRate: totalPackages > 0 ? Math.round((deliveredPackages / totalPackages) * 100) : 0
    };
  };

  const stats = getDashboardStats();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = 'Selamat Pagi';
    if (hour >= 12 && hour < 17) greeting = 'Selamat Siang';
    else if (hour >= 17) greeting = 'Selamat Sore';
    
    const roleNames = {
      master_admin: 'Master Admin',
      admin: 'Admin',
      pic: 'PIC',
      kurir: 'Kurir'
    };
    
    return `${greeting}, ${roleNames[userRole as keyof typeof roleNames] || userRole} ${userName}`;
  };

  const getRoleSpecificCards = () => {
    switch (userRole) {
      case 'master_admin':
        return [
          {
            title: 'Total Users',
            value: stats.activeUsers,
            icon: Users,
            gradient: 'blue' as const,
            description: 'Active system users'
          },
          {
            title: 'System Performance',
            value: `${stats.deliveryRate}%`,
            icon: TrendingUp,
            gradient: 'purple' as const,
            description: 'Overall delivery rate'
          },
          {
            title: 'Total Packages',
            value: stats.totalPackages,
            icon: Package,
            gradient: 'cyan' as const,
            description: 'All packages in system'
          },
          {
            title: 'Daily Operations',
            value: attendance?.length || 0,
            icon: BarChart3,
            gradient: 'amber' as const,
            description: 'Active today'
          }
        ];
        
      case 'admin':
        return [
          {
            title: 'Regional Packages',
            value: stats.totalPackages,
            icon: Package,
            gradient: 'blue' as const,
            description: 'Total in your region'
          },
          {
            title: 'Delivery Rate',
            value: `${stats.deliveryRate}%`,
            icon: TrendingUp,
            gradient: 'purple' as const,
            description: 'Regional performance'
          },
          {
            title: 'Active Couriers',
            value: users?.filter((u: any) => u.role === 'kurir' && u.status === 'aktif').length || 0,
            icon: UserCheck,
            gradient: 'cyan' as const,
            description: 'Working today'
          },
          {
            title: 'Pending Approvals',
            value: 3,
            icon: Clock,
            gradient: 'amber' as const,
            description: 'Require attention'
          }
        ];
        
      case 'pic':
        return [
          {
            title: 'Area Packages',
            value: stats.totalPackages,
            icon: Package,
            gradient: 'blue' as const,
            description: 'In your area'
          },
          {
            title: 'Delivered Today',
            value: stats.deliveredPackages,
            icon: CheckSquare,
            gradient: 'purple' as const,
            description: 'Completed deliveries'
          },
          {
            title: 'Team Performance',
            value: `${stats.deliveryRate}%`,
            icon: TrendingUp,
            gradient: 'cyan' as const,
            description: 'Area completion rate'
          },
          {
            title: 'Team Members',
            value: users?.filter((u: any) => u.role === 'kurir').length || 0,
            icon: Users,
            gradient: 'amber' as const,
            description: 'Managed couriers'
          }
        ];
        
      default:
        return [
          {
            title: 'My Packages',
            value: packages?.filter((p: any) => p.kurirId === userName).length || 0,
            icon: Package,
            gradient: 'blue' as const,
            description: 'Assigned to you'
          },
          {
            title: 'Delivered',
            value: packages?.filter((p: any) => p.kurirId === userName && p.status === 'delivered').length || 0,
            icon: CheckSquare,
            gradient: 'purple' as const,
            description: 'Completed today'
          },
          {
            title: 'Pending',
            value: packages?.filter((p: any) => p.kurirId === userName && p.status === 'pending').length || 0,
            icon: Clock,
            gradient: 'amber' as const,
            description: 'To be delivered'
          },
          {
            title: 'Performance',
            value: `${stats.deliveryRate}%`,
            icon: TrendingUp,
            gradient: 'cyan' as const,
            description: 'Your success rate'
          }
        ];
    }
  };

  return (
    <ModernLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">{getWelcomeMessage()}</p>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/icons/para-logo.svg" 
              alt="PT PARA INSAN SINERGI" 
              className="w-12 h-12"
            />
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-600">PARA</p>
              <p className="text-xs text-amber-500">PT PARA INSAN SINERGI</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {getRoleSpecificCards().map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ModernCard
              title={card.title}
              icon={card.icon}
              gradient={card.gradient}
              className="text-center"
            >
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-800">
                  {card.value}
                </div>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </ModernCard>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ModernCard title="Quick Actions" icon={Package} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userRole === 'kurir' ? (
              <>
                <ModernButton variant="primary" gradient icon={Package}>
                  Scan Package
                </ModernButton>
                <ModernButton variant="secondary" icon={UserCheck}>
                  Attendance
                </ModernButton>
                <ModernButton variant="outline" icon={MapPin}>
                  Deliveries
                </ModernButton>
                <ModernButton variant="ghost" icon={BarChart3}>
                  Performance
                </ModernButton>
              </>
            ) : (
              <>
                <ModernButton variant="primary" gradient icon={Users}>
                  Manage Users
                </ModernButton>
                <ModernButton variant="secondary" icon={Package}>
                  View Packages
                </ModernButton>
                <ModernButton variant="outline" icon={BarChart3}>
                  Reports
                </ModernButton>
                <ModernButton variant="ghost" icon={Calendar}>
                  Attendance
                </ModernButton>
              </>
            )}
          </div>
        </ModernCard>
      </motion.div>

      {/* Real-time Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ModernCard title="System Status" icon={AlertTriangle} gradient="neutral">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                Real-time Sync Active
              </Badge>
              <Badge variant="secondary">
                {stats.activeUsers} Active Users
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </ModernCard>
      </motion.div>
    </ModernLayout>
  );
};