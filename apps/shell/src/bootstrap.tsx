import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';


async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('../../../../kiqi-monorepo/apps/characters/src/app/__mocks__/libs/browser-worker');
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
});

