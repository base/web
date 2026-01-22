/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET, DiscountCodeResponse } from './route';
import { base, baseSepolia } from 'viem/chains';

type ErrorResponse = { error: string };
type DiscountCodeRouteResponse = DiscountCodeResponse | ErrorResponse;

// Mock dependencies
jest.mock('apps/web/src/utils/proofs', () => ({
  proofValidation: jest.fn(),
  signDiscountMessageWithTrustedSigner: jest.fn(),
}));

jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('apps/web/src/utils/proofs/discount_code_storage', () => ({
  getDiscountCode: jest.fn(),
}));

jest.mock('apps/web/src/addresses/usernames', () => ({
  USERNAME_DISCOUNT_CODE_VALIDATORS: {
    [8453]: '0x6F9A31238F502E9C9489274E59a44c967F4deC91',
    [84532]: '0x52acEeB464F600437a3681bEC087fb53F3f75638',
  },
}));

import {
  proofValidation,
  signDiscountMessageWithTrustedSigner,
} from 'apps/web/src/utils/proofs';
import { getDiscountCode } from 'apps/web/src/utils/proofs/discount_code_storage';

const mockProofValidation = proofValidation as jest.Mock;
const mockSignDiscountMessage = signDiscountMessageWithTrustedSigner as jest.Mock;
const mockGetDiscountCode = getDiscountCode as jest.Mock;

describe('discountCode route', () => {
  const validAddress = '0x1234567890123456789012345678901234567890';
  const validChain = base.id.toString();
  const validCode = 'DISCOUNT123';
  const futureDate = new Date(Date.now() + 86400000); // 1 day in the future

  beforeEach(() => {
    jest.clearAllMocks();
    mockProofValidation.mockReturnValue(undefined);
  });

  describe('GET', () => {
    it('should return 400 when address validation fails', async () => {
      mockProofValidation.mockReturnValue({ error: 'A single valid address is required', status: 400 });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=invalid&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'A single valid address is required' });
    });

    it('should return 400 when chain validation fails', async () => {
      mockProofValidation.mockReturnValue({ error: 'invalid chain', status: 400 });

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=invalid&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'invalid chain' });
    });

    it('should return 500 when no code is provided', async () => {
      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
    });

    it('should return 500 when discount code is not found', async () => {
      mockGetDiscountCode.mockResolvedValue([]);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
      expect(mockGetDiscountCode).toHaveBeenCalledWith(validCode);
    });

    it('should return 500 when discount code is null', async () => {
      mockGetDiscountCode.mockResolvedValue(null);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
    });

    it('should return 500 when discount code is expired', async () => {
      const pastDate = new Date(Date.now() - 86400000); // 1 day in the past
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: pastDate,
          usage_count: 0,
          usage_limit: 10,
        },
      ]);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
    });

    it('should return 500 when discount code usage limit is reached', async () => {
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 10,
          usage_limit: 10,
        },
      ]);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
    });

    it('should return 500 when discount code usage exceeds limit', async () => {
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 15,
          usage_limit: 10,
        },
      ]);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Discount code invalid' });
    });

    it('should return signed message for valid discount code on Base mainnet', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 5,
          usage_limit: 10,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({
        discountValidatorAddress: '0x6F9A31238F502E9C9489274E59a44c967F4deC91',
        address: validAddress,
        signedMessage: mockSignature,
      });
      expect(mockSignDiscountMessage).toHaveBeenCalled();
    });

    it('should return signed message for valid discount code on Base Sepolia', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 10,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${baseSepolia.id.toString()}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({
        discountValidatorAddress: '0x52acEeB464F600437a3681bEC087fb53F3f75638',
        address: validAddress,
        signedMessage: mockSignature,
      });
    });

    it('should call signDiscountMessageWithTrustedSigner with correct parameters', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 10,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      await GET(request);

      expect(mockSignDiscountMessage).toHaveBeenCalledWith(
        validAddress,
        expect.any(String), // couponCodeUuid (hex-encoded code)
        '0x6F9A31238F502E9C9489274E59a44c967F4deC91', // validator address
        expect.any(Number) // expirationTimeUnix
      );
    });

    it('should return 500 when signing throws an error', async () => {
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 10,
        },
      ]);
      mockSignDiscountMessage.mockRejectedValue(new Error('Signing failed'));

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
    });

    it('should return 500 when getDiscountCode throws an error', async () => {
      mockGetDiscountCode.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
    });

    it('should handle discount code with zero usage count', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 100,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeResponse;

      expect(response.status).toBe(200);
      expect(data.signedMessage).toBe(mockSignature);
    });

    it('should handle discount code with usage_count one below limit', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 9,
          usage_limit: 10,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeResponse;

      expect(response.status).toBe(200);
      expect(data.signedMessage).toBe(mockSignature);
    });

    it('should use the first discount code when multiple are returned', async () => {
      const mockSignature = '0xmocksignature123456789';
      mockGetDiscountCode.mockResolvedValue([
        {
          code: validCode,
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 10,
        },
        {
          code: 'ANOTHER_CODE',
          expires_at: futureDate,
          usage_count: 0,
          usage_limit: 5,
        },
      ]);
      mockSignDiscountMessage.mockResolvedValue(mockSignature);

      const request = new NextRequest(
        `https://www.base.org/api/proofs/discountCode?address=${validAddress}&chain=${validChain}&code=${validCode}`
      );

      const response = await GET(request);
      const data = (await response.json()) as DiscountCodeResponse;

      expect(response.status).toBe(200);
      expect(data.signedMessage).toBe(mockSignature);
    });
  });
});
