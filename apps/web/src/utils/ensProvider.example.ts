/**
 * Example usage of the ENS Provider API
 *
 * This file demonstrates how to use the createEnsProvider utility
 * to interact with ENS/Basename text records.
 */

import { createEnsProvider } from 'apps/web/src/utils/ensProvider';
import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { base } from 'viem/chains';

/**
 * Example 1: Using with a browser wallet (e.g., MetaMask)
 */
export async function exampleWithBrowserWallet() {
  // Check if wallet is available
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Browser wallet not available');
  }

  // Create wallet client from browser wallet
  const walletClient = createWalletClient({
    chain: base,
    transport: custom(window.ethereum),
  });

  // Create public client for reading contract data
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  // Create the ENS provider
  const provider = createEnsProvider(walletClient, publicClient);

  // Use the exact API from the problem statement
  const resolver = await provider.getResolver('kushmanmb.eth');
  const tx = await resolver.setText('twitter', '@kushmanmb');
  await tx.wait();

  console.log('Text record updated successfully!');
  console.log('Transaction hash:', tx.hash);
}

/**
 * Example 2: Using with Wagmi hooks in a React component
 */
export function ExampleReactComponent() {
  // This would need to be imported in a real React component:
  // import { useWalletClient, usePublicClient } from 'wagmi';
  // import { createEnsProviderFromClients } from 'apps/web/src/utils/ensProvider';

  /*
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const handleSetText = async () => {
    if (!walletClient || !publicClient) {
      console.error('Wallet not connected');
      return;
    }

    const provider = createEnsProvider(walletClient, publicClient);
    const resolver = await provider.getResolver('kushmanmb.eth');
    const tx = await resolver.setText('twitter', '@kushmanmb');
    const receipt = await tx.wait();

    console.log('Transaction successful:', receipt);
  };

  return (
    <button onClick={handleSetText}>
      Update Twitter Handle
    </button>
  );
  */

  return null; // Placeholder for example
}

/**
 * Example 3: Setting multiple text records
 */
export async function exampleMultipleTextRecords(
  walletClient: any,
  publicClient: any,
) {
  const provider = createEnsProvider(walletClient, publicClient);
  const resolver = await provider.getResolver('kushmanmb.eth');

  // Set twitter handle
  const tx1 = await resolver.setText('com.twitter', '@kushmanmb');
  await tx1.wait();
  console.log('Twitter handle set');

  // Set github handle
  const tx2 = await resolver.setText('com.github', 'kushmanmb');
  await tx2.wait();
  console.log('GitHub handle set');

  // Set description
  const tx3 = await resolver.setText('description', 'Builder on Base');
  await tx3.wait();
  console.log('Description set');
}

/**
 * Example 4: Error handling
 */
export async function exampleWithErrorHandling(
  walletClient: any,
  publicClient: any,
) {
  try {
    const provider = createEnsProvider(walletClient, publicClient);

    // Try to get a resolver for a name that doesn't exist
    const resolver = await provider.getResolver('nonexistent-name-12345.eth');

    const tx = await resolver.setText('twitter', '@handle');
    await tx.wait();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('No resolver found')) {
        console.error('This name does not have a resolver set up');
      } else if (error.message.includes('No account found')) {
        console.error('Please connect your wallet first');
      } else {
        console.error('Error updating text record:', error.message);
      }
    }
  }
}
