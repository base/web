import { NextRequest, NextResponse } from 'next/server';
import { isAddress } from 'viem';

import type { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';
import { cdpBaseUri } from 'apps/web/src/cdp/constants';

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: 'Invalid address provided' }, { status: 400 });
  }

  const network = request.nextUrl.searchParams.get('network') ?? 'base-mainnet';
  if (network !== 'base-mainnet' && network !== 'base-sepolia') {
    return NextResponse.json({ error: 'Invalid network provided' }, { status: 400 });
  }

  const page = request.nextUrl.searchParams.get('page');

  // Build the URL with pagination parameter if provided
  let url = `https://${cdpBaseUri}/platform/v1/networks/${network}/addresses/${address}/identity?limit=50`;
  if (page) {
    url += `&page=${page}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CDP_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch usernames' }, { status: response.status });
  }

  const data = (await response.json()) as ManagedAddressesResponse;

  return NextResponse.json(data, { status: 200 });
}
