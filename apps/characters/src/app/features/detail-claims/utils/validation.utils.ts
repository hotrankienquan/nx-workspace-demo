

import * as yup from 'yup';
import { FormField } from '../types/claims.type';

export const buildValidationSchema = (fields: FormField[]) => {
    const schemaFields: Record<string, yup.AnySchema> = {};

    fields.forEach((field) => {
        let fieldSchema: yup.AnySchema;

        switch (field.type) {
          case 'number':
            fieldSchema = yup.number().typeError('Must be a number');
            break;
          default:
            fieldSchema = yup.string();
        }

        const validation = field.validation;

        if(!validation){
            schemaFields[field.id] = fieldSchema; // set default chema
            return;
        }

        if(validation.required){
            fieldSchema = fieldSchema.required(`${field.label} is required`);
        }else{
            fieldSchema = fieldSchema.nullable().notRequired();
        }

        if(validation.minLength && fieldSchema instanceof yup.StringSchema){
            fieldSchema = fieldSchema.min(validation.minLength, `${field.label} must be at least ${validation.minLength} characters`);
        }

        if(validation.maxLength && fieldSchema instanceof yup.StringSchema){
            fieldSchema = fieldSchema.max(validation.maxLength, `${field.label} must be at most ${validation.maxLength} characters`);
        }
        if(validation.pattern && fieldSchema instanceof yup.StringSchema){
            let pattern: RegExp;
            switch(validation.pattern){
                case 'email':
                    pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    fieldSchema = fieldSchema.matches(pattern, 'Invalid email format');
                    break;
                case 'phone':
                    pattern = /^\+?[1-9]\d{1,14}$/;
                    fieldSchema = fieldSchema.matches(pattern, 'Invalid phone number format');
                    break;
                case 'string':
                    pattern = /^[A-Za-z]+$/;
                    fieldSchema = fieldSchema.matches(pattern, `${field.label} must contain only letters`);
                    break;
            }
        }

        if(validation.min !== undefined && fieldSchema instanceof yup.NumberSchema){
            fieldSchema = fieldSchema.min(validation.min, `${field.label} must be at least ${validation.min}`);
        }
        if(validation.max !== undefined && fieldSchema instanceof yup.NumberSchema){
            fieldSchema = fieldSchema.max(validation.max, `${field.label} must be at most ${validation.max}`);
        }
        schemaFields[field.id] = fieldSchema;

    });

    return yup.object().shape(schemaFields);
}


