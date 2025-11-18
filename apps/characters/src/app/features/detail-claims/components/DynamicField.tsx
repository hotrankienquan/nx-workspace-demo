import { Controller } from "react-hook-form";
import { DynamicFieldProps } from "../types/interface"
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import React from "react";


const DynamicField: React.FC<DynamicFieldProps> = (
    {
        field: { type, id, label, options, validation, placeholder },
        control,
        error
    }
) => {
    const renderField = () => {
        switch (type) {
            case 'text':
                return (<Controller
                    name={id}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error?.message as React.ReactNode}
                            required={validation?.required}
                        />
                    )}
                />)
            case 'number':
                return (<Controller
                    name={id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                        <TextField
                            {...controllerField}
                            type="number"
                            fullWidth
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error?.message as React.ReactNode}
                            required={validation?.required}
                            onChange={e => {
                                const value = e.target.value;
                                const numericValue = value === '' ? '' : Number(value);
                                controllerField.onChange(numericValue);
                            }}
                        />
                    )}
                />)
            case 'dropdown':
                return (<Controller
                    name={id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                        <FormControl fullWidth error={!!error}>
                            <InputLabel
                            id={`${id}-label`}
                            required={validation?.required}
                            >
                                {label}
                            </InputLabel>

                            <Select
                                {...controllerField}
                                label={label}
                                labelId={`${id}-label`}
                                id={id}
                            >
                                {options?.map(option => (<MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>))}
                            </Select>
                            {error && <FormHelperText>{error.message as React.ReactNode}</FormHelperText>}
                        </FormControl>
                    )}
                />)

            case 'radio':
                return (<Controller
                    name={id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                        <FormControl
                            error={!!error}
                            required={validation?.required}
                        >
                            <FormLabel>{label}</FormLabel>
                            <RadioGroup {...controllerField}>
                                {options?.map(option => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                            {error && <FormHelperText>{error.message as React.ReactNode}</FormHelperText>}
                        </FormControl>
                    )}
                />)

            case 'textarea':
                return (<Controller
                    name={id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                        <TextField
                            {...controllerField}
                            fullWidth
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error?.message as React.ReactNode}
                            required={validation?.required}
                            multiline
                            rows={4}
                        />
                    )}
                />)
            default:
                return null;
        }
    }
    return <Box sx={{ marginBottom: 2 }}>{renderField()}</Box>
}

export default DynamicField