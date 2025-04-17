import { NextRequest, NextResponse } from 'next/server';
import { withTimeout } from 'apps/web/app/api/decorators';
import { trustedSignerPKey } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import {
  DiscountType,
  ProofsException,
  proofValidation,
  VerifiedAccount,
} from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import { Address } from 'viem';

// Use force-dynamic to prevent build-time evaluation of env vars
export const dynamic = 'force-dynamic';

// Coinbase verified account *and* CB1 structure
export type CoinbaseProofResponse = {
  signedMessage?: string;
  attestations: VerifiedAccount[];
  discountValidatorAddress: Address;
  expires?: string;
};

/**
 * This endpoint reports whether or not the provided address has access to the verified account attestation
 *
 * Error responses:
 * 400: if address is invalid or missing verifications
 * 405: for unauthorized methods
 * 409: if user has already claimed a username
 * 500: for internal server errors
 *
 * @param req
 * {
 *   address: address to check if user is allowed to claim a new username with discount
 * }
 * @param res
 * {
 *  signedMessage: this is to be passed into the contract to claim a username
 *  attestations: will show the attestations that the user has  for verified account and verified cb1 account
 * }
 * @returns
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
      DiscountType.CB,
      parseInt(chain as string),
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ProofsException) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    logger.error('error getting proofs for cb1 discount', error);
  }

  // If error is not an instance of Error, return a generic error message
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

export const GET = withTimeout(handler);
