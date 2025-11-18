import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container, Paper, Typography } from "@mui/material";
import Loading from "../../../features/detail-claims/components/Loading";
import ErrorClaimsComp from "../../../features/detail-claims/components/ErrorClaimsComp";
import StageNavigation from "../../../features/detail-claims/components/StageNavigation";
import { useClaimData, useClaimForm, useSaveClaimStage } from "../../../features/detail-claims/hooks/useClaims.hooks";
import ClaimStageForm from "../../../features/detail-claims/components/ClaimStageForm";

const DetailClaimsPage = () => {
    const { id = "" } = useParams<{ id: string }>();

    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

    const [allStagesData, setAllStagesData] = useState<Record<string, any>>({});

    const { data: formConfig, isLoading, error: configError } = useClaimForm(id);

    const { data: claimData } = useClaimData(id);

    const actionSaveStageMutation = useSaveClaimStage();

    //only one useffect for get all data 
    useEffect(() => {
        if (claimData) setAllStagesData(claimData);
    }, [claimData]);

    if (isLoading) return <Loading />;
    if (configError || !formConfig?.stages) return <ErrorClaimsComp />;

    const currentStage = formConfig.stages[currentStageIndex];
    const isLastStage = currentStageIndex === formConfig.stages.length - 1;

    const handleStageSubmit = async (data: Record<string, any>) => {

        const updatedAllData = { ...allStagesData, [currentStage.id]: data };
        
        setAllStagesData(updatedAllData);
        
        setCompletedStages(prev => new Set(prev).add(currentStageIndex));

        try {
            if (isLastStage) {
                const flattenedData = Object.values(updatedAllData).reduce((acc, stageData) => ({ ...acc, ...stageData }), {});

                await actionSaveStageMutation.mutateAsync({
                    claimId: id,
                    stageId: currentStage.id,
                    data: flattenedData
                });
            } else {
                setCurrentStageIndex(prev => prev + 1);
            }
        } catch (error) {
            console.error("Error saving stage:", error);
        }
    };

    const handlePrevious = () => setCurrentStageIndex(prev => Math.max(0, prev - 1));

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Typography variant='h3' component="h1" fontWeight="bold" gutterBottom>
                Claims Detail
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' gutterBottom sx={{ mb: 4 }}>
                Claim ID: {id}
            </Typography>

            <StageNavigation
                stages={formConfig.stages}
                currentStageIndex={currentStageIndex}
                completedStages={completedStages}
                onNavigate={setCurrentStageIndex}
            />

            <Paper elevation={3} sx={{ p: 4 }}>

                {/* use key for useForm(rhf) to have ability auto reset and sync with default values */}
                <ClaimStageForm
                    key={currentStage.id}
                    stageConfig={currentStage}
                    defaultValues={allStagesData[currentStage.id] || {}}
                    onSubmit={handleStageSubmit}
                    onPrevious={handlePrevious}
                    isFirstStage={currentStageIndex === 0}
                    isLastStage={isLastStage}
                    isSaving={actionSaveStageMutation.isPending}
                />

                {actionSaveStageMutation.isError && (
                    <Alert severity='error' sx={{ mt: 2 }}>
                        Failed to save data. Please try again.
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default DetailClaimsPage;