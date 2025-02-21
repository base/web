import { isDevelopment } from 'apps/web/src/constants';
import { NextResponse } from 'next/server';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  const url = new URL(request.url);
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';

  const chainIdFromParams = url.searchParams.get('chainId');
  const chainId = chainIdFromParams ? Number(chainIdFromParams) : base.id;
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });

  const name = chainId === base.id ? 'Basename' : 'Basename (Sepolia testnet)';

  const tokenMetadata = {
    name: name,
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
