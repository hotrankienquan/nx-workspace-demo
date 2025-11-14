import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './app/layouts/layout';


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

const theme = createTheme();



enableMocking().then(() => {
  console.log('Mocking enabled');
  root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
    </StrictMode>
  );
});


