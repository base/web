export enum RawErrorStrings {
  Unavailable = 'Name unavailable',
  TooShort = 'Name is too short',
  TooLong = 'Name is too long',
  DisallowedChars = 'disallowed character:',
  Invalid = 'Name is invalid',
  InvalidUnderscore = 'underscore allowed only at start',
  TransactionFailed = 'Transaction failed or not found'
}

export type TransactionStatus = 'success' | 'failure' | 'pending';

export interface TransactionResult {
  status: TransactionStatus;
  receipt?: TransactionReceipt;
  error?: string;
}

export async function getTransactionStatus(
  chain: Chain, 
  transactionId: Hash,
  confirmations: number = 2
): Promise<TransactionResult> {
  const client = createPublicClient({
    chain,
    transport: http(),
    timeout: 15_000, // 15 seconds timeout
    retryCount: 3,
    retryDelay: 1000
  });

  try {
    const receipt = await client.waitForTransactionReceipt({ 
      hash: transactionId,
      confirmations,
      onReplaced: (replacement) => {
        console.warn('Transaction replaced:', replacement);
      }
    });

    return {
      status: receipt.status === 'success' ? 'success' : 'failure',
      receipt
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : RawErrorStrings.TransactionFailed;
    console.error(`Transaction error for hash ${transactionId}:`, errorMessage);
    
    return {
      status: 'failure',
      error: errorMessage
    };
  }
}
