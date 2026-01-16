/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';

// Mock the usernames module to avoid is-ipfs dependency issue
jest.mock('apps/web/src/utils/usernames', () => ({
  getTokenIdFromBasename: jest.fn(),
  formatBaseEthDomain: jest.fn(),
  normalizeEnsDomainName: jest.fn((name: string) => name),
  REGISTER_CONTRACT_ABI: [],
  REGISTER_CONTRACT_ADDRESSES: {},
}));

// Mock Analytics context
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useWriteContractsWithLogs and useWriteContractWithReceipt to avoid wagmi experimental import issues
jest.mock('apps/web/src/hooks/useWriteContractsWithLogs', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    initiateBatchCalls: jest.fn(),
    batchCallsStatus: 'idle',
    batchCallsIsLoading: false,
    batchCallsError: null,
  })),
  BatchCallsStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Processing: 'processing',
    Success: 'success',
    Failed: 'failed',
  },
}));

jest.mock('apps/web/src/hooks/useWriteContractWithReceipt', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    initiateTransaction: jest.fn(),
    transactionStatus: 'idle',
    transactionIsLoading: false,
    transactionError: null,
  })),
  WriteTransactionWithReceiptStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Submitted: 'submitted',
    Success: 'success',
    Failed: 'failed',
  },
}));

// Mock useRenewNameCallback hook
const mockRenewBasename = jest.fn().mockResolvedValue(undefined);
let mockRenewNameCallbackReturn = {
  callback: mockRenewBasename,
  value: BigInt(1000000000000000), // 0.001 ETH
  isPending: false,
  renewNameStatus: 'idle' as string,
  batchCallsStatus: 'idle' as string,
};

jest.mock('apps/web/src/hooks/useRenewNameCallback', () => ({
  useRenewNameCallback: () => mockRenewNameCallbackReturn,
}));

// Mock wagmi useAccount
let mockAddress: string | undefined = '0x1234567890123456789012345678901234567890';
jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockAddress,
  }),
}));

// Mock Modal component
jest.mock('apps/web/src/components/Modal', () => {
  return function MockModal({
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
        {children}
      </div>
    );
  };
});

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({
    children,
    onClick,
    disabled,
    isLoading,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  }) {
    return (
      <button
        type="button"
        data-testid="action-button"
        onClick={onClick}
        disabled={disabled}
        data-loading={isLoading}
      >
        {children}
      </button>
    );
  },
  ButtonVariants: {
    Black: 'black',
  },
}));

// Import after mocks are set up
import UsernameProfileRenewalModal from './index';

