import { base } from 'viem/chains';
import { configure } from '@coinbase/onchaintestkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
dotenv.config({ path: ['.env', '.env.local'] });

export const DEFAULT_PASSWORD = 'PASSWORD';
export const DEFAULT_SEED_PHRASE = process.env.E2E_TEST_SEED_PHRASE;

// Configure the test with MetaMask setup without adding network yet
const baseConfig = configure()
  .withLocalNode({
    chainId: base.id,
    forkUrl: process.env.E2E_TEST_FORK_URL,
    forkBlockNumber: BigInt(process.env.E2E_TEST_FORK_BLOCK_NUMBER ?? '0'),
    hardfork: 'cancun',
  })
  .withMetaMask()
  .withSeedPhrase({
    seedPhrase: DEFAULT_SEED_PHRASE ?? 'wad',
    password: DEFAULT_PASSWORD,
  })
  // Add the network with the actual port in a custom setup
  .withNetwork({
    name: 'Base Mainnet',
    chainId: base.id,
    symbol: 'ETH',
    // placeholder for the actual rpcUrl, which is auto injected by the node fixture
    rpcUrl: 'http://localhost:8545',
  });

// Build the config
const config = baseConfig.build();

export const metamaskWalletConfig = config;
