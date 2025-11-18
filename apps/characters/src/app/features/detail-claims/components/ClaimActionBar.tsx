import React from "react";
import { Box, Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, Check as CheckIcon } from '@mui/icons-material';
import { ClaimActionBarProps } from "../types/interface";


const ClaimActionBar: React.FC<ClaimActionBarProps> = ({
    onPrevious,
    disablePrevious,
    isLastStage,
    isValid,
    isSaving
}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                onClick={onPrevious}
                disabled={disablePrevious}
                size='large'
            >
                Previous
            </Button>
            <Button
                type="submit"
                variant='contained'
                endIcon={isLastStage ? <CheckIcon /> : <ArrowForwardIcon />}
                disabled={!isValid || isSaving}
                size='large'
            >
                {isSaving
                    ? 'Saving...'
                    : isLastStage ? 'Submit claim' : 'Save and continue'
                }
            </Button>
        </Box>
    );
};

export default React.memo(ClaimActionBar);