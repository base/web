import { EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { base } from 'viem/chains';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '../Button/index.tsx';
import { ButtonSizes, ButtonVariants } from '../Button/types.ts';
import { default as BaseOrgButton } from '../Button/index.tsx';
import { UserAvatar } from './UserAvatar.tsx';
import { Icon } from '../base-org/Icon/Icon.tsx';
import useBasenameChain, { supportedChainIds } from '../hooks/useBasenameChain.ts';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  identify,
} from 'base-ui/utils/logEvent';
import sanitizeEventString from 'base-ui/utils/sanitizeEventString';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { useAccount, useSwitchChain } from 'wagmi';
import ChainDropdown from 'apps/web/src/components/ChainDropdown';
import { useSearchParams } from 'next/navigation';

export enum ConnectWalletButtonVariants {
  BaseOrg,
  Basename,
}

type ConnectWalletButtonProps = {
  connectWalletButtonVariant: ConnectWalletButtonVariants;
};

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
  const searchParams = useSearchParams();
  const showChainSwitcher = searchParams?.get('showChainSwitcher');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wagmi
  const { address, connector, isConnected, isConnecting, isReconnecting, chain } = useAccount();
  const chainSupported = !!chain && supportedChainIds.includes(chain.id);
  const { basenameChain } = useBasenameChain();
  const [, copy] = useCopyToClipboard();
  const copyAddress = useCallback(() => void copy(address ?? ''), [address, copy]);

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

  const userAddressClasses = classNames('text-lg font-display hidden lg:inline-block', {
    'text-white': connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg,
    'text-black': connectWalletButtonVariant === ConnectWalletButtonVariants.Basename,
  });

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
  }

  if (!isConnected) {
    const baseOrgButton = connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg;
    return baseOrgButton ? (
      <BaseOrgButton onClick={clickConnect} roundedFull>
        Connect
      </BaseOrgButton>
    ) : (
      <Button
        variant={ButtonVariants.Black}
        size={ButtonSizes.Small}
        onClick={clickConnect}
        rounded
      >
        Connect
      </Button>
    );
  }

  if (!chainSupported) {
    return (
      <Button
        variant={ButtonVariants.Black}
        size={ButtonSizes.Small}
        onClick={switchToIntendedNetwork}
        rounded
      >
        Connect to Base
      </Button>
    );
  }

  return (
    <Wallet>
      <ConnectWallet
        withWalletAggregator
        className="flex items-center justify-center rounded-xl bg-transparent p-2 hover:bg-zinc-40/20"
      >
        <div className="flex items-center gap-2">
          <UserAvatar />
          <Name chain={basenameChain} className={userAddressClasses} />
          {showChainSwitcher && <ChainDropdown />}
        </div>
      </ConnectWallet>

      <WalletDropdown className="rounded-xl bg-white font-sans shadow-md">
        <Identity className="px-4 pb-2 pt-3 font-display">
          <UserAvatar />
          <Name
            onClick={copyAddress}
            chain={basenameChain}
            className="cursor-pointer font-display transition-all hover:opacity-65"
          />
          <EthBalance className="font-display" />
        </Identity>
        <WalletDropdownBasename className="font-display hover:bg-zinc-40/20" />
        <WalletDropdownLink
          icon="wallet"
          href="https://wallet.coinbase.com"
          target="_blank"
          className="font-display hover:bg-zinc-40/20"
        >
          Go to Wallet Dashboard
        </WalletDropdownLink>
        <WalletDropdownDisconnect className="font-display hover:bg-zinc-40/20" />
      </WalletDropdown>
    </Wallet>
  );
}
