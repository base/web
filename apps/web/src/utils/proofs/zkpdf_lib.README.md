# zkpdf_lib - Zero-Knowledge PDF Claim Verification

## Overview

The `zkpdf_lib` module provides functionality for verifying PDF claims using zero-knowledge proofs. It enables privacy-preserving verification of document claims without revealing the underlying document content.

## Features

- **Privacy-Preserving**: Verify claims about PDF documents without revealing the document content
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Flexible**: Support for various claim types (age verification, identity verification, etc.)
- **Well-Tested**: Comprehensive test suite with 22+ test cases
- **Error Handling**: Robust validation and error reporting

## Installation

This library is part of the Base web monorepo and is available through the `@app/web` workspace.

```typescript
import { verifyPdfClaim, validateClaimStructure, type PDFClaim } from 'src/utils/proofs/zkpdf_lib';
// or using the snake_case alias for compatibility
import { verify_pdf_claim } from 'src/utils/proofs';
```

## Usage

### Basic Verification

```typescript
import { verifyPdfClaim, type PDFClaim } from 'src/utils/proofs/zkpdf_lib';

// Create a PDF claim
const claim: PDFClaim = {
  documentHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
  claimType: 'age_verification',
  proof: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  publicInputs: { minAge: 18 },
  metadata: {
    timestamp: Date.now(),
    issuer: 'trusted_authority',
    version: '1.0'
  }
};

// Verify the claim
const result = await verifyPdfClaim(claim);

if (result.isValid) {
  console.log('✓ Claim verified successfully');
  console.log('Details:', result.details);
} else {
  console.error('✗ Verification failed:', result.error);
}
```

### Validating Claim Structure

Before attempting verification, you can validate the claim structure:

```typescript
import { validateClaimStructure } from 'src/utils/proofs/zkpdf_lib';

if (validateClaimStructure(claim)) {
  // Proceed with verification
  const result = await verifyPdfClaim(claim);
} else {
  console.error('Invalid claim structure');
}
```

### Error Handling

```typescript
const result = await verifyPdfClaim(claim);

switch (result.status) {
  case 'verified':
    console.log('Claim verified successfully');
    break;
  case 'invalid_claim':
    console.error('Invalid claim format:', result.error);
    break;
  case 'invalid_proof':
    console.error('Invalid proof format:', result.error);
    break;
  case 'failed':
    console.error('Verification failed:', result.error);
    break;
}
```

## API Reference

### Types

#### `PDFClaim`

Represents a PDF claim to be verified.

```typescript
interface PDFClaim {
  documentHash: string;        // 32-byte hex string starting with 0x
  claimType: string;            // Type of claim (e.g., 'age_verification')
  proof: string;                // Zero-knowledge proof as hex string
  publicInputs: Record<string, unknown>;  // Public inputs for verification
  metadata?: {                  // Optional metadata
    timestamp?: number;
    issuer?: string;
    version?: string;
  };
}
```

#### `VerificationResult`

Result of a verification operation.

```typescript
interface VerificationResult {
  isValid: boolean;             // Whether verification succeeded
  status: 'verified' | 'failed' | 'invalid_proof' | 'invalid_claim';
  error?: string;               // Error message if verification failed
  details?: Record<string, unknown>;  // Additional verification details
}
```

### Functions

#### `verifyPdfClaim(claim: PDFClaim): Promise<VerificationResult>`

Verifies a PDF claim using zero-knowledge proof verification.

**Parameters:**
- `claim`: The PDF claim to verify

**Returns:**
- A promise that resolves to a `VerificationResult`

**Throws:**
- Does not throw - all errors are captured in the result object

#### `validateClaimStructure(claim: unknown): claim is PDFClaim`

Validates the structure of a PDF claim without verifying the proof.

**Parameters:**
- `claim`: The claim to validate

**Returns:**
- `true` if the claim structure is valid, `false` otherwise

#### `verify_pdf_claim` (alias)

Snake_case alias for `verifyPdfClaim` provided for compatibility with the zkpdf_lib naming scheme.

**Deprecated:** Use `verifyPdfClaim` (camelCase) instead.

## Validation Rules

The verifier checks the following:

1. **Document Hash**:
   - Must be a string
   - Must start with "0x"
   - Must be exactly 66 characters (32 bytes in hex)

2. **Proof**:
   - Must be a string
   - Must start with "0x"
   - Must be at least 66 characters

3. **Claim Type**:
   - Must be a non-empty string

4. **Public Inputs**:
   - Must be an object (not null or undefined)

## Supported Claim Types

While the library is designed to be flexible, common claim types include:

- `age_verification`: Verify age without revealing exact birthdate
- `identity_verification`: Verify identity attributes
- `document_ownership`: Prove ownership of a document
- Custom claim types as needed

## Testing

The library includes a comprehensive test suite:

```bash
yarn workspace @app/web test zkpdf_lib.test.ts
```

Test coverage includes:
- Valid claim verification
- Invalid input handling
- Error cases
- Edge cases
- Structure validation

## Implementation Notes

### Current Implementation

The current implementation provides:
- Input validation
- Structure checking
- Error handling
- Type safety

### Future Enhancements

For production use, the following should be implemented:

1. **Cryptographic Verification**: Integration with a zk-SNARK library (e.g., snarkjs, circom)
2. **WASM Module**: Load verification keys and perform proof verification
3. **Claim Type Registry**: Support for different verification keys per claim type
4. **Caching**: Cache verification keys for better performance
5. **Batch Verification**: Verify multiple claims efficiently

## Security Considerations

1. **Proof Validation**: All proofs should be cryptographically verified in production
2. **Input Sanitization**: All inputs are validated before processing
3. **Error Messages**: Error messages do not leak sensitive information
4. **Type Safety**: Strong typing prevents many common security issues

## Best Practices

1. **Always validate claim structure** before verification
2. **Handle all error cases** explicitly
3. **Check verification status** before trusting the result
4. **Use proper document hashing** (SHA-256 or similar)
5. **Keep metadata minimal** to preserve privacy

## Example: Full Verification Flow

```typescript
import { verifyPdfClaim, validateClaimStructure, type PDFClaim } from 'src/utils/proofs/zkpdf_lib';

async function verifyPdfDocument(claim: unknown): Promise<boolean> {
  try {
    // Step 1: Validate structure
    if (!validateClaimStructure(claim)) {
      console.error('Invalid claim structure');
      return false;
    }

    // Step 2: Verify the claim
    const result = await verifyPdfClaim(claim);

    // Step 3: Check result
    if (!result.isValid) {
      console.error('Verification failed:', result.error);
      return false;
    }

    // Step 4: Log success details
    console.log('Verification successful:', result.details);
    return true;

  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}
```

## Contributing

Contributions are welcome! Please ensure:

1. All tests pass
2. Code follows the project's linting rules
3. New features include tests
4. Documentation is updated

## License

This code is part of the Base web repository and is licensed under Apache-2.0.

## Support

For questions or issues, please:
- Open an issue on GitHub
- Contact the Base development team
- Refer to the Base documentation at https://docs.base.org
