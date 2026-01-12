/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Badge, BadgeImage, BadgeModal, BADGE_INFO, BadgeNames } from './index';
import { BadgeContext, BadgeContextProps } from '../BadgeContext';

// Mock image imports
jest.mock('./images/verifiedIdentity.webp', () => ({ src: '/verified-identity.webp' }));
jest.mock('./images/verifiedCountry.webp', () => ({ src: '/verified-country.webp' }));
jest.mock('./images/verifiedCoinbaseOne.webp', () => ({ src: '/verified-coinbase-one.webp' }));
jest.mock('./images/baseBuilder.webp', () => ({ src: '/base-builder.webp' }));
jest.mock('./images/baseGrantee.webp', () => ({ src: '/base-grantee.webp' }));
jest.mock('./images/baseInitiate.webp', () => ({ src: '/base-initiate.webp' }));
jest.mock('./images/baseLearnNewcomer.webp', () => ({ src: '/base-learn-newcomer.webp' }));
jest.mock('./images/buildathonParticipant.webp', () => ({ src: '/buildathon-participant.webp' }));
jest.mock('./images/buildathonWinner.webp', () => ({ src: '/buildathon-winner.webp' }));
jest.mock('./images/talentScore.webp', () => ({ src: '/talent-score.webp' }));

jest.mock('./images/verifiedIdentityGray.webp', () => ({ src: '/verified-identity-gray.webp' }));
jest.mock('./images/verifiedCountryGray.webp', () => ({ src: '/verified-country-gray.webp' }));
jest.mock('./images/verifiedCoinbaseOneGray.webp', () => ({
  src: '/verified-coinbase-one-gray.webp',
}));
jest.mock('./images/baseBuilderGray.webp', () => ({ src: '/base-builder-gray.webp' }));
jest.mock('./images/baseGranteeGray.webp', () => ({ src: '/base-grantee-gray.webp' }));
jest.mock('./images/baseInitiateGray.webp', () => ({ src: '/base-initiate-gray.webp' }));
jest.mock('./images/baseLearnNewcomerGray.webp', () => ({ src: '/base-learn-newcomer-gray.webp' }));
jest.mock('./images/buildathonParticipantGray.webp', () => ({
  src: '/buildathon-participant-gray.webp',
}));
jest.mock('./images/buildathonWinnerGray.webp', () => ({ src: '/buildathon-winner-gray.webp' }));
jest.mock('./images/talentScoreGray.webp', () => ({ src: '/talent-score-gray.webp' }));

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => ({
  __esModule: true,
  default: function MockImageWithLoading({
    alt,
    height,
    width,
  }: {
    alt: string;
    height: number;
    width: number;
  }) {
    return (
      <span data-alt={alt} data-height={height} data-width={width} data-testid="badge-image" />
    );
  },
}));

// Mock Modal component
jest.mock('apps/web/src/components/Modal', () => ({
  __esModule: true,
  default: function MockModal({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal" role="dialog">
        <button type="button" onClick={onClose} data-testid="modal-close">
          Close
        </button>
        {children}
      </div>
    );
  },
}));

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({ children }: { children: React.ReactNode }) {
    return <button type="button">{children}</button>;
  },
  ButtonVariants: {
    Black: 'black',
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({
    children,
    href,
    target,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
  }) {
    return (
      <a href={href} target={target} data-testid="badge-cta-link">
        {children}
      </a>
    );
  },
}));

// Helper to create a mock context provider
function createMockBadgeContext(overrides: Partial<BadgeContextProps> = {}): BadgeContextProps {
  return {
    modalOpen: false,
    selectedClaim: undefined,
    setSelectedClaim: jest.fn(),
    closeModal: jest.fn(),
    selectBadge: jest.fn(),
    ...overrides,
  };
}

function renderWithBadgeContext(
  ui: React.ReactElement,
  contextValue: BadgeContextProps = createMockBadgeContext(),
) {
  return render(<BadgeContext.Provider value={contextValue}>{ui}</BadgeContext.Provider>);
}

