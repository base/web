import { type Basename } from '@coinbase/onchainkit/identity';
import {
  type Address,
  type Chain,
  type PublicClient,
  type WalletClient,
  namehash,
  normalize,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import RegistryAbi from 'apps/web/src/abis/RegistryAbi';
import { USERNAME_BASE_REGISTRY_ADDRESSES } from 'apps/web/src/addresses/usernames';

/**
 * Username domains for different chains
 */
const USERNAME_DOMAINS: Record<number, string> = {
  [baseSepolia.id]: 'basetest.eth',
  [base.id]: 'base.eth',
};

/**
 * Format a username to include the proper domain suffix
 */
function formatDefaultUsername(username: string): Basename {
  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    return `${username}.${USERNAME_DOMAINS[base.id]}`.toLowerCase() as Basename;
  }
  return username as Basename;
}

/**
 * Get the chain for a given basename
 */
function getChainForBasename(username: Basename): Chain {
  return username.endsWith(`.${USERNAME_DOMAINS[base.id]}`) ? base : baseSepolia;
}

/**
 * Fetch resolver address from the registry contract
 */
async function fetchResolverAddress(
  username: Basename,
  publicClient: PublicClient,
): Promise<Address> {
  const chain = getChainForBasename(username);
  const node = namehash(username as string);

  return publicClient.readContract({
    abi: RegistryAbi,
    address: USERNAME_BASE_REGISTRY_ADDRESSES[chain.id],
    functionName: 'resolver' as const,
    args: [node] as const,
  });
}

/**
 * Transaction interface that mimics ethers.js transaction pattern
 */
export interface EnsTransaction {
  hash: `0x${string}`;
  wait: () => Promise<{ status: string; blockHash: string; transactionHash: string }>;
}

/**
 * Resolver interface for setting ENS text records
 */
export interface EnsResolver {
  address: Address;
  setText: (key: string, value: string) => Promise<EnsTransaction>;
}

/**
 * Provider interface for ENS operations
 */
export interface EnsProvider {
  getResolver: (name: string) => Promise<EnsResolver>;
}

/**
 * Creates a transaction wrapper with a wait() method
 */
function createTransaction(
  hash: `0x${string}`,
  publicClient: PublicClient,
): EnsTransaction {
  return {
    hash,
    wait: async () => {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: 1,
      });

      return {
        status: receipt.status,
        blockHash: receipt.blockHash,
        transactionHash: receipt.transactionHash,
      };
    },
  };
}

/**
 * Creates a resolver object with setText functionality
 */
function createResolver(
  resolverAddress: Address,
  name: Basename,
  walletClient: WalletClient,
  publicClient: PublicClient,
  chain: Chain,
): EnsResolver {
  return {
    address: resolverAddress,
    setText: async (key: string, value: string): Promise<EnsTransaction> => {
      const nameHash = namehash(name);

      // Get the account from wallet client
      const [account] = await walletClient.getAddresses();
      if (!account) {
        throw new Error('No account found in wallet');
      }

      // Send the transaction
      const hash = await walletClient.writeContract({
        address: resolverAddress,
        abi: L2ResolverAbi,
        functionName: 'setText',
        args: [nameHash, key, value],
        chain,
        account,
      });

      return createTransaction(hash, publicClient);
    },
  };
}

/**
 * Creates an ENS provider that can get resolvers and set text records
 *
 * @param walletClient - Viem wallet client for sending transactions
 * @param publicClient - Viem public client for reading contract data
 * @returns EnsProvider instance
 *
 * @example
 * ```typescript
 * import { createWalletClient, createPublicClient, custom } from 'viem';
 * import { base } from 'viem/chains';
 *
 * const walletClient = createWalletClient({
 *   chain: base,
 *   transport: custom(window.ethereum),
 * });
 *
 * const publicClient = createPublicClient({
 *   chain: base,
 *   transport: http(),
 * });
 *
 * const provider = createEnsProvider(walletClient, publicClient);
 * const resolver = await provider.getResolver("kushmanmb.eth");
 * const tx = await resolver.setText("twitter", "@kushmanmb");
 * await tx.wait();
 * ```
 */
export function createEnsProvider(
  walletClient: WalletClient,
  publicClient: PublicClient,
): EnsProvider {
  return {
    getResolver: async (name: string): Promise<EnsResolver> => {
      // Format the name to ensure it has the correct domain suffix
      const formattedName = formatDefaultUsername(name);

      // Get the chain for this basename
      const chain = getChainForBasename(formattedName);

      // Ensure the public client is using the correct chain
      const chainPublicClient =
        publicClient.chain?.id === chain.id
          ? publicClient
          : publicClient.extend(() => ({ chain }));

      // Fetch the resolver address from the registry
      const resolverAddress = await fetchResolverAddress(formattedName, chainPublicClient);

      if (!resolverAddress || resolverAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error(`No resolver found for ${formattedName}`);
      }

      return createResolver(
        resolverAddress,
        formattedName,
        walletClient,
        chainPublicClient,
        chain,
      );
    },
  };
}

/**
 * Convenience function to create an ENS provider from wagmi config
 * This can be used in React components with wagmi hooks
 *
 * @example
 * ```typescript
 * import { useWalletClient, usePublicClient } from 'wagmi';
 *
 * function MyComponent() {
 *   const { data: walletClient } = useWalletClient();
 *   const publicClient = usePublicClient();
 *
 *   if (walletClient && publicClient) {
 *     const provider = createEnsProvider(walletClient, publicClient);
 *     // Use provider...
 *   }
 * }
 * ```
 */
export function createEnsProviderFromClients(
  walletClient: WalletClient | undefined,
  publicClient: PublicClient | undefined,
): EnsProvider | null {
  if (!walletClient || !publicClient) {
    return null;
  }
  return createEnsProvider(walletClient, publicClient);
}
