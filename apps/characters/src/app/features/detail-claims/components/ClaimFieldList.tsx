import React from "react";
import { Box } from "@mui/material";
import DynamicFieldVer2 from "../../../features/detail-claims/components/DynamicFieldV2/DynamicFieldV2";
import { mapToDynamicFieldV2 } from "../../../features/detail-claims/utils/mapper";
import { ClaimFieldListProps } from "../types/interface";

const ClaimFieldList: React.FC<ClaimFieldListProps> = ({ fields, control, errors }) => {
    return (
        <Box sx={{ mb: 3 }}>
            {fields.map((oldField) => {
                const newFieldData = mapToDynamicFieldV2(oldField);
                return (
                    <DynamicFieldVer2
                        key={newFieldData.id}
                        field={newFieldData}
                        control={control}
                        error={errors[newFieldData.id]}
                    />
                );
            })}
        </Box>
    );
};

export default (ClaimFieldList);