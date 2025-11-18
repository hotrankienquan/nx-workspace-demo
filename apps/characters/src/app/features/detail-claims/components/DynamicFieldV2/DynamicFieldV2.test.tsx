import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FieldValues } from 'react-hook-form';
import DynamicFieldV2 from './DynamicFieldV2';
import '@testing-library/jest-dom';

import { 
    DynamicFieldPropsV2, 
    InputFieldTypeV2, 
    SelectableFieldType 
} from '../../types/interface';

interface MockFormWrapperProps {
    field: DynamicFieldPropsV2['field'];
    defaultValues?: FieldValues;
}

const MockFormWrapper: React.FC<MockFormWrapperProps> = ({ 
    field, 
    defaultValues = {} 
}) => {
    const { control, formState: { errors } } = useForm<FieldValues>({ 
        defaultValues,
        mode: 'onChange' 
    });

    const currentError = errors[field.id];

    const dynamicFieldProps: DynamicFieldPropsV2 = {
        field: field,
        control: control,
        error: currentError as DynamicFieldPropsV2['error'] 
    };

    return <DynamicFieldV2 {...dynamicFieldProps} />;
};

describe('DynamicField Component', () => {

    it('should render RenderTextField for type "text"', () => {
        const textField: InputFieldTypeV2 = {
            id: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username...',
        };

        render(<MockFormWrapper field={textField} />);

        const inputElement = screen.getByLabelText('Username');
        expect(inputElement).toBeInTheDocument();
        
        expect(screen.getByRole('textbox', { name: 'Username' })).toHaveAttribute('type', 'text');
    });

    it('should render RenderDropdownField for type "dropdown"', () => {
        const dropdownField: SelectableFieldType = {
            id: 'city',
            label: 'City',
            type: 'dropdown',
            options: [
                { label: 'Hanoi', value: 'hn' },
                { label: 'Ho Chi Minh', value: 'hcm' }
            ],
        };

        render(<MockFormWrapper field={dropdownField} />);

        expect(screen.getByLabelText('City')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /City/i })).toBeInTheDocument();
    });

    it('should render RenderRadioField for type "radio"', () => {
        const radioField: SelectableFieldType = {
            id: 'gender',
            label: 'Gender',
            type: 'radio',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
            ],
        };

        render(<MockFormWrapper field={radioField} />);

        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Male' })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Female' })).toBeInTheDocument();
    });

});