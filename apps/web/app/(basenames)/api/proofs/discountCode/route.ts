import { NextRequest, NextResponse } from 'next/server';
import { proofValidation, signDiscountMessageWithTrustedSigner } from 'apps/web/src/utils/proofs';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';
import { Address, Hash, stringToHex } from 'viem';
import { USERNAME_DISCOUNT_CODE_VALIDATORS } from 'apps/web/src/addresses/usernames';
import { getDiscountCode } from 'apps/web/src/utils/proofs/discount_code_storage';

// Use force-dynamic to prevent build-time evaluation of env vars
export const dynamic = 'force-dynamic';

export type DiscountCodeResponse = {
  discountValidatorAddress: Address;
  address: Address;
  signedMessage: Hash;
};

/*
this endpoint returns whether or a discount code is valid
*/
async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'method not allowed' }, { status: 405 });
  }
  const address = req.nextUrl.searchParams.get('address');
  const chain = req.nextUrl.searchParams.get('chain');
  const code = req.nextUrl.searchParams.get('code');
  const validationErr = proofValidation(address ?? '', chain ?? '');
  if (validationErr) {
    return NextResponse.json({ error: validationErr.error }, { status: validationErr.status });
  }

  const chainId = parseInt(chain as string);

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Discount code invalid' }, { status: 500 });
  }

  try {
    // 1. get the database model
    const discountCodes = await getDiscountCode(code);

    // 2. Validation: Coupon exists
    if (!discountCodes || discountCodes.length === 0) {
      return NextResponse.json({ error: 'Discount code invalid' }, { status: 500 });
    }

    const discountCode = discountCodes[0];

    // 2.1 Validation: Coupon is expired
    if (new Date(discountCode.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Discount code invalid' }, { status: 500 });
    }

    // 2.2 Validation: Coupon can be redeemed
    if (Number(discountCode.usage_count) >= Number(discountCode.usage_limit)) {
      return NextResponse.json({ error: 'Discount code invalid' }, { status: 500 });
    }

    // 3. Sign the validationData
    const couponCodeUuid = stringToHex(discountCode.code, { size: 32 });
    const expirationTimeUnix = Math.floor(discountCode.expires_at.getTime() / 1000);

    const signature = await signDiscountMessageWithTrustedSigner(
      address as Address,
      couponCodeUuid,
      USERNAME_DISCOUNT_CODE_VALIDATORS[chainId],
      expirationTimeUnix,
    );

    // 4. Return the discount data
    const result: DiscountCodeResponse = {
      discountValidatorAddress: USERNAME_DISCOUNT_CODE_VALIDATORS[chainId],
      address: address as Address,
      signedMessage: signature,
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    logger.error('error getting proofs for discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

export const GET = withTimeout(handler);
