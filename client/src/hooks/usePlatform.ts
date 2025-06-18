import { useState, useEffect } from 'react';
import { detectPlatform, PlatformInfo, getPlatformClasses, getResponsiveClasses } from '@/utils/platformDetection';

export const usePlatform = () => {
  const [platform, setPlatform] = useState<PlatformInfo>(() => detectPlatform());

  useEffect(() => {
    const handleResize = () => {
      setPlatform(detectPlatform());
    };

    window.addEventListener('resize', handleResize);
    
    // Add platform classes to body
    const platformClasses = getPlatformClasses(platform);
    document.body.className = `${document.body.className} ${platformClasses}`.trim();

    // Add CSS custom properties for platform-specific styling
    const root = document.documentElement;
    root.style.setProperty('--safe-area-inset-top', platform.isIOS ? 'env(safe-area-inset-top, 20px)' : '0px');
    root.style.setProperty('--safe-area-inset-bottom', platform.isIOS ? 'env(safe-area-inset-bottom, 0px)' : '0px');
    root.style.setProperty('--touch-target-size', platform.isMobile ? '44px' : '32px');

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [platform]);

  const responsiveClasses = getResponsiveClasses(platform);

  return {
    platform,
    responsiveClasses,
    platformClasses: getPlatformClasses(platform)
  };
};