import type { NextApiRequest, NextApiResponse } from 'next';
import { migrateKeys } from 'apps/web/src/utils/datastores/kv/migrateKeys';
import { verifyMigrationAuthToken } from 'apps/web/src/utils/datastores/verifyMigrationAuthToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  if (!verifyMigrationAuthToken(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  const { cursor, batchSize, batchCount } = req.query;

  if (batchSize && isNaN(Number(batchSize))) {
    return res.status(400).json({ error: 'batchSize must be a number' });
  }
  if (batchCount && isNaN(Number(batchCount))) {
    return res.status(400).json({ error: 'batchCount must be a number' });
  }

  try {
    const data = await migrateKeys({
      startingCursor: Array.isArray(cursor) ? cursor[0] : cursor ?? '0',
      batchSize: batchSize ? Number(batchSize) : undefined,
      batchCount: batchCount ? Number(batchCount) : undefined,
    });
    return res.status(200).json({
      message: 'Keys migrated successfully',
      nextCursor: data.nextCursor,
      successCount: data.successCount,
      processedCount: data.processedCount,
      failures: data.failures,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Failed to migrate batch: ${
        error instanceof Error ? error.message : JSON.stringify(error)
      }`,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
