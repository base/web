import { NextRequest } from 'next/server';
import { base } from 'viem/chains';

export function getChain(request: NextRequest): number {
  const chainIdFromParams = request.nextUrl.searchParams.get('chainId');
  const chainId = chainIdFromParams ? Number(chainIdFromParams) : base.id;

  return chainId;
}
