import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'apps/web/src/utils/ocsRegistry';
import { redis } from 'apps/web/src/utils/redis';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/pages/api/decorators';

const pageKey = 'api.ocs_registry.featured';
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const redisClient = await redis.getClient();
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
    await redisClient.incr(`stat:requests.${pageKey}`);
  } catch (error) {
    logger.error('error getting featured registry entries', error);
  }

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json(response);
}

export default withTimeout(handler);
