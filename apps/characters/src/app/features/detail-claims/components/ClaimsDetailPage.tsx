import { yupResolver } from '@hookform/resolvers/yup'

import {

    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Check as CheckIcon
} from '@mui/icons-material';

import { ClaimDetailPageProps } from '../../list-claims/types/interface/detail-claims'
import { useEffect, useMemo, useState } from 'react';
import { useClaimData, useClaimForm, useSaveClaimStage } from '../hooks/useClaims.hooks';
import { buildValidationSchema } from '../utils/validation.utils';
import { useForm } from 'react-hook-form';
import Loading from './Loading';
import { Alert, Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import ErrorClaimsComp from './ErrorClaimsComp';
import StageNavigation from './StageNavigation';
import DynamicField from './DynamicField';
const ClaimsDetailPage: React.FC<ClaimDetailPageProps> = ({ claimId }) => {

    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

    const {
        data: formConfig,
        isLoading,
        error: configError
    } = useClaimForm(claimId)

    const { data: claimData } = useClaimData(claimId)

    const actionSaveStageMutation = useSaveClaimStage();
    const currentStage = formConfig?.stages[currentStageIndex];

    const validationSchema = useMemo(() => currentStage ? buildValidationSchema(currentStage.fields) : undefined, [currentStage]); // build validation schema based on current stage fields


    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({
        resolver: validationSchema ? yupResolver(validationSchema) : undefined,
        mode: 'onChange',
        defaultValues: claimData?.[currentStage?.id || ''] || {}
    });

    const onSubmit = async (data: Record<string, any>) => {
        if (!currentStage) return;

        try {
            await actionSaveStageMutation.mutateAsync({
                claimId,
                stageId: currentStage.id,
                data
            });

            // Mark current stage as completed
            setCompletedStages(prev => new Set(prev).add(currentStageIndex));

            // Move to next stage if exists
            if (currentStageIndex < (formConfig?.stages.length || 0) - 1) {
                setCurrentStageIndex(prev => prev + 1);
            }

        } catch (error) {
            console.error("Error saving stage data:", error);
        }
    }

    const handlePrevious = () => {
        setCurrentStageIndex(Math.max(0, currentStageIndex - 1));
    }
    useEffect(() => {
        if (currentStage && claimData?.[currentStage.id]) {
            reset(claimData[currentStage.id])
        }
    }, [currentStage, claimData, reset])


    if (isLoading) {
        return <Loading />
    }

    if (configError || !formConfig || !currentStage) {
        return (<ErrorClaimsComp />)
    }
    const isLastStage = formConfig.stages.length - 1 === currentStageIndex;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h3' component="h1" fontWeight="bold" gutterBottom>
                Claims Detail
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' gutterBottom sx={{mb:4}}>
                Claim ID: {claimId}
            </Typography>

            <StageNavigation 
                stages={formConfig.stages}
                currentStageIndex={currentStageIndex}
                completedStages={completedStages}
                onNavigate={setCurrentStageIndex}
            />

            {/* Paper zone */}

            <Paper elevation={3} sx={{p:4}}>
                <Typography variant='h4' component="h2" gutterBottom>
                    {currentStage.title}
                </Typography>
                {currentStage.description && (<Typography variant='body1' color='text.secondary' paragraph>
                    {currentStage.description}
                </Typography>
            )}

            <Divider sx={{my:3}}/>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >

                <Box sx={{mb:3}}>
                    {currentStage.fields.map(field =>(
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
                    <Button variant='outlined' startIcon={<ArrowBackIcon />}
                    onClick={handlePrevious}
                    disabled={currentStageIndex === 0}
                    size='large'
                    >
                        Previous
                    </Button>
                    <Button type="submit" variant='contained'
                    endIcon
                    ={isLastStage ? <CheckIcon /> : <ArrowForwardIcon />}
                    disabled={!isValid || actionSaveStageMutation.isPending}
                    size='large'
                    >
                        {actionSaveStageMutation.isPending ? 'Saving...' : isLastStage ? 'Submit claim' : 'Save and continue'}
                    </Button>
                </Box>
            </form>

            {actionSaveStageMutation.isError && (<Alert severity='error' sx={{mt:2}}>
                Failed to save data for this stage. Please try again.
            </Alert>)}
            </Paper>
        </Container>
    )
}

export default ClaimsDetailPage