// mocks/browser.ts
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Initialize the MSW worker with the request handlers
export const worker = setupWorker(...handlers);