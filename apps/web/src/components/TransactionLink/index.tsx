import {
  explorerNamesByChainId,
  getExplorerTransactionUrl,
} from 'apps/web/src/utils/chainExplorers';
import Link from 'next/link';
import { Chain } from 'viem';

export type TransactionLinkProps = {
  chainId: Chain['id'];
  transactionHash: `0x${string}`;
};

export default function TransactionLink({ chainId, transactionHash }: TransactionLinkProps) {
  const transactionUrl = getExplorerTransactionUrl(chainId, transactionHash);
  const explorerName = explorerNamesByChainId[chainId];

  return (
    <Link href={transactionUrl} target="_blank" className="underline underline-offset-2">
      {explorerName}
    </Link>
  );
}
