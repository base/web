# Onchain Test Kit

End-to-end testing toolkit for blockchain applications, powered by Playwright.

## Overview

This toolkit provides a robust framework for testing blockchain applications, with built-in support for wallet interactions, network management, and common blockchain testing scenarios.

## Quick Start

1. Install dependencies:

Make sure you have yarn:

```bash
npm install -g corepack
yarn set version 4.9.2
```

And then run this to install the dependencies: 

```bash
npm install --save-dev @playwright/test @coinbase/onchaintestkit
# or
yarn add -D @playwright/test @coinbase/onchaintestkit
```

Make sure you have foundry set up too

2. Set up environment variables:

```env
E2E_TEST_SEED_PHRASE="your test wallet seed phrase"
```

3. Create your wallet configuration:

```typescript
// walletConfig/metamaskWalletConfig.ts
import { configure } from 'e2e/onchainTestKit';
import { baseSepolia } from 'viem/chains';

export const DEFAULT_PASSWORD = 'PASSWORD';
export const DEFAULT_SEED_PHRASE = process.env.E2E_TEST_SEED_PHRASE;

export const metamaskWalletConfig = configure()
  .withMetaMask()
  .withSeedPhrase({
    seedPhrase: DEFAULT_SEED_PHRASE ?? '',
    password: DEFAULT_PASSWORD,
  })
  .withNetwork({
    name: baseSepolia.name,
    rpcUrl: baseSepolia.rpcUrls.default.http[0],
    chainId: baseSepolia.id,
    symbol: baseSepolia.nativeCurrency.symbol,
  })
  .build();
```

4. Write your test:

```typescript
import { metamaskWalletConfig } from 'e2e/walletConfig/metamaskWalletConfig';
import { NotificationPageType } from './onchainTestKit/wallets/MetaMask/pages/NotificationPage';
import { ActionApprovalType, BaseActionType } from './onchainTestKit/wallets/BaseWallet';
import { createOnchainTest } from './onchainTestKit';

const test = createOnchainTest(metamaskWalletConfig);
const { expect } = test;

test('connect wallet and swap', async ({ page, metamask }) => {
  if (!metamask) throw new Error('MetaMask fixture is required');

  // Connect wallet
  await page.getByTestId('ockConnectButton').click();
  await page
    .getByTestId('ockModalOverlay')
    .first()
    .getByRole('button', { name: 'MetaMask' })
    .click();
  await metamask.handleAction(BaseActionType.CONNECT_TO_DAPP);
  await page.getByTestId('tos-accept-button').click();

  // Input swap amount
  await page.locator('input[placeholder="0.0"]').first().fill('0.0001');
  await page.getByRole('button', { name: 'Swap' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Handle MetaMask notifications
  let notificationType = await metamask.identifyNotificationType();

  // Handle spending cap approval if needed
  if (notificationType === NotificationPageType.SpendingCap) {
    await metamask.handleAction(BaseActionType.CHANGE_SPENDING_CAP, {
      approvalType: ActionApprovalType.APPROVE,
    });
  }

  notificationType = await metamask.identifyNotificationType();

  // Handle permit2 signature
  if (notificationType === NotificationPageType.SpendingCap) {
    await metamask.handleAction(BaseActionType.HANDLE_SIGNATURE, {
      approvalType: ActionApprovalType.APPROVE,
    });
  }

  notificationType = await metamask.identifyNotificationType();

  // Handle transaction
  if (notificationType === NotificationPageType.Transaction) {
    await metamask.handleAction(BaseActionType.HANDLE_TRANSACTION, {
      approvalType: ActionApprovalType.APPROVE,
    });
  }

  // Verify transaction
  await expect(page.getByRole('link', { name: 'View on Explorer' })).toBeVisible();
});
```

## Features

- **Playwright Integration**: Built on top of Playwright for reliable browser automation
- **Multiple Wallet Support**: Support for MetaMask and Coinbase Wallet
- **Action Handling**: Simplified wallet action management
  - Connect to DApp
  - Handle transactions
  - Manage token approvals
  - Handle signatures
  - Switch networks
- **Network Management**: Easy network configuration using viem chains
- **Type Safety**: Full TypeScript support

## Configuration Builder

The toolkit uses a fluent builder pattern for configuration:

```typescript
const config = configure()
  .withMetaMask()
  .withSeedPhrase({
    seedPhrase: 'your seed phrase',
    password: 'your password',
  })
  .withNetwork({
    name: 'Network Name',
    rpcUrl: 'RPC URL',
    chainId: 1,
    symbol: 'ETH',
  })
  .build();
```

### Available Methods

