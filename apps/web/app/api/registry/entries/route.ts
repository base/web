import { NextRequest, NextResponse } from 'next/server';
import { getVercelDb } from 'apps/web/src/utils/datastores/rds';
import { getKv } from 'apps/web/src/utils/datastores/kv';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';

const PAGE_KEY = 'api.ocs_registry.entries';

async function handler(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  const curation = req.nextUrl.searchParams.get('curation');
  const page = req.nextUrl.searchParams.get('page') ?? '1';
  const limit = req.nextUrl.searchParams.get('limit') ?? '10';

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const offset = (pageNum - 1) * limitNum;

  // Base query for filtering by category if provided
  try {
    const db = getVercelDb();
    let baseQuery = db.selectFrom('content');

    if (category) {
      baseQuery = baseQuery.where('category', 'ilike', `%${category}%`);
    }

    if (curation) {
      baseQuery = baseQuery.where('curation', 'ilike', `%${curation}%`);
    }

    // Fetch total records count
    const totalRecordsQuery = baseQuery.select(db.fn.count('id').as('count'));
    const totalRecords = await totalRecordsQuery.execute();
    const totalRecordsCount = parseInt(totalRecords[0].count as string, 10);

    // Fetch paginated content
    const contentQuery = baseQuery.selectAll().limit(limitNum).offset(offset);
    const content = await contentQuery.execute();

    const response = {
      data: content.map((row) => ({
        id: row.id,
        category: row.category,
        content: row.content,
        updated_at: row.updated_at,
        created_at: row.created_at,
      })),
      pagination: {
        total_records: totalRecordsCount,
        current_page: pageNum,
        total_pages: Math.ceil(totalRecordsCount / limitNum),
        limit: limitNum,
      },
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
    logger.error('error getting registry entries', error);
    return NextResponse.json(
      { error: `Error fetching registry entries: ${error}` },
      { status: 500 },
    );
  }
}

export const GET = withTimeout(handler);
