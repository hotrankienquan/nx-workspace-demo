import { Box } from "@mui/material";
import React from "react";
import { DynamicFieldPropsV2 } from "../../types/interface";
import RenderTextField from "./fields/RenderTextField";
import RenderDropdownField from "./fields/RenderDropdownField";
import RenderRadioField from "./fields/RenderRadioField";

const DynamicFieldVer2: React.FC<DynamicFieldPropsV2> = ({ field, control, error }) => {
    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'number':
            case 'textarea':
                return RenderTextField(field, control, error);

            case 'dropdown':
                return RenderDropdownField(field, control, error);

            case 'radio':
                return RenderRadioField(field, control, error);

            default:
                return null;
        }
    }

    return <Box sx={{ marginBottom: 2 }}>{renderField()}</Box>
}

export default DynamicFieldVer2