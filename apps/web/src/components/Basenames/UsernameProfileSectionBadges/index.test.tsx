/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/function-component-definition */

import { render, screen } from '@testing-library/react';

// Mock the UsernameProfileContext
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock the Badges components
jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges',
  () => ({
    Badge: function MockBadge({
      badge,
      claimed,
      score,
    }: {
      badge: string;
      claimed?: boolean;
      score?: number;
    }) {
      return (
        <div data-testid={`badge-${badge}`} data-claimed={claimed} data-score={score}>
          {badge}
        </div>
      );
    },
    BadgeModal: function MockBadgeModal() {
      return <div data-testid="badge-modal">Badge Modal</div>;
    },
    BadgeNames: {},
  }),
);

// Mock UsernameProfileSectionTitle
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionTitle', () => {
  return function MockUsernameProfileSectionTitle({ title }: { title: string }) {
    return <div data-testid={`section-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</div>;
  };
});

// Mock the hooks
const mockUseCoinbaseVerification = jest.fn();
jest.mock('./hooks/useCoinbaseVerifications', () => ({
  useCoinbaseVerification: () => mockUseCoinbaseVerification(),
}));

const mockUseBaseGuild = jest.fn();
jest.mock('./hooks/useBaseGuild', () => ({
  useBaseGuild: () => mockUseBaseGuild(),
}));

const mockUseTalentProtocol = jest.fn();
jest.mock('./hooks/useTalentProtocol', () => ({
  useTalentProtocol: () => mockUseTalentProtocol(),
}));

const mockUseBuildathonParticipant = jest.fn();
jest.mock('./hooks/useBuildathon', () => ({
  __esModule: true,
  default: () => mockUseBuildathonParticipant(),
}));

const mockUseBaseGrant = jest.fn();
jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileSectionBadges/hooks/useBaseGrant',
  () => ({
    __esModule: true,
    default: () => mockUseBaseGrant(),
  }),
);

import UsernameProfileSectionBadges from './index';

describe('UsernameProfileSectionBadges', () => {
  const mockProfileAddress = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock values
    mockUseUsernameProfile.mockReturnValue({
      profileAddress: mockProfileAddress,
      currentWalletIsProfileEditor: false,
    });

    mockUseCoinbaseVerification.mockReturnValue({
      badges: {
        VERIFIED_IDENTITY: false,
        VERIFIED_COUNTRY: false,
        VERIFIED_COINBASE_ONE: false,
      },
      empty: true,
    });

    mockUseBaseGuild.mockReturnValue({
      badges: {
        BASE_BUILDER: false,
        BUILDATHON_PARTICIPANT: false,
        BASE_INITIATE: false,
        BASE_LEARN_NEWCOMER: false,
        BUILDATHON_WINNER: false,
        BASE_GRANTEE: false,
      },
      empty: true,
    });

    mockUseTalentProtocol.mockReturnValue(undefined);
    mockUseBuildathonParticipant.mockReturnValue({ isParticipant: false, isWinner: false });
    mockUseBaseGrant.mockReturnValue(false);
  });

  describe('basic rendering', () => {
    it('should always render the BadgeModal', () => {
      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-modal')).toBeInTheDocument();
    });
  });

  describe('VerificationsSection', () => {
    it('should not render VerificationsSection when empty and not profile editor', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: false,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: true,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.queryByTestId('section-title-verifications')).not.toBeInTheDocument();
    });

    it('should render VerificationsSection when user is profile editor even if empty', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: true,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: false,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: true,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-verifications')).toBeInTheDocument();
    });

    it('should render VerificationsSection when badges are claimed', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: true,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-verifications')).toBeInTheDocument();
      expect(screen.getByTestId('badge-VERIFIED_IDENTITY')).toBeInTheDocument();
    });

    it('should render claimed verification badges', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: true,
          VERIFIED_COUNTRY: true,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-VERIFIED_IDENTITY')).toBeInTheDocument();
      expect(screen.getByTestId('badge-VERIFIED_COUNTRY')).toBeInTheDocument();
      expect(screen.queryByTestId('badge-VERIFIED_COINBASE_ONE')).not.toBeInTheDocument();
    });

    it('should show all verification badges to profile editor even if not claimed', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: true,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: false,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: true,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-VERIFIED_IDENTITY')).toBeInTheDocument();
      expect(screen.getByTestId('badge-VERIFIED_COUNTRY')).toBeInTheDocument();
      expect(screen.getByTestId('badge-VERIFIED_COINBASE_ONE')).toBeInTheDocument();
    });
  });

  describe('BuilderSection', () => {
    it('should not render BuilderSection when empty and not profile editor', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(undefined);

      render(<UsernameProfileSectionBadges />);

      expect(screen.queryByTestId('section-title-builder-activity')).not.toBeInTheDocument();
    });

    it('should render BuilderSection when user is profile editor even if empty', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: true,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(undefined);

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-builder-activity')).toBeInTheDocument();
    });

    it('should render BuilderSection when guild badges are claimed', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: true,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-builder-activity')).toBeInTheDocument();
      expect(screen.getByTestId('badge-BASE_BUILDER')).toBeInTheDocument();
    });

    it('should render BuilderSection when talent score exists', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(85);

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-builder-activity')).toBeInTheDocument();
      expect(screen.getByTestId('badge-TALENT_SCORE')).toBeInTheDocument();
    });

    it('should render buildathon participant badge when applicable', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(50);
      mockUseBuildathonParticipant.mockReturnValue({ isParticipant: true, isWinner: false });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-BUILDATHON_PARTICIPANT')).toBeInTheDocument();
    });

    it('should render buildathon winner badge when applicable', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(50);
      mockUseBuildathonParticipant.mockReturnValue({ isParticipant: true, isWinner: true });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-BUILDATHON_WINNER')).toBeInTheDocument();
    });

    it('should render base grantee badge when applicable', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: false,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: true,
      });

      mockUseTalentProtocol.mockReturnValue(50);
      mockUseBaseGrant.mockReturnValue(true);

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('badge-BASE_GRANTEE')).toBeInTheDocument();
    });
  });

  describe('BadgeCount', () => {
    it('should display badge count when user is profile editor in verifications', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: true,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: true,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByText('1/3 claimed')).toBeInTheDocument();
    });

    it('should not display badge count when user is not profile editor', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: true,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.queryByText(/claimed/)).not.toBeInTheDocument();
    });

    it('should display correct badge count for builder section', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: true,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: true,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: true,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: false,
      });

      mockUseTalentProtocol.mockReturnValue(85);
      mockUseBuildathonParticipant.mockReturnValue({ isParticipant: true, isWinner: false });
      mockUseBaseGrant.mockReturnValue(false);

      render(<UsernameProfileSectionBadges />);

      // Combined badges are: BASE_BUILDER (true), BUILDATHON_PARTICIPANT (true from hook overwrite),
      // BASE_INITIATE (true), BASE_LEARN_NEWCOMER (false), BUILDATHON_WINNER (false),
      // BASE_GRANTEE (false), TALENT_SCORE (85 = truthy)
      // Claimed: 4 (BASE_BUILDER, BUILDATHON_PARTICIPANT, BASE_INITIATE, TALENT_SCORE)
      // Total: 7 unique badges
      expect(screen.getByText('4/7 claimed')).toBeInTheDocument();
    });
  });

  describe('combined badges display', () => {
    it('should render both sections when badges exist in both', () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: mockProfileAddress,
        currentWalletIsProfileEditor: false,
      });

      mockUseCoinbaseVerification.mockReturnValue({
        badges: {
          VERIFIED_IDENTITY: true,
          VERIFIED_COUNTRY: false,
          VERIFIED_COINBASE_ONE: false,
        },
        empty: false,
      });

      mockUseBaseGuild.mockReturnValue({
        badges: {
          BASE_BUILDER: true,
          BUILDATHON_PARTICIPANT: false,
          BASE_INITIATE: false,
          BASE_LEARN_NEWCOMER: false,
          BUILDATHON_WINNER: false,
          BASE_GRANTEE: false,
        },
        empty: false,
      });

      render(<UsernameProfileSectionBadges />);

      expect(screen.getByTestId('section-title-verifications')).toBeInTheDocument();
      expect(screen.getByTestId('section-title-builder-activity')).toBeInTheDocument();
    });
  });
});
