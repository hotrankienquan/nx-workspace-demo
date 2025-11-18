import * as yup from 'yup'
import { ValidationRule } from '../../../types/claims.type';

const applyNumberConstraints = (
    schema: yup.NumberSchema,
    validation: Partial<ValidationRule>,
    label: string
): yup.NumberSchema => {
    const { min, max } = validation;

    if (min !== undefined) {
        schema = schema.min(min, `${label} must be at least ${min}`);
    }
    if (max !== undefined) {
        schema = schema.max(max, `${label} must be at most ${max}`);
    }

    return schema;
};
export { applyNumberConstraints }