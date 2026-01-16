/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';
import { base, baseSepolia } from 'viem/chains';

type ErrorResponse = { error: string };

type SuccessResponse = {
  signedMessage?: string;
  attestations: {
    name: string;
    type: string;
    signature: string;
    value: {
      name: string;
      type: string;
      value: boolean;
    };
  }[];
  discountValidatorAddress: string;
  expires?: string;
};

// Mock dependencies
jest.mock('apps/web/src/utils/proofs', () => {
  class MockProofsException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.name = 'ProofsException';
      this.statusCode = statusCode;
    }
  }

  return {
    proofValidation: jest.fn(),
    DiscountType: {
      CB: 'CB',
      CB1: 'CB1',
      CB_ID: 'CB_ID',
      DISCOUNT_CODE: 'DISCOUNT_CODE',
    },
    ProofsException: MockProofsException,
  };
});

jest.mock('apps/web/src/utils/proofs/sybil_resistance', () => ({
  sybilResistantUsernameSigning: jest.fn(),
}));

jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('apps/web/src/constants', () => ({
  trustedSignerPKey: 'mock-private-key',
}));

import { proofValidation, ProofsException } from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';

const mockProofValidation = proofValidation as jest.Mock;
const mockSybilResistantUsernameSigning = sybilResistantUsernameSigning as jest.Mock;
const MockProofsException = ProofsException;

describe('cb1 route', () => {
  const validAddress = '0x1234567890123456789012345678901234567890';
  const validChain = base.id.toString();

  beforeEach(() => {
    jest.clearAllMocks();
    mockProofValidation.mockReturnValue(undefined);
  });

  describe('GET', () => {
    it('should return 400 when address validation fails', async () => {
      mockProofValidation.mockReturnValue({
        error: 'A single valid address is required',
        status: 400,
      });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=invalid&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'A single valid address is required' });
    });

    it('should return 400 when chain validation fails', async () => {
      mockProofValidation.mockReturnValue({ error: 'invalid chain', status: 400 });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=invalid`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'invalid chain' });
    });

    it('should return 400 when chain is not Base or Base Sepolia', async () => {
      mockProofValidation.mockReturnValue({
        error: 'chain must be Base or Base Sepolia',
        status: 400,
      });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=1`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'chain must be Base or Base Sepolia' });
    });

    it('should return successful response with signed message for valid request', async () => {
      const mockResponse: SuccessResponse = {
        signedMessage: '0xmocksignature123456789',
        attestations: [
          {
            name: 'verifiedCoinbaseOne',
            type: 'bool',
            signature: 'bool verifiedCoinbaseOne',
            value: {
              name: 'verifiedCoinbaseOne',
              type: 'bool',
              value: true,
            },
          },
        ],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockSybilResistantUsernameSigning.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
      expect(mockSybilResistantUsernameSigning).toHaveBeenCalledWith(
        validAddress,
        'CB1',
        base.id,
      );
    });

    it('should return successful response for Base Sepolia chain', async () => {
      const mockResponse: SuccessResponse = {
        signedMessage: '0xmocksignature123456789',
        attestations: [],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockSybilResistantUsernameSigning.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${baseSepolia.id.toString()}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
      expect(mockSybilResistantUsernameSigning).toHaveBeenCalledWith(
        validAddress,
        'CB1',
        baseSepolia.id,
      );
    });

    it('should return 409 when user has already claimed a username', async () => {
      mockSybilResistantUsernameSigning.mockRejectedValue(
        new MockProofsException('You have already claimed a discounted basename (onchain).', 409),
      );

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(409);
      expect(data).toEqual({ error: 'You have already claimed a discounted basename (onchain).' });
    });

    it('should return 400 when user tried claiming with a different address', async () => {
      mockSybilResistantUsernameSigning.mockRejectedValue(
        new MockProofsException(
          'You tried claiming this with a different address, wait a couple minutes to try again.',
          400,
        ),
      );

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error:
          'You tried claiming this with a different address, wait a couple minutes to try again.',
      });
    });

    it('should return 500 when an unexpected error occurs', async () => {
      mockSybilResistantUsernameSigning.mockRejectedValue(new Error('Unexpected error'));

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
    });

    it('should return empty attestations when no attestations are found', async () => {
      const mockResponse: SuccessResponse = {
        attestations: [],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockSybilResistantUsernameSigning.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
    });

    it('should return 500 when discountValidatorAddress is invalid', async () => {
      mockSybilResistantUsernameSigning.mockRejectedValue(
        new MockProofsException('Must provide a valid discountValidatorAddress', 500),
      );

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Must provide a valid discountValidatorAddress' });
    });

    it('should call proofValidation with correct parameters', async () => {
      const mockResponse: SuccessResponse = {
        signedMessage: '0xmocksignature',
        attestations: [],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockSybilResistantUsernameSigning.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      await GET(request);

      expect(mockProofValidation).toHaveBeenCalledWith(validAddress, validChain);
    });

    it('should return response with expires field when present', async () => {
      const mockResponse: SuccessResponse = {
        signedMessage: '0xmocksignature123456789',
        attestations: [
          {
            name: 'verifiedCoinbaseOne',
            type: 'bool',
            signature: 'bool verifiedCoinbaseOne',
            value: {
              name: 'verifiedCoinbaseOne',
              type: 'bool',
              value: true,
            },
          },
        ],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
        expires: '30',
      };
      mockSybilResistantUsernameSigning.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/cb1?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data.expires).toBe('30');
    });
  });
});

describe('cb1 route - trustedSignerPKey missing', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return 500 when trustedSignerPKey is not set', async () => {
    jest.doMock('apps/web/src/constants', () => ({
      trustedSignerPKey: null,
    }));

    jest.doMock('apps/web/src/utils/proofs', () => {
      class MockProofsExceptionLocal extends Error {
        public statusCode: number;

        constructor(message: string, statusCode: number) {
          super(message);
          this.name = 'ProofsException';
          this.statusCode = statusCode;
        }
      }

      return {
        proofValidation: jest.fn().mockReturnValue(undefined),
        DiscountType: {
          CB: 'CB',
          CB1: 'CB1',
          CB_ID: 'CB_ID',
          DISCOUNT_CODE: 'DISCOUNT_CODE',
        },
        ProofsException: MockProofsExceptionLocal,
      };
    });

    jest.doMock('apps/web/src/utils/proofs/sybil_resistance', () => ({
      sybilResistantUsernameSigning: jest.fn(),
    }));

    jest.doMock('apps/web/src/utils/logger', () => ({
      logger: {
        error: jest.fn(),
      },
    }));

    const { GET: GETWithoutKey } = await import('./route');

    const testAddress = '0x1234567890123456789012345678901234567890';
    const testChain = base.id.toString();

    const request = new NextRequest(
      `https://www.base.org/api/proofs/cb1?address=${testAddress}&chain=${testChain}`,
    );

    const response = await GETWithoutKey(request);
    const data = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'currently unable to sign' });
  });
});
