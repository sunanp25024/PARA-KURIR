
import React from 'react';
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
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const menuItems = [
  {
    title: "Workflow Harian",
    url: "/dashboard",
    icon: Package,
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
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleNavigation = (url: string, title: string) => {
    navigate(url);
    toast({
      title: "Navigasi",
      description: `Menuju ke ${title}`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Anda telah berhasil logout dari sistem",
    });
    localStorage.removeItem('user');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
            alt="INSAN MOBILE" 
            className="h-6 w-auto"
          />
          <div>
            <p className="text-sm font-medium">INSAN MOBILE</p>
            <p className="text-xs text-muted-foreground">Mobile Express</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name || 'Kurir'}</p>
            <p className="text-xs text-muted-foreground">Kurir</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.isActive}
                    onClick={() => handleNavigation(item.url, item.title)}
                  >
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-left">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CourierSidebar;
