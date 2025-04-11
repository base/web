import type { NextApiRequest, NextApiResponse } from 'next';
import { DEFAULT_BATCH_SIZE } from 'apps/web/src/utils/datastores/constants';
import { verifyKeys, type VerificationResult } from 'apps/web/src/utils/datastores/kv/verifyKeys';
import { verifyMigrationAuthToken } from 'apps/web/src/utils/datastores/verifyMigrationAuthToken';

const DEFAULT_COUNT = 100;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  if (!verifyMigrationAuthToken(req)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  const cursor = Array.isArray(req.query.cursor) ? req.query.cursor[0] : req.query.cursor ?? '0';
  const count = Number(req.query.count) || DEFAULT_COUNT;
  const batchSize = Array.isArray(req.query.batchSize)
    ? Number(req.query.batchSize[0])
    : Number(req.query.batchSize) || DEFAULT_BATCH_SIZE;

  let runCount = 0;
  let nextCursor = cursor;
  let processedCount = 0;
  let successCount = 0;
  let mismatches: VerificationResult[] = [];

  do {
    try {
      const data = await verifyKeys(nextCursor, batchSize);
      nextCursor = data.nextCursor;
      successCount += data.successCount;
      processedCount += data.processedCount;
      mismatches.push(...data.mismatches);
      runCount++;
    } catch (error) {
      return res.status(500).json({
        error: `Failed to verify batch: ${
          error instanceof Error ? error.message : JSON.stringify(error)
        }`,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  } while (nextCursor !== '0' && runCount < count);

  return res.status(200).json({
    nextCursor,
    successCount,
    processedCount,
    mismatches,
  });
}
