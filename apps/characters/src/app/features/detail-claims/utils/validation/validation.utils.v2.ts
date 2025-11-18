import * as yup from 'yup';
import { FormField } from '../../types/claims.type';
import { getBaseSchema } from './base-schema';
import { applyConstraints } from './constraints/constraint-factory';

export const buildValidationSchemaVer2 = (fields: FormField[]) => {
    const schemaFields: Record<string, yup.AnySchema> = {};

    fields.forEach((field) => {
        let fieldSchema = getBaseSchema(field.type);

        if (field.validation) {
            fieldSchema = applyConstraints(fieldSchema, field?.validation, field.label);
        } else {
            fieldSchema = fieldSchema.nullable().notRequired();
        }

        schemaFields[field.id] = fieldSchema;
    });

    return yup.object().shape(schemaFields);
};