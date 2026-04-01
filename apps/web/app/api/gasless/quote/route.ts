import { NextRequest, NextResponse } from 'next/server';
import { isAddress } from 'viem';
import { logger } from 'apps/web/src/utils/logger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chainId = searchParams.get('chainId');
  const sellToken = searchParams.get('sellToken');
  const buyToken = searchParams.get('buyToken');
  const sellAmount = searchParams.get('sellAmount');
  const taker = searchParams.get('taker');

  // Validate required parameters
  if (!chainId) {
    return NextResponse.json({ error: 'Missing chainId parameter' }, { status: 400 });
  }

  if (!sellToken || !isAddress(sellToken)) {
    return NextResponse.json({ error: 'Missing or invalid sellToken parameter' }, { status: 400 });
  }

  if (!buyToken || !isAddress(buyToken)) {
    return NextResponse.json({ error: 'Missing or invalid buyToken parameter' }, { status: 400 });
  }

  if (!sellAmount) {
    return NextResponse.json({ error: 'Missing sellAmount parameter' }, { status: 400 });
  }

  if (!taker || !isAddress(taker)) {
    return NextResponse.json({ error: 'Missing or invalid taker parameter' }, { status: 400 });
  }

  const ZERO_X_API_KEY = process.env.ZERO_X_API_KEY;

  if (!ZERO_X_API_KEY) {
    logger.error('0x API key environment variable is not set');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const params = new URLSearchParams({
      chainId,
      sellToken,
      buyToken,
      sellAmount,
      taker,
    });
    const apiUrl = `https://api.0x.org/gasless/quote?${params.toString()}`;

    const externalResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        '0x-api-key': ZERO_X_API_KEY,
        '0x-version': 'v2',
      },
    });

    const contentType = externalResponse.headers.get('content-type');
    let responseData;
    if (contentType?.includes('application/json')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseData = await externalResponse.json();
    } else {
      responseData = await externalResponse.text();
    }

    if (externalResponse.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return NextResponse.json({ data: responseData });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return NextResponse.json({ error: responseData }, { status: externalResponse.status });
    }
  } catch (error) {
    logger.error('Error in gasless quote API', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
