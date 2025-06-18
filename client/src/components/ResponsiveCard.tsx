import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlatform } from '@/hooks/usePlatform';

interface ResponsiveCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'gradient' | 'professional';
  icon?: React.ReactNode;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  description,
  children,
  className = '',
  onClick,
  variant = 'professional',
  icon
}) => {
  const { platform } = usePlatform();

  const getCardVariant = () => {
    switch (variant) {
      case 'elevated':
        return 'card-elevated';
      case 'gradient':
        return 'card-gradient';
      case 'professional':
        return 'card-professional';
      default:
        return 'card-professional';
    }
  };

  const cardClasses = `
    ${getCardVariant()}
    ${onClick ? 'cursor-pointer' : ''}
    ${platform.isMobile ? 'mobile-card' : ''}
    ${className}
  `;

  return (
    <Card className={cardClasses} onClick={onClick}>
      {(title || description) && (
        <CardHeader className={platform.isMobile ? 'p-4' : 'p-6'}>
          {title && (
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  {icon}
                </div>
              )}
              <CardTitle className="text-heading-3">{title}</CardTitle>
            </div>
          )}
          {description && (
            <CardDescription className="text-body">{description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={platform.isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
        {children}
      </CardContent>
    </Card>
  );
};