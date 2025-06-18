import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'auto' | 'cards' | 'stats' | 'form';
  gap?: 'sm' | 'md' | 'lg';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  variant = 'auto',
  gap = 'md'
}) => {
  const { platform } = usePlatform();

  const gapClasses = {
    sm: platform.isMobile ? 'gap-2' : 'gap-3',
    md: platform.isMobile ? 'gap-4' : 'gap-6',
    lg: platform.isMobile ? 'gap-6' : 'gap-8'
  };

  const variantClasses = {
    auto: platform.isMobile 
      ? 'grid grid-cols-1' 
      : platform.isTablet 
        ? 'grid grid-cols-2' 
        : 'grid grid-cols-3 lg:grid-cols-4',
    
    cards: platform.isMobile 
      ? 'grid grid-cols-1' 
      : platform.isTablet 
        ? 'grid grid-cols-2' 
        : 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    
    stats: platform.isMobile 
      ? 'grid grid-cols-2' 
      : platform.isTablet 
        ? 'grid grid-cols-3' 
        : 'grid grid-cols-4 lg:grid-cols-6',
    
    form: platform.isMobile 
      ? 'grid grid-cols-1' 
      : 'grid grid-cols-2'
  };

  return (
    <div className={cn(
      variantClasses[variant],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;