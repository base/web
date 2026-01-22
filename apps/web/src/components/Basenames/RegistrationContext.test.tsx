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
    Failed: 'failed',
    Success: 'success',
  },
  useWriteContractWithReceipt: jest.fn().mockReturnValue({
    initiateTransaction: jest.fn(),
    transactionStatus: 'idle',
    transactionReceipt: null,
  }),
}));

import { render, screen, act, waitFor } from '@testing-library/react';
import RegistrationProvider, {
  RegistrationContext,
  RegistrationSteps,
  useRegistration,
  registrationTransitionDuration,
  RegistrationContextProps,
} from './RegistrationContext';
import { useContext } from 'react';

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

// Mock useAccount from wagmi
const mockAddress = '0x1234567890123456789012345678901234567890';
jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockAddress,
  }),
  useReadContract: () => ({
    data: false,
  }),
}));

// Mock useBasenameChain
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453 },
  }),
}));

// Mock useAggregatedDiscountValidators
let mockDiscounts: Record<string, unknown> = {};
let mockLoadingDiscounts = false;
jest.mock('apps/web/src/hooks/useAggregatedDiscountValidators', () => ({
  useAggregatedDiscountValidators: () => ({
    data: mockDiscounts,
    loading: mockLoadingDiscounts,
  }),
  findFirstValidDiscount: jest.fn().mockReturnValue(undefined),
}));

// Mock useNameRegistrationPrice hooks
jest.mock('apps/web/src/hooks/useNameRegistrationPrice', () => ({
  useDiscountedNameRegistrationPrice: () => ({
    data: BigInt(1000000000000000),
  }),
  useNameRegistrationPrice: () => ({
    data: BigInt(2000000000000000),
  }),
}));

// Mock useBaseEnsName
const mockRefetchBaseEnsName = jest.fn().mockResolvedValue({});
jest.mock('apps/web/src/hooks/useBaseEnsName', () => ({
  __esModule: true,
  default: () => ({
    refetch: mockRefetchBaseEnsName,
  }),
}));

// Mock useRegisterNameCallback
let mockBatchCallsStatus = 'idle';
let mockRegisterNameStatus = 'idle';
const mockRegisterName = jest.fn();
const mockSetReverseRecord = jest.fn();
jest.mock('apps/web/src/hooks/useRegisterNameCallback', () => ({
  useRegisterNameCallback: () => ({
    callback: mockRegisterName,
    isPending: false,
    error: null,
    reverseRecord: true,
    setReverseRecord: mockSetReverseRecord,
    hasExistingBasename: false,
    batchCallsStatus: mockBatchCallsStatus,
    registerNameStatus: mockRegisterNameStatus,
  }),
}));

// Mock usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (name: string) => `${name}.base.eth`,
  isValidDiscount: () => false,
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
  REGISTER_CONTRACT_ABI: [],
  REGISTER_CONTRACT_ADDRESSES: {},
}));

// Test component to consume the context
function TestConsumer() {
  const context = useRegistration();

  const handleSetSelectedName = () => context.setSelectedName('testname');
  const handleSetYears = () => context.setYears(3);
  const handleSetSearchInputFocused = () => context.setSearchInputFocused(true);
  const handleSetSearchInputHovered = () => context.setSearchInputHovered(true);
  const handleRedirectToProfile = () => context.redirectToProfile();
  const handleSetRegistrationStep = () => context.setRegistrationStep(RegistrationSteps.Profile);

  return (
    <div>
      <span data-testid="selectedName">{context.selectedName}</span>
      <span data-testid="registrationStep">{context.registrationStep}</span>
      <span data-testid="years">{context.years}</span>
      <span data-testid="loadingDiscounts">{String(context.loadingDiscounts)}</span>
      <span data-testid="searchInputFocused">{String(context.searchInputFocused)}</span>
      <span data-testid="searchInputHovered">{String(context.searchInputHovered)}</span>
      <span data-testid="selectedNameFormatted">{context.selectedNameFormatted}</span>
      <span data-testid="hasExistingBasename">{String(context.hasExistingBasename)}</span>
      <span data-testid="reverseRecord">{String(context.reverseRecord)}</span>
      <button
        type="button"
        aria-label="Set selected name"
        data-testid="setSelectedName"
        onClick={handleSetSelectedName}
      />
      <button
        type="button"
        aria-label="Set years"
        data-testid="setYears"
        onClick={handleSetYears}
      />
      <button
        type="button"
        aria-label="Set search input focused"
        data-testid="setSearchInputFocused"
        onClick={handleSetSearchInputFocused}
      />
      <button
        type="button"
        aria-label="Set search input hovered"
        data-testid="setSearchInputHovered"
        onClick={handleSetSearchInputHovered}
      />
      <button
        type="button"
        aria-label="Redirect to profile"
        data-testid="redirectToProfile"
        onClick={handleRedirectToProfile}
      />
      <button
        type="button"
        aria-label="Set registration step"
        data-testid="setRegistrationStep"
        onClick={handleSetRegistrationStep}
      />
    </div>
  );
}

