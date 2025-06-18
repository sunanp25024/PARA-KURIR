import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/lib/utils';

interface ResponsiveButtonProps extends ButtonProps {
  touchOptimized?: boolean;
  fullWidthOnMobile?: boolean;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  className,
  touchOptimized = false,
  fullWidthOnMobile = false,
  ...props
}) => {
  const { platform, responsiveClasses } = usePlatform();

  const mobileClasses = platform.isMobile ? [
    touchOptimized && 'touch-target',
    fullWidthOnMobile && 'w-full',
    'text-base h-12 px-6'
  ].filter(Boolean).join(' ') : '';

  const tabletClasses = platform.isTablet ? 'h-11 px-5 text-sm' : '';
  const desktopClasses = platform.isDesktop ? 'h-10 px-4 text-sm' : '';

  return (
    <Button
      className={cn(
        responsiveClasses.button,
        mobileClasses,
        tabletClasses,
        desktopClasses,
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ResponsiveButton;