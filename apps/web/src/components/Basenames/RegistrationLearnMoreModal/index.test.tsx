/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import RegistrationLearnMoreModal from './index';

// Mock usernames module before importing to avoid is-ipfs dependency issue
jest.mock('apps/web/src/utils/usernames', () => ({
  Discount: {
    CBID: 'CBID',
    CB1: 'CB1',
    COINBASE_VERIFIED_ACCOUNT: 'COINBASE_VERIFIED_ACCOUNT',
    BASE_BUILDATHON_PARTICIPANT: 'BASE_BUILDATHON_PARTICIPANT',
    SUMMER_PASS_LVL_3: 'SUMMER_PASS_LVL_3',
    BNS_NAME: 'BNS_NAME',
    BASE_DOT_ETH_NFT: 'BASE_DOT_ETH_NFT',
    DISCOUNT_CODE: 'DISCOUNT_CODE',
    TALENT_PROTOCOL: 'TALENT_PROTOCOL',
    BASE_WORLD: 'BASE_WORLD',
    DEVCON: 'DEVCON',
  },
}));

// Import Discount after mock is set up
const Discount = {
  CBID: 'CBID',
  CB1: 'CB1',
  COINBASE_VERIFIED_ACCOUNT: 'COINBASE_VERIFIED_ACCOUNT',
  BASE_BUILDATHON_PARTICIPANT: 'BASE_BUILDATHON_PARTICIPANT',
  SUMMER_PASS_LVL_3: 'SUMMER_PASS_LVL_3',
  BNS_NAME: 'BNS_NAME',
  BASE_DOT_ETH_NFT: 'BASE_DOT_ETH_NFT',
  DISCOUNT_CODE: 'DISCOUNT_CODE',
  TALENT_PROTOCOL: 'TALENT_PROTOCOL',
  BASE_WORLD: 'BASE_WORLD',
  DEVCON: 'DEVCON',
} as const;

type DiscountType = (typeof Discount)[keyof typeof Discount];

// Mock dependencies

// Mock RegistrationContext
let mockAllActiveDiscounts = new Set<DiscountType>();

jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  useRegistration: () => ({
    allActiveDiscounts: mockAllActiveDiscounts,
  }),
}));

// Mock Modal component
jest.mock('apps/web/src/components/Modal', () => {
  return function MockModal({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal" data-title={title}>
        <button type="button" data-testid="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    );
  };
});

// Mock Tooltip component
jest.mock('apps/web/src/components/Tooltip', () => {
  return function MockTooltip({
    content,
    children,
  }: {
    content: string;
    children: React.ReactNode;
  }) {
    return (
      <div data-testid="tooltip" data-content={content}>
        {children}
      </div>
    );
  };
});

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => {
  return function MockImageWithLoading({
    alt,
    imageClassName,
  }: {
    src: unknown;
    alt: string;
    width: number;
    height: number;
    wrapperClassName: string;
    imageClassName: string;
  }) {
    return <span data-testid="discount-icon" data-alt={alt} className={imageClassName} />;
  };
});

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    href,
    children,
    className,
    target,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
  }) {
    return (
      <a href={href} className={className} target={target} data-testid="link">
        {children}
      </a>
    );
  };
});

// Mock image imports
jest.mock('./images/base-buildathon-participant.svg', () => 'base-buildathon-participant.svg');
jest.mock('./images/summer-pass-lvl-3.svg', () => 'summer-pass-lvl-3.svg');
jest.mock('./images/cbid-verification.svg', () => 'cbid-verification.svg');
jest.mock('./images/bns.jpg', () => 'bns.jpg');
jest.mock('./images/base-nft.svg', () => 'base-nft.svg');
jest.mock('./images/devcon.png', () => 'devcon.png');
jest.mock('./images/coinbase-one-verification.svg', () => 'coinbase-one-verification.svg');
jest.mock('./images/coinbase-verification.svg', () => 'coinbase-verification.svg');
jest.mock('./images/base-around-the-world-nft.svg', () => 'base-around-the-world-nft.svg');

