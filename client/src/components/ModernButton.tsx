import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  gradient?: boolean;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  gradient = false,
  className,
  ...props
}) => {
  const baseClasses = "font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md";
  
  const variantClasses = {
    primary: gradient 
      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
      : "bg-blue-600 hover:bg-blue-700 text-white border-blue-600",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-700 hover:bg-gray-100 border-transparent",
    success: "bg-green-600 hover:bg-green-700 text-white border-green-600",
    warning: "bg-amber-500 hover:bg-amber-600 text-white border-amber-500",
    danger: "bg-red-600 hover:bg-red-700 text-white border-red-600"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          "flex items-center gap-2",
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
          </>
        )}
      </Button>
    </motion.div>
  );
};