import { NextRequest, NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';
import {
  getWalletProofs,
  ProofsException,
  ProofTableNamespace,
  proofValidation,
  DiscountType,
} from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import { trustedSignerPKey } from 'apps/web/src/constants';

/**
 * Generic handler for proof routes that use getWalletProofs
 */
export async function createWalletProofHandler(
  req: NextRequest,
  namespace: ProofTableNamespace,
  errorContext: string,
  lowercase = false,
): Promise<NextResponse> {
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
    const processedAddress = lowercase
      ? (address as string).toLowerCase()
      : (address as string);
    const responseData = await getWalletProofs(
      processedAddress as `0x${string}`,
      parseInt(chain as string),
      namespace,
      false,
    );

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    if (error instanceof ProofsException) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    logger.error(errorContext, error);
  }

  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

/**
 * Generic handler for proof routes that use sybilResistantUsernameSigning
 */
export async function createSybilResistantHandler(
  req: NextRequest,
  discountType: DiscountType,
  errorContext: string,
): Promise<NextResponse> {
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
      discountType,
      parseInt(chain as string),
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ProofsException) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    logger.error(errorContext, error);
  }

  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}
