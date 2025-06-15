
import React from 'react';

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

  return (
    <div className={`${className}`}>
      <img 
        src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
        alt="INSAN MOBILE Logo"
        className={`${sizeClasses[size]} object-contain rounded-lg shadow-sm`}
      />
    </div>
  );
};

export default Logo;
