import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourierSidebar from '@/components/CourierSidebar';
import { usePlatform } from '@/hooks/usePlatform';

interface CourierLayoutProps {
  children: React.ReactNode;
}

const CourierLayout = ({ children }: CourierLayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { platform, responsiveClasses } = usePlatform();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log('CourierLayout loaded for user:', parsedUser.role, 'in tab:', sessionStorage.getItem('tab_id'));
    } catch (error) {
      navigate('/login');
    }

    // Listen for user changes in this tab only
    const handleUserChange = () => {
      const currentUser = sessionStorage.getItem('user');
      const tabId = sessionStorage.getItem('tab_id');
      
      if (!currentUser) {
        console.log('User session ended in tab:', tabId);
        navigate('/login');
      } else {
        try {
          const newUser = JSON.parse(currentUser);
          // Only update if user actually changed to prevent unnecessary re-renders
          if (newUser.id !== user?.id) {
            console.log('User switched in tab:', tabId, 'to role:', newUser.role);
            setUser(newUser);
          }
        } catch (error) {
          navigate('/login');
        }
      }
    };

    // Check for user changes less frequently to reduce cross-tab interference
    const interval = setInterval(handleUserChange, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [navigate, user?.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${responsiveClasses.container} flex w-full ${platform.isMobile ? 'flex-col' : ''}`}>
      {!platform.isMobile && <CourierSidebar />}
      <main className={`flex-1 ${responsiveClasses.main} overflow-auto ${platform.isMobile ? '' : 'bg-gradient-to-br from-background via-background to-secondary/30'} safe-area-top safe-area-bottom`}>
        <div className={`animate-fade-in ${platform.isMobile ? 'max-w-none' : 'max-w-7xl mx-auto'}`}>
          {children}
        </div>
        {platform.isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-bottom">
            <CourierSidebar />
          </div>
        )}
      </main>
    </div>
  );
};

export default CourierLayout;