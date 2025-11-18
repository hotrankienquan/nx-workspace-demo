import { Controller } from "react-hook-form";
import { DynamicFieldPropsV2, SelectableFieldType } from "../../../types/interface";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";

const RenderRadioField = (
    field: SelectableFieldType,
    control: DynamicFieldPropsV2['control'],
    error: DynamicFieldPropsV2['error']
) => {
    const { id, label, options, validation } = field;

    return (
        <Controller
            name={id}
            control={control}
            defaultValue=""
            render={({ field: controllerField }) => (
                <FormControl
                    error={!!error}
                    required={validation?.required as boolean}
                >
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup {...controllerField}>
                        {options.map(option => (
                            <FormControlLabel
                                key={String(option.value)}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                    {error && <FormHelperText>{error.message as React.ReactNode}</FormHelperText>}
                </FormControl>
            )}
        />
    );
};
export default RenderRadioField;
