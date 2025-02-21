import { Basename } from '@coinbase/onchainkit/identity';
import { premintMapping } from 'apps/web/pages/api/basenames/metadata/premintsMapping';
import L2Resolver from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { isDevelopment } from 'apps/web/src/constants';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { logger } from 'apps/web/src/utils/logger';
import {
  formatBaseEthDomain,
  getBasenameNameExpires,
  USERNAME_DOMAINS,
} from 'apps/web/src/utils/usernames';
import { NextResponse } from 'next/server';
import { encodePacked, keccak256, namehash, toHex } from 'viem';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  const url = new URL(request.url);

  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  let tokenId = url.searchParams.get('tokenId');
  if (tokenId?.endsWith('.json')) tokenId = tokenId.slice(0, -5);
  const chainIdFromParams = url.searchParams.get('chainId');
  const chainId = chainIdFromParams ? Number(chainIdFromParams) : base.id;
  const baseDomainName = USERNAME_DOMAINS[chainId];

  if (!tokenId) return NextResponse.json({ error: '406: tokenId is missing' }, { status: 406 });
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });
  if (!baseDomainName)
    return NextResponse.json({ error: '406: base domain name is missing' }, { status: 406 });

  // Get labelhash from tokenId
  const labelhash = toHex(BigInt(tokenId), { size: 32 });

  // Convert labelhash to namehash
  const namehashNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [namehash(baseDomainName), labelhash]),
  );

  let basenameFormatted = undefined;
  let nameExpires = undefined;
  try {
    const client = getBasenamePublicClient(chainId);
    basenameFormatted = await client.readContract({
      abi: L2Resolver,
      address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
      args: [namehashNode],
      functionName: 'name',
    });
    nameExpires = await getBasenameNameExpires(basenameFormatted as Basename);
  } catch (error) {
    logger.error('Error getting token metadata', error);
  }

  // Premints are hardcoded; the list will reduce when/if they are claimed
  if (!basenameFormatted && premintMapping[tokenId]) {
    basenameFormatted = formatBaseEthDomain(premintMapping[tokenId], chainId);
  }

  if (!basenameFormatted) {
    return NextResponse.json({ error: '404: Basename not found' }, { status: 404 });
  }

  const basenamePure = basenameFormatted?.replace(`.${baseDomainName}`, '');
  const basenameForUrl = chainId === base.id ? basenamePure : basenameFormatted;
  const tokenMetadata = {
    // This is the URL to the image of the item.
    image: `${domainName}/api/basenames/${basenameFormatted}/assets/cardImage.svg`,

    // This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
    external_url: `${domainName}/name/${basenameForUrl}`,

    // A human-readable description of the item. Markdown is supported.
    description: `${basenameFormatted}, a Basename`,

    // A human-readable description of the item. Markdown is supported.
    name: basenameFormatted,

    nameExpires: Number(nameExpires),

    // TODO: attributes?
  };

  return NextResponse.json(tokenMetadata);
}
