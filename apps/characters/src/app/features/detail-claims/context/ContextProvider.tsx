import { createContext } from "react";
import { ContextShape } from "../types/claims.type";

export const DetailCtx = createContext<ContextShape | null>(null);
