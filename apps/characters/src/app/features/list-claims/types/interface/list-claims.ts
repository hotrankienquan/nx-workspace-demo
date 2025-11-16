import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CategoryType } from "../types";

export interface IListClaims {
    id: string;
    category: 'Motor' | 'Casualty' | 'Property';
    title: string;
    description: string;
}

export interface ClaimsStore {
    claims: IListClaims[] | null;
    loading: boolean;
    error: Error | null;
    activeCategory: CategoryType;
    setActiveCategory: (category: CategoryType) => void;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IListClaims[], Error>>
}


export interface ContentClaimsProps {
    claims: IListClaims[] | null | undefined;
    loading: boolean | undefined;
    error: Error | null | undefined;
    activeCategory: CategoryType | undefined;
}