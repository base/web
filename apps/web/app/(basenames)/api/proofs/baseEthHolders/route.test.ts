/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';
import { base, baseSepolia } from 'viem/chains';

type ErrorResponse = { error: string };

type SuccessResponse = {
  address: string;
  namespace: string;
  proofs: string[];
  discountValidatorAddress: string;
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
    getWalletProofs: jest.fn(),
    ProofTableNamespace: {
      BaseEthHolders: 'basenames_base_eth_holders_discount',
    },
    ProofsException: MockProofsException,
  };
});

jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

import {
  proofValidation,
  getWalletProofs,
  ProofsException,
} from 'apps/web/src/utils/proofs';

const mockProofValidation = proofValidation as jest.Mock;
const mockGetWalletProofs = getWalletProofs as jest.Mock;
const MockProofsException = ProofsException;

describe('baseEthHolders route', () => {
  const validAddress = '0x1234567890123456789012345678901234567890';
  const validChain = base.id.toString();

  beforeEach(() => {
    jest.clearAllMocks();
    mockProofValidation.mockReturnValue(undefined);
  });

  describe('GET', () => {
    it('should return 405 when method is not GET', async () => {
      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
        { method: 'POST' },
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(405);
      expect(data).toEqual({ error: 'method not allowed' });
    });

    it('should return 400 when address validation fails', async () => {
      mockProofValidation.mockReturnValue({
        error: 'A single valid address is required',
        status: 400,
      });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=invalid&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'A single valid address is required' });
    });

    it('should return 400 when chain validation fails', async () => {
      mockProofValidation.mockReturnValue({ error: 'invalid chain', status: 400 });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=invalid`,
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
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=1`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'chain must be Base or Base Sepolia' });
    });

    it('should return successful response with proofs for valid request', async () => {
      const mockResponse: SuccessResponse = {
        address: validAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: [
          '0x56ce3bbc909b90035ae373d32c56a9d81d26bb505dd935cdee6afc384bcaed8d',
          '0x99e940ed9482bf59ba5ceab7df0948798978a1acaee0ecb41f64fe7f40eedd17',
        ],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
      expect(mockGetWalletProofs).toHaveBeenCalledWith(
        validAddress,
        base.id,
        'basenames_base_eth_holders_discount',
      );
    });

    it('should return successful response for Base Sepolia chain', async () => {
      const mockResponse: SuccessResponse = {
        address: validAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: ['0xproof1', '0xproof2'],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${baseSepolia.id.toString()}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
      expect(mockGetWalletProofs).toHaveBeenCalledWith(
        validAddress,
        baseSepolia.id,
        'basenames_base_eth_holders_discount',
      );
    });

    it('should return 409 when address has already claimed a username', async () => {
      mockGetWalletProofs.mockRejectedValue(
        new MockProofsException('This address has already claimed a username.', 409),
      );

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(409);
      expect(data).toEqual({ error: 'This address has already claimed a username.' });
    });

    it('should return 404 when address is not eligible for base eth holders discount', async () => {
      mockGetWalletProofs.mockRejectedValue(
        new MockProofsException(
          'address is not eligible for [basenames_base_eth_holders_discount] this discount.',
          404,
        ),
      );

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(404);
      expect(data).toEqual({
        error: 'address is not eligible for [basenames_base_eth_holders_discount] this discount.',
      });
    });

    it('should return 500 when an unexpected error occurs', async () => {
      mockGetWalletProofs.mockRejectedValue(new Error('Unexpected error'));

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
    });

    it('should call proofValidation with correct parameters', async () => {
      const mockResponse: SuccessResponse = {
        address: validAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: ['0xproof'],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      await GET(request);

      expect(mockProofValidation).toHaveBeenCalledWith(validAddress, validChain);
    });

    it('should return response with empty proofs array when no proofs exist', async () => {
      const mockResponse: SuccessResponse = {
        address: validAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: [],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as SuccessResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockResponse);
      expect(data.proofs).toEqual([]);
    });

    it('should handle missing address parameter', async () => {
      mockProofValidation.mockReturnValue({
        error: 'A single valid address is required',
        status: 400,
      });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?chain=${validChain}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'A single valid address is required' });
    });

    it('should handle missing chain parameter', async () => {
      mockProofValidation.mockReturnValue({
        error: 'invalid chain',
        status: 400,
      });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}`,
      );

      const response = await GET(request);
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'invalid chain' });
    });

    it('should pass address directly to getWalletProofs without modification', async () => {
      const mixedCaseAddress = '0xAbCdEf1234567890123456789012345678901234';
      const mockResponse: SuccessResponse = {
        address: mixedCaseAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: ['0xproof'],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${mixedCaseAddress}&chain=${validChain}`,
      );

      await GET(request);

      expect(mockGetWalletProofs).toHaveBeenCalledWith(
        mixedCaseAddress,
        base.id,
        'basenames_base_eth_holders_discount',
      );
    });

    it('should call getWalletProofs with BaseEthHolders namespace', async () => {
      const mockResponse: SuccessResponse = {
        address: validAddress,
        namespace: 'basenames_base_eth_holders_discount',
        proofs: ['0xproof'],
        discountValidatorAddress: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
      };
      mockGetWalletProofs.mockResolvedValue(mockResponse);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/baseEthHolders?address=${validAddress}&chain=${validChain}`,
      );

      await GET(request);

      expect(mockGetWalletProofs).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Number),
        'basenames_base_eth_holders_discount',
      );
    });
  });
});
