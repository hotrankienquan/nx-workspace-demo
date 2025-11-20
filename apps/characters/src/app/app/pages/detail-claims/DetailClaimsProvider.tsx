// context/DetailClaimsProvider.tsx
import React from "react";
import { useDetailClaims } from "../../../features/detail-claims/hooks/useDetailClaims.hooks";
import { DetailCtx } from "../../../features/detail-claims/context/ContextProvider";

export const DetailClaimsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ctx = useDetailClaims();

    return <DetailCtx.Provider value={ctx}>{children}</DetailCtx.Provider>;
};
