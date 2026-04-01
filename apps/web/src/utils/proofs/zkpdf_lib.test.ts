/**
 * @jest-environment node
 */
import { verifyPdfClaim, validateClaimStructure, type PDFClaim } from './zkpdf_lib';

describe('zkpdf_lib', () => {
  describe('verifyPdfClaim', () => {
    const validClaim: PDFClaim = {
      documentHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
      claimType: 'age_verification',
      proof: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      publicInputs: { minAge: 18 },
      metadata: {
        timestamp: Date.now(),
        issuer: 'test_issuer',
        version: '1.0',
      },
    };

    it('should verify a valid claim successfully', async () => {
      const result = await verifyPdfClaim(validClaim);

      expect(result).toBeDefined();
      expect(result.isValid).toBe(true);
      expect(result.status).toBe('verified');
      expect(result.details).toBeDefined();
      expect(result.details?.claimType).toBe('age_verification');
    });

    it('should reject claim with invalid object', async () => {
      const result = await verifyPdfClaim(null as unknown as PDFClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_claim');
      expect(result.error).toBe('Invalid claim object');
    });

    it('should reject claim with missing documentHash', async () => {
      const invalidClaim = {
        ...validClaim,
        documentHash: '',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_claim');
      expect(result.error).toBe('Missing or invalid documentHash');
    });

    it('should reject claim with invalid documentHash format', async () => {
      const invalidClaim = {
        ...validClaim,
        documentHash: 'invalid-hash',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_claim');
      expect(result.error).toBe('Document hash must be a valid 32-byte hex string');
    });

    it('should reject claim with short documentHash', async () => {
      const invalidClaim = {
        ...validClaim,
        documentHash: '0x1234',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_claim');
      expect(result.error).toBe('Document hash must be a valid 32-byte hex string');
    });

    it('should reject claim with missing proof', async () => {
      const invalidClaim = {
        ...validClaim,
        proof: '',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_proof');
      expect(result.error).toBe('Missing or invalid proof');
    });

    it('should reject claim with invalid proof format', async () => {
      const invalidClaim = {
        ...validClaim,
        proof: 'invalid-proof',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_proof');
      expect(result.error).toBe('Proof must be a valid hex string');
    });

    it('should reject claim with short proof', async () => {
      const invalidClaim = {
        ...validClaim,
        proof: '0x123',
      };

      const result = await verifyPdfClaim(invalidClaim);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('invalid_proof');
      expect(result.error).toBe('Proof must be a valid hex string');
    });

    it('should handle claims without optional metadata', async () => {
      const claimWithoutMetadata = {
        documentHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
        claimType: 'identity_verification',
        proof: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        publicInputs: { verified: true },
      };

      const result = await verifyPdfClaim(claimWithoutMetadata);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe('verified');
      expect(result.details).toBeDefined();
    });

    it('should handle different claim types', async () => {
      const claimTypes = ['age_verification', 'identity_verification', 'document_ownership'];

      for (const claimType of claimTypes) {
        const claim = {
          ...validClaim,
          claimType,
        };

        const result = await verifyPdfClaim(claim);

        expect(result.isValid).toBe(true);
        expect(result.details?.claimType).toBe(claimType);
      }
    });

    it('should handle errors gracefully', async () => {
      // Create a claim that will trigger an error in the internal verification
      const claimWithBadData = {
        ...validClaim,
        claimType: '',
      };

      const result = await verifyPdfClaim(claimWithBadData);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe('failed');
      expect(result.error).toBeDefined();
    });

    it('should include timestamp in verification details', async () => {
      const result = await verifyPdfClaim(validClaim);

      expect(result.isValid).toBe(true);
      expect(result.details?.timestamp).toBeDefined();
      const timestamp = result.details?.timestamp as number;
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeGreaterThan(0);
    });
  });

  describe('validateClaimStructure', () => {
    it('should validate a valid claim structure', () => {
      const validClaim: PDFClaim = {
        documentHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
        claimType: 'age_verification',
        proof: '0xabcdef',
        publicInputs: { minAge: 18 },
      };

      expect(validateClaimStructure(validClaim)).toBe(true);
    });

    it('should reject null or undefined', () => {
      expect(validateClaimStructure(null)).toBe(false);
      expect(validateClaimStructure(undefined)).toBe(false);
    });

    it('should reject non-object values', () => {
      expect(validateClaimStructure('string')).toBe(false);
      expect(validateClaimStructure(123)).toBe(false);
      expect(validateClaimStructure(true)).toBe(false);
    });

    it('should reject claim without documentHash', () => {
      const invalidClaim = {
        claimType: 'age_verification',
        proof: '0xabcdef',
        publicInputs: {},
      };

      expect(validateClaimStructure(invalidClaim)).toBe(false);
    });

    it('should reject claim without claimType', () => {
      const invalidClaim = {
        documentHash: '0x1234',
        proof: '0xabcdef',
        publicInputs: {},
      };

      expect(validateClaimStructure(invalidClaim)).toBe(false);
    });

    it('should reject claim without proof', () => {
      const invalidClaim = {
        documentHash: '0x1234',
        claimType: 'age_verification',
        publicInputs: {},
      };

      expect(validateClaimStructure(invalidClaim)).toBe(false);
    });

    it('should reject claim without publicInputs', () => {
      const invalidClaim = {
        documentHash: '0x1234',
        claimType: 'age_verification',
        proof: '0xabcdef',
      };

      expect(validateClaimStructure(invalidClaim)).toBe(false);
    });

    it('should reject claim with null publicInputs', () => {
      const invalidClaim = {
        documentHash: '0x1234',
        claimType: 'age_verification',
        proof: '0xabcdef',
        publicInputs: null,
      };

      expect(validateClaimStructure(invalidClaim)).toBe(false);
    });

    it('should accept claim with metadata', () => {
      const validClaim = {
        documentHash: '0x1234',
        claimType: 'age_verification',
        proof: '0xabcdef',
        publicInputs: {},
        metadata: {
          timestamp: Date.now(),
          issuer: 'test',
        },
      };

      expect(validateClaimStructure(validClaim)).toBe(true);
    });

    it('should accept claim with empty publicInputs object', () => {
      const validClaim = {
        documentHash: '0x1234',
        claimType: 'age_verification',
        proof: '0xabcdef',
        publicInputs: {},
      };

      expect(validateClaimStructure(validClaim)).toBe(true);
    });
  });
});
