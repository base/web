import { NextRequest, NextResponse } from 'next/server';
import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const domainName = getDomain(request);
  const chainId = getChain(request);
  if (!chainId) {
    return NextResponse.json({ error: '400: chainId is missing' }, { status: 400 });
  }

  return NextResponse.redirect(
    new URL(`${domainName}/api/basenames/contract-uri.json?chainId=${chainId}`, request.url),
  );
}
