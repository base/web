/**
 * Simple demonstration of the ENS Provider API implementation
 *
 * This file shows how the problem statement code would work:
 *
 * ```javascript
 * const resolver = await provider.getResolver("kushmanmb.eth");
 * const tx = await resolver.setText("twitter", "@kushmanmb");
 * await tx.wait();
 * ```
 */

import { createEnsProvider } from './ensProvider';
import type { WalletClient, PublicClient } from 'viem';

/**
 * Demo function showing the exact API from the problem statement
 */
export async function demonstrateProblemStatement(
  walletClient: WalletClient,
  publicClient: PublicClient,
) {
  // Create the provider
  const provider = createEnsProvider(walletClient, publicClient);

  // This is the exact code from the problem statement:
  const resolver = await provider.getResolver('kushmanmb.eth');
  const tx = await resolver.setText('twitter', '@kushmanmb');
  await tx.wait();

  return {
    resolverAddress: resolver.address,
    transactionHash: tx.hash,
    message: 'Successfully updated twitter handle to @kushmanmb',
  };
}

/**
 * Type checking to ensure the API matches the problem statement
 */
export async function typeCheckAPI(
  walletClient: WalletClient,
  publicClient: PublicClient,
) {
  const provider = createEnsProvider(walletClient, publicClient);

  // Verify provider has getResolver method
  const getResolverMethod: (name: string) => Promise<{
    address: `0x${string}`;
    setText: (key: string, value: string) => Promise<{ hash: `0x${string}`; wait: () => Promise<any> }>;
  }> = provider.getResolver;

  // Use the API
  const resolver = await provider.getResolver('kushmanmb.eth');

  // Verify resolver has address property
  const address: `0x${string}` = resolver.address;

  // Verify resolver has setText method
  const setTextMethod: (key: string, value: string) => Promise<{
    hash: `0x${string}`;
    wait: () => Promise<any>;
  }> = resolver.setText;

  // Verify setText returns transaction with hash and wait
  const tx = await resolver.setText('twitter', '@kushmanmb');
  const hash: `0x${string}` = tx.hash;
  const waitMethod: () => Promise<any> = tx.wait;

  return { address, hash };
}
