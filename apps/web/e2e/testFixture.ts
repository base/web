import { metamaskWalletConfig } from './walletConfig/metamaskWalletConfig';
import { createOnchainTest } from '@coinbase/onchaintestkit';

// extend the current fixture
export const test = createOnchainTest(metamaskWalletConfig);

// Reset node state after each test to ensure blockchain state isolation
test.afterEach(async ({ node }) => {
  if (node) {
    await node.reset();
  }
});
