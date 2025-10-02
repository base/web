import { NextRequest, NextResponse } from 'next/server';
import { isAddress } from 'viem';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const apiType = searchParams.get('apiType');

  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: 'Missing or invalid address parameter' }, { status: 400 });
  }

  let apiUrl: string;

  try {
    switch (apiType) {
      case 'etherscan':
        apiUrl = `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${address}&chainid=1&apikey=${ETHERSCAN_API_KEY}`;
        break;
      case 'base-sepolia':
        apiUrl = `https://api.etherscan.io/v2/api?module=account&action=txlistinternal&address=${address}&chainid=84532&apikey=${ETHERSCAN_API_KEY}`;
        break;
      case 'basescan':
        apiUrl = `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${address}&chainid=8453&apikey=${ETHERSCAN_API_KEY}`;
        break;
      case 'basescan-internal':
        apiUrl = `https://api.etherscan.io/v2/api?module=account&action=txlistinternal&address=${address}&chainid=8453&apikey=${ETHERSCAN_API_KEY}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid apiType parameter' }, { status: 400 });
    }

    const externalResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': TALENT_PROTOCOL_API_KEY ?? '',
      },
    });

    const contentType = externalResponse.headers.get('content-type');
    let responseData;
    if (contentType?.includes('application/json')) {
      responseData = await externalResponse.json();
    } else {
      responseData = await externalResponse.text();
    }
    if (externalResponse.ok) {
      return NextResponse.json({ data: responseData });
    } else {
      return NextResponse.json({ error: responseData }, { status: externalResponse.status });
    }
  } catch (error) {
    console.error('Error in API proxy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
