/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { base, baseSepolia } from 'viem/chains';
import useBasenameChain, {
  getBasenamePublicClient,
  isBasenameSupportedChain,
  supportedChainIds,
} from './useBasenameChain';
import { Basename } from '@coinbase/onchainkit/identity';

// Mock wagmi
const mockUseAccount = jest.fn();
jest.mock('wagmi', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useAccount: () => mockUseAccount(),
}));

// Mock the getChainForBasename function
jest.mock('apps/web/src/utils/usernames', () => ({
  getChainForBasename: (username: Basename) => {
    // Simulate real behavior: mainnet for .base.eth, testnet for .basetest.eth
    if (username.endsWith('.base.eth')) {
      return { id: 8453, name: 'Base' };
    }
    return { id: 84532, name: 'Base Sepolia' };
  },
}));

// Mock the constants
jest.mock('apps/web/src/constants', () => ({
  isDevelopment: false,
}));

// Mock the CDP constants
jest.mock('apps/web/src/cdp/constants', () => ({
  cdpBaseRpcEndpoint: 'https://mainnet.base.org',
  cdpBaseSepoliaRpcEndpoint: 'https://sepolia.base.org',
}));

describe('useBasenameChain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAccount.mockReturnValue({ chain: undefined });
  });

  describe('supportedChainIds', () => {
    it('should include Base mainnet chain id', () => {
      expect(supportedChainIds).toContain(base.id);
    });

    it('should include Base Sepolia chain id', () => {
      expect(supportedChainIds).toContain(baseSepolia.id);
    });

    it('should have exactly 2 supported chains', () => {
      expect(supportedChainIds).toHaveLength(2);
    });
  });

  describe('isBasenameSupportedChain', () => {
    it('should return true for Base mainnet', () => {
      expect(isBasenameSupportedChain(base.id)).toBe(true);
    });

    it('should return true for Base Sepolia', () => {
      expect(isBasenameSupportedChain(baseSepolia.id)).toBe(true);
    });

    it('should return false for Ethereum mainnet', () => {
      expect(isBasenameSupportedChain(1)).toBe(false);
    });

    it('should return false for Polygon', () => {
      expect(isBasenameSupportedChain(137)).toBe(false);
    });

    it('should return false for arbitrary chain id', () => {
      expect(isBasenameSupportedChain(999999)).toBe(false);
    });

    it('should return false for 0', () => {
      expect(isBasenameSupportedChain(0)).toBe(false);
    });
  });

  describe('getBasenamePublicClient', () => {
    it('should return a public client for Base mainnet', () => {
      const client = getBasenamePublicClient(base.id);

      expect(client).toBeDefined();
      expect(client.chain).toEqual(base);
    });

    it('should return a public client for Base Sepolia', () => {
      const client = getBasenamePublicClient(baseSepolia.id);

      expect(client).toBeDefined();
      expect(client.chain).toEqual(baseSepolia);
    });

    it('should default to Base mainnet for unknown chain ids', () => {
      const client = getBasenamePublicClient(1);

      expect(client.chain).toEqual(base);
    });
  });

  describe('useBasenameChain hook', () => {
    describe('when username is provided', () => {
      it('should return Base mainnet for .base.eth names', () => {
        mockUseAccount.mockReturnValue({ chain: undefined });

        const { result } = renderHook(() =>
          useBasenameChain('testname.base.eth' as Basename)
        );

        expect(result.current.basenameChain.id).toBe(8453);
      });

      it('should return Base Sepolia for .basetest.eth names', () => {
        mockUseAccount.mockReturnValue({ chain: undefined });

        const { result } = renderHook(() =>
          useBasenameChain('testname.basetest.eth' as Basename)
        );

        expect(result.current.basenameChain.id).toBe(84532);
      });

      it('should ignore connected chain when username is provided', () => {
        mockUseAccount.mockReturnValue({ chain: baseSepolia });

        const { result } = renderHook(() =>
          useBasenameChain('testname.base.eth' as Basename)
        );

        // Should still return mainnet based on the username, not the connected chain
        expect(result.current.basenameChain.id).toBe(8453);
      });
    });

    describe('when username is not provided', () => {
      it('should return connected chain if it is a supported chain (Base mainnet)', () => {
        mockUseAccount.mockReturnValue({ chain: base });

        const { result } = renderHook(() => useBasenameChain());

        expect(result.current.basenameChain).toEqual(base);
      });

      it('should return connected chain if it is a supported chain (Base Sepolia)', () => {
        mockUseAccount.mockReturnValue({ chain: baseSepolia });

        const { result } = renderHook(() => useBasenameChain());

        expect(result.current.basenameChain).toEqual(baseSepolia);
      });

      it('should return Base mainnet when not connected (production)', () => {
        mockUseAccount.mockReturnValue({ chain: undefined });

        const { result } = renderHook(() => useBasenameChain());

        expect(result.current.basenameChain).toEqual(base);
      });

      it('should return Base mainnet when connected to unsupported chain', () => {
        mockUseAccount.mockReturnValue({ chain: { id: 1, name: 'Ethereum' } });

        const { result } = renderHook(() => useBasenameChain());

        expect(result.current.basenameChain).toEqual(base);
      });
    });

    describe('basenamePublicClient', () => {
      it('should return a public client matching the chain', () => {
        mockUseAccount.mockReturnValue({ chain: base });

        const { result } = renderHook(() => useBasenameChain());

        expect(result.current.basenamePublicClient).toBeDefined();
        expect(result.current.basenamePublicClient.chain).toEqual(base);
      });

      it('should return Base Sepolia client for testnet name', () => {
        mockUseAccount.mockReturnValue({ chain: undefined });

        const { result } = renderHook(() =>
          useBasenameChain('testname.basetest.eth' as Basename)
        );

        expect(result.current.basenamePublicClient.chain).toEqual(baseSepolia);
      });
    });
  });
});
