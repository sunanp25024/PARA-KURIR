
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Users,
  Bell,
  CheckSquare,
  FileText,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface SidebarProps {
  userRole: string;
  userName: string;
}

const Sidebar = ({ userRole, userName }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari aplikasi",
    });
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [
      { icon: BarChart3, label: 'Dashboard', path: '/dashboard' }
    ];

    switch (userRole) {
      case 'master-admin':
        return [
          ...baseItems,
          { icon: Shield, label: 'Manage Admin', path: '/manage-admin' },
          { icon: Users, label: 'Manage PIC', path: '/manage-pic' },
          { icon: User, label: 'Manage Kurir', path: '/manage-kurir' },
          { icon: CheckSquare, label: 'Persetujuan', path: '/approval' },
          { icon: Bell, label: 'Notifikasi', path: '/notifications' }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Manage PIC', path: '/manage-pic' },
          { icon: User, label: 'Manage Kurir', path: '/manage-kurir' },
          { icon: Bell, label: 'Status Persetujuan', path: '/approval-status' }
        ];
      
      case 'pic':
        return [
          ...baseItems,
          { icon: User, label: 'Manage Kurir', path: '/manage-kurir' },
          { icon: FileText, label: 'Laporan', path: '/reports' },
          { icon: Bell, label: 'Notifikasi', path: '/notifications' }
        ];
      
      case 'kurir':
        return [
          ...baseItems,
          { icon: User, label: 'Profil Saya', path: '/profile' },
          { icon: Calendar, label: 'Absen', path: '/attendance' },
          { icon: BarChart3, label: 'Performa', path: '/performance' },
          { icon: Settings, label: 'Pengaturan', path: '/settings' }
        ];
      
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
      <div className={`fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        
        {/* Header with Logo */}
        <div className="p-6 border-b border-indigo-800">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/2cf1d03d-190b-4825-8140-747aae69d11b.png" 
              alt="INSAN MOBILE" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-bold">INSAN MOBILE</h1>
              <p className="text-xs text-indigo-200">Aplikasi Mobile</p>
            </div>
          </div>
          <p className="text-sm text-indigo-200">{userName}</p>
          <p className="text-xs text-indigo-300 capitalize">{userRole.replace('-', ' ')}</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-indigo-800"
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-indigo-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
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
