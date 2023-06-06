import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
  //  root: path.join(__dirname, "src"),
  root: './',
  build: {
    outDir: path.join(__dirname, 'build'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@css': path.resolve(__dirname, 'src', 'assets', 'css'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@icons': path.resolve(__dirname, 'src', 'assets', 'icons'),
      '@images': path.resolve(__dirname, 'src', 'assets', 'images'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@contexts': path.resolve(__dirname, 'src', 'contexts'),
      '@data': path.resolve(__dirname, 'src', 'data'),
      '@layouts': path.resolve(__dirname, 'src', 'layouts'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@plugins': path.resolve(__dirname, 'src', 'plugins'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
  plugins: [
    react({
      // Hot Reload
      include: '**/*.jsx',
    }),
  ],
});
