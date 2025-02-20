import type { Token } from '@coinbase/onchainkit/token';
import { Address, encodeFunctionData } from 'viem';
import usdc from 'apps/web/src/components/Builders/Shared/assets/usdc.png';

export type Tab =
  | 'Wallet'
  | 'Buy'
  | 'Pay'
  | 'Swap'
  | 'Earn'
  | 'Mint'
  | 'Transact'
  | 'Fund'
  | 'Checkout';

export const ONCHAINKIT_DEMO_TABS = [
  'Wallet',
  'Earn',
  'Fund',
  'Buy',
  'Checkout',
  'Mint',
  'Transact',
];

export const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  Wallet: 'Enable users to onboard and log into your app with a wallet.',
  Swap: 'Enable swaps between different cryptocurrencies.',
  Buy: 'Enable token purchases.',
  Mint: 'Enable NFT mints (ERC721 and ERC1155).',
  Checkout: 'Accept USDC payments with instant user onboarding and onramps.',
  Transact: 'Trigger onchain transactions and sponsor them with Paymaster',
  Fund: 'Fund wallets with a debit card or a coinbase account.',
  Earn: 'Earn yield on USDC and other tokens',
  Pay: 'Accept USDC payments with instant user onboarding and onramps.',
};

export const ethToken: Token = {
  name: 'ETH',
  address: '',
  symbol: 'ETH',
  decimals: 18,
  image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
  chainId: 8453,
};

export const usdcToken: Token = {
  name: 'USDC',
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  symbol: 'USDC',
  decimals: 6,
  chainId: 8453,
  image: usdc.src,
};

export const swappableTokens: Token[] = [ethToken, usdcToken];

export const earnVaultAddress = '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A';

export const nftContractAddress = '0xed2f34043387783b2727ff2799a46ce3ae1a34d2';

export const fundPresetAmountInputs = ['10', '20', '100'] as const;

const clickAbi = [
  {
    type: 'function',
    name: 'click',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Clicked',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
] as const;

const deployedContracts: Record<number, { click: Address }> = {
  [8543]: {
    click: '0x7d662A03CC7f493D447EB8b499cF4533f5B640E2',
  },
  [85432]: {
    click: '0x7d662A03CC7f493D447EB8b499cF4533f5B640E2',
  },
};

export const CLICK_CALLS = [
  {
    data: encodeFunctionData({
      abi: clickAbi,
      functionName: 'click',
      args: [],
    }),
    to: deployedContracts[85432].click,
  },
  {
    data: encodeFunctionData({
      abi: clickAbi,
      functionName: 'click',
      args: [],
    }),
    to: deployedContracts[85432].click,
  },
];

export const codeStyles = `
.code-snippet::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.code-snippet::-webkit-scrollbar-track {
  background: transparent;
}
.code-snippet::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.code-snippet::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
.code-snippet {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
/* Default theme (light) */
.shiki,
.shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
  font-style: var(--shiki-light-font-style) !important;
  font-weight: var(--shiki-light-font-weight) !important;
  text-decoration: var(--shiki-light-text-decoration) !important;
}
/* Dark theme overrides */
.dark .shiki,
.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
`;

export const codeSnippets: Record<string, string> = {
  Pay: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import {
  Checkout,
  CheckoutButton,
} from '@coinbase/onchainkit/checkout';

function CheckoutDemo() {
  return (
    <Checkout productId='my-product-id'>
      <CheckoutButton />
    </Checkout>
  )
}`,
  Swap: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import { SwapDefault } from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';

function SwapDemo() {
  const { address } = useAccount();
  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: "",
  };
  const degenToken: Token[] = [{
    name: 'DEGEN',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    symbol: 'DEGEN',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 8453,
  }];
  const swappableTokens: Token[] = [ETHToken, USDCToken];
  return (
    <SwapDefault
      from={swappableTokens}
      to={swappableTokens}
    />
  )
}`,
  Wallet: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import {
  WalletDefault
} from '@coinbase/onchainkit/wallet';

function WalletDefaultDemo() {
  return <WalletDefault />
}
`,
  Earn: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import { Earn } from '@coinbase/onchainkit/earn';

function EarnDemo() {
  const vaultAddress = '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A';
  return <Earn vaultAddress={vaultAddress} />;
}
  `,
  Fund: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import { FundCard } from "@coinbase/onchainkit/fund"

function FundDemo() {
  return (
    <FundCard
      assetSymbol="ETH"
      country="US"
      currency="USD"
      presetAmountInputs={['10', '20', '100']}
    />
  )
}
  `,
  Buy: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import { Buy } from "@coinbase/onchainkit/buy"
import { Token } from "@coinbase/onchainkit/token";

function BuyDemo() {
  const usdcToken: Token = {
    name: 'USDC',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    symbol: 'USDC',
    decimals: 6,
    chainId: 8453,
    image: usdc.src,
  };
  return <Buy toToken={usdcToken} />
}
  `,
  Mint: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import { NFTMintCard } from "@coinbase/onchainkit/nft";
import { NFTMedia } from "@coinbase/onchainkit/nft/view";
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTAssetCost,
  NFTMinters,
  NFTQuantitySelector,
  NFTMintButton,
} from "@coinbase/onchainkit/nft/mint";

function NFTMintDemo() {

  return (
    <NFTMintCard contractAddress="0xed2f34043387783b2727ff2799a46ce3ae1a34d2" tokenId="2">
      <NFTCreator />
      <NFTMedia />
      <NFTCollectionTitle />
      <NFTMinters />
      <NFTQuantitySelector />
      <NFTAssetCost />
      <NFTMintButton />
    </NFTMintCard>
  )
}
    `,
  Transact: `
// Follow docs.base.org/builderkits/onchainkit/getting-started
// to install dependencies

import {
  TransactionDefault
} from "@coinbase/onchainkit/transaction"

function TransactDefaultDemo() {
  const calls = [...];
  return <TransactionDefault calls={calls} />
}
  `,
};
