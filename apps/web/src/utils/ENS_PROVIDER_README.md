# ENS Provider API

This module provides a provider/resolver API for interacting with ENS (Ethereum Name Service) and Basenames text records.

## Overview

The API provides a familiar interface for setting text records on ENS names and Basenames, mimicking the ethers.js pattern while using modern wagmi/viem infrastructure.

## Features

- ✅ Simple provider/resolver pattern
- ✅ Automatic name formatting (adds `.base.eth` if missing)
- ✅ Multi-chain support (Base and Base Sepolia)
- ✅ Transaction waiting with receipt
- ✅ Full TypeScript support
- ✅ Compatible with wagmi hooks

## Installation

The module is already part of the Base web repository. Import it from:

```typescript
import { createEnsProvider } from 'apps/web/src/utils/ensProvider';
```

## Usage

### Basic Usage

```typescript
import { createEnsProvider } from 'apps/web/src/utils/ensProvider';
import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { base } from 'viem/chains';

// Create clients
const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum),
});

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// Create provider and set text record
const provider = createEnsProvider(walletClient, publicClient);
const resolver = await provider.getResolver('kushmanmb.eth');
const tx = await resolver.setText('twitter', '@kushmanmb');
await tx.wait();
```

### With React and Wagmi

```typescript
import { useWalletClient, usePublicClient } from 'wagmi';
import { createEnsProvider } from 'apps/web/src/utils/ensProvider';

function MyComponent() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const handleUpdateTwitter = async () => {
    if (!walletClient || !publicClient) return;

    const provider = createEnsProvider(walletClient, publicClient);
    const resolver = await provider.getResolver('myname.base.eth');
    const tx = await resolver.setText('com.twitter', '@myhandle');
    const receipt = await tx.wait();

    console.log('Transaction successful:', receipt);
  };

  return <button onClick={handleUpdateTwitter}>Update Twitter</button>;
}
```

### Setting Multiple Text Records

```typescript
const provider = createEnsProvider(walletClient, publicClient);
const resolver = await provider.getResolver('kushmanmb.eth');

// Set twitter
const tx1 = await resolver.setText('com.twitter', '@kushmanmb');
await tx1.wait();

// Set github
const tx2 = await resolver.setText('com.github', 'kushmanmb');
await tx2.wait();

// Set description
const tx3 = await resolver.setText('description', 'Builder on Base');
await tx3.wait();
```

### Error Handling

```typescript
try {
  const provider = createEnsProvider(walletClient, publicClient);
  const resolver = await provider.getResolver('myname.eth');
  const tx = await resolver.setText('twitter', '@myhandle');
  await tx.wait();
} catch (error) {
  if (error.message.includes('No resolver found')) {
    console.error('Name does not have a resolver');
  } else if (error.message.includes('No account found')) {
    console.error('Please connect your wallet');
  } else {
    console.error('Transaction failed:', error);
  }
}
```

## API Reference

### `createEnsProvider(walletClient, publicClient)`

Creates an ENS provider instance.

**Parameters:**
- `walletClient: WalletClient` - Viem wallet client for sending transactions
- `publicClient: PublicClient` - Viem public client for reading blockchain data

**Returns:** `EnsProvider`

### `EnsProvider`

**Methods:**
- `getResolver(name: string): Promise<EnsResolver>`
  - Gets a resolver for the given ENS name or Basename
  - Automatically formats names (adds `.base.eth` if no domain suffix)
  - Throws error if no resolver found

### `EnsResolver`

**Properties:**
- `address: Address` - The resolver contract address

**Methods:**
- `setText(key: string, value: string): Promise<EnsTransaction>`
  - Sets a text record on the name
  - `key` - The text record key (e.g., 'com.twitter', 'description')
  - `value` - The value to set
  - Returns a transaction object

### `EnsTransaction`

**Properties:**
- `hash: 0x${string}` - The transaction hash

**Methods:**
- `wait(): Promise<{ status: string, blockHash: string, transactionHash: string }>`
  - Waits for the transaction to be confirmed
  - Returns the transaction receipt

## Text Record Keys

Common text record keys for ENS/Basenames:

- `com.twitter` - Twitter/X handle
- `com.github` - GitHub username
- `xyz.farcaster` - Farcaster username
- `description` - Profile description
- `url` - Website URL
- `email` - Email address
- `avatar` - Avatar image URL (IPFS)

See `UsernameTextRecordKeys` enum in `usernames.ts` for the complete list.

## Implementation Details

- Uses viem for contract interactions
- Supports Base and Base Sepolia networks
- Automatically determines the correct chain from the name
- Uses L2 Resolver ABI for setText operations
- Queries the Registry contract to get resolver addresses

## Testing

Tests are located in `ensProvider.test.ts`:

```bash
yarn workspace @app/web test src/utils/ensProvider.test.ts
```

## Examples

See `ensProvider.example.ts` for more detailed usage examples, including:
- Browser wallet integration
- Multiple text records
- Error handling patterns
- React component integration

## Related Files

- `ensProvider.ts` - Main implementation
- `ensProvider.test.ts` - Unit tests
- `ensProvider.example.ts` - Usage examples
- `ensProvider.demo.ts` - Type-checked demonstration
- `usernames.ts` - Username utilities and constants
- `L2Resolver.ts` (ABI) - Resolver contract ABI
- `RegistryAbi.ts` - Registry contract ABI
