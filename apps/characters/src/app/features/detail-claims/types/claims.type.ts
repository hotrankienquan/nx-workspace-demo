

export type FieldType = 'text' | 'number' | 'dropdown' | 'radio' | 'textarea';

//usage:Partilal<ValidationRule>
export interface ValidationRule {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: 'email'|'phone'|'string';
    min: number;
    max:number;
}

export interface FieldOption {
    label:string;
    value: string;
}

export interface FormField{
    id: string;
    label:string;
    type: FieldType;
    validation: Partial<ValidationRule>;
    options:Partial<FieldOption>[];
    placeholder?: string;
}

export interface FormStage{
    id: string;
    title:string;
    description?: string;
    fields: FormField[];
}

export interface ClaimFormConfig {
    claimId: string;
    stages: FormStage[];
}

export interface ClaimData {
    [stageId:string]: Record<string, any>;
}


// One field in the form config
export interface ClaimFormField {
    name: string;
    type: 'text' | 'date' | 'textarea'; // restrict to known types
    label: string;
  }
  
  // Full response from /claims/form-config
  export interface ClaimFormConfigResponse {
    fields: ClaimFormField[];
  }
  