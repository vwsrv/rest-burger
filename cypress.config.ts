import { defineConfig } from 'cypress';
import * as path from 'node:path';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    async setupNodeEvents(on, config) {
      const { register } = await import('ts-node');
      register({
        project: path.join(process.cwd(), 'cypress/tsconfig.json'),
        transpileOnly: true,
      } as Record<string, unknown>);

      return config;
    },
  },
});
