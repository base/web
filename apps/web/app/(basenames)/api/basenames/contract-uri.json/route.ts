import { NextRequest, NextResponse } from 'next/server';
import { base } from 'viem/chains';
import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const domainName = getDomain(request);
  const chainId = getChain(request);
  if (!chainId) {
    return NextResponse.json({ error: '400: chainId is missing' }, { status: 400 });
  }

  const tokenMetadata = {
    name: chainId === base.id ? 'Basename' : 'Basename (Sepolia testnet)',
    description:
      'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
    image: `${domainName}/images/basenames/contract-uri/logo.png`,
    banner_image: `${domainName}/images/basenames/contract-uri/cover-image.png`,
    featured_image: `${domainName}/images/basenames/contract-uri/feature-image.png`,
    external_link: `${domainName}/names`,
    collaborators: [],
  };

  return NextResponse.json(tokenMetadata);
}
