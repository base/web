import { Address, encodeFunctionData } from 'viem';

export const COMPONENT_CODE_SNIPPETS: Record<string, string> = {
  Wallet: `import { 
  WalletDefault 
} from '@coinbase/onchainkit/wallet';

function WalletDefaultDemo() {
  return <WalletDefault />
}
`,
  Earn: `import { Earn } from '@coinbase/onchainkit/earn';

function EarnDemo() {
  const vaultAddress = '0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A';

  return <Earn vaultAddress={vaultAddress} />;
}
  `,
  Fund: `import { FundCard } from "@coinbase/onchainkit/fund"

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
  Pay: `
  `,
  Buy: `import { Buy } from "@coinbase/onchainkit/buy"
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
  Checkout: `import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';

function CheckoutDemo() {  
  return (
    <Checkout>
      <CheckoutButton />
    </Checkout>
  )
}`,
  Mint: `import { NFTMintCard } from "@coinbase/onchainkit/nft";
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
  Transact: `import { 
  TransactionDefault 
} from "@coinbase/onchainkit/transaction"

function TransactDefaultDemo() {
  const calls = [...];

  return <TransactionDefault calls={calls} />
}
  `,
};

export const ONCHAINKIT_DEMO_TABS = [
  'Wallet',
  'Earn',
  'Fund',
  'Buy',
  'Checkout',
  'Mint',
  'Transact',
];

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
