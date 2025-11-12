import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run characters:serve',
        production: 'npx nx run characters:preview',
      },
      ciWebServerCommand: 'npx nx run characters:preview',
      ciBaseUrl: 'http://localhost:4201',
    }),
    baseUrl: 'http://localhost:4201',
  },
});
