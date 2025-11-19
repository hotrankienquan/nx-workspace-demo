import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingFallbackComponent from './Loading';

describe('LoadingFallbackComponent', () => {
  it('renders loading text', () => {
    render(<LoadingFallbackComponent />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders a single container with the loading text', () => {
    const { container } = render(<LoadingFallbackComponent />);
    expect(container).toHaveTextContent('Loading');
    expect(screen.getAllByText('Loading').length).toBe(1);
  });
});
