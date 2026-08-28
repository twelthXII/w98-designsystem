import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The Vite config exists only to run the local playground (`npm run dev`),
 * which renders the example compositions in `src/examples`.
 * The design system itself is published from `src` / `dist` and has no bundler
 * requirement beyond React and one stylesheet.
 */
export default defineConfig({
  root: 'playground',
  plugins: [react()],
  build: {
    outDir: '../dist-playground',
    emptyOutDir: true,
  },
});
