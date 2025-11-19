import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '../../../../../setupTests'
import { server } from "../../../__mocks__/server";
import { rest } from "msw";
import { BASE_URL_APP } from "../../../globals/constants";
import { CLAIM_FORM_CONFIG_DATA_MOCK } from "../../../__mocks__/mock-data";
import DetailClaimsPage from './page'
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

    test("should flatten data and call api on final stage", async () => {
        const user = userEvent.setup();

        server.use(
            rest.post(`${BASE_URL_APP}/claims/stage/save/:claimId/:stageId`, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ message: 'Stage data saved successfully' }))
            })
        );
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
        await userEvent.click(submitBtn);


        await waitFor(() => {
            expect(
                screen.getByRole("heading", { level: 2, name: /Personal Information 2/i })
            ).toBeInTheDocument();
        });
        // Stage 2



        const countryDropdown = screen.getByLabelText(/Country/i);
        await user.click(countryDropdown);
        const countryOption = screen.getByRole("option", { name: "United States" });
        await user.click(countryOption);

        const femaleRadio = screen.getByRole("radio", { name: /Female/i });
        await user.click(femaleRadio);


        const phoneInput2 = screen.getByLabelText(/Phone Number 2/i);
        await user.type(phoneInput2, "0123456789");

        const finalSubmitBtn = screen.getByRole("button", { name: /Submit claim/i });
        await waitFor(() => expect(finalSubmitBtn).toBeEnabled());
        await user.click(finalSubmitBtn);
        


    })

});