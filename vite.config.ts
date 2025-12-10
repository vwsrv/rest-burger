import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import path from 'path';

const envDir = path.resolve(__dirname, 'environment');
const loadEnvVariables = (mode: string): void => {
  Object.assign(process.env, loadEnv(mode, envDir, ''));
  console.debug(
    'process.env contains: \n' + JSON.stringify(process.env, undefined, 2),
  );
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnvVariables(mode);

  return {
    plugins: [
      checker({
        typescript: true,
      }),
      react(),
      readableClassnames(),
      sassDts({
        enabledMode: ['development'],
        esmExport: true,
      }),
      tsconfigPaths(),
    ],
    base: '',
    envPrefix: ['VITE_', 'APP', 'SERVICE'],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest-setup.ts'],
    },
    server: {
      open: true,
    },
  };
});
