/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePromo from './index';

// Mock useLocalStorage hook
const mockSetShouldShowPromo = jest.fn();
const mockSetHasClickedGetBasename = jest.fn();
const mockSetHasClosedPromo = jest.fn();

let mockShouldShowPromo = true;
let mockHasClickedGetBasename = false;
let mockHasClosedPromo = false;

jest.mock('usehooks-ts', () => ({
  useLocalStorage: (key: string) => {
    if (key === 'shouldShowPromo') {
      return [mockShouldShowPromo, mockSetShouldShowPromo];
    }
    if (key === 'hasClickedGetBasename') {
      return [mockHasClickedGetBasename, mockSetHasClickedGetBasename];
    }
    if (key === 'hasClosedPromo') {
      return [mockHasClosedPromo, mockSetHasClosedPromo];
    }
    return [undefined, jest.fn()];
  },
}));

// Mock wagmi useAccount
const mockAddress = '0x1234567890123456789012345678901234567890';
let mockUseAccountReturn: { address: string | undefined } = { address: undefined };

jest.mock('wagmi', () => ({
  useAccount: () => mockUseAccountReturn,
}));

// Mock useBaseEnsName
const mockUseBaseEnsNameReturn = { data: undefined, isLoading: false };
jest.mock('apps/web/src/hooks/useBaseEnsName', () => ({
  __esModule: true,
  default: () => mockUseBaseEnsNameReturn,
}));

