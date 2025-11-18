import { Controller } from "react-hook-form";
import { DynamicFieldPropsV2, InputFieldTypeV2 } from "../../../types/interface";
import { TextField } from "@mui/material";

const RenderTextField = (
    field: InputFieldTypeV2,
    control: DynamicFieldPropsV2['control'],
    error: DynamicFieldPropsV2['error']
) => {
    return (
        <Controller
            name={field.id}
            control={control}
            defaultValue={field.type === 'number' ? '' : ''}
            render={({ field: controllerField }) => (
                <TextField
                    {...controllerField}
                    fullWidth
                    label={field.label}
                    placeholder={field.placeholder}
                    error={!!error}
                    helperText={error?.message as React.ReactNode}
                    required={field.validation?.required as boolean}
                    type={field.type === 'number' ? 'number' : 'text'}
                    multiline={field.type === 'textarea'}
                    rows={field.type === 'textarea' ? 4 : undefined}
                    onChange={e => {
                        if (field.type === 'number') {
                            const value = e.target.value;
                            const numericValue = value === '' ? '' : Number(value);
                            controllerField.onChange(numericValue);
                        } else {
                            controllerField.onChange(e);
                        }
                    }}
                />
            )}
        />
    );
};
export default RenderTextField;
