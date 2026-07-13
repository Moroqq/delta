import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aifitness.tracker',
  appName: 'Дельта',
  webDir: 'dist',
  backgroundColor: '#131211',
  ios: {
    // рисуем под чёлку сами через env(safe-area-inset-*)
    contentInset: 'never',
  },
  plugins: {
    SystemBars: {
      // тёмный фон приложения → светлые иконки системных баров (Android)
      style: 'DARK',
    },
    SplashScreen: {
      backgroundColor: '#171310',
      launchShowDuration: 500,
      launchAutoHide: true,
    },
  },
};

export default config;
