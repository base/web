/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';

// Mock the usernames module to avoid is-ipfs dependency issue
jest.mock('apps/web/src/utils/usernames', () => ({
  getTokenIdFromBasename: jest.fn(),
  formatBaseEthDomain: jest.fn(),
  normalizeEnsDomainName: jest.fn((name: string) => name),
  REGISTER_CONTRACT_ABI: [],
  REGISTER_CONTRACT_ADDRESSES: {},
}));

// Mock useErrors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useBasenameChain hook
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453, name: 'Base' },
  }),
}));

// Mock wagmi useAccount
let mockAddress: `0x${string}` | undefined = '0x1234567890123456789012345678901234567890';
jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockAddress,
  }),
}));

// Mock UsernameProfileContext
const mockProfileRefetch = jest.fn().mockResolvedValue(undefined);
const mockSetShowProfileSettings = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileRefetch: mockProfileRefetch,
    setShowProfileSettings: mockSetShowProfileSettings,
    profileUsername: 'testname.base.eth',
  }),
}));

// Define the type for ownership settings
type MockOwnershipSetting = {
  id: string;
  name: string;
  description: string;
  status: string;
  contractFunction: jest.Mock;
};

// Mock ProfileTransferOwnership context values
let mockContextValues = {
  isSuccess: false,
  currentOwnershipStep: 'search' as string,
  setCurrentOwnershipStep: jest.fn(),
  recipientAddress: '',
  setRecipientAddress: jest.fn(),
  ownershipSettings: [] as MockOwnershipSetting[],
  batchTransactionsEnabled: false,
  ownershipTransactionHash: undefined as `0x${string}` | undefined,
};

jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context',
  () => ({
    __esModule: true,
    OwnershipSteps: {
      Search: 'search',
      OwnershipOverview: 'ownership-overview',
      WalletRequests: 'wallet-requests',
      Success: 'success',
    },
    useProfileTransferOwnership: () => mockContextValues,
  }),
);

// Mock Modal component
function MockModal({
  isOpen,
  onClose,
  title,
  onBack,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div data-testid="modal" data-title={title}>
      <button type="button" data-testid="modal-close" onClick={onClose}>
        Close
      </button>
      {onBack && (
        <button type="button" data-testid="modal-back" onClick={onBack}>
          Back
        </button>
      )}
      <div data-testid="modal-content">{children}</div>
    </div>
  );
}

jest.mock('apps/web/src/components/Modal', () => MockModal);

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} data-testid="action-button">
        {children}
      </button>
    );
  },
  ButtonVariants: {
    Black: 'black',
  },
}));

// Mock SearchAddressInput
function MockSearchAddressInput({ onChange }: { onChange: (value: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      data-testid="search-address-input"
      onChange={handleChange}
      placeholder="Enter address"
    />
  );
}

jest.mock('apps/web/src/components/SearchAddressInput', () => ({
  __esModule: true,
  default: MockSearchAddressInput,
}));

// Mock BasenameIdentity
jest.mock('apps/web/src/components/BasenameIdentity', () => ({
  __esModule: true,
  default: function MockBasenameIdentity({ username }: { username: string }) {
    return <div data-testid="basename-identity">{username}</div>;
  },
}));

// Mock WalletIdentity
jest.mock('apps/web/src/components/WalletIdentity', () => ({
  __esModule: true,
  default: function MockWalletIdentity({ address }: { address: string }) {
    return <div data-testid="wallet-identity">{address}</div>;
  },
}));

// Mock Icon
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`} />;
  },
}));

// Mock OwnershipTransactionState
jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/OwnershipTransactionState',
  () => ({
    OwnershipTransactionState: function MockOwnershipTransactionState({
      ownershipSetting,
    }: {
      ownershipSetting: { id: string; name: string };
    }) {
      return <div data-testid={`ownership-tx-${ownershipSetting.id}`}>{ownershipSetting.name}</div>;
    },
  }),
);

// Mock TransactionLink
jest.mock('apps/web/src/components/TransactionLink', () => ({
  __esModule: true,
  default: function MockTransactionLink({
    transactionHash,
    chainId,
  }: {
    transactionHash: string;
    chainId: number;
  }) {
    return (
      <a data-testid="transaction-link" href={`https://basescan.org/tx/${transactionHash}`}>
        View on BaseScan (Chain: {chainId})
      </a>
    );
  },
}));

// Import after mocks
import UsernameProfileTransferOwnershipModal from './index';

describe('UsernameProfileTransferOwnershipModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddress = '0x1234567890123456789012345678901234567890';
    mockContextValues = {
      isSuccess: false,
      currentOwnershipStep: 'search',
      setCurrentOwnershipStep: jest.fn(),
      recipientAddress: '',
      setRecipientAddress: jest.fn(),
      ownershipSettings: [],
      batchTransactionsEnabled: false,
      ownershipTransactionHash: undefined,
    };
  });

  describe('when modal is closed', () => {
    it('should not render modal content when isOpen is false', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Search step (initial)', () => {
    it('should render modal when isOpen is true', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('should display "Send name" title in search step', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', 'Send name');
    });

    it('should display instruction text', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(
        screen.getByText('Enter the ETH address or name you want to send your name to.'),
      ).toBeInTheDocument();
    });

    it('should render SearchAddressInput', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('search-address-input')).toBeInTheDocument();
    });

    it('should render Continue button', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('should disable Continue button when no valid address is entered', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeDisabled();
    });

    it('should enable Continue button when valid address is entered', () => {
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      expect(continueButton).not.toBeDisabled();
    });

    it('should call setRecipientAddress when input changes', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const input = screen.getByTestId('search-address-input');
      fireEvent.change(input, {
        target: { value: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' },
      });

      expect(mockContextValues.setRecipientAddress).toHaveBeenCalledWith(
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      );
    });

    it('should navigate to OwnershipOverview when Continue is clicked with valid address', () => {
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(mockContextValues.setCurrentOwnershipStep).toHaveBeenCalledWith('ownership-overview');
    });
  });

  describe('OwnershipOverview step', () => {
    beforeEach(() => {
      mockContextValues.currentOwnershipStep = 'ownership-overview';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
      mockContextValues.ownershipSettings = [
        {
          id: 'setAddr',
          name: 'Address record',
          description: 'Your Basename will resolve to this address.',
          status: WriteTransactionWithReceiptStatus.Idle,
          contractFunction: jest.fn(),
        },
        {
          id: 'reclaim',
          name: 'Profile editing',
          description: 'Transfer editing rights to this address.',
          status: WriteTransactionWithReceiptStatus.Idle,
          contractFunction: jest.fn(),
        },
      ];
    });

    it('should display "You\'ll be sending" title', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', "You'll be sending");
    });

    it('should show back button', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal-back')).toBeInTheDocument();
    });

    it('should display BasenameIdentity with profile username', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('basename-identity')).toBeInTheDocument();
      expect(screen.getByText('testname.base.eth')).toBeInTheDocument();
    });

    it('should display "To" heading', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByText('To')).toBeInTheDocument();
    });

    it('should display WalletIdentity with recipient address', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('wallet-identity')).toBeInTheDocument();
      expect(
        screen.getByText('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'),
      ).toBeInTheDocument();
    });

    it('should display "What you\'ll send" heading', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByText("What you'll send")).toBeInTheDocument();
    });

    it('should display ownership settings list', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByText('Address record')).toBeInTheDocument();
      expect(screen.getByText('Your Basename will resolve to this address.')).toBeInTheDocument();
      expect(screen.getByText('Profile editing')).toBeInTheDocument();
      expect(screen.getByText('Transfer editing rights to this address.')).toBeInTheDocument();
    });

    it('should display Continue button', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeInTheDocument();
    });

    it('should navigate back to Search step when back is clicked', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const backButton = screen.getByTestId('modal-back');
      fireEvent.click(backButton);

      expect(mockContextValues.setCurrentOwnershipStep).toHaveBeenCalledWith('search');
    });

    it('should navigate to WalletRequests when Continue is clicked with valid address and connected wallet', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(mockContextValues.setCurrentOwnershipStep).toHaveBeenCalledWith('wallet-requests');
    });

    it('should not navigate to WalletRequests when address is not connected', () => {
      mockAddress = undefined;

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(mockContextValues.setCurrentOwnershipStep).not.toHaveBeenCalledWith('wallet-requests');
    });

    it('should not display WalletIdentity when recipient address is invalid', () => {
      mockContextValues.recipientAddress = 'invalid-address';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('wallet-identity')).not.toBeInTheDocument();
    });
  });

  describe('WalletRequests step', () => {
    beforeEach(() => {
      mockContextValues.currentOwnershipStep = 'wallet-requests';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
      mockContextValues.ownershipSettings = [
        {
          id: 'setAddr',
          name: 'Address record',
          description: 'Your Basename will resolve to this address.',
          status: WriteTransactionWithReceiptStatus.Idle,
          contractFunction: jest.fn(),
        },
        {
          id: 'reclaim',
          name: 'Profile editing',
          description: 'Transfer editing rights to this address.',
          status: WriteTransactionWithReceiptStatus.Idle,
          contractFunction: jest.fn(),
        },
      ];
    });

    it('should display "Confirm transactions" title', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', 'Confirm transactions');
    });

    it('should display instruction text for non-batch transactions', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(
        screen.getByText(
          'You will need to confirm all four transactions in your wallet to send this name.',
        ),
      ).toBeInTheDocument();
    });

    it('should display instruction text for batch transactions', () => {
      mockContextValues.batchTransactionsEnabled = true;

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(
        screen.getByText('Confirm the transaction in your wallet to send this name.'),
      ).toBeInTheDocument();
    });

    it('should display OwnershipTransactionState for each ownership setting', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('ownership-tx-setAddr')).toBeInTheDocument();
      expect(screen.getByTestId('ownership-tx-reclaim')).toBeInTheDocument();
    });

    it('should not show back button in WalletRequests step', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('modal-back')).not.toBeInTheDocument();
    });
  });

  describe('Success step', () => {
    beforeEach(() => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
    });

    it('should display empty title', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', '');
    });

    it('should display checkmark icon', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('icon-checkmark')).toBeInTheDocument();
    });

    it('should display success message with profile username and recipient address', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByText('testname.base.eth')).toBeInTheDocument();
      expect(screen.getByText('has been sent to')).toBeInTheDocument();
      expect(
        screen.getByText('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'),
      ).toBeInTheDocument();
    });

    it('should display TransactionLink when ownershipTransactionHash is available', () => {
      mockContextValues.ownershipTransactionHash =
        '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('transaction-link')).toBeInTheDocument();
      expect(screen.getByText('View transaction on')).toBeInTheDocument();
    });

    it('should not display TransactionLink when ownershipTransactionHash is not available', () => {
      mockContextValues.ownershipTransactionHash = undefined;

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('transaction-link')).not.toBeInTheDocument();
    });
  });

  describe('modal close functionality', () => {
    it('should call onClose when modal close button is clicked in non-success step', () => {
      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should call profileRefetch when closing from Success step', async () => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(mockProfileRefetch).toHaveBeenCalled();
      });
    });

    it('should call setShowProfileSettings(false) when closing from Success step', async () => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(mockSetShowProfileSettings).toHaveBeenCalledWith(false);
      });
    });

    it('should call onClose after refetch when closing from Success step', async () => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      });
    });

    it('should log error when profileRefetch fails on success step close', async () => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
      const testError = new Error('Refetch failed');
      mockProfileRefetch.mockRejectedValueOnce(testError);

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(testError, 'Failed to refetch Owner');
      });
    });
  });

  describe('success effect', () => {
    it('should call setCurrentOwnershipStep to Success when isSuccess becomes true', () => {
      mockContextValues.isSuccess = true;

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(mockContextValues.setCurrentOwnershipStep).toHaveBeenCalledWith('success');
    });

    it('should call onSuccess callback when isSuccess becomes true', () => {
      mockContextValues.isSuccess = true;

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(defaultProps.onSuccess).toHaveBeenCalled();
    });

    it('should not throw when onSuccess is not provided', () => {
      mockContextValues.isSuccess = true;

      const propsWithoutOnSuccess = {
        isOpen: true,
        onClose: jest.fn(),
      };

      expect(() => {
        render(<UsernameProfileTransferOwnershipModal {...propsWithoutOnSuccess} />);
      }).not.toThrow();
    });
  });

  describe('back button visibility', () => {
    it('should not show back button in Search step', () => {
      mockContextValues.currentOwnershipStep = 'search';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('modal-back')).not.toBeInTheDocument();
    });

    it('should show back button in OwnershipOverview step', () => {
      mockContextValues.currentOwnershipStep = 'ownership-overview';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.getByTestId('modal-back')).toBeInTheDocument();
    });

    it('should not show back button in WalletRequests step', () => {
      mockContextValues.currentOwnershipStep = 'wallet-requests';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('modal-back')).not.toBeInTheDocument();
    });

    it('should not show back button in Success step', () => {
      mockContextValues.currentOwnershipStep = 'success';
      mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

      render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

      expect(screen.queryByTestId('modal-back')).not.toBeInTheDocument();
    });
  });

  describe('title display by step', () => {
    it('should display correct title for each step', () => {
      const steps = [
        { step: 'search', title: 'Send name' },
        { step: 'ownership-overview', title: "You'll be sending" },
        { step: 'wallet-requests', title: 'Confirm transactions' },
        { step: 'success', title: '' },
      ];

      steps.forEach(({ step, title }) => {
        mockContextValues.currentOwnershipStep = step;
        mockContextValues.recipientAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

        const { unmount } = render(<UsernameProfileTransferOwnershipModal {...defaultProps} />);

        expect(screen.getByTestId('modal')).toHaveAttribute('data-title', title);

        unmount();
      });
    });
  });
});
