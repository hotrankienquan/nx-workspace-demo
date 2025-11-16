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
                { id: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', validation: { required: true, pattern: 'phone' }, options: [] },

            ],
        }
    ]
}
