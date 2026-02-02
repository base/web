/**
 * @jest-environment jsdom
 */

// Mock wagmi/experimental before importing anything else
jest.mock('wagmi/experimental', () => ({
  useCallsStatus: jest.fn().mockReturnValue({ data: undefined }),
  useWriteContracts: jest.fn().mockReturnValue({}),
}));

// Mock useWriteContractsWithLogs
jest.mock('apps/web/src/hooks/useWriteContractsWithLogs', () => ({
  BatchCallsStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Approved: 'approved',
    Canceled: 'canceled',
    Processing: 'processing',
    Reverted: 'reverted',
    Failed: 'failed',
    Success: 'success',
  },
  useWriteContractsWithLogs: jest.fn().mockReturnValue({
    batchCallsStatus: 'idle',
    initiateBatchCalls: jest.fn(),
    transactionReceipt: null,
    transactionReceiptError: null,
  }),
}));

// Mock useWriteContractWithReceipt
jest.mock('apps/web/src/hooks/useWriteContractWithReceipt', () => ({
  WriteTransactionWithReceiptStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Approved: 'approved',
    Canceled: 'canceled',
    Processing: 'processing',
    Reverted: 'reverted',
    Success: 'success',
  },
  useWriteContractWithReceipt: jest.fn().mockReturnValue({
    initiateTransaction: jest.fn(),
    transactionStatus: 'idle',
    transactionReceipt: null,
  }),
}));

import { render, screen, act, waitFor } from '@testing-library/react';
import RenewalProvider, { RenewalSteps, useRenewal } from './RenewalContext';

// Mock next/navigation
const mockPush = jest.fn();
const mockPrefetch = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: mockPrefetch,
  }),
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

// Mock useBasenameChain
let mockBasenameChainId = 8453;
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: mockBasenameChainId },
  }),
}));

// Mock useRenewNameCallback
let mockBatchCallsStatus = 'idle';
let mockRenewNameStatus = 'idle';
const mockRenewBasename = jest.fn().mockResolvedValue(undefined);
let mockPrice: bigint | undefined = BigInt(1000000000000000);
let mockIsPending = false;

jest.mock('apps/web/src/hooks/useRenewNameCallback', () => ({
  useRenewNameCallback: () => ({
    callback: mockRenewBasename,
    value: mockPrice,
    isPending: mockIsPending,
    renewNameStatus: mockRenewNameStatus,
    batchCallsStatus: mockBatchCallsStatus,
  }),
}));

// Mock usernames utilities
const mockGetBasenameNameExpires = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (name: string, chainId: number) => {
    if (chainId === 8453) {
      return `${name}.base.eth`;
    }
    return `${name}.basetest.eth`;
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getBasenameNameExpires: (name: string) => mockGetBasenameNameExpires(name),
}));

// Test component to consume the context
function TestConsumer() {
  const context = useRenewal();

  const handleSetYears = () => context.setYears(3);
  const handleRedirectToProfile = () => context.redirectToProfile();
  const handleSetRenewalStep = () => context.setRenewalStep(RenewalSteps.Pending);
  const handleRenewBasename = () => {
    void context.renewBasename();
  };

  return (
    <div>
      <span data-testid="name">{context.name}</span>
      <span data-testid="formattedName">{context.formattedName}</span>
      <span data-testid="renewalStep">{context.renewalStep}</span>
      <span data-testid="years">{context.years}</span>
      <span data-testid="expirationDate">{context.expirationDate ?? 'undefined'}</span>
      <span data-testid="loadingExpirationDate">{String(context.loadingExpirationDate)}</span>
      <span data-testid="isPending">{String(context.isPending)}</span>
      <span data-testid="price">{context.price?.toString() ?? 'undefined'}</span>
      <button
        type="button"
        aria-label="Set years"
        data-testid="setYears"
        onClick={handleSetYears}
      />
      <button
        type="button"
        aria-label="Redirect to profile"
        data-testid="redirectToProfile"
        onClick={handleRedirectToProfile}
      />
      <button
        type="button"
        aria-label="Set renewal step"
        data-testid="setRenewalStep"
        onClick={handleSetRenewalStep}
      />
      <button
        type="button"
        aria-label="Renew basename"
        data-testid="renewBasename"
        onClick={handleRenewBasename}
      />
    </div>
  );
}

