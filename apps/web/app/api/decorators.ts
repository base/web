import { logger } from 'apps/web/src/utils/logger';
import { NextRequest, NextResponse } from 'next/server';

type NextApiHandler = (req: NextRequest) => Promise<NextResponse>;

type NextApiHandlerWithParams<T = Record<string, string>> = (
  req: NextRequest,
  params: { params: Promise<T> },
) => Promise<NextResponse>;

const defaultTimeout = process.env.DEFAULT_API_TIMEOUT ?? 5000;

// Generic timeout handler that works with both handler types
async function handleWithTimeout(
  req: NextRequest,
  handlerPromise: Promise<NextResponse>,
  timeoutLimit: number | string,
): Promise<NextResponse> {
  let timeoutId: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timed out')), timeoutLimit as number);
  });

  try {
    return await Promise.race([handlerPromise, timeoutPromise]);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Request timed out') {
        logger.error('Request timed out', error, {
          endpoint_url: req.url,
          params: req.nextUrl.searchParams,
        });
        return NextResponse.json({ error: 'Request timed out' }, { status: 408 });
      }
    }
    logger.error('Error in withTimeout', error, {
      endpoint_url: req.url,
      params: req.nextUrl.searchParams,
    });
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}

export function withTimeout(
  handler: NextApiHandler,
  timeoutLimit = defaultTimeout,
): NextApiHandler {
  return async (req) => {
    const handlerPromise = Promise.resolve(handler(req));
    return handleWithTimeout(req, handlerPromise, timeoutLimit);
  };
}

export function withTimeoutWithParams<T>(
  handler: NextApiHandlerWithParams<T>,
  timeoutLimit = defaultTimeout,
): NextApiHandlerWithParams<T> {
  return async (req, params) => {
    const handlerPromise = Promise.resolve(handler(req, params));
    return handleWithTimeout(req, handlerPromise, timeoutLimit);
  };
}
