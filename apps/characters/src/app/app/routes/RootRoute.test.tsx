import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootRoute from './root-route';
import { server } from '../../__mocks__/server';
import { rest } from 'msw';
import { BASE_URL_APP } from '../../globals/constants';
import { CLAIMS_DATA_MOCK } from '../../__mocks__/mock-data';

const createWrapper =
  (initialEntries: string[]) =>
  ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };

describe('RootRoute - integration for /remote1/list-claims', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it('should render ListClaimsPage when navigating to /remote1/list-claims', async () => {
    server.use(
      rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(CLAIMS_DATA_MOCK));
      })
    );

    render(<RootRoute />, { wrapper: createWrapper(['/remote1/list-claims']) });

 

   screen.debug()
   
  });
});
