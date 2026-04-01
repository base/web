import { NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

export type MiningRewardStats = {
  startBlock: number;
  endBlock: number;
  totalReward: number;
  totalFee: number;
  totalTx: number;
};

/**
 * GET /api/mining/reward-stats
 * Fetches Bitcoin mining reward statistics from mempool.space API
 * Query parameters:
 * - blockCount: Number of blocks to fetch stats for (default: 100)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blockCount = searchParams.get('blockCount') ?? '100';
    
    // Validate blockCount is a positive number
    const blockCountNum = parseInt(blockCount, 10);
    if (isNaN(blockCountNum) || blockCountNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid blockCount parameter. Must be a positive number.' },
        { status: 400 }
      );
    }

    const mempoolApiUrl = `https://mempool.space/api/v1/mining/reward-stats/${blockCountNum}`;
    
    logger.info('Fetching mining reward stats', { blockCount: blockCountNum, url: mempoolApiUrl });
    
    const response = await fetch(mempoolApiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 5 minutes to avoid hammering the mempool.space API
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      logger.error('Failed to fetch mining reward stats from mempool.space', {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { error: 'Failed to fetch mining reward stats' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching mining reward stats:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching mining reward stats' },
      { status: 500 }
    );
  }
}
