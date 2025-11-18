import * as yup from 'yup';
import { ValidationRule } from '../../../types/claims.type';
import { applyStringConstraints } from './string-constraint';
import { applyNumberConstraints } from './number-constraint';

const applyConstraints = (
    baseSchema: yup.AnySchema, 
    validation: Partial<ValidationRule>, 
    label: string
): yup.AnySchema => {
    let schema = baseSchema;
    const { required } = validation;

    if (required) {
        schema = schema.required(`${label} is required`);
    } else {
        schema = schema.nullable().notRequired(); 
    }

    if (schema instanceof yup.StringSchema) {
        schema = applyStringConstraints(schema, validation, label);
    } else if (schema instanceof yup.NumberSchema) {
        schema = applyNumberConstraints(schema, validation, label);
    }

    return schema;
};

export {
    applyConstraints
}