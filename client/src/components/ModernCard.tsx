import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlatform } from '@/hooks/usePlatform';

interface ModernCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'modern' | 'elevated' | 'gradient' | 'glass';
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  children,
  className = '',
  onClick,
  variant = 'modern',
  icon,
  badge,
  hover = true
}) => {
  const { platform } = usePlatform();

  const getCardVariant = () => {
    switch (variant) {
      case 'elevated':
        return 'card-elevated';
      case 'gradient':
        return 'card-gradient';
      case 'glass':
        return 'card-glass';
      default:
        return 'card-modern';
    }
  };

  const cardClasses = `
    ${getCardVariant()}
    ${onClick ? 'cursor-pointer' : ''}
    ${hover ? 'hover:shadow-modern-lg' : ''}
    ${platform.isMobile ? 'mobile-card' : ''}
    ${className}
  `;

  return (
    <Card className={cardClasses} onClick={onClick}>
      {(title || description || icon || badge) && (
        <CardHeader className={platform.isMobile ? 'p-6' : 'p-8'}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              {icon && (
                <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl shadow-sm">
                  {icon}
                </div>
              )}
              <div className="flex-1">
                {title && (
                  <CardTitle className="text-heading-4 text-gradient-modern">{title}</CardTitle>
                )}
                {description && (
                  <CardDescription className="text-body-small mt-2">{description}</CardDescription>
                )}
              </div>
            </div>
            {badge && (
              <div className="shrink-0">
                {badge}
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={platform.isMobile ? 'p-6 pt-0' : 'p-8 pt-0'}>
        {children}
      </CardContent>
    </Card>
  );
};