import { NextRequest, NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';
import { incrementDiscountCodeUsage } from 'apps/web/src/utils/proofs/discount_code_storage';

// Use edge runtime to prevent build-time evaluation of env vars
export const runtime = 'edge';

type DiscountCodeRequest = {
  code: string;
};

/*
  this endpoint will increment the discount code usage to prevent abuse
*/
async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { code } = (await req.json()) as DiscountCodeRequest;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
    }

    await incrementDiscountCodeUsage(code);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    logger.error('error incrementing the discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}

export const POST = withTimeout(handler);