- `withMetaMask()`: Initialize MetaMask configuration
- `withCoinbase()`: Initialize Coinbase Wallet configuration
- `withSeedPhrase()`: Configure wallet with seed phrase
- `withNetwork()`: Configure network settings
- `withCustomSetup()`: Add custom setup steps

## Wallet Actions

### Base Actions

```typescript
enum BaseActionType {
  CONNECT_TO_DAPP = 'CONNECT_TO_DAPP',
  HANDLE_TRANSACTION = 'HANDLE_TRANSACTION',
  HANDLE_SIGNATURE = 'HANDLE_SIGNATURE',
  CHANGE_SPENDING_CAP = 'CHANGE_SPENDING_CAP',
  SWITCH_NETWORK = 'SWITCH_NETWORK',
  IMPORT_WALLET_FROM_SEED = 'IMPORT_WALLET_FROM_SEED',
}
```

### Notification Types

```typescript
enum NotificationPageType {
  Transaction = 'Transaction',
  SpendingCap = 'SpendingCap',
  Signature = 'Signature',
}
```

### Approval Types

```typescript
enum ActionApprovalType {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}
```

## Best Practices

1. **Error Handling**

   - Always check if wallet fixture exists
   - Handle all possible notification types
   - Use try-catch blocks for wallet actions

2. **Network Management**

   - Use viem chains for network configuration
   - Handle network switching gracefully
   - Test on appropriate test networks

3. **Test Structure**

   - Use beforeAll/beforeEach for wallet setup
   - Clean up after tests
   - Group related tests using test.describe

4. **Security**
   - Use environment variables for sensitive data
   - Never commit seed phrases or private keys
   - Use test accounts with minimal funds
  
5. **Development**
   - Run yarn
   - Run yarn format
   - Run yarn format:check
   - Run yarn lint
   - If yarn lint produces any errors, fix accordingly through yarn lint:fix or manually fixing the files

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## LocalNodeManager

The `LocalNodeManager` provides a comprehensive interface for managing local Anvil Ethereum nodes during testing. It handles node lifecycle, state management, and provides methods for manipulating blockchain state.

### Key Features

- **Node lifecycle management**: Start and stop nodes
- **Chain state manipulation**: Create snapshots, revert state, reset chain
- **Time control**: Time travel, block mining
- **Account management**: Set balances, impersonate accounts
- **Network configuration**: Set gas prices, chain ID
- **Cross-process port allocation for parallel testing**

### Parallel Test Execution

The `LocalNodeManager` supports running multiple Anvil nodes in parallel by dynamically checking and allocating available ports. This is especially important for running Playwright tests in parallel with multiple workers, where each test file runs in its own separate Node.js process.

#### How Cross-Process Port Allocation Works

1. The `LocalNodeManager` uses TCP socket binding tests to determine if a port is available
2. The port allocation uses a large range (10000-20000) to minimize conflicts and reduce allocation time
3. When a new node starts, it simply:
   - Uses the specific port you requested (if available)
   - Otherwise randomly selects ports from the range until it finds an available one
4. This simple yet effective approach makes port allocation fast and reliable
5. Each node has a retry mechanism to handle edge cases and race conditions

This approach works reliably across multiple processes because it uses actual network socket testing rather than relying on in-memory state, and the large port range minimizes collisions.

#### Usage Example

```typescript
// Create node with automatic port allocation
const nodeManager = new LocalNodeManager({
  chainId: 84532,
  mnemonic: process.env.E2E_TEST_SEED_PHRASE,
  // Optional: specify a custom port range
  // portRange: [10000, 20000]
});

// Start the node (port is automatically allocated)
await nodeManager.start();

// Get the allocated port
const port = nodeManager.getPort();
console.log(`Node running on port ${port}`);

// Run your test...

// Stop the node
await nodeManager.stop();
```

### Running Tests in Parallel

To run Playwright tests in parallel with multiple Anvil nodes:

1. Configure Playwright to use multiple workers in your `playwright.config.ts`:

```typescript
export default defineConfig({
  // Run tests in parallel with multiple workers (up to 20)
  workers: 20,
  // Other configuration...
});
```

2. In each test, create a `LocalNodeManager` instance with automatic port allocation
3. The `LocalNodeManager` will ensure each test gets a unique port even across separate processes

See `e2e/multinode-example.spec.ts` for a complete example of running multiple nodes in parallel.

## Best Practices

- Always call `nodeManager.stop()` when your test completes to release resources
- Use `test.afterEach()` hooks to ensure nodes are stopped even if tests fail
- Consider using a custom port range if you need to restrict which ports are used
- Use snapshots for efficient state management between test steps
- Keep the port range small enough to avoid conflicts with other services but large enough to accommodate your maximum worker count plus a small buffer