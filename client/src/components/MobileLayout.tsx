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
  const { platform } = usePlatform();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex flex-col safe-area-top safe-area-bottom">
      {showStatusBar && platform.isMobile && <PWAStatusBar />}
      <main className="flex-1 overflow-auto">
        <div className={`${platform.isMobile ? 'p-4' : 'container-professional'}`}>
          {children}
        </div>
      </main>
    </div>
  );
};