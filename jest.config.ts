import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
  setupFilesAfterEnv: ['<rootDir>/apps/characters/setupTests.ts']
});