describe('Badges/index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BADGE_INFO', () => {
    it('should have entries for all badge types', () => {
      const expectedBadges: BadgeNames[] = [
        'VERIFIED_IDENTITY',
        'VERIFIED_COUNTRY',
        'VERIFIED_COINBASE_ONE',
        'BASE_BUILDER',
        'BASE_GRANTEE',
        'BASE_INITIATE',
        'BASE_LEARN_NEWCOMER',
        'BUILDATHON_PARTICIPANT',
        'BUILDATHON_WINNER',
        'TALENT_SCORE',
      ];

      expectedBadges.forEach((badge) => {
        expect(BADGE_INFO[badge]).toBeDefined();
        expect(BADGE_INFO[badge].name).toBeTruthy();
        expect(BADGE_INFO[badge].title).toBeTruthy();
        expect(BADGE_INFO[badge].description).toBeTruthy();
        expect(BADGE_INFO[badge].cta).toBeTruthy();
        expect(BADGE_INFO[badge].ctaLink).toBeTruthy();
        expect(BADGE_INFO[badge].image).toBeDefined();
        expect(BADGE_INFO[badge].grayImage).toBeDefined();
      });
    });

    it('should have valid CTA links', () => {
      Object.values(BADGE_INFO).forEach((info) => {
        expect(info.ctaLink).toMatch(/^https:\/\//);
      });
    });
  });

  describe('BadgeImage', () => {
    it('should render the image with correct props', () => {
      renderWithBadgeContext(
        <BadgeImage badge="VERIFIED_IDENTITY" claimed size={120} name="Coinbase Verified ID" />,
      );

      const image = screen.getByTestId('badge-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('data-alt', 'Coinbase Verified ID');
      expect(image).toHaveAttribute('data-height', '120');
      expect(image).toHaveAttribute('data-width', '120');
    });

    it('should not show talent score when badge is not TALENT_SCORE', () => {
      renderWithBadgeContext(
        <BadgeImage
          badge="VERIFIED_IDENTITY"
          claimed
          score={85}
          size={120}
          name="Coinbase Verified ID"
        />,
      );

      expect(screen.queryByText('85')).not.toBeInTheDocument();
    });

    it('should show talent score when badge is TALENT_SCORE and claimed with score', () => {
      renderWithBadgeContext(
        <BadgeImage badge="TALENT_SCORE" claimed score={85} size={120} name="Talent Score" />,
      );

      expect(screen.getByText('85')).toBeInTheDocument();
    });

    it('should not show talent score when TALENT_SCORE is not claimed', () => {
      renderWithBadgeContext(
        <BadgeImage
          badge="TALENT_SCORE"
          claimed={false}
          score={85}
          size={120}
          name="Talent Score"
        />,
      );

      expect(screen.queryByText('85')).not.toBeInTheDocument();
    });

    it('should not show talent score when TALENT_SCORE has no score', () => {
      renderWithBadgeContext(
        <BadgeImage badge="TALENT_SCORE" claimed size={120} name="Talent Score" />,
      );

      // No score span should be visible
      const scoreSpans = screen
        .queryAllByText(/^\d+$/)
        .filter((el) => el.classList.contains('absolute'));
      expect(scoreSpans).toHaveLength(0);
    });
  });

  describe('Badge', () => {
    it('should render the badge with name', () => {
      renderWithBadgeContext(<Badge badge="VERIFIED_IDENTITY" claimed />);

      expect(screen.getByText('Coinbase Verified ID')).toBeInTheDocument();
    });

    it('should call selectBadge when clicked', () => {
      const selectBadge = jest.fn();
      const contextValue = createMockBadgeContext({ selectBadge });

      renderWithBadgeContext(<Badge badge="VERIFIED_IDENTITY" claimed />, contextValue);

      const button = screen.getByRole('button', { name: /see details for coinbase verified id/i });
      fireEvent.click(button);

      expect(selectBadge).toHaveBeenCalledTimes(1);
      expect(selectBadge).toHaveBeenCalledWith({
        badge: 'VERIFIED_IDENTITY',
        claimed: true,
        score: undefined,
      });
    });

    it('should call selectBadge on keyDown', () => {
      const selectBadge = jest.fn();
      const contextValue = createMockBadgeContext({ selectBadge });

      renderWithBadgeContext(<Badge badge="BASE_BUILDER" claimed={false} />, contextValue);

      const button = screen.getByRole('button', { name: /see details for based builder/i });
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(selectBadge).toHaveBeenCalledTimes(1);
      expect(selectBadge).toHaveBeenCalledWith({
        badge: 'BASE_BUILDER',
        claimed: false,
        score: undefined,
      });
    });

    it('should pass score to selectBadge when provided', () => {
      const selectBadge = jest.fn();
      const contextValue = createMockBadgeContext({ selectBadge });

      renderWithBadgeContext(<Badge badge="TALENT_SCORE" claimed score={90} />, contextValue);

      const button = screen.getByRole('button', { name: /see details for builder score/i });
      fireEvent.click(button);

      expect(selectBadge).toHaveBeenCalledWith({
        badge: 'TALENT_SCORE',
        claimed: true,
        score: 90,
      });
    });

    it('should use default size of 120 when not provided', () => {
      renderWithBadgeContext(<Badge badge="VERIFIED_IDENTITY" claimed />);

      const image = screen.getByTestId('badge-image');
      expect(image).toHaveAttribute('data-height', '120');
      expect(image).toHaveAttribute('data-width', '120');
    });

    it('should use custom size when provided', () => {
      renderWithBadgeContext(<Badge badge="VERIFIED_IDENTITY" claimed size={80} />);

      const image = screen.getByTestId('badge-image');
      expect(image).toHaveAttribute('data-height', '80');
      expect(image).toHaveAttribute('data-width', '80');
    });

    it('should have correct accessibility attributes', () => {
      renderWithBadgeContext(<Badge badge="VERIFIED_IDENTITY" claimed />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'See details for Coinbase Verified ID');
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('BadgeModal', () => {
    it('should return null when modal is not open', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: false,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
      });

      const { container } = renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(container.firstChild).toBeNull();
    });

    it('should return null when selectedClaim is undefined', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: undefined,
      });

      const { container } = renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(container.firstChild).toBeNull();
    });

    it('should render modal when open with selectedClaim', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Coinbase Verified ID')).toBeInTheDocument();
      expect(
        screen.getByText(
          "You've got a Coinbase account and you verified your ID. Thanks for being legit!",
        ),
      ).toBeInTheDocument();
    });

    it('should display claimed status', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByText(/status: claimed/i)).toBeInTheDocument();
    });

    it('should display unclaimed status', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: false },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByText(/status: unclaimed/i)).toBeInTheDocument();
    });

    it('should render CTA link with correct href', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      const link = screen.getByTestId('badge-cta-link');
      expect(link).toHaveAttribute('href', 'https://coinbase.com/onchain-verify');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should render CTA button text', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByText('Get verified')).toBeInTheDocument();
    });

    it('should call closeModal when modal close is triggered', () => {
      const closeModal = jest.fn();
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'VERIFIED_IDENTITY', claimed: true },
        closeModal,
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should render different badge information correctly', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'BASE_BUILDER', claimed: true },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByText('Based Builder')).toBeInTheDocument();
      expect(
        screen.getByText("You've deployed 5 or more smart contracts on Base. Impressive!"),
      ).toBeInTheDocument();
      expect(screen.getByText('Deploy a smart contract')).toBeInTheDocument();
    });

    it('should pass score to BadgeImage for TALENT_SCORE', () => {
      const contextValue = createMockBadgeContext({
        modalOpen: true,
        selectedClaim: { badge: 'TALENT_SCORE', claimed: true, score: 75 },
      });

      renderWithBadgeContext(<BadgeModal />, contextValue);

      expect(screen.getByText('75')).toBeInTheDocument();
    });
  });
});
