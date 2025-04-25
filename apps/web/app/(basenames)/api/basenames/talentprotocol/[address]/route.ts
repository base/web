import { NextRequest, NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');

  if (!address || typeof address !== 'string') {
    return NextResponse.json({ error: '400: address is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${encodeURIComponent(address)}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.TALENT_PROTOCOL_API_KEY,
        },
      },
    );
    const data = await response.json();

    if (!data) {
      return NextResponse.json({ error: '404: address not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    logger.error('error getting talent protocol information', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
