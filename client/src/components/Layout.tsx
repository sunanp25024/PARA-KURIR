
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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

    // Listen for user changes in this tab
    const handleUserChange = () => {
      const currentUser = sessionStorage.getItem('user');
      if (!currentUser) {
        navigate('/login');
      } else {
        try {
          const newUser = JSON.parse(currentUser);
          setUser(newUser);
        } catch (error) {
          navigate('/login');
        }
      }
    };

    // Check for user changes periodically
    const interval = setInterval(handleUserChange, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={user.role} userName={user.name} />
      
      <div className="flex-1 md:ml-64">
        <main className="p-6 h-full overflow-auto bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
