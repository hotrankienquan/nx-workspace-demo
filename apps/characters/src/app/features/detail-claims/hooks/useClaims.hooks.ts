

import { useApiQuery } from "./useApiQuery.hooks";
import { ClaimFormConfig } from "../types/claims.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostSaveStage } from "../utils/fetcher";


export const useClaimForm = (claimId: string) => {
  return useApiQuery<ClaimFormConfig>(
    ['claimForm', claimId],
    `/claims/form-config?claimId=${claimId}`
  );
};



export const useClaimData = (claimId: string) => {
  return useApiQuery<Record<string, any>>(
    ['claimData', claimId],
    `/claims?claimId=${claimId}`
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