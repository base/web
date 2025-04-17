import { NextRequest, NextResponse } from 'next/server';

export default function handler(_: NextRequest) {
  return new NextResponse('OK');
}
