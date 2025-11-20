import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Typography } from "@mui/material";
import { buildValidationSchemaVer2 } from "../../../features/detail-claims/utils/validation/validation.utils.v2";
import ClaimFieldList from "./ClaimFieldList";
import ClaimActionBar from "./ClaimActionBar";
import { ClaimStageFormProps } from "../types/interface";

const ClaimStageForm: React.FC<ClaimStageFormProps> = ({
    stageConfig,
    defaultValues,
    onSubmit,
    onPrevious,
    isFirstStage,
    isLastStage,
    isSaving
}) => {
    const validationSchema = useMemo(
        () => buildValidationSchemaVer2(stageConfig.fields),
        [stageConfig.fields]
    );
    

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
        defaultValues: defaultValues
    });
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography data-testid="form-title" variant='h4' component="h2" gutterBottom>
                {stageConfig.title}
            </Typography>
            {stageConfig.description && (
                <Typography variant='body1' color='text.secondary' paragraph>
                    {stageConfig.description}
                </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <ClaimFieldList 
                data-testid="claim-field-list-testid"
                fields={stageConfig.fields} 
                control={control} 
                errors={errors} 
            />

            <Divider sx={{ my: 3 }} />

            <ClaimActionBar
                onPrevious={onPrevious}
                disablePrevious={isFirstStage}
                isLastStage={isLastStage}
                isValid={isValid}
                isSaving={isSaving}
            />
        </form>
    );
};

export default ClaimStageForm;