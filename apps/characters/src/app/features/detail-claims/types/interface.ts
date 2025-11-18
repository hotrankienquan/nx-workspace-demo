import { FormField } from "./claims.type";

import { FieldError, FieldErrorsImpl, Merge, type Control } from "react-hook-form";
import { DynamicFieldTypeV2 } from "./form.type";

export interface DynamicFieldProps {
    field: FormField;
    control: Control<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

export interface DynamicFieldPropsV2{
    field: DynamicFieldTypeV2; 
    control: Control<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export interface FieldOptionV2 {
    label: string;
    value: string | number;
}

export interface FieldValidationV2 {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    min?: number;
    max?: number;
    pattern?: string;
}

export interface BaseFieldV2 {
    id: string;
    label: string;
    placeholder?: string;
    validation?: FieldValidationV2;
}

export interface InputFieldTypeV2 extends BaseFieldV2 {
    type: 'text' | 'number' | 'textarea';
    options?: never;
}

export interface SelectableFieldType extends BaseFieldV2 {
    type: 'dropdown' | 'radio';
    options: FieldOptionV2[];
}

