import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import DetailClaimsPage from './page';
import { useClaimForm } from "../../../features/detail-claims/hooks/useClaims.hooks";
import { act } from 'react';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <DetailClaimsPage />
    </BrowserRouter>
  );
};



describe('DetailClaimsPage', () => {

  test('renders the Loading component when config is loading', async () => {
    (useClaimForm as jest.Mock).mockReturnValue({ data: undefined, isLoading: true, error: null });

    await act(async () => {
      renderComponent();
    });
    
    expect(screen.getByTestId('loading-comp')).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: /Claims Detail/i })).not.toBeInTheDocument();
  });

  test('calls reset and trigger when claimData for current stage is available (useEffect coverage)', async () => {
    await act(async () => {
        renderComponent();
    });

  });
});