/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import UsernameProfileSettingsOwnership from './index';

// Mock values to be controlled per test
let mockProfileEditorAddress: `0x${string}` | undefined =
  '0x1234567890abcdef1234567890abcdef12345678';

// Mock UsernameProfileContext
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileEditorAddress: mockProfileEditorAddress,
  }),
}));

// Mock WalletIdentity
jest.mock('apps/web/src/components/WalletIdentity', () => ({
  __esModule: true,
  default: ({ address }: { address: string }) => (
    <div data-testid="wallet-identity">{address}</div>
  ),
}));

// Mock UsernameProfileTransferOwnershipModal
const MockTransferOwnershipModal = jest.fn(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="transfer-modal">
        <button type="button" data-testid="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
);

jest.mock('apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal', () => ({
  __esModule: true,
  default: (props: { isOpen: boolean; onClose: () => void }) => MockTransferOwnershipModal(props),
}));

// Mock ProfileTransferOwnershipProvider
jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context',
  () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="transfer-provider">{children}</div>
    ),
  }),
);

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <fieldset data-testid="fieldset">{children}</fieldset>
  ),
}));

// Mock Label component
jest.mock('apps/web/src/components/Label', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="label">{children}</span>
  ),
}));

describe('UsernameProfileSettingsOwnership', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProfileEditorAddress = '0x1234567890abcdef1234567890abcdef12345678';
  });

  describe('rendering', () => {
    it('should render the section container', () => {
      const { container } = render(<UsernameProfileSettingsOwnership />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should render the Fieldset component', () => {
      render(<UsernameProfileSettingsOwnership />);

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });

    it('should render the Owner label', () => {
      render(<UsernameProfileSettingsOwnership />);

      expect(screen.getByTestId('label')).toBeInTheDocument();
      expect(screen.getByText('Owner')).toBeInTheDocument();
    });

    it('should render the Send name button', () => {
      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      expect(button).toBeInTheDocument();
    });

    it('should render the ProfileTransferOwnershipProvider', () => {
      render(<UsernameProfileSettingsOwnership />);

      expect(screen.getByTestId('transfer-provider')).toBeInTheDocument();
    });
  });

  describe('WalletIdentity display', () => {
    it('should display WalletIdentity when profileEditorAddress is defined', () => {
      mockProfileEditorAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileSettingsOwnership />);

      expect(screen.getByTestId('wallet-identity')).toBeInTheDocument();
      expect(
        screen.getByText('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'),
      ).toBeInTheDocument();
    });

    it('should not display WalletIdentity when profileEditorAddress is undefined', () => {
      mockProfileEditorAddress = undefined;

      render(<UsernameProfileSettingsOwnership />);

      expect(screen.queryByTestId('wallet-identity')).not.toBeInTheDocument();
    });

    it('should display different addresses correctly', () => {
      mockProfileEditorAddress = '0x9999999999999999999999999999999999999999';

      render(<UsernameProfileSettingsOwnership />);

      expect(
        screen.getByText('0x9999999999999999999999999999999999999999'),
      ).toBeInTheDocument();
    });
  });

  describe('modal interaction', () => {
    it('should not show modal initially', () => {
      render(<UsernameProfileSettingsOwnership />);

      expect(screen.queryByTestId('transfer-modal')).not.toBeInTheDocument();
    });

    it('should open modal when Send name button is clicked', () => {
      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      fireEvent.click(button);

      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', () => {
      render(<UsernameProfileSettingsOwnership />);

      // Open modal
      const sendButton = screen.getByRole('button', { name: 'Send name' });
      fireEvent.click(sendButton);
      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByTestId('close-modal');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('transfer-modal')).not.toBeInTheDocument();
    });

    it('should pass isOpen true to modal when opened', () => {
      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      fireEvent.click(button);

      // Modal should be visible (isOpen=true causes it to render)
      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();
    });

    it('should pass onClose callback to modal', () => {
      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      fireEvent.click(button);

      // The close button in mock modal calls onClose
      const closeButton = screen.getByTestId('close-modal');
      fireEvent.click(closeButton);

      // Modal should be closed
      expect(screen.queryByTestId('transfer-modal')).not.toBeInTheDocument();
    });
  });

  describe('button behavior', () => {
    it('should have type="button" attribute', () => {
      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should toggle modal state correctly on multiple clicks', () => {
      render(<UsernameProfileSettingsOwnership />);

      const sendButton = screen.getByRole('button', { name: 'Send name' });

      // First click - open
      fireEvent.click(sendButton);
      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();

      // Close
      fireEvent.click(screen.getByTestId('close-modal'));
      expect(screen.queryByTestId('transfer-modal')).not.toBeInTheDocument();

      // Second click - open again
      fireEvent.click(sendButton);
      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle zero address', () => {
      mockProfileEditorAddress = '0x0000000000000000000000000000000000000000';

      render(<UsernameProfileSettingsOwnership />);

      expect(screen.getByTestId('wallet-identity')).toBeInTheDocument();
      expect(
        screen.getByText('0x0000000000000000000000000000000000000000'),
      ).toBeInTheDocument();
    });

    it('should still render Send name button when no address', () => {
      mockProfileEditorAddress = undefined;

      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      expect(button).toBeInTheDocument();
    });

    it('should still allow opening modal when no address', () => {
      mockProfileEditorAddress = undefined;

      render(<UsernameProfileSettingsOwnership />);

      const button = screen.getByRole('button', { name: 'Send name' });
      fireEvent.click(button);

      expect(screen.getByTestId('transfer-modal')).toBeInTheDocument();
    });
  });
});
