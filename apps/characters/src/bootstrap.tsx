import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootEntryPoint from './app/app/app';
import { ThemeProvider } from './app/theme';


async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./app/__mocks__/libs/browser-worker');
    worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


enableMocking().then(() => {
  root.render(
    <StrictMode>
      <ThemeProvider>
        <RootEntryPoint />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </StrictMode>
  );
});


