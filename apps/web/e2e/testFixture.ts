import { metamaskWalletConfig } from './walletConfig/metamaskWalletConfig';
import { createOnchainTest } from '@coinbase/onchaintestkit';

// extend the current fixture
export const test = createOnchainTest(metamaskWalletConfig);
