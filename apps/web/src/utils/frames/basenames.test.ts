/**
 * @jest-environment node
 */
import { createPublicClient } from 'viem';
import { base } from 'viem/chains';
import { RawErrorStrings, getTransactionStatus } from './basenames';

jest.mock('viem', () => ({
  createPublicClient: jest.fn(),
  http: jest.fn(() => 'mocked-transport'),
}));

describe('basenames', () => {
  describe('RawErrorStrings', () => {
    it('should have correct Unavailable error message', () => {
      expect(RawErrorStrings.Unavailable).toBe('Name unavailable');
    });

    it('should have correct TooShort error message', () => {
      expect(RawErrorStrings.TooShort).toBe('Name is too short');
    });

    it('should have correct TooLong error message', () => {
      expect(RawErrorStrings.TooLong).toBe('Name is too long');
    });

    it('should have correct DisallowedChars error message', () => {
      expect(RawErrorStrings.DisallowedChars).toBe('disallowed character:');
    });

    it('should have correct Invalid error message', () => {
      expect(RawErrorStrings.Invalid).toBe('Name is invalid');
    });

    it('should have correct InvalidUnderscore error message', () => {
      expect(RawErrorStrings.InvalidUnderscore).toBe('underscore allowed only at start');
    });
  });

  describe('getTransactionStatus', () => {
    const mockWaitForTransactionReceipt = jest.fn();
    const mockClient = {
      waitForTransactionReceipt: mockWaitForTransactionReceipt,
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (createPublicClient as jest.Mock).mockReturnValue(mockClient);
    });

    it('should create a public client with the provided chain', async () => {
      mockWaitForTransactionReceipt.mockResolvedValue({ status: 'success' });

      await getTransactionStatus(base, '0x123abc');

      expect(createPublicClient).toHaveBeenCalledWith({
        chain: base,
        transport: 'mocked-transport',
      });
    });

    it('should return the transaction status when successful', async () => {
      mockWaitForTransactionReceipt.mockResolvedValue({ status: 'success' });

      const result = await getTransactionStatus(base, '0x123abc');

      expect(result).toBe('success');
      expect(mockWaitForTransactionReceipt).toHaveBeenCalledWith({ hash: '0x123abc' });
    });

    it('should return "reverted" status when transaction is reverted', async () => {
      mockWaitForTransactionReceipt.mockResolvedValue({ status: 'reverted' });

      const result = await getTransactionStatus(base, '0xfailed');

      expect(result).toBe('reverted');
    });

    it('should return undefined when an error occurs', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockWaitForTransactionReceipt.mockRejectedValue(new Error('Network error'));

      const result = await getTransactionStatus(base, '0xinvalid');

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Could not get transaction receipt:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should pass transaction hash to waitForTransactionReceipt', async () => {
      mockWaitForTransactionReceipt.mockResolvedValue({ status: 'success' });
      const transactionId = '0xabcdef1234567890';

      await getTransactionStatus(base, transactionId);

      expect(mockWaitForTransactionReceipt).toHaveBeenCalledWith({ hash: transactionId });
    });
  });
});
