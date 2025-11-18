import { Controller } from "react-hook-form";
import { DynamicFieldPropsV2, SelectableFieldType } from "../../../types/interface";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const RenderDropdownField = (
    field: SelectableFieldType,
    control: DynamicFieldPropsV2['control'],
    error: DynamicFieldPropsV2['error']
) => {
    // TypeScript đảm bảo options tồn tại ở đây
    const { id, label, options, validation } = field;

    return (
        <Controller
            name={id}
            control={control}
            defaultValue=""
            render={({ field: controllerField }) => (
                <FormControl fullWidth error={!!error}>
                    <InputLabel id={`${id}-label`} required={validation?.required as boolean}>
                        {label}
                    </InputLabel>
                    <Select
                        {...controllerField}
                        label={label}
                        labelId={`${id}-label`}
                        id={id}
                    >
                        {options.map(option => (
                            <MenuItem key={String(option.value)} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error.message as React.ReactNode}</FormHelperText>}
                </FormControl>
            )}
        />
    );
};
export default RenderDropdownField;