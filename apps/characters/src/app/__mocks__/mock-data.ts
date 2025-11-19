import { ClaimData, ClaimFormConfig } from "../features/detail-claims/types/claims.type";

export const CLAIMS_DATA_MOCK = [
    {
        id: 'm1',
        category: 'Motor',
        title: 'AIOI Motor Claims',
        description: 'Motor Insurance',
    },
    {
        id: 'm2',
        category: 'Motor',
        title: 'Corporate Risk Motor Claim with Policy',
        description: 'Motor Insurance hiihi moto record2',
    },
    {
        id: 'c1',
        category: 'Casualty',
        title: 'Professional Indemnity',
        description: 'Liability Insurance',
    },
    {
        id: 'p1',
        category: 'Property',
        title: 'Fire & Special Perils Claim',
        description: 'Building & Contents hihi',
    },
];



export const MOCK_CLAIM_DATA_M1: ClaimData = {
    stage1: {
        accidentDate: "2025-11-13",
        vehicleMake: "Toyota",
        vehicleModel: "Corolla",
        description: "Rear-end collision at traffic light"
    }
};

export const MOCK_CLAIM_DATA_GENERAL: ClaimData = {
    // [stageId:string]: Record<string, any>
    stage1: {
        incidentDate: "2025-11-10",
        location: "Ho Chi Minh City",
        description: "Minor fire in warehouse storage area"
    }
};


export const CLAIM_FORM_CONFIG_DATA_MOCK: ClaimFormConfig = {
    claimId: 'm1',
    stages: [
        {
            id: 'personal info',
            title: 'Personal Information',
            description: 'Provide your personal details',
            fields: [
                {
                    id: 'fullName',
                    label: 'Full Name',
                    type: 'text',
                    validation: { required: true, minLength: 2 },
                    placeholder: 'Enter your full name',
                    options: [],
                },
                {
                    id: 'email',
                    label: 'Email',
                    type: 'text',
                    validation: { required: true },
                    options: [],
                    placeholder: 'Enter your email address',
                },
                {
                    id: 'phone',
                    label: 'Phone Number',
                    type: 'text',
                    placeholder: 'Enter your phone number',
                    validation: { required: true, pattern: 'phone' },
                    options: []
                },

            ],
        },
        {
            id: 'personal info 2',
            title: 'Personal Information 2',
            description: 'Provide your personal details',
            fields: [
                {
                    id: 'fullName2',
                    label: 'Country',
                    type: 'dropdown',
                    validation: { required: true },
                    placeholder: 'Select your country',
                    options: [
                        { value: 'vn', label: 'Vietnam' },
                        { value: 'us', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'au', label: 'Australia' },
                        { value: 'ca', label: 'Canada' },
                        { value: 'sg', label: 'Singapore' },
                        { value: 'jp', label: 'Japan' },
                        { value: 'kr', label: 'South Korea' },
                        { value: 'th', label: 'Thailand' },
                        { value: 'my', label: 'Malaysia' }
                    ],
                },
                {
                    id: 'email2',
                    label: 'Gender',
                    type: 'radio',
                    validation: { required: true },
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                    ],
                    placeholder: 'Select your gender',
                },
                {
                    id: 'phone2',
                    label: 'Phone Number',
                    type: 'text',
                    placeholder: 'Enter your phone number',
                    validation: { required: true, pattern: 'phone' },
                    options: []
                },
            ],
        }
    ]
}
