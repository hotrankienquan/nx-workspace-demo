import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetcher, fetchPostSaveStage } from '../utils/fetcher';

export function useApiQuery<T>(
    queryKey: (string | number)[],
    url: string,
    options?: { staleTime?: number }
): UseQueryResult<T> {
    return useQuery<T>({
        queryKey,
        queryFn: () => fetcher<T>(url),
        staleTime: options?.staleTime ?? 1000 * 60 * 5,
    });
}


export function useApiQueryMutation() {
    return useMutation({
        mutationFn: ({ claimId, stageId, data }: { claimId: string; stageId: string; data: Record<string, any> }) =>
            fetchPostSaveStage(claimId, stageId, data),
    });
}