describe('RegistrationContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDiscounts = {};
    mockLoadingDiscounts = false;
    mockBatchCallsStatus = 'idle';
    mockRegisterNameStatus = 'idle';
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    // Mock fetch for discount code consumption
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });
  });

  describe('RegistrationSteps enum', () => {
    it('should have correct step values', () => {
      expect(RegistrationSteps.Search).toBe('search');
      expect(RegistrationSteps.Claim).toBe('claim');
      expect(RegistrationSteps.Pending).toBe('pending');
      expect(RegistrationSteps.Success).toBe('success');
      expect(RegistrationSteps.Profile).toBe('profile');
    });
  });

  describe('registrationTransitionDuration constant', () => {
    it('should have the correct duration value', () => {
      expect(registrationTransitionDuration).toBe('duration-700');
    });
  });

  describe('RegistrationContext default values', () => {
    function DefaultContextConsumer() {
      const context = useContext(RegistrationContext);
      return (
        <div>
          <span data-testid="selectedName">{context.selectedName}</span>
          <span data-testid="registrationStep">{context.registrationStep}</span>
          <span data-testid="years">{context.years}</span>
          <span data-testid="loadingDiscounts">{String(context.loadingDiscounts)}</span>
          <span data-testid="searchInputFocused">{String(context.searchInputFocused)}</span>
          <span data-testid="searchInputHovered">{String(context.searchInputHovered)}</span>
          <span data-testid="selectedNameFormatted">{context.selectedNameFormatted}</span>
        </div>
      );
    }

    it('should have correct default values', () => {
      render(<DefaultContextConsumer />);

      expect(screen.getByTestId('selectedName')).toHaveTextContent('');
      expect(screen.getByTestId('registrationStep')).toHaveTextContent('search');
      expect(screen.getByTestId('years')).toHaveTextContent('1');
      expect(screen.getByTestId('loadingDiscounts')).toHaveTextContent('true');
      expect(screen.getByTestId('searchInputFocused')).toHaveTextContent('false');
      expect(screen.getByTestId('searchInputHovered')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedNameFormatted')).toHaveTextContent('.base.eth');
    });

    it('should have noop functions that return undefined', () => {
      let contextValue: RegistrationContextProps | null = null;

      function ContextCapture() {
        contextValue = useContext(RegistrationContext);
        return null;
      }

      render(<ContextCapture />);

      expect(contextValue).not.toBeNull();
      if (contextValue) {
        const ctx = contextValue as RegistrationContextProps;
        expect(ctx.setSearchInputFocused(true)).toBeUndefined();
        expect(ctx.setSearchInputHovered(true)).toBeUndefined();
        expect(ctx.setRegistrationStep(RegistrationSteps.Claim)).toBeUndefined();
        expect(ctx.setSelectedName('test')).toBeUndefined();
        expect(ctx.redirectToProfile()).toBeUndefined();
        expect(ctx.setYears(2)).toBeUndefined();
      }
    });
  });

  describe('RegistrationProvider', () => {
    it('should render children', () => {
      render(
        <RegistrationProvider>
          <div data-testid="child">Child Content</div>
        </RegistrationProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should provide context values to children', () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('selectedName')).toHaveTextContent('');
      expect(screen.getByTestId('registrationStep')).toHaveTextContent('search');
      expect(screen.getByTestId('years')).toHaveTextContent('1');
    });

    it('should accept a code prop', () => {
      render(
        <RegistrationProvider code="TESTCODE">
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('registrationStep')).toHaveTextContent('search');
    });
  });

  describe('state management', () => {
    it('should update selectedName when setSelectedName is called', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('selectedName')).toHaveTextContent('');

      await act(async () => {
        screen.getByTestId('setSelectedName').click();
      });

      expect(screen.getByTestId('selectedName')).toHaveTextContent('testname');
    });

    it('should update years when setYears is called', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('years')).toHaveTextContent('1');

      await act(async () => {
        screen.getByTestId('setYears').click();
      });

      expect(screen.getByTestId('years')).toHaveTextContent('3');
    });

    it('should update searchInputFocused when setSearchInputFocused is called', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('searchInputFocused')).toHaveTextContent('false');

      await act(async () => {
        screen.getByTestId('setSearchInputFocused').click();
      });

      expect(screen.getByTestId('searchInputFocused')).toHaveTextContent('true');
    });

    it('should update searchInputHovered when setSearchInputHovered is called', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('searchInputHovered')).toHaveTextContent('false');

      await act(async () => {
        screen.getByTestId('setSearchInputHovered').click();
      });

      expect(screen.getByTestId('searchInputHovered')).toHaveTextContent('true');
    });
  });

  describe('step transitions', () => {
    it('should transition from Search to Claim when selectedName is set', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('registrationStep')).toHaveTextContent('search');

      await act(async () => {
        screen.getByTestId('setSelectedName').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('registrationStep')).toHaveTextContent('claim');
      });
    });

    it('should update registrationStep when setRegistrationStep is called', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      await act(async () => {
        screen.getByTestId('setRegistrationStep').click();
      });

      expect(screen.getByTestId('registrationStep')).toHaveTextContent('profile');
    });

    it('should scroll to top when registrationStep changes', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      await act(async () => {
        screen.getByTestId('setRegistrationStep').click();
      });

      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('redirectToProfile', () => {
    it('should call router.push with correct path', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      // First set a name
      await act(async () => {
        screen.getByTestId('setSelectedName').click();
      });

      await act(async () => {
        screen.getByTestId('redirectToProfile').click();
      });

      expect(mockPush).toHaveBeenCalledWith('name/testname');
    });
  });

  describe('analytics', () => {
    it('should log step changes', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      // Initial step is logged
      expect(mockLogEventWithContext).toHaveBeenCalledWith('step_search', 'change');

      await act(async () => {
        screen.getByTestId('setRegistrationStep').click();
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith('step_profile', 'change');
    });

    it('should log selected_name when name is selected', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      await act(async () => {
        screen.getByTestId('setSelectedName').click();
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith('selected_name', 'change');
    });
  });

  describe('selectedNameFormatted', () => {
    it('should format the selected name correctly', async () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      await act(async () => {
        screen.getByTestId('setSelectedName').click();
      });

      expect(screen.getByTestId('selectedNameFormatted')).toHaveTextContent('testname.base.eth');
    });
  });

  describe('useRegistration hook', () => {
    it('should return context values when used inside provider', () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('registrationStep')).toBeInTheDocument();
    });

    it('should use default context values when used outside provider', () => {
      // The useRegistration hook checks if context is undefined to throw,
      // but since RegistrationContext has default values, it never is undefined.
      // This test verifies the hook returns default values outside the provider.
      function DefaultValueConsumer() {
        const context = useRegistration();
        return <span data-testid="defaultYear">{context.years}</span>;
      }

      render(<DefaultValueConsumer />);

      // Should get the default value of 1 year from the context default
      expect(screen.getByTestId('defaultYear')).toHaveTextContent('1');
    });
  });

  describe('context values from hooks', () => {
    it('should provide hasExistingBasename from useRegisterNameCallback', () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('hasExistingBasename')).toHaveTextContent('false');
    });

    it('should provide reverseRecord from useRegisterNameCallback', () => {
      render(
        <RegistrationProvider>
          <TestConsumer />
        </RegistrationProvider>
      );

      expect(screen.getByTestId('reverseRecord')).toHaveTextContent('true');
    });
  });
});
