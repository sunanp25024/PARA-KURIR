import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'elevated';
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  description,
  children,
  className,
  onClick,
  variant = 'default'
}) => {
  const { platform, responsiveClasses } = usePlatform();

  const cardVariants = {
    default: responsiveClasses.card,
    compact: platform.isMobile 
      ? 'rounded-lg shadow-sm border border-border/50 p-4' 
      : 'rounded-lg shadow-md border border-border/50 p-6',
    elevated: platform.isMobile 
      ? 'rounded-xl shadow-lg border border-border/50 bg-card/95 backdrop-blur-sm' 
      : 'rounded-xl shadow-xl border border-border/50 bg-card/95 backdrop-blur-sm hover:shadow-2xl transition-shadow'
  };

  const headerClass = platform.isMobile ? 'pb-4' : 'pb-6';
  const titleClass = platform.isMobile ? 'text-lg font-semibold' : 'text-xl font-semibold';
  const descriptionClass = platform.isMobile ? 'text-sm text-muted-foreground' : 'text-sm text-muted-foreground';

  return (
    <Card 
      className={cn(
        cardVariants[variant],
        onClick && 'cursor-pointer',
        platform.isMobile && 'touch-manipulation',
        className
      )}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className={headerClass}>
          {title && (
            <CardTitle className={titleClass}>
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className={descriptionClass}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={platform.isMobile ? 'p-0' : ''}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;