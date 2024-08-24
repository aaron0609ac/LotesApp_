import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starte',
  appName: 'LotesApp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
