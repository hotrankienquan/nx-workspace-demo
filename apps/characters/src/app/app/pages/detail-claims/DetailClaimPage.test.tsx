
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DetailClaimsPage from './page';

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // don’t retry in tests
      },
    },
  });


describe('DetailClaimPage', () => {
    test("renders Claims Detail heading", () => {
        render(<DetailClaimsPage />);

        const heading = screen.getByRole("heading", { name: /Claims Detail/i });

        expect(heading).toBeInTheDocument();


    });


    // mock react-router-dom useParams
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({ id: "m1" }),
    }));

    // mock tanstack query hooks
    jest.mock("../../../features/detail-claims/hooks/useClaims.hooks", () => ({
        useClaimForm: () => ({
            data: {
                stages: [
                    {
                        id: 'personal info',
                        title: 'Personal Information',
                        description: 'Provide your personal details',
                        fields: [
                            {
                                id: 'fullName',
                                label: 'Full Name',
                                type: 'text',
                                validation: { required: true, minLength: 2 },
                                placeholder: 'Enter your full name',
                                options: [],
                            },
                            {
                                id: 'email',
                                label: 'Email',
                                type: 'text',
                                validation: { required: true },
                                options: [],
                                placeholder: 'Enter your email address',
                            },
                            { id: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', validation: { required: true, pattern: 'phone' }, options: [] },
            
                        ],
                    }
                ]
            },
            isLoading: false,
            error: null,
        }),
        useClaimData: () => ({
            data: { stage1: {} },
        }),
        useSaveClaimStage: () => ({
            mutateAsync: jest.fn(),
            isPending: false,
            isError: false,
        }),
    }));


    render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/detail-claims/m1"]}>
            <DetailClaimsPage />
          </MemoryRouter>
        </QueryClientProvider>
      );

    test("renders Claim ID text with mocked id", () => {
        render(<DetailClaimsPage />);
        expect(screen.getByText(/Claim ID: m1/i)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Claims Detail/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Stage One/i })).toBeInTheDocument();
    });


})

