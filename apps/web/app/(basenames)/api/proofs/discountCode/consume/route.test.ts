/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from './route';

type SuccessResponse = { success: boolean };
type ErrorResponse = { error: string };
type ConsumeRouteResponse = SuccessResponse | ErrorResponse;

// Mock dependencies
jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('apps/web/src/utils/proofs/discount_code_storage', () => ({
  incrementDiscountCodeUsage: jest.fn(),
}));

import { incrementDiscountCodeUsage } from 'apps/web/src/utils/proofs/discount_code_storage';
import { logger } from 'apps/web/src/utils/logger';

const mockIncrementDiscountCodeUsage = incrementDiscountCodeUsage as jest.Mock;
const mockLogger = logger as jest.Mocked<typeof logger>;

describe('discountCode consume route', () => {
  const validCode = 'DISCOUNT123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('should return 405 when method is not POST', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        { method: 'GET' }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(405);
      expect(data).toEqual({ error: 'Method not allowed' });
    });

    it('should return 500 when code is missing from request body', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Invalid request' });
    });

    it('should return 500 when code is null', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: null }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Invalid request' });
    });

    it('should return 500 when code is not a string', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: 12345 }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Invalid request' });
    });

    it('should return 500 when code is an empty string', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: '' }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Invalid request' });
    });

    it('should successfully increment discount code usage and return success', async () => {
      mockIncrementDiscountCodeUsage.mockResolvedValue(undefined);

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: validCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(mockIncrementDiscountCodeUsage).toHaveBeenCalledWith(validCode);
    });

    it('should call incrementDiscountCodeUsage with the correct code', async () => {
      const testCode = 'TEST_CODE_ABC';
      mockIncrementDiscountCodeUsage.mockResolvedValue(undefined);

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: testCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      await POST(request);

      expect(mockIncrementDiscountCodeUsage).toHaveBeenCalledWith(testCode);
      expect(mockIncrementDiscountCodeUsage).toHaveBeenCalledTimes(1);
    });

    it('should return 500 when incrementDiscountCodeUsage throws an error', async () => {
      mockIncrementDiscountCodeUsage.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: validCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
      expect(mockLogger.error).toHaveBeenCalledWith(
        'error incrementing the discount code',
        expect.any(Error)
      );
    });

    it('should log the error when incrementDiscountCodeUsage fails', async () => {
      const testError = new Error('Connection timeout');
      mockIncrementDiscountCodeUsage.mockRejectedValue(testError);

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: validCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      await POST(request);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'error incrementing the discount code',
        testError
      );
    });

    it('should return 500 when JSON parsing fails', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: 'invalid json',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'An unexpected error occurred' });
    });

    it('should handle code with special characters', async () => {
      const specialCode = 'CODE-WITH_SPECIAL.123';
      mockIncrementDiscountCodeUsage.mockResolvedValue(undefined);

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: specialCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(mockIncrementDiscountCodeUsage).toHaveBeenCalledWith(specialCode);
    });

    it('should handle lowercase discount codes', async () => {
      const lowercaseCode = 'discount123';
      mockIncrementDiscountCodeUsage.mockResolvedValue(undefined);

      const request = new NextRequest(
        'https://www.base.org/api/proofs/discountCode/consume',
        {
          method: 'POST',
          body: JSON.stringify({ code: lowercaseCode }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const response = await POST(request);
      const data = (await response.json()) as ConsumeRouteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(mockIncrementDiscountCodeUsage).toHaveBeenCalledWith(lowercaseCode);
    });
  });
});
