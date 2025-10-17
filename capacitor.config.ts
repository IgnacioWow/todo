import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ToDoApp', 
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos (3 segundos)
      launchAutoHide: true,     // Se oculta automáticamente al terminar el tiempo
      backgroundColor: "#ffffff", // Pon aquí el color de fondo de tu imagen splash
      androidSplashResourceName: "splash", // No cambies este nombre
      androidScaleType: "CENTER_CROP", // Cómo se ajusta la imagen
      showSpinner: false, // Oculta la ruedita de carga
    }
  }
};

export default config;