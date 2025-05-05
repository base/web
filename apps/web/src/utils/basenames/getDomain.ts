import { isDevelopment } from 'apps/web/src/constants';
import { NextRequest } from 'next/server';

export function getDomain(request: NextRequest) {
  return isDevelopment
    ? `${request.nextUrl.protocol}//${request.nextUrl.host}`
    : 'https://www.base.org';
}
