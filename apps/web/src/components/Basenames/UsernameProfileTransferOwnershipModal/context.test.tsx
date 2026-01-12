/**
 * @jest-environment jsdom
 */

// Mock viem before any imports
jest.mock('viem', () => ({
  isAddress: jest.fn((address: string) => /^0x[a-fA-F0-9]{40}$/.test(address)),
  namehash: jest.fn().mockReturnValue('0xnamehash'),
  encodeFunctionData: jest.fn().mockReturnValue('0xencodeddata'),
}));

// Mock wagmi/experimental before importing anything else
jest.mock('wagmi/experimental', () => ({
  useCallsStatus: jest.fn().mockReturnValue({ data: undefined }),
  useWriteContracts: jest.fn().mockReturnValue({}),
}));

// Mock useWriteContractsWithLogs
const mockInitiateBatchCalls = jest.fn().mockResolvedValue(undefined);
let mockBatchCallsEnabled = false;
let mockBatchCallsStatus = 'idle';
let mockBatchCallsIsLoading = false;
let mockBatchCallTransactionHash: `0x${string}` | undefined = undefined;

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
  __esModule: true,
  default: () => ({
    initiateBatchCalls: mockInitiateBatchCalls,
    batchCallsEnabled: mockBatchCallsEnabled,
    batchCallsStatus: mockBatchCallsStatus,
    batchCallsIsLoading: mockBatchCallsIsLoading,
    batchCallTransactionHash: mockBatchCallTransactionHash,
  }),
}));

// Mock useWriteContractWithReceipt
const mockInitiateSetAddr = jest.fn().mockResolvedValue(undefined);
const mockInitiateReclaim = jest.fn().mockResolvedValue(undefined);
const mockInitiateSafeTransferFrom = jest.fn().mockResolvedValue(undefined);
const mockInitiateSetName = jest.fn().mockResolvedValue(undefined);
let mockSetAddrStatus = 'idle';
let mockReclaimStatus = 'idle';
let mockSafeTransferFromStatus = 'idle';
let mockSetNameStatus = 'idle';
let mockSafeTransferFromTransactionHash: `0x${string}` | undefined = undefined;

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
  __esModule: true,
  default: jest.fn((config: { eventName: string }) => {
    if (config.eventName === 'basename_set_addr') {
      return {
        initiateTransaction: mockInitiateSetAddr,
        transactionStatus: mockSetAddrStatus,
        transactionHash: undefined,
      };
    }
    if (config.eventName === 'basename_reclaim') {
      return {
        initiateTransaction: mockInitiateReclaim,
        transactionStatus: mockReclaimStatus,
        transactionHash: undefined,
      };
    }
    if (config.eventName === 'basename_safe_transfer_from') {
      return {
        initiateTransaction: mockInitiateSafeTransferFrom,
        transactionStatus: mockSafeTransferFromStatus,
        transactionHash: mockSafeTransferFromTransactionHash,
      };
    }
    if (config.eventName === 'basename_set_name') {
      return {
        initiateTransaction: mockInitiateSetName,
        transactionStatus: mockSetNameStatus,
        transactionHash: undefined,
      };
    }
    return {
      initiateTransaction: jest.fn(),
      transactionStatus: 'idle',
      transactionHash: undefined,
    };
  }),
}));

import { render, screen, act, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import ProfileTransferOwnershipProvider, {
  ProfileTransferOwnershipContext,
  useProfileTransferOwnership,
  OwnershipSteps,
  ProfileTransferOwnershipContextProps,
} from './context';


// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
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
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453, name: 'Base' },
  }),
}));

// Mock useBasenameResolver
jest.mock('apps/web/src/hooks/useBasenameResolver', () => ({
  __esModule: true,
  default: () => ({
    data: '0x1234567890123456789012345678901234567890',
  }),
}));

// Mock wagmi
let mockConnectedAddress: `0x${string}` | undefined =
  '0x1234567890123456789012345678901234567890';

jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockConnectedAddress,
  }),
}));

