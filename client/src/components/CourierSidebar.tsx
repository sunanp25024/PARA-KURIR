
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
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
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
    sessionStorage.removeItem('user');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <Sidebar className="bg-gradient-to-b from-background to-secondary/20 border-r border-border/50">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="glass-card p-4 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">INSAN MOBILE</p>
              <p className="text-sm text-muted-foreground">Courier Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="card-modern p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-white text-lg font-bold">
                {user.name?.charAt(0).toUpperCase() || 'K'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-foreground truncate">{user.name || 'Kurir'}</p>
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
