import { NextRequest, NextResponse } from 'next/server';
import { base } from 'viem/chains';
import {
  formatBaseEthDomain,
  getBasenameNameExpires,
  USERNAME_DOMAINS,
} from 'apps/web/src/utils/usernames';
import { encodePacked, keccak256, namehash, toHex } from 'viem';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import L2Resolver from 'apps/web/src/abis/L2Resolver';
import { Basename } from '@coinbase/onchainkit/identity';
import { logger } from 'apps/web/src/utils/logger';
import { premintMapping } from 'apps/web/app/(basenames)/api/basenames/metadata/premintsMapping';
import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> },
) {
  const { tokenId } = await params;
  const formattedTokenId = tokenId.replace(/\.json$/, '');

  console.log({ searchParams: request.nextUrl, tokenId: formattedTokenId });

  if (!formattedTokenId) {
    return NextResponse.json({ error: '400: tokenId is missing' }, { status: 400 });
  }

  const chainId = getChain(request);
  if (!chainId) {
    return NextResponse.json({ error: '400: chainId is missing' }, { status: 400 });
  }

  const baseDomainName = USERNAME_DOMAINS[chainId];
  if (!baseDomainName) {
    return NextResponse.json({ error: '400: base domain name is missing' }, { status: 400 });
  }

  // Get labelhash from tokenId
  const labelhash = toHex(BigInt(formattedTokenId), { size: 32 });

  // Convert labelhash to namehash
  const namehashNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [namehash(baseDomainName), labelhash]),
  );

  let basenameFormatted, nameExpires;
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
  if (!basenameFormatted && premintMapping[formattedTokenId]) {
    basenameFormatted = formatBaseEthDomain(premintMapping[formattedTokenId], chainId);
  }

  if (!basenameFormatted) {
    return NextResponse.json({ error: '404: Basename not found' }, { status: 404 });
  }

  const domainName = getDomain(request);
  const basenamePure = basenameFormatted.replace(`.${baseDomainName}`, '');
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
