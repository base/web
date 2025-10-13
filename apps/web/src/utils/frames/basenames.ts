import { createPublicClient, http } from 'viem';
import type { TransactionReceipt } from 'viem';
import type { Chain } from 'viem/chains';

export enum RawErrorStrings {
  Unavailable = 'Name unavailable',
  TooShort = 'Name is too short',
  TooLong = 'Name is too long',
  DisallowedChars = 'disallowed character:',
  Invalid = 'Name is invalid',
  InvalidUnderscore = 'underscore allowed only at start',
}

export async function getTransactionStatus(chain: Chain, transactionId: string) {
  const client = createPublicClient({
    chain: chain,
    transport: http(),
  });

  try {
    const tx: TransactionReceipt = await client.waitForTransactionReceipt({ hash: transactionId });
    const txStatus = tx.status;
    return txStatus;
  } catch (error) {
    console.error('Could not get transaction receipt:', error);
  }
}
