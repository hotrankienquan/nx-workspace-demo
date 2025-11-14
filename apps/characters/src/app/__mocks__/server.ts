import { setupServer } from 'msw/node';
import { handlers } from './libs/handlers';

//setup mock service worker server instance with defined handlers
export const server = setupServer(...handlers);
