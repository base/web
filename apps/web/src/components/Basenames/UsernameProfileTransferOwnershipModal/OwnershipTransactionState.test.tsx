/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';

// Define WriteTransactionWithReceiptStatus for tests to avoid wagmi import issue
enum WriteTransactionWithReceiptStatus {
  Idle = 'idle',
  Initiated = 'initiated',
  Canceled = 'canceled',
  Approved = 'approved',
  Processing = 'processing',
  Reverted = 'reverted',
  Success = 'success',
}

// Mock the useWriteContractWithReceipt hook
jest.mock('apps/web/src/hooks/useWriteContractWithReceipt', () => ({
  WriteTransactionWithReceiptStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Canceled: 'canceled',
    Approved: 'approved',
    Processing: 'processing',
    Reverted: 'reverted',
    Success: 'success',
  },
}));

// Define OwnershipSettings type for tests
type OwnershipSettings = {
  id: 'setAddr' | 'reclaim' | 'setName' | 'safeTransferFrom';
  name: string;
  description: string;
  status: WriteTransactionWithReceiptStatus;
  contractFunction: () => Promise<void>;
};

// Mock useErrors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock ProfileTransferOwnership context values
let mockContextValues = {
  batchTransactionsEnabled: false,
  batchCallsIsLoading: false,
};

jest.mock(
  'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context',
  () => ({
    useProfileTransferOwnership: () => mockContextValues,
  }),
);

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({
    children,
    onClick,
    variant,
    size,
    rounded,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    size?: string;
    rounded?: boolean;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid="retry-button"
        data-variant={variant}
        data-size={size}
        data-rounded={rounded}
      >
        {children}
      </button>
    );
  },
  ButtonVariants: {
    Gray: 'gray',
  },
  ButtonSizes: {
    Small: 'small',
  },
}));

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`} />;
  },
}));

// Import after mocks
import { OwnershipTransactionState } from './OwnershipTransactionState';

describe('OwnershipTransactionState', () => {
  const mockContractFunction = jest.fn().mockResolvedValue(undefined);

  const createOwnershipSetting = (
    overrides: Partial<OwnershipSettings> = {},
  ): OwnershipSettings => ({
    id: 'setAddr',
    name: 'Address record',
    description: 'Your Basename will resolve to this address.',
    status: WriteTransactionWithReceiptStatus.Idle,
    contractFunction: mockContractFunction,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockContextValues = {
      batchTransactionsEnabled: false,
      batchCallsIsLoading: false,
    };
  });

  describe('when batch transactions are enabled and loading', () => {
    beforeEach(() => {
      mockContextValues = {
        batchTransactionsEnabled: true,
        batchCallsIsLoading: true,
      };
    });

    it('should display a spinner icon', () => {
      const ownershipSetting = createOwnershipSetting();

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({ name: 'Token ownership' });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Token ownership')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting();

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('Idle status', () => {
    it('should display a checkmark icon when status is Idle', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Idle,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-checkmark')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Idle,
        name: 'Profile editing',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Profile editing')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Idle,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('Initiated status (loading)', () => {
    it('should display a spinner icon when status is Initiated', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Initiated,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Initiated,
        name: 'Name record',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Name record')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Initiated,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('Processing status (loading)', () => {
    it('should display a spinner icon when status is Processing', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Processing,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Processing,
        name: 'Address record',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Address record')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Processing,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('Success status', () => {
    it('should display a checkmark icon when status is Success', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Success,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-checkmark')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Success,
        name: 'Token ownership',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Token ownership')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Success,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('Canceled status (failed)', () => {
    it('should display a cross icon when status is Canceled', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Canceled,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-cross')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Canceled,
        name: 'Profile editing',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Profile editing')).toBeInTheDocument();
    });

    it('should display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Canceled,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('retry-button')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('should call contractFunction when retry button is clicked', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Canceled,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      const retryButton = screen.getByTestId('retry-button');
      fireEvent.click(retryButton);

      expect(mockContractFunction).toHaveBeenCalledTimes(1);
    });

    it('should log error when contractFunction fails on retry', async () => {
      const testError = new Error('Contract function failed');
      const failingContractFunction = jest.fn().mockRejectedValue(testError);
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Canceled,
        contractFunction: failingContractFunction,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      const retryButton = screen.getByTestId('retry-button');
      fireEvent.click(retryButton);

      // Wait for the promise rejection to be handled
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockLogError).toHaveBeenCalledWith(testError, 'Failed to retry');
    });
  });

  describe('Reverted status (failed)', () => {
    it('should display a cross icon when status is Reverted', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Reverted,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('icon-cross')).toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Reverted,
        name: 'Name record',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Name record')).toBeInTheDocument();
    });

    it('should display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Reverted,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByTestId('retry-button')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('should call contractFunction when retry button is clicked', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Reverted,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      const retryButton = screen.getByTestId('retry-button');
      fireEvent.click(retryButton);

      expect(mockContractFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Approved status', () => {
    // Approved status doesn't match loading, success, or failed states
    // It should show checkmark (default for Idle) since it's not in the
    // isLoading, isFailed, or isSuccess conditions
    it('should not display spinner, cross, or green checkmark icons for Approved', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Approved,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      // Approved is not Idle, so no checkmark from Idle branch
      // Approved is not loading (Initiated or Processing)
      // Approved is not failed (Canceled or Reverted)
      // Approved is not Success
      expect(screen.queryByTestId('icon-spinner')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-cross')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-checkmark')).not.toBeInTheDocument();
    });

    it('should display the setting name', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Approved,
        name: 'Token ownership',
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.getByText('Token ownership')).toBeInTheDocument();
    });

    it('should not display retry button', () => {
      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Approved,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('different ownership setting IDs', () => {
    const settingIds: OwnershipSettings['id'][] = [
      'setAddr',
      'reclaim',
      'setName',
      'safeTransferFrom',
    ];

    settingIds.forEach((id) => {
      it(`should render correctly for ${id} setting`, () => {
        const ownershipSetting = createOwnershipSetting({
          id,
          name: `Setting ${id}`,
        });

        render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

        expect(screen.getByText(`Setting ${id}`)).toBeInTheDocument();
      });
    });
  });

  describe('batch transactions disabled during batch loading', () => {
    it('should not show batch loading state when batchTransactionsEnabled is false even if batchCallsIsLoading is true', () => {
      mockContextValues = {
        batchTransactionsEnabled: false,
        batchCallsIsLoading: true,
      };

      const ownershipSetting = createOwnershipSetting({
        status: WriteTransactionWithReceiptStatus.Idle,
      });

      render(<OwnershipTransactionState ownershipSetting={ownershipSetting} />);

      // Should show idle state (checkmark) instead of batch loading state
      expect(screen.getByTestId('icon-checkmark')).toBeInTheDocument();
    });
  });
});
