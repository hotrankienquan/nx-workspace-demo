import * as yup from 'yup'
import { ValidationRule } from '../../../types/claims.type';
import { PATTERN_MAP } from '../pattern-map';

export const applyStringConstraints = (
    schema: yup.StringSchema, 
    validation: Partial<ValidationRule>, 
    label: string
): yup.StringSchema => {
    const { minLength, maxLength, pattern } = validation;
    
    if (minLength !== undefined) {
        schema = schema.min(minLength, `${label} must be at least ${minLength} characters`);
    }
    if (maxLength !== undefined) {
        schema = schema.max(maxLength, `${label} must be at most ${maxLength} characters`);
    }

    if (pattern) {
        if (typeof pattern === 'string' && PATTERN_MAP[pattern as keyof typeof PATTERN_MAP]) {
            const patternConfig = PATTERN_MAP[pattern as keyof typeof PATTERN_MAP];
            schema = schema.matches(patternConfig.regex, patternConfig.message);
        }
    }

    return schema;
};