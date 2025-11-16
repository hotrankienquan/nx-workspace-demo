import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useClaimData, useClaimForm, useSaveClaimStage } from "../../../features/detail-claims/hooks/useClaims.hooks";
import { buildValidationSchema } from "../../../features/detail-claims/utils/validation.utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../../features/detail-claims/components/Loading";
import ErrorClaimsComp from "../../../features/detail-claims/components/ErrorClaimsComp";
import { Alert, Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import StageNavigation from "../../../features/detail-claims/components/StageNavigation";
import DynamicField from "../../../features/detail-claims/components/DynamicField";
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Check as CheckIcon
} from '@mui/icons-material';

const DetailClaimsPage = () => {
    const { id = "" } = useParams<{ id: string }>();
    
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
    
    const [allStagesData, setAllStagesData] = useState<Record<string, Record<string, any>>>({});

    const {
        data: formConfig,
        isLoading,
        error: configError
    } = useClaimForm(id);
    
    const { data: claimData } = useClaimData(id);
    const actionSaveStageMutation = useSaveClaimStage();

    const currentStage = formConfig?.stages?.[currentStageIndex];
    
    const validationSchema = useMemo(
        () => currentStage ? buildValidationSchema(currentStage.fields) : undefined, 
        [currentStage]
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        trigger
    } = useForm({
        resolver: validationSchema ? yupResolver(validationSchema) : undefined,
        mode: 'onChange',
        defaultValues: claimData?.[currentStage?.id || ''] || {}
    });

    useEffect(() => {
        if (currentStage && claimData?.[currentStage.id]) {
            reset(claimData[currentStage.id]);
            trigger();
        }
    }, [currentStage, claimData, reset, trigger]);

    useEffect(() => {
        if (claimData) {
            setAllStagesData(claimData);
        }
    }, [claimData]);

    if (isLoading) {
        return <Loading />;
    }

    if (configError || !formConfig || !formConfig.stages || !currentStage) {
        return <ErrorClaimsComp />;
    }

    const onSubmit = async (data: Record<string, any>) => {
        console.log('Current stage data:', data);
        
        if (!currentStage) return;

        const updatedAllData = {
            ...allStagesData,
            [currentStage.id]: data
        };
        setAllStagesData(updatedAllData);

        try {
            // await actionSaveStageMutation.mutateAsync({
            //     claimId: id,
            //     stageId: currentStage.id,
            //     data
            // });

            setCompletedStages(prev => new Set(prev).add(currentStageIndex));

            const isLastStage = currentStageIndex === formConfig.stages.length - 1;

            if (isLastStage) {
                console.log('=== FINAL SUBMISSION ===');
                console.log('All stages data:', updatedAllData);
                
                const flattenedData = Object.values(updatedAllData).reduce((acc, stageData) => {
                    return { ...acc, ...stageData };
                }, {});
                
                console.log('Flattened data:', flattenedData);

                //submit all data
                await actionSaveStageMutation.mutateAsync({
                    claimId: id,
                    stageId: currentStage.id,
                    data: flattenedData
                })
            } else {
                setCurrentStageIndex(prev => prev + 1);
            }
        } catch (error) {
            console.error("Error saving stage data:", error);
        }
    };

    const handlePrevious = () => {
        setCurrentStageIndex(Math.max(0, currentStageIndex - 1));
    };

    const isLastStage = formConfig.stages.length - 1 === currentStageIndex;
    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Typography variant='h3' component="h1" fontWeight="bold" gutterBottom>
                Claims Detail
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' gutterBottom sx={{mb:4}}>
                Claim ID: {id}
            </Typography>

            <StageNavigation 
                stages={formConfig.stages}
                currentStageIndex={currentStageIndex}
                completedStages={completedStages}
                onNavigate={setCurrentStageIndex}
            />

            <Paper elevation={3} sx={{p:4}}>
                <Typography variant='h4' component="h2" gutterBottom>
                    {currentStage.title}
                </Typography>
                {currentStage.description && (
                    <Typography variant='body1' color='text.secondary' paragraph>
                        {currentStage.description}
                    </Typography>
                )}

                <Divider sx={{my:3}}/>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{mb:3}}>
                        {currentStage.fields.map(field => (
                            <DynamicField 
                                key={field.id}
                                field={field}
                                control={control}
                                error={errors[field.id]}
                            />
                        ))}
                    </Box>
                    
                    <Divider sx={{my:3}}/>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button 
                            variant='outlined' 
                            startIcon={<ArrowBackIcon />}
                            onClick={handlePrevious}
                            disabled={currentStageIndex === 0}
                            size='large'
                        >
                            Previous
                        </Button>
                        <Button 
                            type="submit" 
                            variant='contained'
                            endIcon={isLastStage ? <CheckIcon /> : <ArrowForwardIcon />}
                            disabled={!isValid || actionSaveStageMutation.isPending}
                            size='large'
                        >
                            {actionSaveStageMutation.isPending 
                                ? 'Saving...' 
                                : isLastStage 
                                    ? 'Submit claim' 
                                    : 'Save and continue'
                            }
                        </Button>
                    </Box>
                </form>

                {actionSaveStageMutation.isError && (
                    <Alert severity='error' sx={{mt:2}}>
                        Failed to save data for this stage. Please try again.
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default DetailClaimsPage;