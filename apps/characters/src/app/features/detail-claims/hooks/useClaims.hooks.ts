

import { useApiQuery } from "./useApiQuery.hooks";
import { ClaimFormConfig } from "../types/claims.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostSaveStage } from "../utils/fetcher";

const API_BASE_URL = 'https://new-ui/api';

export const useClaimForm = (claimId: string) => {
  return useApiQuery<ClaimFormConfig>(
    ['claimForm', claimId],
    `${API_BASE_URL}/claims/form-config?claimId=${claimId}`
  );
};



export const useClaimData = (claimId: string) => {
  return useApiQuery<Record<string, any>>(
    ['claimData', claimId],
    `${API_BASE_URL}/claims?claimId=${claimId}`
  );
}
// 
export function useSaveClaimStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, stageId, data }: { claimId: string; stageId: string; data: Record<string, any> }) =>
      fetchPostSaveStage(claimId, stageId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['claimData', variables.claimId] });
    },
  });
}