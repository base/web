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
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { default as BaseOrgButton } from 'apps/web/src/components/base-org/Button';
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
import ChainDropdown from 'apps/web/src/components/ChainDropdown';
import { useSearchParams } from 'next/navigation';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';

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

  const userAddressClasses = classNames('text-lg font-display', {
    'text-white': connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg,
    'text-black': connectWalletButtonVariant === ConnectWalletButtonVariants.Basename,
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
  }

  if (!isConnected) {
    const baseOrgButton = connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg;
    return baseOrgButton ? (
      <BaseOrgButton onClick={clickConnect}>Connect</BaseOrgButton>
    ) : (
      <Button
        variant={ButtonVariants.Black}
        size={ButtonSizes.Small}
        onClick={clickConnect}
        className="rounded-lg"
      >
        Sign In
      </Button>
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
      <ConnectWallet
        withWalletAggregator
        className="flex items-center justify-center rounded-lg bg-transparent p-2 hover:bg-gray-40/20"
      >
        <div className="flex items-center gap-2">
          <UserAvatar />
          {isDesktop && <Name chain={basenameChain} className={userAddressClasses} />}
          {showChainSwitcher && <ChainDropdown />}
        </div>
      </ConnectWallet>

      <WalletDropdown className="z-50 rounded-xl bg-white font-sans shadow-md">
        <Identity className="px-4 pb-2 pt-3 font-display">
          <UserAvatar />
          <Name
            onClick={copyAddress}
            chain={basenameChain}
            className="cursor-pointer font-display transition-all hover:opacity-65"
          />
          <EthBalance className="font-display" />
        </Identity>
        <WalletDropdownBasename className="font-display hover:bg-gray-40/20" />
        <WalletDropdownLink
          icon="wallet"
          href="https://wallet.coinbase.com"
          target="_blank"
          className="font-display hover:bg-gray-40/20"
        >
          Go to Wallet Dashboard
        </WalletDropdownLink>
        <WalletDropdownDisconnect className="font-display hover:bg-gray-40/20" />
      </WalletDropdown>
    </Wallet>
  );
}
