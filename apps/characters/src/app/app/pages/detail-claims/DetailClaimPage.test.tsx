import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, useParams } from 'react-router-dom';
import { CLAIM_FORM_CONFIG_DATA_MOCK } from '../../../__mocks__/mock-data'

import DetailClaimsPage from './page';
import { useClaimData, useClaimForm, useSaveClaimStage } from "../../../features/detail-claims/hooks/useClaims.hooks";
import { act } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  BrowserRouter: ({ children }: { children: any }) => <div>{children}</div>,
}));

jest.mock("../../../features/detail-claims/hooks/useClaims.hooks");

jest.mock("../../../features/detail-claims/utils/validation.utils", () => ({
  buildValidationSchema: jest.fn(() => ({
    validate: (data: any) => Promise.resolve(data)
  })),
}));


jest.mock("../../../features/detail-claims/components/ErrorClaimsComp", () => () => <div data-testid="error-comp">Error Component</div>);
jest.mock("../../../features/detail-claims/components/StageNavigation", () =>
  ({ stages, currentStageIndex, onNavigate }: { stages: any, currentStageIndex: number, onNavigate: any }) => (
    <div data-testid="stage-nav">
      {stages[currentStageIndex].title}
      <button onClick={() => onNavigate(1)}>Go to Stage 2</button>
    </div>
  )
);
jest.mock("../../../features/detail-claims/components/DynamicField", () =>
  ({ field }: { field: any }) => <input data-testid={`field-${field.id}`} name={field.id} defaultValue="test-input-value" />
);


const MOCK_CLAIM_ID = "CL-M1";
const MOCK_FORM_CONFIG = CLAIM_FORM_CONFIG_DATA_MOCK;
const MOCK_CLAIM_DATA = {
  'personal info': {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123456789"
  },
  'personal info 2': {
    fullName2: "John Doe",
    email: "john@example.com",
    phone: "123456789"
  }
};
// const MOCK_STAGES = MOCK_FORM_CONFIG.stages;

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <DetailClaimsPage />
    </BrowserRouter>
  );
};
jest.mock("../../../features/detail-claims/components/Loading", () => () => <div data-testid="loading-comp">Loading...</div>);

const mockReset = jest.fn();
const mockTrigger = jest.fn().mockResolvedValue(true); 


describe('DetailClaimsPage', () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: MOCK_CLAIM_ID });
    (useClaimForm as jest.Mock).mockReturnValue({ data: MOCK_FORM_CONFIG, isLoading: false, error: null });
    (useClaimData as jest.Mock).mockReturnValue({ data: MOCK_CLAIM_DATA, isLoading: false, error: null });
    (useSaveClaimStage as jest.Mock).mockReturnValue({ mutateAsync: mockMutateAsync, isPending: false, isError: false });
    mockMutateAsync.mockResolvedValue({});

    jest.clearAllMocks();
  });

  test('renders the Loading component when config is loading', async () => {
    // 1. Set mock to isLoading = true
    (useClaimForm as jest.Mock).mockReturnValue({ data: undefined, isLoading: true, error: null });

    // 2. Render component, using await act(async) to cover any potential internal async updates
    await act(async () => {
      renderComponent();
    });
    
    // 3. Assert Loading component is displayed
    expect(screen.getByTestId('loading-comp')).toBeInTheDocument();

    // 4. Assert main content is NOT displayed 
    expect(screen.queryByRole('heading', { name: /Claims Detail/i })).not.toBeInTheDocument();
  });

  test('calls reset and trigger when claimData for current stage is available (useEffect coverage)', async () => {
    await act(async () => {
        renderComponent();
    });

    // 1. Check on mounting (Stage 1: 'personal info')
    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockReset).toHaveBeenCalledWith(MOCK_CLAIM_DATA['personal info']);
      
      expect(mockTrigger).toHaveBeenCalledTimes(1);
    });
    
    // 2. Click to navigate to Stage 2 ('personal info 2')
    fireEvent.click(screen.getByRole('button', { name: /Go to Stage 2/i }));
    
    // 3. Check after currentStageIndex state changes
    await waitFor(() => {
        // MockReset and MockTrigger must be called a second time
        expect(mockReset).toHaveBeenCalledTimes(2);
        expect(mockTrigger).toHaveBeenCalledTimes(2);

        // Data for Stage 2 from MOCK_CLAIM_DATA
        expect(mockReset).toHaveBeenLastCalledWith(MOCK_CLAIM_DATA['personal info 2']);
    });
  });
});