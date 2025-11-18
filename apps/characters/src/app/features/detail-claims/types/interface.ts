import { FormField } from "./claims.type";

import { FieldError, FieldErrors, FieldErrorsImpl, Merge, type Control } from "react-hook-form";
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



export interface ClaimActionBarProps {
    onPrevious: () => void;
    disablePrevious: boolean;
    isLastStage: boolean;
    isValid: boolean;
    isSaving: boolean;
}

export interface ClaimFieldListProps {
    fields: any[];
    control: Control<any>;
    errors: FieldErrors;
}
export interface ClaimStageFormProps {
    stageConfig: any;
    defaultValues: any;
    onSubmit: (data: any) => void;
    onPrevious: () => void;
    isFirstStage: boolean;
    isLastStage: boolean;
    isSaving: boolean;
}