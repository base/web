/**
 * @jest-environment node
 */

// Note: isDevelopment is read at module initialization time
// We primarily test production mode (isDevelopment = false) since that's the default mock

const mockIsDevelopment = { value: false };

jest.mock('apps/web/src/constants', () => ({
  get isDevelopment() {
    return mockIsDevelopment.value;
  },
}));

import { NextRequest } from 'next/server';
import { getDomain } from './getDomain';

describe('getDomain', () => {
  beforeEach(() => {
    mockIsDevelopment.value = false;
  });

  describe('when in production mode (isDevelopment = false)', () => {
    it('should return the production domain https://www.base.org', () => {
      const request = new NextRequest('https://example.com/api/test');

      const result = getDomain(request);

      expect(result).toBe('https://www.base.org');
    });

    it('should return the production domain regardless of the request URL', () => {
      const request = new NextRequest('http://localhost:3000/api/basenames');

      const result = getDomain(request);

      expect(result).toBe('https://www.base.org');
    });

    it('should return the production domain for any request host', () => {
      const request = new NextRequest('https://staging.base.org/path');

      const result = getDomain(request);

      expect(result).toBe('https://www.base.org');
    });
  });

  describe('when in development mode (isDevelopment = true)', () => {
    beforeEach(() => {
      mockIsDevelopment.value = true;
    });

    it('should return the request protocol and host for localhost', () => {
      const request = new NextRequest('http://localhost:3000/api/test');

      const result = getDomain(request);

      expect(result).toBe('http://localhost:3000');
    });

    it('should return the request protocol and host with https', () => {
      const request = new NextRequest('https://dev.base.org:8080/api/test');

      const result = getDomain(request);

      expect(result).toBe('https://dev.base.org:8080');
    });

    it('should return the request protocol and host for standard https without port', () => {
      const request = new NextRequest('https://example.com/some/path');

      const result = getDomain(request);

      expect(result).toBe('https://example.com');
    });

    it('should correctly extract protocol and host from URLs with query params', () => {
      const request = new NextRequest('http://localhost:3000/api/test?foo=bar');

      const result = getDomain(request);

      expect(result).toBe('http://localhost:3000');
    });

    it('should correctly extract protocol and host from URLs with fragments', () => {
      const request = new NextRequest('http://localhost:3000/page#section');

      const result = getDomain(request);

      expect(result).toBe('http://localhost:3000');
    });
  });

  describe('edge cases', () => {
    it('should handle URL with just domain (no path)', () => {
      mockIsDevelopment.value = true;
      const request = new NextRequest('https://test.example.com/');

      const result = getDomain(request);

      expect(result).toBe('https://test.example.com');
    });
  });
});
