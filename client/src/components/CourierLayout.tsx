import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourierSidebar from '@/components/CourierSidebar';

interface CourierLayoutProps {
  children: React.ReactNode;
}

const CourierLayout = ({ children }: CourierLayoutProps) => {
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
    <div className="min-h-screen flex w-full">
      <CourierSidebar />
      <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CourierLayout;