describe('RenewalContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBatchCallsStatus = 'idle';
    mockRenewNameStatus = 'idle';
    mockBasenameChainId = 8453;
    mockPrice = BigInt(1000000000000000);
    mockIsPending = false;
    mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600)); // Jan 1, 2025
  });

  describe('RenewalSteps enum', () => {
    it('should have correct step values', () => {
      expect(RenewalSteps.Form).toBe('form');
      expect(RenewalSteps.Pending).toBe('pending');
      expect(RenewalSteps.Success).toBe('success');
    });
  });

  describe('useRenewal hook', () => {
    it('should throw error when used outside of provider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow('useRenewal must be used within a RenewalProvider');

      consoleError.mockRestore();
    });

    it('should return context values when used inside provider', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('renewalStep')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toHaveTextContent('testname');
    });
  });

  describe('RenewalProvider', () => {
    it('should render children', async () => {
      render(
        <RenewalProvider name="testname">
          <div data-testid="child">Child Content</div>
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should provide context values to children', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('name')).toHaveTextContent('testname');
      expect(screen.getByTestId('renewalStep')).toHaveTextContent('form');
      expect(screen.getByTestId('years')).toHaveTextContent('1');
    });

    it('should format name correctly for base mainnet', async () => {
      mockBasenameChainId = 8453;

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('formattedName')).toHaveTextContent('testname.base.eth');
    });

    it('should format name correctly for testnet', async () => {
      mockBasenameChainId = 84532;

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('formattedName')).toHaveTextContent('testname.basetest.eth');
    });
  });

  describe('state management', () => {
    it('should update years when setYears is called', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('years')).toHaveTextContent('1');

      await act(async () => {
        screen.getByTestId('setYears').click();
      });

      expect(screen.getByTestId('years')).toHaveTextContent('3');
    });

    it('should update renewalStep when setRenewalStep is called', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('renewalStep')).toHaveTextContent('form');

      await act(async () => {
        screen.getByTestId('setRenewalStep').click();
      });

      expect(screen.getByTestId('renewalStep')).toHaveTextContent('pending');
    });
  });

  describe('redirectToProfile', () => {
    it('should call router.push with correct path for base mainnet', async () => {
      mockBasenameChainId = 8453;

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      await act(async () => {
        screen.getByTestId('redirectToProfile').click();
      });

      expect(mockPush).toHaveBeenCalledWith('/name/testname');
    });

    it('should call router.push with formatted path for testnet', async () => {
      mockBasenameChainId = 84532;

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      await act(async () => {
        screen.getByTestId('redirectToProfile').click();
      });

      expect(mockPush).toHaveBeenCalledWith('/name/testname.basetest.eth');
    });
  });

  describe('renewBasename', () => {
    it('should call the renewBasename callback', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      await act(async () => {
        screen.getByTestId('renewBasename').click();
      });

      expect(mockRenewBasename).toHaveBeenCalled();
    });

    it('should display price from hook', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('price')).toHaveTextContent('1000000000000000');
    });

    it('should display isPending state', async () => {
      mockIsPending = true;

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('isPending')).toHaveTextContent('true');
    });
  });

  describe('expiration date fetching', () => {
    it('should fetch and format expiration date on mount', async () => {
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalledWith('testname.base.eth');
      });

      await waitFor(() => {
        expect(screen.getByTestId('expirationDate')).not.toHaveTextContent('undefined');
      });
    });

    it('should log error when expiration date fetch fails', async () => {
      const error = new Error('Fetch failed');
      mockGetBasenameNameExpires.mockRejectedValue(error);

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to fetch basename expiration date');
      });
    });

    it('should handle null expiration date', async () => {
      mockGetBasenameNameExpires.mockResolvedValue(null);

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('expirationDate')).toHaveTextContent('undefined');
    });
  });

  describe('analytics', () => {
    it('should log step changes', async () => {
      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loadingExpirationDate')).toHaveTextContent('false');
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_step_form', 'change');

      await act(async () => {
        screen.getByTestId('setRenewalStep').click();
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_step_pending', 'change');
    });
  });

  describe('step transitions based on batch calls status', () => {
    it('should start with Pending when batchCallsStatus is Approved on mount', async () => {
      mockBatchCallsStatus = 'approved';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('renewalStep')).toHaveTextContent('pending');
      });
    });

    it('should start with Success when batchCallsStatus is Success on mount', async () => {
      mockBatchCallsStatus = 'success';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('renewalStep')).toHaveTextContent('success');
      });
    });
  });

  describe('step transitions based on renewNameStatus', () => {
    it('should start with Pending when renewNameStatus is Approved on mount', async () => {
      mockRenewNameStatus = 'approved';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('renewalStep')).toHaveTextContent('pending');
      });
    });

    it('should start with Success when renewNameStatus is Success on mount', async () => {
      mockRenewNameStatus = 'success';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('renewalStep')).toHaveTextContent('success');
      });
    });
  });

  describe('success step effects', () => {
    it('should prefetch profile path when step is Success', async () => {
      mockBatchCallsStatus = 'success';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      await waitFor(() => {
        expect(mockPrefetch).toHaveBeenCalledWith('/name/testname');
      });
    });

    it('should fetch expiration date when step is Success', async () => {
      mockBatchCallsStatus = 'success';

      render(
        <RenewalProvider name="testname">
          <TestConsumer />
        </RenewalProvider>
      );

      // Expiration date is fetched both on mount and when step becomes Success
      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });
    });
  });
});
