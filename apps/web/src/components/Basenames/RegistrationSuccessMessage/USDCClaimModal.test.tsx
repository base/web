/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import USDCClaimModal from './USDCClaimModal';

// Mock the Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button type="button" onClick={onClick} className={className} data-testid="learn-more-button">
      {children}
    </button>
  ),
  ButtonVariants: {
    SecondaryDarkBounce: 'secondaryDarkBounce',
  },
}));

describe('USDCClaimModal', () => {
  const mockOnClose = jest.fn();
  const mockWindowOpen = jest.fn();
  const originalWindowOpen = window.open;

  beforeEach(() => {
    jest.clearAllMocks();
    window.open = mockWindowOpen;
  });

  afterAll(() => {
    window.open = originalWindowOpen;
  });

  describe('rendering', () => {
    it('should render the modal with the provided message', () => {
      const testMessage = 'USDC is being sent to your wallet';
      render(<USDCClaimModal message={testMessage} onClose={mockOnClose} />);

      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('should render a close button', () => {
      render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: '×' });
      expect(closeButton).toBeInTheDocument();
    });

    it('should render the "Learn more" button', () => {
      render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      expect(screen.getByTestId('learn-more-button')).toBeInTheDocument();
      expect(screen.getByText('Learn more')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onClose when the close button is clicked', () => {
      render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: '×' });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should open Coinbase USDC page in a new tab when "Learn more" is clicked', () => {
      render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      fireEvent.click(screen.getByTestId('learn-more-button'));

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://www.coinbase.com/usdc',
        '_blank',
        'noopener noreferrer',
      );
    });

    it('should not call onClose when "Learn more" is clicked', () => {
      render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      fireEvent.click(screen.getByTestId('learn-more-button'));

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('should apply fixed positioning classes to the modal overlay', () => {
      const { container } = render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      const overlay = container.firstChild;
      expect(overlay).toHaveClass('fixed', 'top-0', 'left-0', 'w-full', 'h-full');
    });

    it('should center the modal content', () => {
      const { container } = render(<USDCClaimModal message="Test message" onClose={mockOnClose} />);

      const overlay = container.firstChild;
      expect(overlay).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('different messages', () => {
    it('should display success message', () => {
      render(<USDCClaimModal message="USDC claimed successfully!" onClose={mockOnClose} />);

      expect(screen.getByText('USDC claimed successfully!')).toBeInTheDocument();
    });

    it('should display error message', () => {
      render(<USDCClaimModal message="Failed to claim USDC" onClose={mockOnClose} />);

      expect(screen.getByText('Failed to claim USDC')).toBeInTheDocument();
    });

    it('should display loading message', () => {
      render(<USDCClaimModal message="USDC is being sent to your wallet" onClose={mockOnClose} />);

      expect(screen.getByText('USDC is being sent to your wallet')).toBeInTheDocument();
    });
  });
});
