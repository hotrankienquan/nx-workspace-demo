import { rest } from 'msw';
import { ClaimFormConfig } from '../../features/detail-claims/types/claims.type';
import { BASE_URL_APP } from '../../globals/constants';
import { CLAIMS_DATA_MOCK, MOCK_CLAIM_DATA_GENERAL, MOCK_CLAIM_DATA_M1 } from '../mock-data';


export const handlers = [
  rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
    const categoryFilter = req.url.searchParams.get('category');

    if (categoryFilter) {
      const filteredClaims = CLAIMS_DATA_MOCK.filter(
        (c) => c.category === categoryFilter
      );

      if (categoryFilter === 'Casualty') {
        return res(ctx.status(200), ctx.json([]));
      }

      return res(ctx.status(200), ctx.json(filteredClaims));
    }

    return res(ctx.status(200), ctx.json(CLAIMS_DATA_MOCK));
  }),


  rest.get<Promise<ClaimFormConfig>>(`${BASE_URL_APP}/claims/form-config`, (req, res, ctx) => {
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

  rest.get(`${BASE_URL_APP}/claims`, (req, res, ctx) => {
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

  rest.post(`${BASE_URL_APP}/claims/stage/save/:claimId/:stageId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Stage data saved successfully' })
    );
  })
];
