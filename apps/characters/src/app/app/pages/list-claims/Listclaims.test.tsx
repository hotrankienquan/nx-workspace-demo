import { renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListClaimsPage from './page';


import { server } from '../../../__mocks__/server';
import { rest } from 'msw';
import { BASE_URL_APP } from '../../../globals/constants';
import { CLAIMS_DATA_MOCK } from '../../../__mocks__/mock-data';
import { AppTestWrapper, renderWithProviders } from '../detail-claims/DetailClaims.test';
import { useClaimsStore } from '../../../features/list-claims/hooks/useClaimsStore';
import { CategoryType } from '../../../features/list-claims/types/types';



describe('ListClaimsPage - Integration Test', () => {

    test('should display loading indicator', () => {
        //fetch data
        server.use(rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
            return res(
                ctx.delay(200),
                ctx.status(200),
                ctx.json(CLAIMS_DATA_MOCK)
            );
        }))

        renderWithProviders(<ListClaimsPage />);

        const loadingIndicator = screen.getByTestId('loading-indicator-content-claims');
        expect(loadingIndicator).toBeInTheDocument();


    });

    test("should show error on fail to fetch claims", async () => {

        server.use(
            rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: 'Internal Server Error' })
                );
            })
        );

        renderWithProviders(<ListClaimsPage />);

        // Wait until the error alert appears
        const alert = await waitFor(() =>
            screen.getByTestId('error-alert-cc')
        );

        expect(alert).toBeInTheDocument();
    });

    test("it's should render claims when query Motor", async () => {
        let dataResponse: { id: string; category: string; title: string; description: string; }[] = [];
        server.use(
            rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
                dataResponse = CLAIMS_DATA_MOCK.filter(
                    (c) => c.category === 'Motor'
                );
                return res(
                    ctx.status(200),
                    ctx.json(dataResponse)
                );


            })
        );

        const { result } = renderHook(() => useClaimsStore('Motor' as CategoryType), {
            wrapper: AppTestWrapper,
        });
        renderWithProviders(<ListClaimsPage />)

        // ban đầu loading
        expect(result.current.loading).toBe(true);

        // chờ dữ liệu
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result?.current.claims?.length).toBeGreaterThan(0);
        });

        expect(result?.current.claims?.find(c => c.category)?.category).toBe('Motor');
        expect(result?.current?.claims?.length).toBe(2);
    })
});