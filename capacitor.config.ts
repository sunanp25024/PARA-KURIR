
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3d8a9d499a004b6dac879ebb0b13f67f',
  appName: 'PARA KURIR',
  webDir: 'dist',
  server: {
    url: 'https://3d8a9d49-9a00-4b6d-ac87-9ebb0b13f67f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4F46E5",
      showSpinner: false,
      spinnerColor: "#ffffff"
    }
  },
  ios: {
    scheme: 'PARA KURIR'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
