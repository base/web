import { NextResponse } from 'next/server';
import { getVercelDb } from 'apps/web/src/utils/datastores/rds';
import { getKv } from 'apps/web/src/utils/datastores/kv';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';

const PAGE_KEY = 'api.ocs_registry.featured';

async function handler() {
  const db = getVercelDb();
  const content = await db
    .selectFrom('content')
    .where('is_featured', '=', true)
    .selectAll()
    .limit(1)
    .execute();

  const row = content[0];

  const response = {
    data: row,
  };

  try {
    const kv = getKv();
    await kv.incr(`stat:requests.${PAGE_KEY}`);
  } catch (error) {
    logger.error('error getting featured registry entries', error);
  }

  // Set caching headers
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}

export const GET = withTimeout(handler);
