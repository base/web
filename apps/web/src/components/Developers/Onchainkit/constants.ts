export const COMPONENT_CODE_SNIPPETS: Record<string, string> = {
  Wallet: `import { 
  WalletDefault 
} from '@coinbase/onchainkit/wallet';

function WalletDefaultDemo() {
  return <WalletDefault />
}
`,
  Earn: `
  `,
  Fund: `
  `,
  Pay: `
  `,
  Buy: `
  `,
  Checkout: `
  `,
  Mint: `
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
