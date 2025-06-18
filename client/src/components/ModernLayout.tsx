import React from 'react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface ModernLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({ children, className }) => {
  const { state } = useSidebar();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30",
        "transition-all duration-300 ease-in-out",
        state === "expanded" ? "lg:ml-64" : "lg:ml-16",
        className
      )}
    >
      <div className="relative">
        {/* Modern glass morphism overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        
        <div className="relative z-10 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};