describe('UsernameProfileRenewalModal', () => {
  const defaultProps = {
    name: 'testname.base.eth',
    isOpen: true,
    onClose: jest.fn(),
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddress = '0x1234567890123456789012345678901234567890';
    mockRenewNameCallbackReturn = {
      callback: mockRenewBasename,
      value: BigInt(1000000000000000), // 0.001 ETH
      isPending: false,
      renewNameStatus: 'idle',
      batchCallsStatus: 'idle',
    };
  });

  describe('when user is not connected', () => {
    it('should return null when address is undefined', () => {
      mockAddress = undefined;

      const { container } = render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('when modal is closed', () => {
    it('should not render modal content when isOpen is false', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('SetYears step (initial)', () => {
    it('should render modal when isOpen is true', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('should display "Extend Registration" title initially', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', 'Extend Registration');
    });

    it('should display instruction text', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(
        screen.getByText(
          "Choose how many years you'd like to extend your registration for.",
        ),
      ).toBeInTheDocument();
    });

    it('should display "Extend for" label', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByText('Extend for')).toBeInTheDocument();
    });

    it('should display initial year count as "1 year"', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByText('1 year')).toBeInTheDocument();
    });

    it('should display increment and decrement buttons', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByText('-')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('should display Continue button', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('should disable decrement button when years is 1', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const decrementButton = screen.getByText('-');
      expect(decrementButton).toBeDisabled();
    });
  });

  describe('year selection functionality', () => {
    it('should increment years when + button is clicked', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);

      expect(screen.getByText('2 years')).toBeInTheDocument();
    });

    it('should decrement years when - button is clicked and years > 1', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      // First increment to 2
      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);
      expect(screen.getByText('2 years')).toBeInTheDocument();

      // Then decrement back to 1
      const decrementButton = screen.getByText('-');
      fireEvent.click(decrementButton);
      expect(screen.getByText('1 year')).toBeInTheDocument();
    });

    it('should not decrement below 1', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const decrementButton = screen.getByText('-');
      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);

      expect(screen.getByText('1 year')).toBeInTheDocument();
    });

    it('should enable decrement button when years > 1', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);

      const decrementButton = screen.getByText('-');
      expect(decrementButton).not.toBeDisabled();
    });

    it('should display "years" plural when years > 1', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(screen.getByText('3 years')).toBeInTheDocument();
    });
  });

  describe('navigation to Confirm step', () => {
    it('should navigate to Confirm step when Continue is clicked', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(screen.getByTestId('modal')).toHaveAttribute(
        'data-title',
        'Confirm renewal details',
      );
    });

    it('should show back button in Confirm step', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(screen.getByTestId('modal-back')).toBeInTheDocument();
    });
  });

  describe('Confirm step', () => {
    const navigateToConfirmStep = () => {
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    };

    it('should display "Confirm renewal details" title', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByTestId('modal')).toHaveAttribute(
        'data-title',
        'Confirm renewal details',
      );
    });

    it('should display basename', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByText('Basename:')).toBeInTheDocument();
      expect(screen.getByText('testname.base.eth')).toBeInTheDocument();
    });

    it('should display renewal period', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByText('Renewal period:')).toBeInTheDocument();
      expect(screen.getByText('1 year')).toBeInTheDocument();
    });

    it('should display estimated cost', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByText('Estimated cost:')).toBeInTheDocument();
      expect(screen.getByText('0.0010 ETH')).toBeInTheDocument();
    });

    it('should display "Calculating..." when price is undefined', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        value: undefined,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByText('Calculating...')).toBeInTheDocument();
    });

    it('should display Confirm & Renew button', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      expect(screen.getByText('Confirm & Renew')).toBeInTheDocument();
    });

    it('should display correct renewal period after incrementing years', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      navigateToConfirmStep();

      expect(screen.getByText('3 years')).toBeInTheDocument();
    });
  });

  describe('back navigation', () => {
    it('should navigate back to SetYears step when back is clicked', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      // Navigate to Confirm
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      // Click back
      const backButton = screen.getByTestId('modal-back');
      fireEvent.click(backButton);

      expect(screen.getByTestId('modal')).toHaveAttribute(
        'data-title',
        'Extend Registration',
      );
    });
  });

  describe('renewal submission', () => {
    const navigateToConfirmStep = () => {
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
    };

    it('should call renewBasename when Confirm & Renew is clicked', async () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      const confirmButton = screen.getByText('Confirm & Renew');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockRenewBasename).toHaveBeenCalledTimes(1);
      });
    });

    it('should log analytics event when initiating renewal', async () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      const confirmButton = screen.getByText('Confirm & Renew');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockLogEventWithContext).toHaveBeenCalledWith('renew_name_initiated', 'click');
      });
    });

    it('should disable Confirm button when price is undefined', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        value: undefined,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      const confirmButton = screen.getByTestId('action-button');
      expect(confirmButton).toBeDisabled();
    });

    it('should show loading state when isPending is true', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        isPending: true,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      const confirmButton = screen.getByTestId('action-button');
      expect(confirmButton).toHaveAttribute('data-loading', 'true');
    });

    it('should log error when renewal fails', async () => {
      const testError = new Error('Renewal failed');
      mockRenewBasename.mockRejectedValueOnce(testError);

      render(<UsernameProfileRenewalModal {...defaultProps} />);
      navigateToConfirmStep();

      const confirmButton = screen.getByText('Confirm & Renew');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(testError, 'Failed to renew basename');
      });
    });
  });

  describe('success handling', () => {
    it('should call onClose when renewNameStatus is Success', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        renewNameStatus: WriteTransactionWithReceiptStatus.Success,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should call onSuccess when renewNameStatus is Success', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        renewNameStatus: WriteTransactionWithReceiptStatus.Success,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(defaultProps.onSuccess).toHaveBeenCalled();
    });

    it('should call onClose when batchCallsStatus is Success', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        batchCallsStatus: BatchCallsStatus.Success,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should call onSuccess when batchCallsStatus is Success', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        batchCallsStatus: BatchCallsStatus.Success,
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      expect(defaultProps.onSuccess).toHaveBeenCalled();
    });

    it('should not throw when onSuccess is not provided', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        renewNameStatus: WriteTransactionWithReceiptStatus.Success,
      };

      const propsWithoutOnSuccess = {
        name: 'testname.base.eth',
        isOpen: true,
        onClose: jest.fn(),
      };

      expect(() => {
        render(<UsernameProfileRenewalModal {...propsWithoutOnSuccess} />);
      }).not.toThrow();
    });
  });

  describe('modal close functionality', () => {
    it('should call onClose when modal close button is clicked', () => {
      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('price formatting', () => {
    it('should format price with 4 decimal places', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        value: BigInt('12345678901234567'), // ~0.0123 ETH
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(screen.getByText('0.0123 ETH')).toBeInTheDocument();
    });

    it('should format larger price correctly', () => {
      mockRenewNameCallbackReturn = {
        ...mockRenewNameCallbackReturn,
        value: BigInt('1000000000000000000'), // 1 ETH
      };

      render(<UsernameProfileRenewalModal {...defaultProps} />);

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      expect(screen.getByText('1.0000 ETH')).toBeInTheDocument();
    });
  });
});
