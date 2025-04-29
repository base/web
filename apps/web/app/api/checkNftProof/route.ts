import { NextRequest, NextResponse } from 'next/server';
import { Address } from 'viem';
import { getKv } from 'apps/web/src/utils/datastores/kv';
import { logger } from 'apps/web/src/utils/logger';

type RequestBody = {
  address: Address;
};

export async function POST(request: NextRequest) {
  try {
    const { address } = (await request.json()) as RequestBody;
    if (!address) {
      return NextResponse.json({ error: '400: address is required' }, { status: 400 });
    }

    const kv = getKv();
    const proof = await kv.get<string[]>(`proof:${address}`);
    if (!proof) {
      return NextResponse.json(
        { error: '404: address is not eligible for the nft' },
        { status: 404 },
      );
    }

    return NextResponse.json({ result: proof });
  } catch (error) {
    logger.error('error getting proof', error);
    return NextResponse.json({ error: '500: failed to get proof' }, { status: 500 });
  }
}
