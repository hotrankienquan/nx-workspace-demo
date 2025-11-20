import { useContext } from "react";
import { DetailCtx } from "./ContextProvider";

const useDetailContext = () => {
    const ctx = useContext(DetailCtx);
    if (!ctx) throw new Error("DetailClaimsRoot subcomponents must be used within DetailClaimsRoot");
    return ctx;
};

export { useDetailContext }