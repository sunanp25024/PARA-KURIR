import React from 'react';
import { PWAStatusBar } from './PWAStatusBar';
import { usePlatform } from '@/hooks/usePlatform';
import { useAuth } from '@/contexts/AuthContext';

interface MobileLayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showStatusBar = true 
}) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {showStatusBar && user && <PWAStatusBar />}
      <div className={`${showStatusBar && user ? 'pt-12' : ''} pb-safe`}>
        {children}
      </div>
    </div>
  );
};