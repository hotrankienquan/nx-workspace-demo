import { useQuery, UseQueryResult } from '@tanstack/react-query';

import apiClient from '../../../globals/service/http/apiClient';

export function useApiQuery<T>(
    queryKey: (string | number)[],
    url: string,
    options?: { staleTime?: number }
): UseQueryResult<T> {
    return useQuery<T>({
        queryKey,
        queryFn: async () => {
            const response = await apiClient.get<T>(url);
            return response.data;
        },
        staleTime: options?.staleTime ?? 1000 * 60 * 5,
    });
}

