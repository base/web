import { NextRequest, NextResponse } from 'next/server';

import type { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';
import { cdpBaseUri } from 'apps/web/src/cdp/constants';

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');
  if (!address) {
    return NextResponse.json({ error: 'No address provided' }, { status: 400 });
  }

  const network = request.nextUrl.searchParams.get('network') ?? 'base-mainnet';
  if (network !== 'base-mainnet' && network !== 'base-sepolia') {
    return NextResponse.json({ error: 'Invalid network provided' }, { status: 400 });
  }

  const response = await fetch(
    `https://${cdpBaseUri}/platform/v1/networks/${network}/addresses/${address}/identity?limit=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CDP_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = (await response.json()) as ManagedAddressesResponse;

  return NextResponse.json(data, { status: 200 });
}
