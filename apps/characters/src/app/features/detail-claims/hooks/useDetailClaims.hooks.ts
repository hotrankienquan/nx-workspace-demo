import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClaimData, useClaimForm, useSaveClaimStage } from "../hooks/useClaims.hooks";
import { AnyRecord, ContextShape } from "../types/claims.type";

export const useDetailClaims = (): ContextShape & { isLoading: boolean; configError: any } => {
  const { id = "" } = useParams<{ id: string }>();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages] = useState(() => new Set<number>());
  const [allStagesData, setAllStagesData] = useState<AnyRecord>({});

  const { data: formConfig, isLoading, error: configError } = useClaimForm(id);
  const { data: claimData } = useClaimData(id);
  const actionSaveStageMutation = useSaveClaimStage();

  useEffect(() => {
    if (claimData) setAllStagesData(claimData);
  }, [claimData]);

  return {
    id,
    formConfig,
    currentStageIndex,
    setCurrentStageIndex,
    completedStages,
    allStagesData,
    setAllStagesData,
    actionSaveStageMutation,
    isLoading,
    configError,
  };
};
