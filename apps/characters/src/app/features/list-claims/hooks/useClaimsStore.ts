import { useQuery } from "@tanstack/react-query";
import { ClaimsStore, IListClaims } from "../types/interface/list-claims";
import { CategoryType } from "../types/types";
import { useState } from "react";
import { fetchClaims } from "../service/http/api";


export function useClaimsStore(category: CategoryType): Partial<ClaimsStore> {
    const { data, error, isLoading, refetch } = useQuery<IListClaims[]>({
        queryKey: ['claims', category],
        queryFn: () => fetchClaims(category),
        staleTime: 1000 * 60 * 5,
    });

    const [activeCategory, setActiveCategory] = useState<CategoryType>(category);

    return {
        claims: data ?? [],
        loading: isLoading,
        error,
        refetch,
        setActiveCategory,
        activeCategory
    };
}