describe('RegistrationLearnMoreModal', () => {
  const mockToggleModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockAllActiveDiscounts = new Set<DiscountType>();
  });

  describe('when modal is closed', () => {
    it('should not render modal content when isOpen is false', () => {
      render(<RegistrationLearnMoreModal isOpen={false} toggleModal={mockToggleModal} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('when modal is open', () => {
    it('should render modal when isOpen is true', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('should pass empty title to Modal', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', '');
    });
  });

  describe('without active discounts', () => {
    beforeEach(() => {
      mockAllActiveDiscounts = new Set<DiscountType>();
    });

    it('should display "Register for free" heading when no discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByText('Register for free')).toBeInTheDocument();
    });

    it('should display message about receiving free name when no discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(
        screen.getByText(
          "You'll receive a name for free (5+ characters for 1 year) if your wallet has any of the following:",
        ),
      ).toBeInTheDocument();
    });

    it('should display smart wallet link when no discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const links = screen.getAllByTestId('link');
      const smartWalletLink = links.find((link) =>
        link.getAttribute('href')?.includes('smart-wallet'),
      );
      expect(smartWalletLink).toBeInTheDocument();
      expect(smartWalletLink).toHaveAttribute('href', 'http://wallet.coinbase.com/smart-wallet');
    });

    it('should display "Get a verification" link when no discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const links = screen.getAllByTestId('link');
      const verificationLink = links.find((link) =>
        link.getAttribute('href')?.includes('onchain-verify'),
      );
      expect(verificationLink).toBeInTheDocument();
      expect(verificationLink).toHaveAttribute('href', 'https://www.coinbase.com/onchain-verify');
    });

    it('should display "Don\'t have any of these?" text when no discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByText(/Don't have any of these\?/)).toBeInTheDocument();
    });
  });

  describe('with active discounts', () => {
    beforeEach(() => {
      mockAllActiveDiscounts = new Set<DiscountType>([Discount.COINBASE_VERIFIED_ACCOUNT]);
    });

    it('should display "You\'re getting a discounted name" heading when has discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByText("You're getting a discounted name")).toBeInTheDocument();
    });

    it('should display message about receiving free name because of wallet when has discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(
        screen.getByText(
          "You're receiving your name for free (5+ characters for 1 year) because your wallet has one of the following:",
        ),
      ).toBeInTheDocument();
    });

    it('should not display smart wallet link when has discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const links = screen.queryAllByTestId('link');
      const smartWalletLink = links.find((link) =>
        link.getAttribute('href')?.includes('smart-wallet'),
      );
      expect(smartWalletLink).toBeUndefined();
    });

    it('should not display "Don\'t have any of these?" section when has discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.queryByText(/Don't have any of these\?/)).not.toBeInTheDocument();
    });

    it('should display "Qualified" badge for active discount', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      expect(screen.getByText('Qualified')).toBeInTheDocument();
    });
  });

  describe('discount items list', () => {
    it('should render all discount items', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      // Check for all discount labels
      expect(screen.getByText('Coinbase verification')).toBeInTheDocument();
      expect(screen.getByText('Coinbase One verification')).toBeInTheDocument();
      expect(screen.getByText('A cb.id username')).toBeInTheDocument();
      expect(screen.getByText('Base buildathon participant')).toBeInTheDocument();
      expect(screen.getByText('Summer Pass Level 3')).toBeInTheDocument();
      expect(screen.getByText('BNS username')).toBeInTheDocument();
      expect(screen.getByText('Base.eth NFT')).toBeInTheDocument();
      expect(screen.getByText('Base around the world NFT')).toBeInTheDocument();
      expect(screen.getByText('Devcon attendance NFT')).toBeInTheDocument();
    });

    it('should render 9 discount icons', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const icons = screen.getAllByTestId('discount-icon');
      expect(icons).toHaveLength(9);
    });

    it('should render 9 tooltips for discount items', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const tooltips = screen.getAllByTestId('tooltip');
      expect(tooltips).toHaveLength(9);
    });

    it('should display correct tooltip content for Coinbase verification', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const tooltips = screen.getAllByTestId('tooltip');
      const coinbaseTooltip = tooltips.find(
        (tooltip) =>
          tooltip.getAttribute('data-content') ===
          'Verifies you have a valid trading account on Coinbase',
      );
      expect(coinbaseTooltip).toBeInTheDocument();
    });

    it('should display correct tooltip content for cb.id', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const tooltips = screen.getAllByTestId('tooltip');
      const cbidTooltip = tooltips.find(
        (tooltip) =>
          tooltip.getAttribute('data-content') ===
          'cb.id must have been claimed prior to August 9, 2024.',
      );
      expect(cbidTooltip).toBeInTheDocument();
    });
  });

  describe('opacity styling for non-qualified discounts', () => {
    beforeEach(() => {
      mockAllActiveDiscounts = new Set<DiscountType>([Discount.CB1]);
    });

    it('should apply opacity class to non-qualified discount items when user has other discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const icons = screen.getAllByTestId('discount-icon');
      // Some icons should have opacity-40 class (non-qualified ones)
      const opacityIcons = icons.filter((icon) => icon.className.includes('opacity-40'));
      // All but one should have opacity (since only CB1 is active)
      expect(opacityIcons.length).toBe(8);
    });

    it('should not apply opacity class to qualified discount items', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const icons = screen.getAllByTestId('discount-icon');
      const nonOpacityIcons = icons.filter((icon) => !icon.className.includes('opacity-40'));
      // Only one should not have opacity (CB1 is active)
      expect(nonOpacityIcons.length).toBe(1);
    });
  });

  describe('with multiple active discounts', () => {
    beforeEach(() => {
      mockAllActiveDiscounts = new Set<DiscountType>([
        Discount.COINBASE_VERIFIED_ACCOUNT,
        Discount.CB1,
        Discount.BNS_NAME,
      ]);
    });

    it('should display multiple "Qualified" badges when user has multiple discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const qualifiedBadges = screen.getAllByText('Qualified');
      expect(qualifiedBadges).toHaveLength(3);
    });

    it('should apply opacity to non-qualified discounts when user has multiple discounts', () => {
      render(<RegistrationLearnMoreModal isOpen toggleModal={mockToggleModal} />);

      const icons = screen.getAllByTestId('discount-icon');
      const opacityIcons = icons.filter((icon) => icon.className.includes('opacity-40'));
      // 9 total - 3 active = 6 with opacity
      expect(opacityIcons.length).toBe(6);
    });
  });
});
