import { useQuery } from "@tanstack/react-query";
import { ClaimsStore, IListClaims } from "../types/interface/list-claims";
import { CategoryType } from "../types/types";
import { API_CLAIMS_URL } from "../utils/constants";
import { useState } from "react";

export async function fetchClaims(category: Partial<CategoryType>): Promise<IListClaims[]> {
    const url = category ? `${API_CLAIMS_URL}?category=${category}` : API_CLAIMS_URL;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch claims');
    }
    return res.json();
}

export function useClaimsStore(category: CategoryType): Partial<ClaimsStore> {
    const { data, error, isLoading, refetch } = useQuery<IListClaims[]>({
        queryKey: ['claims', category],
        queryFn: () => fetchClaims(category),
        staleTime: 1000 * 60 * 5,
    });

    const [activeCategory, setActiveCategory] = useState<CategoryType>(category || "Motor");

    return {
        claims: data ?? [],
        loading: isLoading,
        error,
        refetch,
        setActiveCategory,
        activeCategory
    };
}
