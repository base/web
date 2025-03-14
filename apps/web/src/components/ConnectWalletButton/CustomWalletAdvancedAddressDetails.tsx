import { Name } from '@coinbase/onchainkit/identity';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

export function CustomWalletAdvancedAddressDetails() {
  const { address, chain } = useAccount();
  const [copyText, setCopyText] = useState('Copy');

  const handleCopyAddress = useCallback(() => {
    try {
      void navigator.clipboard.writeText(String(address));
      setCopyText('Copied');
      setTimeout(() => setCopyText('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
      setCopyText('Failed to copy');
      setTimeout(() => setCopyText('Copy'), 2000);
    }
  }, [address]);

  if (!address || !chain) {
    return <div className="mt-1 h-28 w-10" />; // Prevent layout shift
  }

  return (
    <div
      data-testid="ockWalletAdvanced_AddressDetails"
      className={classNames(
        'mt-2 flex flex-col items-center justify-center',
        'ock-text-foreground',
        'ock-font-family text-base font-normal',
      )}
    >
      <div className="pointer-events-none h-10 w-10">
        <UserAvatar />
      </div>
      <div className="group relative mt-2 text-base">
        <button
          type="button"
          onClick={handleCopyAddress}
          data-testid="ockWalletAdvanced_NameButton"
        >
          <Name
            address={address}
            chain={chain}
            className={classNames(
              'hover:text-[var(--ock-text-foreground-muted)] active:text-[var(--ock-text-primary)]',
            )}
          />
        </button>
        <button
          type="button"
          onClick={handleCopyAddress}
          className={classNames(
            'ock-bg-alternate cursor-pointer hover:bg-[var(--ock-bg-alternate-hover)] active:bg-[var(--ock-bg-alternate-active)]', // pressable.alternate
            'ock-font-family text-xs', // text.legal,
            'ock-text-foreground', // color.foreground,
            'ock-border-default', // border.default,
            'ock-border-radius', // border.radius,
            'z-20', // zIndex.tooltip,
            'absolute right-0 top-full mt-0.5 px-1.5 py-0.5 opacity-0 transition-opacity group-hover:opacity-100',
          )}
          aria-live="polite"
          data-testid="ockWalletAdvanced_NameTooltip"
        >
          {copyText}
        </button>
      </div>
      {/* <AddressBalanceInFiat className={classNames?.fiatBalance} /> */} {/* TODO: Add fiat balance */}
    </div>
  );
}
