import { rest } from 'msw';
import { ClaimData, ClaimFormConfig } from '../../features/detail-claims/types/claims.type';

export const MOCK_CLAIMS_DATA = [
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

export const API_BASE_URL = 'https://new-ui/api';

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


export const CLAIM_FORM_CONFIG: ClaimFormConfig = {
  claimId: 'claim-123',
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

export const handlers = [
  rest.get(`${API_BASE_URL}/claims`, (req, res, ctx) => {
    const categoryFilter = req.url.searchParams.get('category');

    if (categoryFilter) {
      const filteredClaims = MOCK_CLAIMS_DATA.filter(
        (c) => c.category === categoryFilter
      );

      if (categoryFilter === 'Casualty') {
        return res(ctx.status(200), ctx.json([]));
      }

      return res(ctx.status(200), ctx.json(filteredClaims));
    }

    return res(ctx.status(200), ctx.json(MOCK_CLAIMS_DATA));
  }),


  rest.get<Promise<ClaimFormConfig>>(`${API_BASE_URL}/claims/form-config`, (req, res, ctx) => {
    const claimId = req.url.searchParams.get('claimId');

    if (claimId === 'm1') {
      return res(
        ctx.status(200),
        ctx.json({
          claimId,
          stages: [
            {
              id: 'stage1',
              title: 'Motor Claim Stage',
              description: 'Provide accident and vehicle details',
              fields: [
                {
                  id: 'f1',
                  label: 'Accident Date',
                  type: 'date',
                  validation: { required: true },
                  options: [],
                  placeholder: 'Select accident date',
                },
                {
                  id: 'f2',
                  label: 'Vehicle Make',
                  type: 'text',
                  validation: { required: true, minLength: 2 },
                  options: [],
                  placeholder: 'Enter vehicle make',
                },
                {
                  id: 'f3',
                  label: 'Vehicle Model',
                  type: 'text',
                  validation: { required: true, minLength: 2 },
                  options: [],
                  placeholder: 'Enter vehicle model',
                },
                {
                  id: 'f4',
                  label: 'Description of Incident',
                  type: 'textarea',
                  validation: { required: true, minLength: 10 },
                  options: [],
                  placeholder: 'Describe what happened',
                },
              ],
            },
          ],
        })
      );
    }

    // fallback for other claimIds
    return res(
      ctx.status(200),
      ctx.json({
        claimId,
        stages: [
          {
            id: 'stage1',
            title: 'General Claim Stage',
            description: 'Provide incident details',
            fields: [
              {
                id: 'f1',
                label: 'Incident Date',
                type: 'date',
                validation: { required: true },
                options: [],
                placeholder: 'Select incident date',
              },
              {
                id: 'f2',
                label: 'Location',
                type: 'text',
                validation: { required: true },
                options: [],
                placeholder: 'Enter location',
              },
              {
                id: 'f3',
                label: 'Description of Incident',
                type: 'textarea',
                validation: { required: true, minLength: 10 },
                options: [],
                placeholder: 'Describe what happened',
              },
            ],
          },
        ],
      })
    );
  }),

  rest.get(`${API_BASE_URL}/claims`, (req, res, ctx) => {
    const claimId = req.url.searchParams.get('claimId');
    if (claimId === 'm1') {
      return res(
        ctx.status(200),
        ctx.json(MOCK_CLAIM_DATA_M1)
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json(MOCK_CLAIM_DATA_GENERAL)
      );
    }
  }),

  rest.post(`${API_BASE_URL}/claims/stage/save/:claimId/:stageId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Stage data saved successfully' })
    );
  })
];
