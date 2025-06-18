
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
    title: "Notifikasi",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];

const CourierSidebar = () => {
  const navigate = useNavigate();
  const { platform, responsiveClasses } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex justify-around items-center p-2 bg-background border-t border-border">
        {menuItems.slice(0, 4).map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className="flex flex-col items-center gap-1 h-16 w-16 p-2 touch-target"
            onClick={() => navigate(item.url)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.title.split(' ')[0]}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 h-16 w-16 p-2 touch-target text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Sidebar className="w-72 border-r border-border bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-800">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'K'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{user?.name || 'Kurir'}</h3>
            <p className="text-sm text-muted-foreground capitalize">{user?.role || 'kurir'}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`
                      w-full justify-start h-11 px-3 rounded-lg transition-colors
                      hover:bg-blue-100 dark:hover:bg-blue-900/50
                      ${item.isActive ? 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start h-11 px-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
              <p className="text-sm text-muted-foreground truncate">{user.area || 'Area Tidak Diketahui'}</p>
              <p className="text-xs text-primary font-medium">{user.role?.toUpperCase() || 'COURIER'}</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4 px-2">
            Menu Kurir
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.isActive}
                    onClick={() => handleNavigation(item.url, item.title)}
                  >
                    <button className={`w-full justify-start p-3 rounded-xl transition-all duration-300 group flex items-center ${
                      item.isActive 
                        ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 shadow-lg' 
                        : 'hover:bg-muted/70 hover:shadow-md hover:scale-[1.02]'
                    }`}>
                      <div className={`p-2 rounded-lg mr-3 transition-colors ${
                        item.isActive 
                          ? 'bg-primary text-white' 
                          : 'bg-muted group-hover:bg-primary/20'
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {item.isActive && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start p-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
        >
          <div className="p-2 rounded-lg mr-3 bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="font-medium">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CourierSidebar;
export { CourierSidebar };
