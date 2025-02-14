import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-worker': ['pdfjs-dist/build/pdf.worker.mjs'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.mjs"]
  }
});
