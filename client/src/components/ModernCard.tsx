import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue' | 'purple' | 'amber' | 'cyan' | 'neutral';
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  className,
  gradient = 'neutral',
  hover = true
}) => {
  const gradientClasses = {
    blue: 'from-blue-50 to-blue-100/50 border-blue-200/50',
    purple: 'from-purple-50 to-purple-100/50 border-purple-200/50',
    amber: 'from-amber-50 to-amber-100/50 border-amber-200/50',
    cyan: 'from-cyan-50 to-cyan-100/50 border-cyan-200/50',
    neutral: 'from-gray-50 to-white border-gray-200/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      className="h-full"
    >
      <Card className={cn(
        "backdrop-blur-sm bg-gradient-to-br shadow-lg/20 hover:shadow-xl/25 transition-all duration-300",
        "border border-white/50",
        gradientClasses[gradient],
        className
      )}>
        {title && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              {Icon && (
                <div className="p-2 rounded-lg bg-white/70 shadow-sm">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
              )}
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={title ? "pt-0" : "p-6"}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};