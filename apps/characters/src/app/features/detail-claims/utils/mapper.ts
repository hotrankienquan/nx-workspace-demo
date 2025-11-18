// import { 
//     FormField, 
//     DynamicFieldTypeV2, 
//     FieldValidationV2, 
//     FieldOptionV2 
// } from "./types"; // Nhớ import đúng đường dẫn các type của bạn

import { FormField } from "../types/claims.type";
import { DynamicFieldTypeV2 } from "../types/form.type";
import { FieldOptionV2, FieldValidationV2 } from "../types/interface";

export const mapToDynamicFieldV2 = (field: FormField): DynamicFieldTypeV2 => {
    const mapValidation = (rule: Partial<any> = {}): FieldValidationV2 => ({
        required: rule.required,
        min: rule.min,
        max: rule.max,
        minLength: rule.minLength,
        maxLength: rule.maxLength,
        pattern: rule.pattern,
    });

    const mapOptions = (opts: Partial<any>[] = []): FieldOptionV2[] => {
        return opts
            .filter(opt => opt.label !== undefined && opt.value !== undefined)
            .map(opt => ({
                label: String(opt.label),
                value: opt.value
            }));
    };

    switch (field.type) {
        case 'dropdown':
        case 'radio':
            return {
                id: field.id,
                label: field.label,
                placeholder: field.placeholder,
                validation: mapValidation(field.validation),
                type: field.type,
                options: mapOptions(field.options), 
            };

        case 'text':
        case 'number':
        case 'textarea':
        default:
            return {
                id: field.id,
                label: field.label,
                placeholder: field.placeholder,
                validation: mapValidation(field.validation),
                type: field.type as 'text' | 'number' | 'textarea', // Ép kiểu nếu field.type của V1 là string rộng
                // options: undefined // (Hoặc không khai báo dòng này để thỏa mãn 'never')
            };
    }
};