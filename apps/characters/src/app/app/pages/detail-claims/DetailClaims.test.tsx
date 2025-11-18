import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '../../../../../setupTests'
import { server } from "../../../__mocks__/server";
import { rest } from "msw";
import { BASE_URL_APP } from "../../../globals/constants";
import { CLAIM_FORM_CONFIG_DATA_MOCK } from "../../../__mocks__/mock-data";
import DetailClaimsPage from './page'
import { useClaimForm } from "../../../features/detail-claims/hooks/useClaims.hooks";
import { ReactNode } from "react";
import userEvent from '@testing-library/user-event';
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, 
            gcTime: 0, 
        },
    },
});

export const renderWithProviders = (ui: React.ReactElement) => {
    return render(ui, { wrapper: AppTestWrapper });
};

export const AppTestWrapper = ({ children }: { children: ReactNode }) => {
    const testQueryClient = createTestQueryClient();
    const theme = createTheme();

    return (
        <QueryClientProvider client={testQueryClient}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe("DetailClaims Page", () => {
    test("Should display Loading indicator while fetching config", async () => {
        server.use(
            rest.get(`${BASE_URL_APP}/claims/form-config`, (req, res, ctx) => {
                return res(
                    ctx.delay(150), 
                    ctx.json(CLAIM_FORM_CONFIG_DATA_MOCK)
                );
            })
        );

        renderWithProviders(<DetailClaimsPage />);

       
        expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
        });
    });

    test("should return data successfully", async () => {
        server.use(
            rest.get(`${BASE_URL_APP}/claims/form-config`, (req, res, ctx) => {
                const claimId = req.url.searchParams.get("claimId");
                if (claimId === "m1") {
                    return res(ctx.status(200), ctx.json(CLAIM_FORM_CONFIG_DATA_MOCK));
                }
                return res(ctx.status(400));
            })
        );

        const { result } = renderHook(() => useClaimForm("m1"), {
            wrapper: AppTestWrapper, 
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(CLAIM_FORM_CONFIG_DATA_MOCK);
        expect(result.current.error).toBeNull();
    });



})


describe("handleStageSubmit Logic", () => {

    test("should store data locally and navigate to NEXT stage (without API call)", async () => {
        const user = userEvent.setup();

        server.use(
            rest.get(`${BASE_URL_APP}/claims/form-config`, (req, res, ctx) => {
                return res(ctx.json(CLAIM_FORM_CONFIG_DATA_MOCK));
            }),
        );

        renderWithProviders(<DetailClaimsPage />);

        await waitFor(() => expect(screen.getByTestId("form-title")).toBeInTheDocument());
        const nameInput = screen.getByLabelText(/Full Name/i);
        await user.type(nameInput, "John Doe");

        const emailInput = screen.getByLabelText(/Email/i);
        await user.type(emailInput, "john@gmail.com")

        const phoneInput = screen.getByLabelText(/Phone Number/i);
        await user.type(phoneInput, "0973636363");

        
        const submitBtn = screen.getByRole('button', { name: /Save and continue/i });
        await waitFor(() => {
            expect(submitBtn).toBeEnabled();
        });

        await waitFor(() => {
            expect(screen.getByText("Personal Information 2")).toBeInTheDocument();
        });

      
    });

});