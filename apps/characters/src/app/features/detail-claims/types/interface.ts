import { FormField } from "./claims.type";

import { FieldError, FieldErrorsImpl, Merge, type Control } from "react-hook-form";

export interface DynamicFieldProps {
    field: FormField;
    control: Control<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}



