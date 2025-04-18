import { NextRequest, NextResponse } from 'next/server';
import { vercelDb as db } from 'apps/web/src/utils/datastores/rds';
import { kv } from 'apps/web/src/utils/datastores/kv';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/app/api/decorators';

// Use force-dynamic to prevent build-time evaluation of env vars
export const dynamic = 'force-dynamic';

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

  try {
    await kv.incr(`stat:requests.${PAGE_KEY}`);
  } catch (error) {
    logger.error('error getting registry entries', error);
  }
  // Set caching headers
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}

export const GET = withTimeout(handler);
