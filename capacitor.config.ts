import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.insan.mobile',
  appName: 'INSAN Mobile',
  webDir: 'dist/client',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#8b5cf6",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#8b5cf6'
    },
    Camera: {
      permissions: {
        camera: 'This app needs camera access to take delivery proof photos',
        photos: 'This app needs photo library access to select images'
      }
    },
    Filesystem: {
      permissions: {
        publicStorage: 'This app needs storage access to save delivery photos'
      }
    },
    App: {
      permissions: {
        camera: 'required',
        storage: 'required'
      }
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    permissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.WAKE_LOCK',
      'android.permission.VIBRATE'
    ]
  }
};

export default config;