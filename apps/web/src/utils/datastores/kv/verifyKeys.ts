import { kv, cbhqKv } from '.';

export type VerificationResult = {
  key: string;
  isMatch: boolean;
  cbhqValue: unknown;
  vercelValue: unknown;
};

/**
 * This endpoint is used to verify the migration of the KV store from vercel to cbhq.
 */
export async function verifyKeys(cursor: string, batchSize?: number) {
  try {
    const { cursor: nextCursor, elements } = await cbhqKv.scan(cursor, batchSize);
    if (elements.length === 0) {
      throw new Error('No keys found in CBHQ KV');
    }

    const results: VerificationResult[] = [];
    for (const key of elements) {
      const cbhqValue = await cbhqKv.get(key);
      const vercelValue = await kv.get(key);
      results.push({
        key,
        isMatch: JSON.stringify(cbhqValue) === JSON.stringify(vercelValue),
        cbhqValue,
        vercelValue,
      });
    }

    return {
      nextCursor,
      successCount: results.filter((result) => result.isMatch).length,
      processedCount: results.length,
      mismatches: results.filter((result) => !result.isMatch),
    };
  } catch (error) {
    throw new Error(
      `Failed to verify keys:${error instanceof Error ? error.message : JSON.stringify(error)}`,
    );
  }
}
