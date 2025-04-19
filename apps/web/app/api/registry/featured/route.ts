import { NextResponse } from 'next/server';
import { getVercelDb } from 'apps/web/src/utils/datastores/rds';
import { getKv } from 'apps/web/src/utils/datastores/kv';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';

const PAGE_KEY = 'api.ocs_registry.featured';

async function handler() {
  try {
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

    // Increment request count
    const kv = getKv();
    await kv.incr(`stat:requests.${PAGE_KEY}`);

    // Set caching headers
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate',
      },
    });
  } catch (error) {
    logger.error('error getting featured registry entries', error);
    return NextResponse.json(
      { error: `Error fetching featured registry entries: ${error}` },
      { status: 500 },
    );
  }
}

export const GET = withTimeout(handler);
