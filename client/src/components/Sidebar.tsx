
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, BarChart3, Settings, LogOut, Menu, X, Users, Bell, CheckSquare, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { RealtimeStatus } from './RealtimeStatus';

interface SidebarProps {
  userRole: string;
  userName: string;
}

const Sidebar = ({ userRole, userName }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari aplikasi"
    });
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [{
      icon: BarChart3,
      label: 'Dashboard',
      path: '/dashboard'
    }];

    switch (userRole) {
      case 'master_admin':
        return [...baseItems, {
          icon: Shield,
          label: 'Manage Admin',
          path: '/manage-admin'
        }, {
          icon: Users,
          label: 'Manage PIC',
          path: '/manage-pic'
        }, {
          icon: User,
          label: 'Manage Kurir',
          path: '/manage-kurir'
        }, {
          icon: CheckSquare,
          label: 'Persetujuan',
          path: '/approval'
        }, {
          icon: Bell,
          label: 'Notifikasi',
          path: '/notifications'
        }];
      case 'admin':
        return [...baseItems, {
          icon: Users,
          label: 'Manage PIC',
          path: '/manage-pic'
        }, {
          icon: User,
          label: 'Manage Kurir',
          path: '/manage-kurir'
        }, {
          icon: CheckSquare,
          label: 'Status Persetujuan',
          path: '/approval-status'
        }, {
          icon: Bell,
          label: 'Notifikasi',
          path: '/notifications'
        }];
      case 'pic':
        return [...baseItems, {
          icon: User,
          label: 'Manage Kurir',
          path: '/manage-kurir'
        }, {
          icon: FileText,
          label: 'Laporan',
          path: '/reports'
        }, {
          icon: Bell,
          label: 'Notifikasi',
          path: '/notifications'
        }];
      case 'kurir':
        return [...baseItems, {
          icon: User,
          label: 'Profil Saya',
          path: '/profile'
        }, {
          icon: Calendar,
          label: 'Absen',
          path: '/attendance'
        }, {
          icon: BarChart3,
          label: 'Performa',
          path: '/performance'
        }, {
          icon: Settings,
          label: 'Pengaturan',
          path: '/settings'
        }];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 sidebar-gradient text-white transform transition-transform duration-300 ease-in-out z-40 shadow-modern-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Header with Logo */}
        <div className="p-6 border-b border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <div className="w-6 h-6 bg-white rounded-md"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">INSAN MOBILE</h1>
              <p className="text-xs text-white/70">Aplikasi Mobile</p>
            </div>
          </div>
          <div className="glass-card rounded-lg p-3 animate-slide-up">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-white/80 capitalize">{userRole.replace('-', ' ')}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-white/20 transition-all duration-300 rounded-xl backdrop-blur-sm group" 
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Real-time Status */}
        <div className="p-4 border-t border-white/20">
          <div className="mb-3">
            <RealtimeStatus />
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-red-500/30 transition-all duration-300 rounded-xl backdrop-blur-sm group" 
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </>
  );
};

export default Sidebar;
