import { NextRequest, NextResponse } from 'next/server';
import { withTimeout } from 'apps/web/app/api/decorators';
import { logger } from 'apps/web/src/utils/logger';
import {
  getWalletProofs,
  ProofsException,
  ProofTableNamespace,
  proofValidation,
} from 'apps/web/src/utils/proofs';

// Use edge runtime to prevent build-time evaluation of env vars
export const runtime = 'edge';

/*
this endpoint returns whether or not the account has early access
if result array is empty, user has no early access
example return:
{
  "address": "0xB18e4C959bccc8EF86D78DC297fb5efA99550d85",
  "namespace": "usernames",
  "proofs": "[0x56ce3bbc909b90035ae373d32c56a9d81d26bb505dd935cdee6afc384bcaed8d, 0x99e940ed9482bf59ba5ceab7df0948798978a1acaee0ecb41f64fe7f40eedd17]"
  "discountValidatorAddress": "0x..."
}
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

  try {
    const responseData = await getWalletProofs(
      address as `0x${string}`,
      parseInt(chain as string),
      ProofTableNamespace.BNSDiscount,
    );

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    if (error instanceof ProofsException) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    logger.error('error getting proofs for earlyAccess', error);
  }
  // If error is not an instance of Error, return a generic error message
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

export const GET = withTimeout(handler);