// Mock UsernameProfileContext
let mockCanSetAddr = true;
let mockCanReclaim = true;
let mockCanSafeTransferFrom = true;

jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileUsername: 'testname.base.eth',
    canSetAddr: mockCanSetAddr,
    canReclaim: mockCanReclaim,
    canSafeTransferFrom: mockCanSafeTransferFrom,
  }),
}));

// Mock usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  getTokenIdFromBasename: jest.fn().mockReturnValue(BigInt(12345)),
  buildBasenameReclaimContract: jest.fn().mockReturnValue({
    abi: [],
    address: '0x0000000000000000000000000000000000000000',
    args: [BigInt(12345), '0xrecipient'],
    functionName: 'reclaim',
  }),
  convertChainIdToCoinTypeUint: jest.fn().mockReturnValue(2147483649),
}));

// Mock ABIs
jest.mock('apps/web/src/abis/L2Resolver', () => [], { virtual: true });
jest.mock('apps/web/src/abis/BaseRegistrarAbi', () => [], { virtual: true });
jest.mock('apps/web/src/abis/ReverseRegistrarAbi', () => [], { virtual: true });

// Mock addresses
jest.mock('apps/web/src/addresses/usernames', () => ({
  USERNAME_BASE_REGISTRAR_ADDRESSES: {
    8453: '0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a',
  },
  USERNAME_REVERSE_REGISTRAR_ADDRESSES: {
    8453: '0x79EA96012eEa67A83431F1701B3dFf7e37F9E282',
  },
}));

// Test consumer component
function TestConsumer() {
  const context = useProfileTransferOwnership();

  const handleSetRecipient = () => {
    context.setRecipientAddress('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd');
  };

  const handleSetStep = (step: OwnershipSteps) => {
    context.setCurrentOwnershipStep(step);
  };

  return (
    <div>
      <span data-testid="currentOwnershipStep">{context.currentOwnershipStep}</span>
      <span data-testid="recipientAddress">{context.recipientAddress || 'empty'}</span>
      <span data-testid="isSuccess">{String(context.isSuccess)}</span>
      <span data-testid="batchTransactionsEnabled">{String(context.batchTransactionsEnabled)}</span>
      <span data-testid="batchCallsStatus">{context.batchCallsStatus}</span>
      <span data-testid="batchCallsIsLoading">{String(context.batchCallsIsLoading)}</span>
      <span data-testid="ownershipSettingsCount">{context.ownershipSettings.length}</span>
      <span data-testid="ownershipTransactionHash">
        {context.ownershipTransactionHash ?? 'undefined'}
      </span>
      {context.ownershipSettings.map((setting) => (
        <div key={setting.id} data-testid={`setting-${setting.id}`}>
          <span data-testid={`setting-${setting.id}-name`}>{setting.name}</span>
          <span data-testid={`setting-${setting.id}-status`}>{setting.status}</span>
          <button
            type="button"
            data-testid={`setting-${setting.id}-call`}
            onClick={() => {
              void setting.contractFunction();
            }}
          >
            Call {setting.id}
          </button>
        </div>
      ))}
      <button type="button" aria-label="Set recipient" data-testid="setRecipient" onClick={handleSetRecipient} />
      <button
        type="button"
        aria-label="Set step search"
        data-testid="setStepSearch"
        onClick={() => handleSetStep(OwnershipSteps.Search)}
      />
      <button
        type="button"
        aria-label="Set step ownership overview"
        data-testid="setStepOwnershipOverview"
        onClick={() => handleSetStep(OwnershipSteps.OwnershipOverview)}
      />
      <button
        type="button"
        aria-label="Set step wallet requests"
        data-testid="setStepWalletRequests"
        onClick={() => handleSetStep(OwnershipSteps.WalletRequests)}
      />
      <button
        type="button"
        aria-label="Set step success"
        data-testid="setStepSuccess"
        onClick={() => handleSetStep(OwnershipSteps.Success)}
      />
    </div>
  );
}

describe('ProfileTransferOwnershipContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectedAddress = '0x1234567890123456789012345678901234567890';
    mockCanSetAddr = true;
    mockCanReclaim = true;
    mockCanSafeTransferFrom = true;
    mockBatchCallsEnabled = false;
    mockBatchCallsStatus = 'idle';
    mockBatchCallsIsLoading = false;
    mockBatchCallTransactionHash = undefined;
    mockSetAddrStatus = 'idle';
    mockReclaimStatus = 'idle';
    mockSafeTransferFromStatus = 'idle';
    mockSetNameStatus = 'idle';
    mockSafeTransferFromTransactionHash = undefined;
  });

  describe('OwnershipSteps enum', () => {
    it('should have correct step values', () => {
      expect(OwnershipSteps.Search).toBe('search');
      expect(OwnershipSteps.OwnershipOverview).toBe('ownership-overview');
      expect(OwnershipSteps.WalletRequests).toBe('wallet-requests');
      expect(OwnershipSteps.Success).toBe('success');
    });
  });

  describe('ProfileTransferOwnershipContext default values', () => {
    function DefaultContextConsumer() {
      const context = useContext(ProfileTransferOwnershipContext);
      return (
        <div>
          <span data-testid="ownershipSettingsLength">{context.ownershipSettings.length}</span>
          <span data-testid="isSuccess">{String(context.isSuccess)}</span>
          <span data-testid="currentOwnershipStep">{context.currentOwnershipStep}</span>
          <span data-testid="recipientAddress">{context.recipientAddress || 'empty'}</span>
          <span data-testid="batchTransactionsEnabled">
            {String(context.batchTransactionsEnabled)}
          </span>
          <span data-testid="batchCallsStatus">{context.batchCallsStatus}</span>
          <span data-testid="batchCallsIsLoading">{String(context.batchCallsIsLoading)}</span>
          <span data-testid="ownershipTransactionHash">
            {context.ownershipTransactionHash ?? 'undefined'}
          </span>
        </div>
      );
    }

    it('should have correct default values', () => {
      render(<DefaultContextConsumer />);

      expect(screen.getByTestId('ownershipSettingsLength')).toHaveTextContent('0');
      expect(screen.getByTestId('isSuccess')).toHaveTextContent('false');
      expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('search');
      expect(screen.getByTestId('recipientAddress')).toHaveTextContent('empty');
      expect(screen.getByTestId('batchTransactionsEnabled')).toHaveTextContent('false');
      expect(screen.getByTestId('batchCallsStatus')).toHaveTextContent('idle');
      expect(screen.getByTestId('batchCallsIsLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('ownershipTransactionHash')).toHaveTextContent('undefined');
    });

    it('should have noop functions that return undefined', () => {
      let contextValue: ProfileTransferOwnershipContextProps | null = null;

      function ContextCapture() {
        contextValue = useContext(ProfileTransferOwnershipContext);
        return null;
      }

      render(<ContextCapture />);

      expect(contextValue).not.toBeNull();
      if (contextValue) {
        const ctx = contextValue as ProfileTransferOwnershipContextProps;
        expect(ctx.setCurrentOwnershipStep(OwnershipSteps.Search)).toBeUndefined();
        expect(ctx.setRecipientAddress('test')).toBeUndefined();
      }
    });
  });

  describe('useProfileTransferOwnership hook', () => {
    it('should return context values when used inside provider', () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('currentOwnershipStep')).toBeInTheDocument();
    });
  });

  describe('ProfileTransferOwnershipProvider', () => {
    it('should render children', () => {
      render(
        <ProfileTransferOwnershipProvider>
          <div data-testid="child">Child Content</div>
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should provide initial context values', () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('search');
      expect(screen.getByTestId('recipientAddress')).toHaveTextContent('empty');
      expect(screen.getByTestId('isSuccess')).toHaveTextContent('false');
    });
  });

  describe('state management', () => {
    it('should update recipientAddress when setRecipientAddress is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('recipientAddress')).toHaveTextContent('empty');

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('recipientAddress')).toHaveTextContent(
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      );
    });

    it('should update currentOwnershipStep when setCurrentOwnershipStep is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('search');

      await act(async () => {
        screen.getByTestId('setStepOwnershipOverview').click();
      });

      expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('ownership-overview');
    });
  });

  describe('ownership settings generation', () => {
    it('should generate all 4 ownership settings when all permissions are true', async () => {
      mockCanSetAddr = true;
      mockCanReclaim = true;
      mockCanSafeTransferFrom = true;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      // Set a valid recipient address to trigger contract generation
      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      // Should have setAddr, setName (both from canSetAddr), reclaim, and safeTransferFrom
      expect(screen.getByTestId('ownershipSettingsCount')).toHaveTextContent('4');
      expect(screen.getByTestId('setting-setAddr')).toBeInTheDocument();
      expect(screen.getByTestId('setting-setName')).toBeInTheDocument();
      expect(screen.getByTestId('setting-reclaim')).toBeInTheDocument();
      expect(screen.getByTestId('setting-safeTransferFrom')).toBeInTheDocument();
    });

    it('should generate setAddr and setName when canSetAddr is true', async () => {
      mockCanSetAddr = true;
      mockCanReclaim = false;
      mockCanSafeTransferFrom = false;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('ownershipSettingsCount')).toHaveTextContent('2');
      expect(screen.getByTestId('setting-setAddr')).toBeInTheDocument();
      expect(screen.getByTestId('setting-setName')).toBeInTheDocument();
    });

    it('should generate reclaim when canReclaim is true', async () => {
      mockCanSetAddr = false;
      mockCanReclaim = true;
      mockCanSafeTransferFrom = false;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('ownershipSettingsCount')).toHaveTextContent('1');
      expect(screen.getByTestId('setting-reclaim')).toBeInTheDocument();
    });

    it('should generate safeTransferFrom when canSafeTransferFrom is true', async () => {
      mockCanSetAddr = false;
      mockCanReclaim = false;
      mockCanSafeTransferFrom = true;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('ownershipSettingsCount')).toHaveTextContent('1');
      expect(screen.getByTestId('setting-safeTransferFrom')).toBeInTheDocument();
    });

    it('should generate no settings when all permissions are false', async () => {
      mockCanSetAddr = false;
      mockCanReclaim = false;
      mockCanSafeTransferFrom = false;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('ownershipSettingsCount')).toHaveTextContent('0');
    });

    it('should display correct ownership setting details', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('setting-setAddr-name')).toHaveTextContent('Address record');
      expect(screen.getByTestId('setting-setName-name')).toHaveTextContent('Name record');
      expect(screen.getByTestId('setting-reclaim-name')).toHaveTextContent('Profile editing');
      expect(screen.getByTestId('setting-safeTransferFrom-name')).toHaveTextContent(
        'Token ownership',
      );
    });
  });

  describe('batchTransactionsEnabled', () => {
    it('should reflect batchCallsEnabled from hook', () => {
      mockBatchCallsEnabled = true;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('batchTransactionsEnabled')).toHaveTextContent('true');
    });

    it('should be false when batchCallsEnabled is false', () => {
      mockBatchCallsEnabled = false;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('batchTransactionsEnabled')).toHaveTextContent('false');
    });
  });

  describe('isSuccess detection', () => {
    it('should be true when batchCallsStatus is Success', async () => {
      mockBatchCallsStatus = 'success';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('isSuccess')).toHaveTextContent('true');
      });
    });

    it('should be true when all ownership settings have Success status', async () => {
      mockSetAddrStatus = 'success';
      mockSetNameStatus = 'success';
      mockReclaimStatus = 'success';
      mockSafeTransferFromStatus = 'success';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('isSuccess')).toHaveTextContent('true');
      });
    });

    it('should be false when batchCallsStatus is not Success and not all settings are Success', async () => {
      mockBatchCallsStatus = 'idle';
      mockSetAddrStatus = 'success';
      mockSetNameStatus = 'idle';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('isSuccess')).toHaveTextContent('false');
    });
  });

  describe('step transitions based on success', () => {
    it('should transition to Success step when isSuccess becomes true', async () => {
      mockBatchCallsStatus = 'success';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('success');
      });
    });
  });

  describe('step transitions based on batchCallsStatus canceled', () => {
    it('should reset to OwnershipOverview when batchCallsStatus is Canceled on mount', () => {
      // When batchCallsStatus is Canceled at mount, the effect will transition to OwnershipOverview
      mockBatchCallsStatus = 'canceled';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      // The effect for canceled status runs and sets step to OwnershipOverview
      expect(screen.getByTestId('currentOwnershipStep')).toHaveTextContent('ownership-overview');
    });
  });

  describe('ownershipTransactionHash', () => {
    it('should return batchCallTransactionHash when available', () => {
      mockBatchCallTransactionHash = '0xbatchhash123456789012345678901234567890123456789012345678901234';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('ownershipTransactionHash')).toHaveTextContent(
        '0xbatchhash123456789012345678901234567890123456789012345678901234',
      );
    });

    it('should return safeTransferFromTransactionHash when batchCallTransactionHash is undefined', () => {
      mockBatchCallTransactionHash = undefined;
      mockSafeTransferFromTransactionHash =
        '0xtransferhash12345678901234567890123456789012345678901234567890';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('ownershipTransactionHash')).toHaveTextContent(
        '0xtransferhash12345678901234567890123456789012345678901234567890',
      );
    });

    it('should be undefined when both hashes are undefined', () => {
      mockBatchCallTransactionHash = undefined;
      mockSafeTransferFromTransactionHash = undefined;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('ownershipTransactionHash')).toHaveTextContent('undefined');
    });
  });

  describe('batchCallsStatus and batchCallsIsLoading', () => {
    it('should reflect batchCallsStatus from hook', () => {
      mockBatchCallsStatus = 'processing';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('batchCallsStatus')).toHaveTextContent('processing');
    });

    it('should reflect batchCallsIsLoading from hook', () => {
      mockBatchCallsIsLoading = true;

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      expect(screen.getByTestId('batchCallsIsLoading')).toHaveTextContent('true');
    });
  });

  describe('contract function calls', () => {
    it('should call initiateSetAddr when setAddr contractFunction is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      await act(async () => {
        screen.getByTestId('setting-setAddr-call').click();
      });

      expect(mockInitiateSetAddr).toHaveBeenCalled();
    });

    it('should call initiateReclaim when reclaim contractFunction is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      await act(async () => {
        screen.getByTestId('setting-reclaim-call').click();
      });

      expect(mockInitiateReclaim).toHaveBeenCalled();
    });

    it('should call initiateSafeTransferFrom when safeTransferFrom contractFunction is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      await act(async () => {
        screen.getByTestId('setting-safeTransferFrom-call').click();
      });

      expect(mockInitiateSafeTransferFrom).toHaveBeenCalled();
    });

    it('should call initiateSetName when setName contractFunction is called', async () => {
      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      await act(async () => {
        screen.getByTestId('setting-setName-call').click();
      });

      expect(mockInitiateSetName).toHaveBeenCalled();
    });
  });

  describe('ownership settings status tracking', () => {
    it('should track setAddr status correctly', async () => {
      mockSetAddrStatus = 'processing';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('setting-setAddr-status')).toHaveTextContent('processing');
    });

    it('should track reclaim status correctly', async () => {
      mockReclaimStatus = 'approved';

      render(
        <ProfileTransferOwnershipProvider>
          <TestConsumer />
        </ProfileTransferOwnershipProvider>,
      );

      await act(async () => {
        screen.getByTestId('setRecipient').click();
      });

      expect(screen.getByTestId('setting-reclaim-status')).toHaveTextContent('approved');
    });
  });
});
