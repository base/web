import { kv, cbhqKv } from '.';
import { DEFAULT_BATCH_SIZE, DEFAULT_BATCH_COUNT } from '../constants';
import { logger } from 'apps/web/src/utils/logger';

type MigrateKeysParams = {
  startingCursor: string;
  batchSize?: number;
  batchCount?: number;
};

export type MigrationResult = { key: string; value: unknown; isSuccess: boolean };

export async function migrateKeys({ startingCursor, batchSize, batchCount }: MigrateKeysParams) {
  if (!batchSize) {
    batchSize = DEFAULT_BATCH_SIZE;
  }

  if (!batchCount) {
    batchCount = DEFAULT_BATCH_COUNT;
  }

  logger.info(`Starting migration from ${startingCursor}, row target: ${batchSize * batchCount}`);
  try {
    let count = 0;
    let nextCursor = startingCursor;
    let processedCount = 0;
    let successCount = 0;
    let failures = 0;
    do {
      logger.info(`Fetching ${batchSize} keys from cursor ${nextCursor}`);
      const { cursor, elements } = await kv.scan(nextCursor, batchSize ?? DEFAULT_BATCH_SIZE);
      if (elements.length === 0) {
        throw new Error('No keys found in Vercel KV');
      }

      logger.info(`${elements.length} keys received. Inserting into CBHQ KV`);
      const results: MigrationResult[] = [];
      for (const key of elements) {
        const value = await kv.get(key);
        const setResult = await cbhqKv.set(key, value);
        results.push({ key, value, isSuccess: setResult === 'OK' });
      }

      logger.info(`Migrated ${results.length} keys`);

      nextCursor = cursor;
      successCount += results.filter((result) => result.isSuccess).length;
      processedCount += results.length;
      failures += results.filter((result) => !result.isSuccess).length;
      count++;
    } while (nextCursor !== '0' && count < batchCount);

    logger.info(
      `Migrated ${processedCount} keys with ${successCount} successes and ${failures} failures`,
    );

    return {
      nextCursor,
      successCount,
      processedCount,
      failures,
    };
  } catch (error) {
    throw new Error(
      `Failed to migrate batch:${error instanceof Error ? error.message : JSON.stringify(error)}`,
    );
  }
}
