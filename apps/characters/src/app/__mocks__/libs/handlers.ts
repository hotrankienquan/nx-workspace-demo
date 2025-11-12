import { rest } from 'msw';

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

export const handlers = [
  // Mock handler for the /api/claims endpoint
  rest.get('https://new-ui/api/claims', (req, res, ctx) => {
    const categoryFilter = req.url.searchParams.get('category');

    if (categoryFilter) {
      const filteredClaims = MOCK_CLAIMS_DATA.filter((c) => c.category === categoryFilter);

      // Simulate empty result for "Casualty"
      if (categoryFilter === 'Casualty') {
        return res(ctx.status(200), ctx.json([]));
      }

      return res(ctx.status(200), ctx.json(filteredClaims));
    }

    // Return all claims if no category filter is provided
    return res(ctx.status(200), ctx.json(MOCK_CLAIMS_DATA));
  }),
];