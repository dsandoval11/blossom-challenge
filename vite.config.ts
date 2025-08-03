import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/core/test/setup.tsx', './src/core/test/utils.tsx'],
  },
});
