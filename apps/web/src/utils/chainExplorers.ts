import { base, baseSepolia, Chain } from 'viem/chains';

export const explorerUrlsByChainId: Record<Chain['id'], string> = {
  [baseSepolia.id]: baseSepolia.blockExplorers.default.url,
  [base.id]: base.blockExplorers.default.url,
};

export const explorerNamesByChainId: Record<Chain['id'], string> = {
  [baseSepolia.id]: baseSepolia.blockExplorers.default.name,
  [base.id]: base.blockExplorers.default.name,
};

export const getExplorerTransactionUrl = (chainId: number, transactionHash: string) => {
  const explorerUrl = explorerUrlsByChainId[chainId];

  return `${explorerUrl}/tx/${transactionHash}`;
};
