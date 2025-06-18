import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePlatform } from '@/hooks/usePlatform';

interface ModernButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidthOnMobile?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  className = '',
  icon,
  loading = false,
  fullWidthOnMobile = false,
  variant = 'primary',
  disabled,
  ...props
}) => {
  const { platform } = usePlatform();

  const getButtonVariant = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'success':
        return 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl';
      default:
        return className;
    }
  };

  const buttonClasses = `
    ${getButtonVariant()}
    ${fullWidthOnMobile && platform.isMobile ? 'w-full' : ''}
    ${platform.isMobile ? 'text-base py-4 px-6' : 'text-sm py-3 px-8'}
    ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-primary/30
    relative overflow-hidden
  `;

  return (
    <Button
      className={buttonClasses}
      disabled={loading || disabled}
      variant="ghost"
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
        </div>
      )}
      <div className={`flex items-center gap-3 ${loading ? 'opacity-0' : ''}`}>
        {icon}
        {children}
      </div>
    </Button>
  );
};