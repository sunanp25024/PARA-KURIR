
import React from 'react';
import { Truck, Package } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  const badgeSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg`}>
        <Truck className={`${iconSizes[size]} text-white`} />
      </div>
      <div className={`absolute -top-1 -right-1 ${badgeSizes[size]} bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center`}>
        <Package className={`${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3'} text-white`} />
      </div>
    </div>
  );
};

export default Logo;
