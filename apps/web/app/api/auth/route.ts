import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('Auth Required.', {
    status: 401,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-authenticate': 'Basic realm="Secure Area"',
    },
  });
}
