// Platform detection utility for responsive layout adjustments
export interface PlatformInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWebView: boolean;
  isPWA: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const detectPlatform = (): PlatformInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isWebView = /wv|webview/.test(userAgent);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                window.matchMedia('(display-mode: fullscreen)').matches ||
                (window.navigator as any).standalone === true;

  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const screenSize: 'mobile' | 'tablet' | 'desktop' = 
    isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isAndroid,
    isIOS,
    isWebView,
    isPWA,
    screenSize
  };
};

export const getPlatformClasses = (platform: PlatformInfo): string => {
  const classes = [];
  
  if (platform.isMobile) classes.push('platform-mobile');
  if (platform.isTablet) classes.push('platform-tablet');
  if (platform.isDesktop) classes.push('platform-desktop');
  if (platform.isAndroid) classes.push('platform-android');
  if (platform.isIOS) classes.push('platform-ios');
  if (platform.isPWA) classes.push('platform-pwa');
  if (platform.isWebView) classes.push('platform-webview');
  
  return classes.join(' ');
};

export const getResponsiveClasses = (platform: PlatformInfo) => ({
  container: platform.isMobile 
    ? 'min-h-screen bg-background' 
    : 'min-h-screen bg-gradient-to-br from-background via-background to-secondary/20',
  
  sidebar: platform.isMobile 
    ? 'fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300' 
    : 'sticky top-0 h-screen',
  
  main: platform.isMobile 
    ? 'flex-1 min-h-screen p-4 pb-20' 
    : 'flex-1 p-6',
  
  card: platform.isMobile 
    ? 'rounded-xl shadow-sm border border-border/50' 
    : 'rounded-xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow',
  
  button: platform.isMobile 
    ? 'h-12 px-6 text-base touch-manipulation' 
    : 'h-10 px-4 text-sm',
  
  input: platform.isMobile 
    ? 'h-12 text-base' 
    : 'h-10 text-sm',
  
  text: {
    heading: platform.isMobile ? 'text-2xl' : 'text-3xl',
    subheading: platform.isMobile ? 'text-lg' : 'text-xl',
    body: platform.isMobile ? 'text-base' : 'text-sm'
  }
});