import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePlatform } from '@/hooks/usePlatform';

interface ResponsiveButtonProps extends ButtonProps {
  touchOptimized?: boolean;
  fullWidthOnMobile?: boolean;
  professional?: boolean;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  className = '',
  touchOptimized = true,
  fullWidthOnMobile = false,
  professional = true,
  variant = 'default',
  ...props
}) => {
  const { platform } = usePlatform();

  const getProfessionalVariant = () => {
    if (!professional) return className;
    
    switch (variant) {
      case 'default':
        return `btn-primary ${className}`;
      case 'secondary':
        return `btn-secondary ${className}`;
      case 'destructive':
        return `btn-danger ${className}`;
      case 'outline':
        return `btn-secondary ${className}`;
      case 'ghost':
        return `hover:bg-slate-100 dark:hover:bg-slate-800 ${className}`;
      default:
        return className;
    }
  };

  const responsiveClasses = `
    ${getProfessionalVariant()}
    ${touchOptimized && platform.isMobile ? 'touch-friendly' : ''}
    ${fullWidthOnMobile && platform.isMobile ? 'w-full' : ''}
    ${platform.isMobile ? 'text-base py-3' : 'text-sm py-2'}
  `;

  return (
    <Button
      className={responsiveClasses}
      variant={professional ? 'ghost' : variant}
      {...props}
    >
      {children}
    </Button>
  );
};