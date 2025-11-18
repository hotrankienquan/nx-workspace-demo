import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useClaimForm, useClaimData, useSaveClaimStage } from './useClaims.hooks'
import { fetchPostSaveStage } from '../utils/fetcher';
import { act } from "react";

jest.mock("./useApiQuery.hooks", () => ({
    useApiQuery: jest.fn((key, url) => ({
        data: { mocked: true, key, url },
        isLoading: false,
        error: null,
    })),
}));

jest.mock("../utils/fetcher", () => ({
    fetchPostSaveStage: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider
        client={queryClient}
    >
        {children}
    </QueryClientProvider>;
};

describe("useClaimForm", () => {
    it("calls useApiQuery with correct key and url", () => {
        const { result } = renderHook(() => useClaimForm("m1"), { wrapper });
        expect(result.current.data).toEqual({
            mocked: true,
            key: ["claimForm", "m1"],
            url: "/claims/form-config?claimId=m1",
        });
    });
});

describe("useClaimData", () => {
    it("calls useApiQuery with correct key and url", () => {
        const { result } = renderHook(() => useClaimData("m2"), { wrapper });
        expect(result.current.data).toEqual({
            mocked: true,
            key: ["claimData", "m2"],
            url: "/claims?claimId=m2",
        });
    });
});


describe("execute useSaveClaimStage function", () => {
    it("calls fetchPostSaveStage and invalidates query on success", async () => {
        //given
        (fetchPostSaveStage as jest.Mock).mockResolvedValueOnce({ ok: true });

        const { result } = renderHook(() => useSaveClaimStage(), { wrapper });
        //when
        await act(async () => {
            await result.current.mutateAsync({
                claimId: "m1",
                stageId: "stage1",
                data: { foo: "bar" },
            });
        });

        //then
        expect(fetchPostSaveStage).toHaveBeenCalledWith("m1", "stage1", { foo: "bar" });
    });
});

