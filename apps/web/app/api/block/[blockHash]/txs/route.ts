import { NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

export type BlockTransaction = {
  txid: string;
  version: number;
  locktime: number;
  vin: {
    txid: string;
    vout: number;
    prevout: {
      scriptpubkey: string;
      scriptpubkey_asm: string;
      scriptpubkey_type: string;
      scriptpubkey_address: string;
      value: number;
    };
    scriptsig: string;
    scriptsig_asm: string;
    witness?: string[];
    is_coinbase: boolean;
    sequence: number;
  }[];
  vout: {
    scriptpubkey: string;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address?: string;
    value: number;
  }[];
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
};

/**
 * GET /api/block/[blockHash]/txs
 * Fetches transactions for a specific Bitcoin block from mempool.space API
 * Path parameters:
 * - blockHash: The hash of the Bitcoin block
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ blockHash: string }> }
) {
  try {
    const { blockHash } = await params;
    
    // Validate blockHash is provided
    if (!blockHash) {
      return NextResponse.json(
        { error: 'Block hash is required' },
        { status: 400 }
      );
    }

    // Validate blockHash format (64 hex characters for Bitcoin block hash)
    if (!/^[0-9a-fA-F]{64}$/.test(blockHash)) {
      return NextResponse.json(
        { error: 'Invalid block hash format. Must be 64 hexadecimal characters.' },
        { status: 400 }
      );
    }

    const mempoolApiUrl = `https://mempool.space/api/block/${blockHash}/txs`;
    
    logger.info('Fetching block transactions', { blockHash, url: mempoolApiUrl });
    
    const response = await fetch(mempoolApiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 1 hour since block transactions are immutable once confirmed
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      logger.error('Failed to fetch block transactions from mempool.space', {
        blockHash,
        status: response.status,
        statusText: response.statusText,
      });
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Block not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch block transactions' },
        { status: response.status }
      );
    }

    const data: BlockTransaction[] = await response.json();
    
    logger.info('Successfully fetched block transactions', {
      blockHash,
      transactionCount: data.length,
    });
    
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching block transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching block transactions' },
      { status: 500 }
    );
  }
}
