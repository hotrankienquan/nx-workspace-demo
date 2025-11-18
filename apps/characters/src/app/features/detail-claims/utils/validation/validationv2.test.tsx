import * as yup from 'yup';
import { FormField } from '../../types/claims.type';
import { buildValidationSchemaVer2 } from './validation.utils.v2';

describe('buildValidationSchema (Integrated Test)', () => {
    // 1. Trường có validation (String)
    const stringField: FormField = {
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        validation: {
            required: true,
            minLength: 2,
            pattern: "string"
        },
        options: [],
    };

    // 2. Trường có validation (Number)
    const numberField: FormField = {
        id: 'age',
        type: 'number',
        label: 'Age',
        validation: {
            required: true,
            min: 18,
            max: 99
        },
        options: []
    };

 
    // 4. Trường chỉ yêu cầu required (Radio/Generic String Schema)
    const requiredRadioField: FormField = {
        id: 'requiredRadio',
        type: 'radio',
        label: 'Required Option',
        validation: { required: true },
        options: [{ label: 'Opt A', value: 'A' }]
    };

    const fields: FormField[] = [stringField, numberField, requiredRadioField];


    it('should return a yup object schema containing all fields', () => {
        const schema = buildValidationSchemaVer2(fields);

        expect(schema).toBeInstanceOf(yup.ObjectSchema);

        const expectedKeys = ['firstName', 'age', 'requiredRadio'];
        const schemaKeys = Object.keys(schema.fields).sort();
        const sortedExpectedKeys = expectedKeys.sort();
        expect(schemaKeys).toEqual(sortedExpectedKeys);
    });


    it('should use isValidSync() to check validity', () => {
        const schema = buildValidationSchemaVer2(fields);
        const stringSchema = (schema.fields as any).firstName as yup.StringSchema;

        // Test invalid cases
        expect(stringSchema.isValidSync(undefined)).toBe(false);
        expect(stringSchema.isValidSync('A')).toBe(false);
        expect(stringSchema.isValidSync('AB1')).toBe(false);
        
        // Test valid cases
        expect(stringSchema.isValidSync('AB')).toBe(true);
        expect(stringSchema.isValidSync('ABC')).toBe(true);
    });

    it('should correctly apply ALL constraints (required, min, max) to the Number field', () => {
        const schema = buildValidationSchemaVer2(fields);
        const numberSchema = (schema.fields as any).age as yup.NumberSchema;

        // 1. Test Required: Required: true
        expect(() => numberSchema.validateSync(undefined)).toThrow('Age is required');

        // 2. Test Type Error
        expect(() => numberSchema.validateSync('abc' as any)).toThrow('Must be a number');

        // 3. Test Min: min: 18
        expect(() => numberSchema.validateSync(17)).toThrow('Age must be at least 18');
        
        // 4. Test Max: max: 99
        expect(() => numberSchema.validateSync(100)).toThrow('Age must be at most 99');

        // 5. Test Pass
        expect(numberSchema.validateSync(50)).toBe(50);
        expect(numberSchema.isValidSync(50)).toBe(true);
        expect(numberSchema.isValidSync(18)).toBe(true);
        expect(numberSchema.isValidSync(99)).toBe(true);
        
        // Test Invalid với isValidSync
        expect(numberSchema.isValidSync(undefined)).toBe(false);
        expect(numberSchema.isValidSync(17)).toBe(false);
        expect(numberSchema.isValidSync(100)).toBe(false);
    });

    // --- Assertions for Optional Fields ---
    
 
    
    it('should correctly apply only required constraint to the radio field', () => {
        const schema = buildValidationSchemaVer2(fields);
        const radioSchema = (schema.fields as any).requiredRadio as yup.StringSchema;
        
        // Test Required với isValidSync
        expect(radioSchema.isValidSync(undefined)).toBe(false);
        expect(radioSchema.isValidSync('OptionA')).toBe(true);

        // Test Required với validateSync
        expect(() => radioSchema.validateSync(undefined)).toThrow('Required Option is required');
        expect(radioSchema.validateSync('OptionA')).toBe('OptionA');
    });

});