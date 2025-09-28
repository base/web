import { EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { base } from 'viem/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  identify,
} from 'base-ui/utils/logEvent';
import sanitizeEventString from 'base-ui/utils/sanitizeEventString';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts';
import { useAccount, useSwitchChain } from 'wagmi';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';

export enum ConnectWalletButtonVariants {
  BaseOrg,
  Basename,
}

type ConnectWalletButtonProps = {
  connectWalletButtonVariant: ConnectWalletButtonVariants;
};

export function DynamicWrappedConnectWalletButton({
  connectWalletButtonVariant = ConnectWalletButtonVariants.BaseOrg,
}: ConnectWalletButtonProps) {
  return (
    <DynamicCryptoProviders>
      <ConnectWalletButton connectWalletButtonVariant={connectWalletButtonVariant} />
    </DynamicCryptoProviders>
  );
}

export function ConnectWalletButton({
  connectWalletButtonVariant = ConnectWalletButtonVariants.BaseOrg,
}: ConnectWalletButtonProps) {
  // Rainbow kit
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: base.id }),
    [switchChain],
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wagmi
  const { address, connector, isConnected, isConnecting, isReconnecting, chain } = useAccount();
  const chainSupported = !!chain && supportedChainIds.includes(chain.id);
  const { basenameChain } = useBasenameChain();
  const { data: primaryName } = useBaseEnsName({ address: address as `0x${string}` | undefined });
  const [, copy] = useCopyToClipboard();
  const copyAddress = useCallback(() => void copy(address ?? ''), [address, copy]);

  const buttonClasses = classNames(
    address
      ? 'flex items-center justify-center rounded-lg bg-transparent p-2 hover:bg-gray-40/20'
      : 'min-w-full px-4 py-2 whitespace-nowrap rounded-lg font-semibold flex items-center justify-center transition-all bg-blue text-white border border-blue hover:bg-blue-80 active:bg-[#06318E] text-md px-4 py-2 gap-3',
  );

  useEffect(() => {
    if (address) {
      logEvent(
        'wallet_connected',
        {
          action: ActionType.change,
          context: 'navbar',
          address,
          wallet_type: sanitizeEventString(connector?.name),
          wallet_connector_id: connector?.id,
        },
        AnalyticsEventImportance.low,
      );
      identify({ userId: address });
    }
  }, [address, connector]);

  const clickConnect = useCallback(() => {
    openConnectModal?.();
    logEvent(
      'connect_wallet',
      {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'navbar',
      },
      AnalyticsEventImportance.low,
    );
  }, [openConnectModal]);

  const userAddressClasses = classNames('text-lg font-display', {
    'text-white': connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg,
    'text-black': connectWalletButtonVariant === ConnectWalletButtonVariants.Basename,
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
  }

  if (!isConnected) {
    return (
      <button type="button" onClick={clickConnect} className={buttonClasses}>
        Sign In
      </button>
    );
  }

  if (!chainSupported) {
    return (
      <Button
        variant={ButtonVariants.Black}
        size={ButtonSizes.Small}
        onClick={switchToIntendedNetwork}
        className="rounded-lg"
      >
        Connect to Base
      </Button>
    );
  }

  return (
    <Wallet>
      <ConnectWallet className={buttonClasses}>
        <div className="flex items-center gap-2">
          <UserAvatar />
          {isDesktop && (
            <Name
              chain={basenameChain}
              className={userAddressClasses}
              // Override with ENSIP-19 or L2 fallback primary name if available
              name={primaryName ?? undefined}
            />
          )}
        </div>
      </ConnectWallet>

      <WalletDropdown className="z-50 rounded-xl bg-white font-sans shadow-md">
        <Identity className="px-4 pb-2 pt-3 font-display">
          <UserAvatar />
          <Name
            onClick={copyAddress}
            chain={basenameChain}
            className="cursor-pointer font-display transition-all hover:opacity-65"
            name={primaryName ?? undefined}
          />
          <EthBalance className="font-display" />
        </Identity>
        <WalletDropdownDisconnect className="font-display hover:bg-gray-40/20" />
      </WalletDropdown>
    </Wallet>
  );
}
