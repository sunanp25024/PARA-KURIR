import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Calendar,
  User,
  Clock,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Package,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { usePlatform } from '@/hooks/usePlatform';

const CourierSidebar = () => {
  const navigate = useNavigate();
  const { platform, responsiveClasses } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Workflow Harian",
      url: "/dashboard",
      icon: platform.isMobile ? Home : Package,
      isActive: true
    },
    {
      title: "Absensi",
      url: "/attendance",
      icon: Clock,
    },
    {
      title: "Performa",
      url: "/performance",
      icon: BarChart3,
    },
    {
      title: "Profil Saya",
      url: "/profile",
      icon: User,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Notifikasi",
      url: "/notifications",
      icon: Bell,
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari aplikasi"
    });
    navigate('/login');
  };

  const userSession = sessionStorage.getItem('user');
  const user = userSession ? JSON.parse(userSession) : null;

  if (platform.isMobile) {
    return (
      <div className="flex justify-around items-center p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg">
        {menuItems.slice(0, 4).map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className={`
              flex flex-col items-center gap-2 h-16 w-16 p-2 rounded-xl transition-all duration-200
              ${item.isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }
            `}
            onClick={() => navigate(item.url)}
          >
            <div className={`
              p-2 rounded-lg transition-all duration-200
              ${item.isActive 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }
            `}>
              <item.icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">{item.title.split(' ')[0]}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-2 h-16 w-16 p-2 rounded-xl transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Sidebar className="w-80 bg-glass border-modern shadow-modern-xl">
      <SidebarHeader className="p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-indigo-50/80 via-white/90 to-purple-50/80 dark:from-gray-800/90 dark:via-gray-900/90 dark:to-indigo-900/30 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="h-16 w-16 border-3 border-white/50 shadow-modern-lg backdrop-blur-sm">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'K'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full shadow-lg animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-xl truncate">{user?.name || 'Kurir'}</h3>
            <p className="text-sm text-gradient-modern font-semibold capitalize">{user?.role || 'kurir'}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online & Active</p>
            </div>
          </div>
        </div>
        
        {/* Modern Status Bar */}
        <div className="mt-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Hari Ini</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">24 Paket</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">85%</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full w-[85%] transition-all duration-1000"></div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-6 bg-gradient-to-b from-gray-50/50 via-white/80 to-gray-50/30 dark:from-gray-900/50 dark:via-gray-800/80 dark:to-gray-900/30 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-6 px-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            Menu Navigasi
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`
                      w-full justify-start h-12 px-4 rounded-xl transition-all duration-200 group
                      ${item.isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25' 
                        : 'hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg mr-3 transition-all duration-200
                      ${item.isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400'
                      }
                    `}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className={`font-medium text-sm ${item.isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.title}
                    </span>
                    {item.isActive && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start h-12 px-4 rounded-xl transition-all duration-200 group border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <div className="p-2 rounded-lg mr-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-all duration-200">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="font-medium text-sm text-red-600 dark:text-red-400">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CourierSidebar;