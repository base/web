import { createEnsProvider } from './ensProvider';
import type { WalletClient, PublicClient } from 'viem';
import { base } from 'viem/chains';

describe('ensProvider', () => {
  let mockWalletClient: Partial<WalletClient>;
  let mockPublicClient: Partial<PublicClient>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock wallet client
    mockWalletClient = {
      getAddresses: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
      writeContract: jest
        .fn()
        .mockResolvedValue('0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd'),
      chain: base,
    } as unknown as Partial<WalletClient>;

    // Mock public client
    mockPublicClient = {
      readContract: jest
        .fn()
        .mockResolvedValue('0x9999999999999999999999999999999999999999'),
      waitForTransactionReceipt: jest.fn().mockResolvedValue({
        status: 'success',
        blockHash: '0x1111111111111111111111111111111111111111111111111111111111111111',
        transactionHash: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      }),
      chain: base,
      extend: jest.fn().mockReturnThis(),
    } as unknown as Partial<PublicClient>;
  });

  describe('createEnsProvider', () => {
    it('should create a provider with getResolver method', () => {
      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      expect(provider).toBeDefined();
      expect(provider.getResolver).toBeDefined();
      expect(typeof provider.getResolver).toBe('function');
    });

    it('should get resolver for a given name', async () => {
      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      const resolver = await provider.getResolver('kushmanmb.eth');

      expect(resolver).toBeDefined();
      expect(resolver.address).toBe('0x9999999999999999999999999999999999999999');
      expect(resolver.setText).toBeDefined();
      expect(mockPublicClient.readContract).toHaveBeenCalled();
    });

    it('should throw error if no resolver found', async () => {
      (mockPublicClient.readContract as jest.Mock).mockResolvedValue(
        '0x0000000000000000000000000000000000000000',
      );

      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      await expect(provider.getResolver('nonexistent.eth')).rejects.toThrow(
        'No resolver found for',
      );
    });
  });

  describe('resolver.setText', () => {
    it('should call setText and return a transaction', async () => {
      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      const resolver = await provider.getResolver('kushmanmb.eth');
      const tx = await resolver.setText('twitter', '@kushmanmb');

      expect(tx).toBeDefined();
      expect(tx.hash).toBe('0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd');
      expect(tx.wait).toBeDefined();
      expect(mockWalletClient.writeContract).toHaveBeenCalled();
    });

    it('should throw error if no account found', async () => {
      (mockWalletClient.getAddresses as jest.Mock).mockResolvedValue([]);

      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      const resolver = await provider.getResolver('kushmanmb.eth');

      await expect(resolver.setText('twitter', '@kushmanmb')).rejects.toThrow(
        'No account found in wallet',
      );
    });
  });

  describe('transaction.wait', () => {
    it('should wait for transaction receipt', async () => {
      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      const resolver = await provider.getResolver('kushmanmb.eth');
      const tx = await resolver.setText('twitter', '@kushmanmb');
      const receipt = await tx.wait();

      expect(receipt).toBeDefined();
      expect(receipt.status).toBe('success');
      expect(receipt.transactionHash).toBe(
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      );
      expect(mockPublicClient.waitForTransactionReceipt).toHaveBeenCalledWith({
        hash: tx.hash,
        confirmations: 1,
      });
    });
  });

  describe('full flow', () => {
    it('should execute the complete flow from problem statement', async () => {
      const provider = createEnsProvider(
        mockWalletClient as WalletClient,
        mockPublicClient as PublicClient,
      );

      // This is the exact usage from the problem statement
      const resolver = await provider.getResolver('kushmanmb.eth');
      const tx = await resolver.setText('twitter', '@kushmanmb');
      const receipt = await tx.wait();

      // Verify all steps executed successfully
      expect(resolver.address).toBe('0x9999999999999999999999999999999999999999');
      expect(tx.hash).toBeDefined();
      expect(receipt.status).toBe('success');
    });
  });
});
