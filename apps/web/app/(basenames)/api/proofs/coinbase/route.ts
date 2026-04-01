import { NextRequest } from 'next/server';
import { withTimeout } from 'apps/web/app/api/decorators';
import { DiscountType, VerifiedAccount } from 'apps/web/src/utils/proofs';
import { createSybilResistantHandler } from '../proofHandlers';
import { Address } from 'viem';

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
  return createSybilResistantHandler(
    req,
    DiscountType.CB,
    'error getting proofs for cb1 discount',
  );
}

export const GET = withTimeout(handler);
