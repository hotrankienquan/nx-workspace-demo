import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import apiClient from "../../../globals/service/http/apiClient";
import { renderHook } from "@testing-library/react";
import { useApiQuery } from "./useApiQuery.hooks";
import { waitFor } from "@testing-library/react";

jest.mock("../../../globals/service/http/apiClient", () => ({
    get: jest.fn(),
}));

jest.mock("../utils/fetcher", () => ({
    fetchPostSaveStage: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};


test("useApiQuery fetches data with apiClient.get", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: { foo: "bar" } });
  
    const { result } = renderHook(() => useApiQuery<{ foo: string }>(["testKey"], "/test-url"), { wrapper });
  
    // wait until the query succeeds
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
    expect(apiClient.get).toHaveBeenCalledWith("/test-url");
    expect(result.current.data).toEqual({ foo: "bar" });
  });