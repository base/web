import { useErrors } from 'apps/web/contexts/Errors';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import { useCallback } from 'react';
import { Chain } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';

export function DropdownChainSwitcher({
  chain,
  currentChain,
}: {
  chain: Chain;
  currentChain: Chain;
}) {
  const { switchChainAsync } = useSwitchChain();
  const { logError } = useErrors();

  const handleSwitchChain = useCallback(() => {
    if (chain !== currentChain) {
      switchChainAsync({ chainId: chain.id }).catch((error) =>
        logError(error, 'Failed to switch chain'),
      );
    }
  }, [chain, currentChain, logError, switchChainAsync]);
  return <DropdownItem onClick={handleSwitchChain}>{chain.name}</DropdownItem>;
}

export default function ChainDropdown() {
  const { chain: currentChain, isConnected } = useAccount();
  const { chains } = useSwitchChain();

  if (!isConnected || !currentChain) return null;
  return (
    <Dropdown>
      <DropdownToggle>
        <span className="inline-block rounded bg-blue-5 px-3 py-1 text-blue-50">
          {currentChain.name}
        </span>
      </DropdownToggle>
      <DropdownMenu>
        {chains.map((chain) => (
          <DropdownChainSwitcher key={chain.id} chain={chain} currentChain={currentChain} />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
