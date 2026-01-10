/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/function-component-definition */

import { render, screen } from '@testing-library/react';

// Mock the usernames utility to avoid is-ipfs import issues
let mockPinnedCastsEnabled = false;
jest.mock('apps/web/src/utils/usernames', () => ({
  get USERNAMES_PINNED_CASTS_ENABLED() {
    return mockPinnedCastsEnabled;
  },
}));

// Mock the child components
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionHeatmap', () => {
  return function MockUsernameProfileSectionHeatmap() {
    return <div data-testid="section-heatmap">Heatmap Section</div>;
  };
});

jest.mock('apps/web/src/components/Basenames/UsernameProfileCasts', () => {
  return function MockUsernameProfileCasts() {
    return <div data-testid="profile-casts">Profile Casts</div>;
  };
});

jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionBadges', () => {
  return function MockUsernameProfileSectionBadges() {
    return <div data-testid="section-badges">Badges Section</div>;
  };
});

jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext',
  () => {
    return function MockBadgeContextProvider({ children }: { children: React.ReactNode }) {
      return <div data-testid="badge-context-provider">{children}</div>;
    };
  },
);

jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionExplore', () => {
  return function MockUsernameProfileSectionExplore() {
    return <div data-testid="section-explore">Explore Section</div>;
  };
});

// Import the component after mocks are set up
import UsernameProfileContent from './index';

describe('UsernameProfileContent', () => {
  beforeEach(() => {
    mockPinnedCastsEnabled = false;
  });

  describe('basic rendering', () => {
    it('should render the container div with proper styling classes', () => {
      const { container } = render(<UsernameProfileContent />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toBeInTheDocument();
      expect(mainDiv.tagName).toBe('DIV');
      expect(mainDiv).toHaveClass('flex', 'flex-col', 'gap-4', 'rounded-2xl', 'border', 'p-4');
    });

    it('should always render UsernameProfileSectionHeatmap', () => {
      render(<UsernameProfileContent />);

      expect(screen.getByTestId('section-heatmap')).toBeInTheDocument();
    });

    it('should always render UsernameProfileSectionBadges', () => {
      render(<UsernameProfileContent />);

      expect(screen.getByTestId('section-badges')).toBeInTheDocument();
    });

    it('should always render UsernameProfileSectionExplore', () => {
      render(<UsernameProfileContent />);

      expect(screen.getByTestId('section-explore')).toBeInTheDocument();
    });
  });

  describe('BadgeContextProvider wrapping', () => {
    it('should wrap UsernameProfileSectionBadges in BadgeContextProvider', () => {
      render(<UsernameProfileContent />);

      const badgeContextProvider = screen.getByTestId('badge-context-provider');
      const badgesSection = screen.getByTestId('section-badges');

      expect(badgeContextProvider).toBeInTheDocument();
      expect(badgeContextProvider).toContainElement(badgesSection);
    });
  });

  describe('component ordering', () => {
    it('should render components in the correct order', () => {
      const { container } = render(<UsernameProfileContent />);

      const mainDiv = container.firstChild as HTMLElement;
      const children = Array.from(mainDiv.children);

      // First child should be heatmap section
      expect(children[0]).toHaveAttribute('data-testid', 'section-heatmap');

      // BadgeContextProvider should come before Explore
      const badgeProviderIndex = children.findIndex(
        (el) => el.getAttribute('data-testid') === 'badge-context-provider',
      );
      const exploreIndex = children.findIndex(
        (el) => el.getAttribute('data-testid') === 'section-explore',
      );

      expect(badgeProviderIndex).toBeLessThan(exploreIndex);

      // Explore section should be last
      expect(children[children.length - 1]).toHaveAttribute('data-testid', 'section-explore');
    });
  });

  describe('conditional rendering of UsernameProfileCasts', () => {
    it('should not render UsernameProfileCasts when feature flag is disabled', () => {
      mockPinnedCastsEnabled = false;

      render(<UsernameProfileContent />);

      expect(screen.queryByTestId('profile-casts')).not.toBeInTheDocument();
    });
  });
});
