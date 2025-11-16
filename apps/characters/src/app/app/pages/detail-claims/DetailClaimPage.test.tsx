import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as claimsHooks from '../../../features/detail-claims/hooks/useClaims.hooks';
import DetailClaimsPage from './page';
// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock hooks
jest.mock('../../../features/detail-claims/hooks/useClaims.hooks');

// Mock components
jest.mock('../../../features/detail-claims/components/Loading', () => {
  return function Loading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

jest.mock('../../../features/detail-claims/components/ErrorClaimsComp', () => {
  return function ErrorClaimsComp() {
    return <div data-testid="error">Error loading claims</div>;
  };
});

jest.mock('../../../features/detail-claims/components/StageNavigation', () => {
  return function StageNavigation({ stages, currentStageIndex, onNavigate }: any) {
    return (
      <div data-testid="stage-navigation">
        {stages.map((stage: any, index: number) => (
          <button
            key={stage.id}
            data-testid={`stage-${index}`}
            onClick={() => onNavigate(index)}
            disabled={index === currentStageIndex}
          >
            {stage.title}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('../../../features/detail-claims/components/DynamicField', () => {
  return function DynamicField({ field, control, error }: any) {
    const { Controller } = require('react-hook-form');
    return (
      <div data-testid={`field-${field.id}`}>
        <label>{field.label}</label>
        <Controller
          name={field.id}
          control={control}
          render={({ field: fieldProps }:{field:any}) => (
            <>
              <input
                {...fieldProps}
                type={field.type}
                placeholder={field.placeholder}
                data-testid={`input-${field.id}`}
              />
              {error && (
                <span data-testid={`error-${field.id}`}>{error.message}</span>
              )}
            </>
          )}
        />
      </div>
    );
  };
});

describe('DetailClaimsPage', () => {
  let queryClient: QueryClient;
  const mockMutateAsync = jest.fn();
  const mockUseParams = require('react-router-dom').useParams;

  const mockFormConfig = {
    stages: [
      {
        id: 'stage-1',
        title: 'Personal Information',
        description: 'Provide your personal details',
        fields: [
          {
            id: 'fullName',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter your full name',
            validation: { required: true, minLength: 2 },
            options: [],
          },
          {
            id: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Enter your email',
            validation: { required: true, pattern: 'email' },
            options: [],
          },
        ],
      },
      {
        id: 'stage-2',
        title: 'Additional Info',
        description: 'Provide additional information',
        fields: [
          {
            id: 'phone',
            label: 'Phone Number',
            type: 'text',
            placeholder: 'Enter your phone',
            validation: { required: true, pattern: 'phone' },
            options: [],
          },
        ],
      },
    ],
  };

  const mockClaimData = {
    'stage-1': {
      fullName: 'John Doe',
      email: 'john@example.com',
    },
    'stage-2': {
      phone: '0976580945',
    },
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    mockUseParams.mockReturnValue({ id: 'test-claim-id' });

    jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
      data: mockFormConfig,
      isLoading: false,
      error: null,
    } as any);

    jest.spyOn(claimsHooks, 'useClaimData').mockReturnValue({
      data: mockClaimData,
    } as any);

    jest.spyOn(claimsHooks, 'useSaveClaimStage').mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      isError: false,
    } as any);

    mockMutateAsync.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DetailClaimsPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  describe('Loading State', () => {
    it('should show loading component when isLoading is true', () => {
      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      } as any);

      renderComponent();

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('should show error component when configError exists', () => {
      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Config error'),
      } as any);

      renderComponent();

      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    it('should show error component when formConfig is null', () => {
      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      } as any);

      renderComponent();

      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    it('should show error component when formConfig.stages is null', () => {
      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: { stages: null },
        isLoading: false,
        error: null,
      } as any);

      renderComponent();

      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    it('should show error component when currentStage is undefined', () => {
      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: { stages: [] },
        isLoading: false,
        error: null,
      } as any);

      renderComponent();

      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  describe('Rendering', () => {
    it('should render page title and claim ID', () => {
      renderComponent();

      expect(screen.getByText('Claims Detail')).toBeInTheDocument();
      expect(screen.getByText('Claim ID: test-claim-id')).toBeInTheDocument();
    });

    it('should render stage navigation', () => {
      renderComponent();

      expect(screen.getByTestId('stage-navigation')).toBeInTheDocument();
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText('Additional Info')).toBeInTheDocument();
    });

    it('should render current stage title and description', () => {
      renderComponent();

      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText('Provide your personal details')).toBeInTheDocument();
    });

    it('should render all fields for current stage', () => {
      renderComponent();

      expect(screen.getByTestId('field-fullName')).toBeInTheDocument();
      expect(screen.getByTestId('field-email')).toBeInTheDocument();
    });

    it('should render without description when not provided', () => {
      const configWithoutDescription = {
        ...mockFormConfig,
        stages: [
          {
            ...mockFormConfig.stages[0],
            description: undefined,
          },
        ],
      };

      jest.spyOn(claimsHooks, 'useClaimForm').mockReturnValue({
        data: configWithoutDescription,
        isLoading: false,
        error: null,
      } as any);

      renderComponent();

      expect(screen.queryByText('Provide your personal details')).not.toBeInTheDocument();
    });

    it('should render Previous and Save and continue buttons', () => {
      renderComponent();

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Save and continue')).toBeInTheDocument();
    });

    it('should render Submit claim button on last stage', async () => {
      renderComponent();

      const nextStageButton = screen.getByTestId('stage-1');
      await userEvent.click(nextStageButton);

      await waitFor(() => {
        expect(screen.getByText('Submit claim')).toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    it('should populate form with existing claim data', async () => {
      renderComponent();

    //   await waitFor(() => {
    //     const fullNameInput = screen.getByTestId('input-fullName') as HTMLInputElement;
    //     const emailInput = screen.getByTestId('input-email') as HTMLInputElement;

    //     expect(fullNameInput.value).toBe('John Doe');
    //     expect(emailInput.value).toBe('john@example.com');
    //   });
      await waitFor(() => {
        const fullNameInput = screen.getByTestId('input-fullName');
        const emailInput = screen.getByTestId('input-email');
    
        expect(fullNameInput).toHaveValue('John Doe');
        expect(emailInput).toHaveValue('john@example.com');
      });
    });

   it('should allow user to input data', async () => {
  const user = userEvent.setup();
  renderComponent();

  const fullNameInput = screen.getByTestId('input-fullName');

  await user.clear(fullNameInput);
  await user.type(fullNameInput, 'Jane Smith');

  await waitFor(() => {
    expect(fullNameInput).toHaveValue('Jane Smith');  // ✅ Thay đổi này
  });
});

    it('should submit form and move to next stage', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Fill form with valid data
      const fullNameInput = screen.getByTestId('input-fullName');
      const emailInput = screen.getByTestId('input-email');

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Smith');
      
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');

      const submitButton = screen.getByText('Save and continue');
      
      // Wait for form to be valid
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          claimId: 'test-claim-id',
          stageId: 'stage-1',
          data: expect.objectContaining({
            fullName: 'Jane Smith',
            email: 'jane@example.com',
          }),
        });
      });

      await waitFor(() => {
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
      });
    });

    it('should handle submit on last stage', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Navigate to last stage
      const nextStageButton = screen.getByTestId('stage-1');
      await user.click(nextStageButton);

      await waitFor(() => {
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
      });

      const phoneInput = screen.getByTestId('input-phone');
      await user.clear(phoneInput);
      await user.type(phoneInput, '0976580945');

      const submitButton = screen.getByText('Submit claim');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          claimId: 'test-claim-id',
          stageId: 'stage-2',
          data: expect.objectContaining({
            phone: '0976580945',
          }),
        });
      });
    });

    it('should show error message when submission fails', async () => {
      const user = userEvent.setup();
      mockMutateAsync.mockRejectedValueOnce(new Error('Save failed'));

      jest.spyOn(claimsHooks, 'useSaveClaimStage').mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
        isError: true,
      } as any);

      jest.spyOn(console, 'error').mockImplementation(() => {});

      renderComponent();

      const fullNameInput = screen.getByTestId('input-fullName');
      const emailInput = screen.getByTestId('input-email');

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Smith');
      
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');

      const submitButton = screen.getByText('Save and continue');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to save data for this stage. Please try again.')).toBeInTheDocument();
      });

      (console.error as jest.Mock).mockRestore();
    });

    it('should show Saving... text when mutation is pending', () => {
      jest.spyOn(claimsHooks, 'useSaveClaimStage').mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: true,
        isError: false,
      } as any);

      renderComponent();

      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('should disable submit button when form is invalid', () => {
      jest.spyOn(claimsHooks, 'useClaimData').mockReturnValue({
        data: {},
      } as any);

      renderComponent();

      const submitButton = screen.getByText('Save and continue');
      expect(submitButton).toBeDisabled();
    });

    it('should disable submit button when mutation is pending', () => {
      jest.spyOn(claimsHooks, 'useSaveClaimStage').mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: true,
        isError: false,
      } as any);

      renderComponent();

      const submitButton = screen.getByText('Saving...');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Navigation', () => {
    it('should navigate to previous stage', async () => {
      const user = userEvent.setup();
      renderComponent();

      // Navigate to stage 2
      const nextStageButton = screen.getByTestId('stage-1');
      await user.click(nextStageButton);

      await waitFor(() => {
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
      });

      // Navigate back
      const previousButton = screen.getByText('Previous');
      await user.click(previousButton);

      await waitFor(() => {
        expect(screen.getByText('Personal Information')).toBeInTheDocument();
      });
    });

    it('should disable Previous button on first stage', () => {
      renderComponent();

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('should not navigate to negative index when clicking Previous on first stage', async () => {
      const user = userEvent.setup();
      renderComponent();

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();

      // Try to click (should not do anything)
      await user.click(previousButton);

      // Should still be on first stage
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
    });

    it('should navigate using stage navigation buttons', async () => {
      const user = userEvent.setup();
      renderComponent();

      const stage2Button = screen.getByTestId('stage-1');
      await user.click(stage2Button);

      await waitFor(() => {
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
      });
    });

  
  });

  describe('Stage Completion Tracking', () => {
    it('should mark stage as completed after successful submission', async () => {
      const user = userEvent.setup();
      renderComponent();

      const fullNameInput = screen.getByTestId('input-fullName');
      const emailInput = screen.getByTestId('input-email');

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Smith');
      
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');

      const submitButton = screen.getByText('Save and continue');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalled();
      });

      // Stage should be marked as completed (this is internal state, 
      // but we can verify through stage navigation props)
    });
  });

  describe('Edge Cases', () => {
  
    it('should handle console.error in catch block', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      mockMutateAsync.mockRejectedValueOnce(new Error('Network error'));

      renderComponent();

      const fullNameInput = screen.getByTestId('input-fullName');
      const emailInput = screen.getByTestId('input-email');

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Smith');
      
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');

      const submitButton = screen.getByText('Save and continue');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error saving stage data:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });

    it('should handle params without id', () => {
      mockUseParams.mockReturnValue({});

      renderComponent();

      expect(screen.getByText('Claim ID:')).toBeInTheDocument();
    });
  });

  describe('All Stages Data Collection', () => {
    it('should collect data from all stages', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      renderComponent();

      // Stage 1
      const fullNameInput = screen.getByTestId('input-fullName');
      const emailInput = screen.getByTestId('input-email');

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Smith');
      
      await user.clear(emailInput);
      await user.type(emailInput, 'jane@example.com');

      let submitButton = screen.getByText('Save and continue');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
      });

      // Stage 2
      const phoneInput = screen.getByTestId('input-phone');
      await user.clear(phoneInput);
      await user.type(phoneInput, '0976580945');

      submitButton = screen.getByText('Submit claim');
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      // Should have logged all stages data
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'All stages data so far:',
          expect.objectContaining({
            'stage-1': expect.any(Object),
            'stage-2': expect.any(Object),
          })
        );
      });

      consoleSpy.mockRestore();
    });
  });
});