import { NextResponse } from 'next/server';

const API_URL = 'https://api.neynar.com/v2/farcaster/user/bulk';
const API_KEY = process.env.NEYNAR_API_KEY;

if (!API_KEY) console.error('NEYNAR_API_KEY required');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fids = searchParams.get('fid');

  if (!fids) {
    return NextResponse.json({ error: 'fids query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}?fids=${fids}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        api_key: API_KEY,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from Neynar API' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
