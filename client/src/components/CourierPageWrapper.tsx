import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import CourierSidebar from '@/components/CourierSidebar';

interface CourierPageWrapperProps {
  children: React.ReactNode;
}

const CourierPageWrapper = ({ children }: CourierPageWrapperProps) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Only use SidebarProvider for courier users
  if (user.role === 'kurir') {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <CourierSidebar />
          <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-secondary/30">
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // For other roles, return children as-is
  return <>{children}</>;
};

export default CourierPageWrapper;