// Mock useAnalytics
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="globe-image" src={src} alt={alt} className={className} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <a href={href} onClick={onClick} data-testid="basename-link">
      {children}
    </a>
  ),
}));

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="cta-button" type="button">
      {children}
    </button>
  ),
}));

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe('ProfilePromo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset state to default showing state
    mockShouldShowPromo = true;
    mockHasClickedGetBasename = false;
    mockHasClosedPromo = false;
    mockUseAccountReturn = { address: undefined };
    Object.assign(mockUseBaseEnsNameReturn, { data: undefined, isLoading: false });
  });

  describe('visibility conditions', () => {
    it('should render when shouldShowPromo is true and user has not clicked or closed', () => {
      render(<ProfilePromo />);

      expect(screen.getByText('Basenames are here!')).toBeInTheDocument();
    });

    it('should not render when shouldShowPromo is false', () => {
      mockShouldShowPromo = false;

      render(<ProfilePromo />);

      expect(screen.queryByText('Basenames are here!')).not.toBeInTheDocument();
    });

    it('should not render when hasClickedGetBasename is true', () => {
      mockHasClickedGetBasename = true;

      render(<ProfilePromo />);

      expect(screen.queryByText('Basenames are here!')).not.toBeInTheDocument();
    });

    it('should not render when hasClosedPromo is true', () => {
      mockHasClosedPromo = true;

      render(<ProfilePromo />);

      expect(screen.queryByText('Basenames are here!')).not.toBeInTheDocument();
    });

    it('should not render when all hide conditions are true', () => {
      mockShouldShowPromo = false;
      mockHasClickedGetBasename = true;
      mockHasClosedPromo = true;

      render(<ProfilePromo />);

      expect(screen.queryByText('Basenames are here!')).not.toBeInTheDocument();
    });
  });

  describe('content rendering', () => {
    it('should render the heading text', () => {
      render(<ProfilePromo />);

      expect(screen.getByText('Basenames are here!')).toBeInTheDocument();
    });

    it('should render the description text', () => {
      render(<ProfilePromo />);

      expect(
        screen.getByText(
          'Get a Basename and make it easier to connect, collaborate, and contribute onchain.',
        ),
      ).toBeInTheDocument();
    });

    it('should render the CTA button text', () => {
      render(<ProfilePromo />);

      expect(screen.getByText('Get a Basename')).toBeInTheDocument();
    });

    it('should render the globe image', () => {
      render(<ProfilePromo />);

      const globeImage = screen.getByTestId('globe-image');
      expect(globeImage).toBeInTheDocument();
      expect(globeImage).toHaveAttribute('alt', 'Globe');
    });

    it('should render the close icon', () => {
      render(<ProfilePromo />);

      expect(screen.getByTestId('icon-close')).toBeInTheDocument();
    });
  });

  describe('close button interaction', () => {
    it('should call logEventWithContext when close button is clicked', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      fireEvent.click(closeButton);

      expect(mockLogEventWithContext).toHaveBeenCalledWith('profile_promo_close', 'click', {
        componentType: 'button',
      });
    });

    it('should call setShouldShowPromo with false when close button is clicked', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      fireEvent.click(closeButton);

      expect(mockSetShouldShowPromo).toHaveBeenCalledWith(false);
    });

    it('should call setHasClosedPromo with true when close button is clicked', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      fireEvent.click(closeButton);

      expect(mockSetHasClosedPromo).toHaveBeenCalledWith(true);
    });

    it('should handle keydown event on close button', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      fireEvent.keyDown(closeButton);

      expect(mockLogEventWithContext).toHaveBeenCalledWith('profile_promo_close', 'click', {
        componentType: 'button',
      });
      expect(mockSetShouldShowPromo).toHaveBeenCalledWith(false);
    });
  });

  describe('CTA button interaction', () => {
    it('should call logEventWithContext when CTA link is clicked', () => {
      render(<ProfilePromo />);

      const ctaLink = screen.getByTestId('basename-link');
      fireEvent.click(ctaLink);

      expect(mockLogEventWithContext).toHaveBeenCalledWith('profile_promo_cta', 'click', {
        componentType: 'button',
      });
    });

    it('should call setShouldShowPromo with false when CTA is clicked', () => {
      render(<ProfilePromo />);

      const ctaLink = screen.getByTestId('basename-link');
      fireEvent.click(ctaLink);

      expect(mockSetShouldShowPromo).toHaveBeenCalledWith(false);
    });

    it('should call setHasClickedGetBasename with true when CTA is clicked', () => {
      render(<ProfilePromo />);

      const ctaLink = screen.getByTestId('basename-link');
      fireEvent.click(ctaLink);

      expect(mockSetHasClickedGetBasename).toHaveBeenCalledWith(true);
    });

    it('should have correct href on CTA link', () => {
      render(<ProfilePromo />);

      const ctaLink = screen.getByTestId('basename-link');
      expect(ctaLink).toHaveAttribute('href', '/names');
    });
  });

  describe('existing basename behavior', () => {
    it('should hide promo when user has existing basename', () => {
      mockUseAccountReturn = { address: mockAddress };
      Object.assign(mockUseBaseEnsNameReturn, { data: 'user.base.eth', isLoading: false });

      render(<ProfilePromo />);

      // The useEffect should call setShouldShowPromo(false)
      expect(mockSetShouldShowPromo).toHaveBeenCalledWith(false);
    });

    it('should not hide promo when basename is loading', () => {
      mockUseAccountReturn = { address: mockAddress };
      Object.assign(mockUseBaseEnsNameReturn, { data: undefined, isLoading: true });

      render(<ProfilePromo />);

      // Should still show the promo while loading
      expect(screen.getByText('Basenames are here!')).toBeInTheDocument();
    });

    it('should not hide promo when user has no address', () => {
      mockUseAccountReturn = { address: undefined };
      Object.assign(mockUseBaseEnsNameReturn, { data: undefined, isLoading: false });

      render(<ProfilePromo />);

      // Should still show the promo
      expect(screen.getByText('Basenames are here!')).toBeInTheDocument();
    });

    it('should not hide promo when address exists but no basename', () => {
      mockUseAccountReturn = { address: mockAddress };
      Object.assign(mockUseBaseEnsNameReturn, { data: undefined, isLoading: false });

      render(<ProfilePromo />);

      // Should still show the promo
      expect(screen.getByText('Basenames are here!')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have fixed positioning', () => {
      render(<ProfilePromo />);

      const container = document.querySelector('.fixed');
      expect(container).toBeInTheDocument();
    });

    it('should be positioned at bottom-right', () => {
      render(<ProfilePromo />);

      const container = document.querySelector('.bottom-4.right-4');
      expect(container).toBeInTheDocument();
    });

    it('should have rounded corners', () => {
      render(<ProfilePromo />);

      const container = document.querySelector('[class*="rounded-"]');
      expect(container).toBeInTheDocument();
    });

    it('should have flex layout with gap', () => {
      render(<ProfilePromo />);

      const container = document.querySelector('.flex.flex-col.gap-4');
      expect(container).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible close button with aria-label', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('should have tabIndex on close button', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      expect(closeButton).toHaveAttribute('tabIndex', '0');
    });

    it('should have button type on close button', () => {
      render(<ProfilePromo />);

      const closeButton = screen.getByLabelText('Close promo');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });
});
