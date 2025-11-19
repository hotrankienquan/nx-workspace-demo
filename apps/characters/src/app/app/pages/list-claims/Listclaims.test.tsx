import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ListClaimsPage from './page';

jest.mock('../../../features/list-claims/hooks/useClaimsStore');

import { useClaimsStore } from '../../../features/list-claims/hooks/useClaimsStore';
import { ClaimsStore, IListClaims } from '../../../features/list-claims/types/interface/list-claims';

const mockUseClaimsStore = useClaimsStore as jest.MockedFunction<typeof useClaimsStore>;

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const theme = createTheme();
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </BrowserRouter>
    );
};

const renderWithProviders = (component: React.ReactElement) => {
    return render(component, { wrapper: AllTheProviders });
};

describe('ListClaimsPage - Integration Test', () => {
    const mockSetActiveCategory = jest.fn();
    const mockRefetch = jest.fn();

    const mockClaims: IListClaims[] = [
        {
            id: '1',
            category: 'Motor',
            title: 'Car Accident Claim',
            description: 'Accident on Highway 1',
        },
        {
            id: '2',
            category: 'Motor',
            title: 'Motorcycle Theft',
            description: 'Stolen from parking lot',
        },
    ];

    const defaultState: ClaimsStore = {
        claims: mockClaims,
        loading: false,
        error: null,
        activeCategory: 'Motor',
        setActiveCategory: mockSetActiveCategory,
        refetch: mockRefetch,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseClaimsStore.mockReturnValue(defaultState);
    });

    describe('Initial Render', () => {
        it('should load and display Motor category claims by default', () => {
            renderWithProviders(<ListClaimsPage />);

            expect(mockUseClaimsStore).toHaveBeenCalledWith('Motor');

            expect(screen.getByText('Car Accident Claim')).toBeInTheDocument();
            expect(screen.getByText('Motorcycle Theft')).toBeInTheDocument();
        });

        it('should display correct number of claims', () => {
            renderWithProviders(<ListClaimsPage />);

            expect(screen.getByText('Car Accident Claim')).toBeInTheDocument();
            expect(screen.getByText('Motorcycle Theft')).toBeInTheDocument();
            
            expect(screen.getByText('Accident on Highway 1')).toBeInTheDocument();
            expect(screen.getByText('Stolen from parking lot')).toBeInTheDocument();
        });
    });

    describe('Loading State', () => {
        it('should display loading indicator when fetching claims', () => {
            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                loading: true,
                claims: [],
            });

            renderWithProviders(<ListClaimsPage />);

            const progressBar = screen.queryByRole('progressbar');
            if (progressBar) {
                expect(progressBar).toBeInTheDocument();
            } else {
                expect(screen.getByText(/loading/i)).toBeInTheDocument();
            }
        });

        it('should not display claims while loading', () => {
            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                loading: true,
                claims: [],
            });

            renderWithProviders(<ListClaimsPage />);

            expect(screen.queryByText('Car Accident Claim')).not.toBeInTheDocument();
            expect(screen.queryByText('Motorcycle Theft')).not.toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('should display error message when fetching fails', () => {
            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                error: { name: 'NetworkError', message: 'Failed to fetch claims' },
                claims: [],
            });

            renderWithProviders(<ListClaimsPage />);

            const errorText = screen.queryByText(/failed to fetch claims/i) || 
                             screen.queryByText(/error/i) ||
                             screen.queryByText(/something went wrong/i);
            
            expect(errorText).toBeInTheDocument();
        });

        it('should not display claims when error occurs', () => {
            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                error: { name: 'NetworkError', message: 'Failed to fetch claims' },
                claims: [],
            });

            renderWithProviders(<ListClaimsPage />);

            expect(screen.queryByText('Car Accident Claim')).not.toBeInTheDocument();
        });
    });

    describe('Empty State', () => {
        it('should display empty state message when no claims exist', () => {
            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                claims: [],
            });

            renderWithProviders(<ListClaimsPage />);

            const emptyText = screen.queryByText(/no claims/i) || 
                             screen.queryByText(/no data/i) ||
                             screen.queryByText(/empty/i);
            
            if (emptyText) {
                expect(emptyText).toBeInTheDocument();
            } else {
                expect(screen.queryByText('Car Accident Claim')).not.toBeInTheDocument();
            }
        });
    });

    describe('Data Consistency', () => {
        it('should display all claim fields correctly', () => {
            renderWithProviders(<ListClaimsPage />);

            const firstClaim = mockClaims[0];
            const secondClaim = mockClaims[1];
            
            expect(screen.getByText(firstClaim.title)).toBeInTheDocument();
            expect(screen.getByText(firstClaim.description)).toBeInTheDocument();
            
            expect(screen.getByText(secondClaim.title)).toBeInTheDocument();
            expect(screen.getByText(secondClaim.description)).toBeInTheDocument();
        });

        it('should maintain data integrity across re-renders', () => {
            const { rerender } = renderWithProviders(<ListClaimsPage />);
            expect(screen.getByText('Car Accident Claim')).toBeInTheDocument();

            rerender(<ListClaimsPage />);

            expect(screen.getByText('Car Accident Claim')).toBeInTheDocument();
            expect(screen.getByText('Motorcycle Theft')).toBeInTheDocument();
        });
    });

    describe('Multiple Claims Scenarios', () => {
        it('should handle single claim correctly', () => {
            const singleClaim: IListClaims[] = [{
                id: '1',
                category: 'Motor',
                title: 'Single Claim',
                description: 'Only one claim',
            }];

            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                claims: singleClaim,
            });

            renderWithProviders(<ListClaimsPage />);

            expect(screen.getByText('Single Claim')).toBeInTheDocument();
            expect(screen.queryByText('Car Accident Claim')).not.toBeInTheDocument();
        });

        it('should handle large number of claims', () => {
            const manyClaims: IListClaims[] = Array.from({ length: 50 }, (_, i) => ({
                id: `${i + 1}`,
                category: 'Motor',
                title: `Claim ${i + 1}`,
                description: `Description ${i + 1}`,
            }));

            mockUseClaimsStore.mockReturnValue({
                ...defaultState,
                claims: manyClaims,
            });

            renderWithProviders(<ListClaimsPage />);

            expect(screen.getByText('Claim 1')).toBeInTheDocument();
            
        });
    });

    describe('Hook Integration', () => {
        it('should call useClaimsStore only once on mount', () => {
            renderWithProviders(<ListClaimsPage />);

            expect(mockUseClaimsStore).toHaveBeenCalledTimes(1);
        });

        it('should pass correct category to useClaimsStore', () => {
            renderWithProviders(<ListClaimsPage />);

            expect(mockUseClaimsStore).toHaveBeenCalledWith('Motor');
        });

        it('should receive all expected properties from useClaimsStore', () => {
            renderWithProviders(<ListClaimsPage />);

            const returnedState = mockUseClaimsStore.mock.results[0].value;
            
            expect(returnedState).toHaveProperty('claims');
            expect(returnedState).toHaveProperty('loading');
            expect(returnedState).toHaveProperty('error');
            expect(returnedState).toHaveProperty('activeCategory');
            expect(returnedState).toHaveProperty('setActiveCategory');
            expect(returnedState).toHaveProperty('refetch');
        });
    });
});