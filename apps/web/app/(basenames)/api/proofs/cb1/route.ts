import { NextRequest } from 'next/server';
import { withTimeout } from 'apps/web/app/api/decorators';
import { DiscountType } from 'apps/web/src/utils/proofs';
import { createSybilResistantHandler } from '../proofHandlers';

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
  return createSybilResistantHandler(
    req,
    DiscountType.CB1,
    'error getting proofs for cb1 discount',
  );
}

export const GET = withTimeout(handler);
