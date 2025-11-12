import { render } from '@testing-library/react';

import KiqiMonorepoShared from './shared';

describe('KiqiMonorepoShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KiqiMonorepoShared />);
    expect(baseElement).toBeTruthy();
  });
});
