/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/function-component-definition */

import { render, screen } from '@testing-library/react';
import UsernameProfileCasts from './index';

// Mock useUsernameProfile hook
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock useReadBaseEnsTextRecords hook
const mockExistingTextRecords = { casts: '' };
jest.mock('apps/web/src/hooks/useReadBaseEnsTextRecords', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    existingTextRecords: mockExistingTextRecords,
  })),
}));

// Mock UsernameProfileSectionTitle component
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionTitle', () => {
  return function MockUsernameProfileSectionTitle({ title }: { title: string }) {
    return <h3 data-testid="section-title">{title}</h3>;
  };
});

// Mock NeynarCast component
jest.mock('apps/web/src/components/NeynarCast', () => {
  return function MockNeynarCast({
    identifier,
    type,
  }: {
    identifier: string;
    type: 'url' | 'hash';
  }) {
    return (
      <div data-testid="neynar-cast" data-identifier={identifier} data-type={type}>
        Cast: {identifier}
      </div>
    );
  };
});

describe('UsernameProfileCasts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUsernameProfile.mockReturnValue({
      profileUsername: 'testuser.base.eth',
    });
    mockExistingTextRecords.casts = '';
  });

  describe('when there are no casts', () => {
    it('should return null when casts is empty string', () => {
      mockExistingTextRecords.casts = '';

      const { container } = render(<UsernameProfileCasts />);

      expect(container.firstChild).toBeNull();
    });

    it('should return null when casts contains only commas', () => {
      mockExistingTextRecords.casts = ',,,,';

      const { container } = render(<UsernameProfileCasts />);

      expect(container.firstChild).toBeNull();
    });

    it('should return null when casts contains only empty strings after split', () => {
      mockExistingTextRecords.casts = ',';

      const { container } = render(<UsernameProfileCasts />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('when there are casts', () => {
    it('should render the section with title "Pinned casts"', () => {
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0x123';

      render(<UsernameProfileCasts />);

      const sectionTitle = screen.getByTestId('section-title');
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toHaveTextContent('Pinned casts');
    });

    it('should render a single cast', () => {
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0x123';

      render(<UsernameProfileCasts />);

      const casts = screen.getAllByTestId('neynar-cast');
      expect(casts).toHaveLength(1);
      expect(casts[0]).toHaveAttribute('data-identifier', 'https://warpcast.com/user/0x123');
      expect(casts[0]).toHaveAttribute('data-type', 'url');
    });

    it('should render multiple casts', () => {
      mockExistingTextRecords.casts =
        'https://warpcast.com/user1/0x123,https://warpcast.com/user2/0x456,https://warpcast.com/user3/0x789';

      render(<UsernameProfileCasts />);

      const casts = screen.getAllByTestId('neynar-cast');
      expect(casts).toHaveLength(3);
      expect(casts[0]).toHaveAttribute('data-identifier', 'https://warpcast.com/user1/0x123');
      expect(casts[1]).toHaveAttribute('data-identifier', 'https://warpcast.com/user2/0x456');
      expect(casts[2]).toHaveAttribute('data-identifier', 'https://warpcast.com/user3/0x789');
    });

    it('should filter out empty cast strings between commas', () => {
      mockExistingTextRecords.casts =
        'https://warpcast.com/user1/0x123,,https://warpcast.com/user2/0x456,';

      render(<UsernameProfileCasts />);

      const casts = screen.getAllByTestId('neynar-cast');
      expect(casts).toHaveLength(2);
      expect(casts[0]).toHaveAttribute('data-identifier', 'https://warpcast.com/user1/0x123');
      expect(casts[1]).toHaveAttribute('data-identifier', 'https://warpcast.com/user2/0x456');
    });

    it('should pass type="url" to each NeynarCast component', () => {
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0xabc';

      render(<UsernameProfileCasts />);

      const cast = screen.getByTestId('neynar-cast');
      expect(cast).toHaveAttribute('data-type', 'url');
    });
  });

  describe('structure and layout', () => {
    it('should render a section element as the container', () => {
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0x123';

      render(<UsernameProfileCasts />);

      const section = screen.getByRole('listitem').closest('section');
      expect(section).toBeInTheDocument();
    });

    it('should render casts inside list items', () => {
      mockExistingTextRecords.casts =
        'https://warpcast.com/user1/0x111,https://warpcast.com/user2/0x222';

      render(<UsernameProfileCasts />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('should render an unordered list for the casts', () => {
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0x123';

      render(<UsernameProfileCasts />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe('UL');
    });
  });

  describe('integration with useReadBaseEnsTextRecords', () => {
    it('should use the profileUsername from context for the hook', () => {
      const useReadBaseEnsTextRecords =
        require('apps/web/src/hooks/useReadBaseEnsTextRecords').default;
      mockExistingTextRecords.casts = 'https://warpcast.com/user/0x123';

      render(<UsernameProfileCasts />);

      expect(useReadBaseEnsTextRecords).toHaveBeenCalledWith({
        username: 'testuser.base.eth',
      });
    });
  });
});
