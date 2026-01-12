/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock pinata - define as a getter to handle hoisting
const mockPinataUploadFile = jest.fn();
jest.mock('apps/web/src/utils/pinata', () => ({
  pinata: {
    upload: {
      get file() {
        return mockPinataUploadFile;
      },
    },
  },
}));

// Mock isDevelopment - default to false (production mode)
// Note: isDevelopment is read at module initialization time, so we test production mode primarily
jest.mock('libs/base-ui/constants', () => ({
  isDevelopment: false,
}));

import { POST, ALLOWED_IMAGE_TYPE, MAX_IMAGE_SIZE_IN_MB } from './route';

type ErrorResponse = {
  error: string;
};

type UploadResponse = {
  IpfsHash?: string;
  PinSize?: number;
  Timestamp?: string;
};

function createMockFile(
  content: string,
  filename: string,
  type: string,
  size?: number
): File {
  const blob = new Blob([content], { type });
  const file = new File([blob], filename, { type });
  // Override size if specified
  if (size !== undefined) {
    Object.defineProperty(file, 'size', { value: size });
  }
  return file;
}

function createFormDataWithFile(file: File): FormData {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
}

function createNextRequest(
  url: string,
  formData: FormData | null,
  referer?: string
): NextRequest {
  const headers = new Headers();
  if (referer) {
    headers.set('referer', referer);
  }

  // Create a proper Request object first, then use it for NextRequest
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: formData ?? undefined,
  });

  return new NextRequest(request);
}

describe('ipfsUpload route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exported constants', () => {
    it('should export ALLOWED_IMAGE_TYPE with correct values', () => {
      expect(ALLOWED_IMAGE_TYPE).toEqual([
        'image/svg+xml',
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
      ]);
    });

    it('should export MAX_IMAGE_SIZE_IN_MB as 1', () => {
      expect(MAX_IMAGE_SIZE_IN_MB).toBe(1);
    });
  });

  describe('POST', () => {
    describe('validation errors', () => {
      it('should return 500 when username is missing', async () => {
        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid request' });
      });

      it('should return 500 when referer is missing', async () => {
        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData
          // No referer
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid request' });
      });

      it('should return 500 when referer host does not match allowed host in production', async () => {
        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://evil.com/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid request' });
      });

      it('should return 500 when no file is uploaded', async () => {
        const formData = new FormData();
        // No file appended
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'No file uploaded' });
      });

      it('should return 500 when file type is not allowed', async () => {
        const file = createMockFile('test', 'document.pdf', 'application/pdf');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid file type' });
      });

      it('should return 500 when file is too large', async () => {
        // Create actual large content (>1MB)
        const largeContent = 'x'.repeat(1.5 * 1024 * 1024); // 1.5MB of content
        const blob = new Blob([largeContent], { type: 'image/png' });
        const largeFile = new File([blob], 'avatar.png', { type: 'image/png' });
        const formData = createFormDataWithFile(largeFile);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'File is too large' });
      });
    });

    describe('successful uploads', () => {
      it('should upload file successfully and return response', async () => {
        const mockUploadData = {
          IpfsHash: 'QmTest123',
          PinSize: 1234,
          Timestamp: '2024-01-01T00:00:00Z',
        };
        mockPinataUploadFile.mockResolvedValueOnce(mockUploadData);

        const file = createMockFile('test image content', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as UploadResponse;

        expect(response.status).toBe(200);
        expect(data).toEqual(mockUploadData);
        expect(mockPinataUploadFile).toHaveBeenCalledWith(expect.any(File), {
          groupId: '765ab5e4-0bc3-47bb-9d6a-35b308291009',
          metadata: {
            name: 'testuser',
          },
        });
      });

      it.each(ALLOWED_IMAGE_TYPE)(
        'should accept file type: %s',
        async (imageType) => {
          const mockUploadData = { IpfsHash: 'QmTest' };
          mockPinataUploadFile.mockResolvedValueOnce(mockUploadData);

          const file = createMockFile('test', 'avatar', imageType);
          const formData = createFormDataWithFile(file);
          const request = createNextRequest(
            'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
            formData,
            'https://www.base.org/'
          );

          const response = await POST(request);

          expect(response.status).toBe(200);
        }
      );

      it('should accept file exactly at size limit', async () => {
        const exactLimitSize = 1 * 1024 * 1024; // Exactly 1MB
        const mockUploadData = { IpfsHash: 'QmTest' };
        mockPinataUploadFile.mockResolvedValueOnce(mockUploadData);

        const file = createMockFile('test', 'avatar.png', 'image/png', exactLimitSize);
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);

        expect(response.status).toBe(200);
      });

      it('should pass correct metadata to pinata with username', async () => {
        const mockUploadData = { IpfsHash: 'QmTest' };
        mockPinataUploadFile.mockResolvedValueOnce(mockUploadData);

        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=mybasename',
          formData,
          'https://www.base.org/'
        );

        await POST(request);

        expect(mockPinataUploadFile).toHaveBeenCalledWith(expect.any(File), {
          groupId: '765ab5e4-0bc3-47bb-9d6a-35b308291009',
          metadata: {
            name: 'mybasename',
          },
        });
      });
    });

    describe('error handling', () => {
      it('should return 500 when pinata upload fails', async () => {
        mockPinataUploadFile.mockRejectedValueOnce(new Error('Pinata upload failed'));

        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Internal Server Error' });
      });

      it('should handle unexpected errors gracefully', async () => {
        mockPinataUploadFile.mockRejectedValueOnce('Non-Error rejection');

        const file = createMockFile('test', 'avatar.png', 'image/png');
        const formData = createFormDataWithFile(file);
        const request = createNextRequest(
          'https://www.base.org/api/basenames/avatar/ipfsUpload?username=testuser',
          formData,
          'https://www.base.org/'
        );

        const response = await POST(request);
        const data = (await response.json()) as ErrorResponse;

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Internal Server Error' });
      });
    });
  });
});
