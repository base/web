/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { base } from 'viem/chains';
import { getChain } from './getChain';

describe('getChain', () => {
  describe('when chainId query parameter is provided', () => {
    it('should return the chainId as a number', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=8453');

      const result = getChain(request);

      expect(result).toBe(8453);
    });

    it('should handle Base Sepolia chainId', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=84532');

      const result = getChain(request);

      expect(result).toBe(84532);
    });

    it('should convert string chainId to number', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=1');

      const result = getChain(request);

      expect(result).toBe(1);
      expect(typeof result).toBe('number');
    });
  });

  describe('when chainId query parameter is not provided', () => {
    it('should return base.id as the default', () => {
      const request = new NextRequest('https://example.com/api/test');

      const result = getChain(request);

      expect(result).toBe(base.id);
    });

    it('should return base.id when URL has other query params but not chainId', () => {
      const request = new NextRequest('https://example.com/api/test?other=value&foo=bar');

      const result = getChain(request);

      expect(result).toBe(base.id);
    });
  });

  describe('edge cases', () => {
    it('should return NaN when chainId is not a valid number', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=invalid');

      const result = getChain(request);

      expect(result).toBeNaN();
    });

    it('should return 0 when chainId is "0"', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=0');

      const result = getChain(request);

      expect(result).toBe(0);
    });

    it('should return base.id when chainId is empty string', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=');

      const result = getChain(request);

      // Empty string is falsy, so it defaults to base.id
      expect(result).toBe(base.id);
    });

    it('should handle negative chainId', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=-1');

      const result = getChain(request);

      expect(result).toBe(-1);
    });

    it('should handle decimal chainId by truncating to integer', () => {
      const request = new NextRequest('https://example.com/api/test?chainId=8453.99');

      const result = getChain(request);

      expect(result).toBe(8453.99);
    });
  });
});
