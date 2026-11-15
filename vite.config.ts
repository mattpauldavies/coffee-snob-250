import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative so the built site can be served from a subpath (GitHub Pages, a
  // preview directory) without a rebuild.
  base: './',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
});
