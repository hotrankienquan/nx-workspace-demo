import React from 'react'
import { StateNavigationProps } from '../../list-claims/types/interface/stage-navigation'
import { Box, Chip, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Lock as LockIcon } from '@mui/icons-material'

const StageNavigation: React.FC<StateNavigationProps> = ({ completedStages, currentStageIndex, onNavigate, stages }) => {

    const canNavigate = (index: number): boolean => {
        if (completedStages.has(index)) {
            return true;
        }
        if (index == currentStageIndex) {
            return true;
        }
        if (index == currentStageIndex + 1 && completedStages.has(currentStageIndex)) {
            return true;
        }
        return false;
    };

    return (
        <Box sx={{
            width: '100%',
            mb: 4
        }}>
            <Stepper
                activeStep={currentStageIndex}
                nonLinear
            >
                {stages.map((stage, index) => {

                    const isCompleted = completedStages.has(index);
                    const isLocked = !canNavigate(index);
                    console.log({isLocked})
                    
                    return (<Step
                        key={stage.id}
                        completed={isCompleted}
                    >
                        <StepButton
                            onClick={() => canNavigate(index) && onNavigate(index)}
                            disabled={isLocked}
                            icon={isCompleted ? (<CheckCircleIcon color='success' />) : isLocked ? (<LockIcon color='disabled' />) : undefined}
                        >
                            <StepLabel
                                optional={isCompleted ? (<Chip label="Completed" size='small' color='success' sx={{ mt: 0.5 }} />) : isLocked ? (
                                    <Chip
                                        label="Locked"
                                        size='small'
                                        color='success'
                                        sx={{ mt: 0.5 }}
                                    />
                                ) : null}
                            >
                                {stage.title}
                            </StepLabel>
                        </StepButton>
                    </Step>)
                })}
            </Stepper>
        </Box>
    )
}

export default StageNavigation