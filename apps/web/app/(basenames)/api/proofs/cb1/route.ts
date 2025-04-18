import { NextRequest, NextResponse } from 'next/server';
import { withTimeout } from 'apps/web/app/api/decorators';
import { trustedSignerPKey } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import { DiscountType, ProofsException, proofValidation } from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';

// Use edge runtime to prevent build-time evaluation of env vars
export const runtime = 'edge';

/**
 * This endpoint checks if the provided address has access to the cb1 attestation.
 *
 * Possible Error Responses:
 * - 400: Invalid address or missing verifications.
 * - 405: Unauthorized method.
 * - 409: User has already claimed a username.
 * - 500: Internal server error.
 *
 * @returns {Object} - An object with the signed message, attestations, and discount validator address.
 * Example response:
 * {
 *   "signedMessage": "0x0000000000000000000000009c02e8e28d8b706f67dcf0fc7f46a9ee1f9649fa000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000416f4b871a02406ddddbf6f6df1c58416830c5ce45becad5b4f30cf32f74ee39a5559659f9e29479bc76bb1ebf40fffc7119d09ed7c8dcaf6075956f83935263851b00000000000000000000000000000000000000000000000000000000000000",
 *   "attestations": [
 *     {
 *       "name": "verifiedCoinbaseOne",
 *       "type": "bool",
 *       "signature": "bool verifiedCoinbaseOne",
 *       "value": {
 *         "name": "verifiedCoinbaseOne",
 *         "type": "bool",
 *         "value": true
 *       }
 *     }
 *   ],
 *   "discountValidatorAddress": "0x502df754f25f492cad45ed85a4de0ee7540717e7"
 * }
 */
async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'method not allowed' }, { status: 405 });
  }
  const address = req.nextUrl.searchParams.get('address');
  const chain = req.nextUrl.searchParams.get('chain');
  const validationErr = proofValidation(address ?? '', chain ?? '');
  if (validationErr) {
    return NextResponse.json({ error: validationErr.error }, { status: validationErr.status });
  }
  if (!trustedSignerPKey) {
    return NextResponse.json({ error: 'currently unable to sign' }, { status: 500 });
  }
  try {
    const result = await sybilResistantUsernameSigning(
      address as `0x${string}`,
      DiscountType.CB1,
      parseInt(chain as string),
    );
    return NextResponse.json(result);
  } catch (error) {
    logger.error('error getting proofs for cb1 discount', error);
    if (error instanceof ProofsException) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
  }

  // If error is not an instance of Error, return a generic error message
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

export const GET = withTimeout(handler);
