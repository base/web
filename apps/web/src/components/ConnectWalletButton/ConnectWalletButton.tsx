import { Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletAdvancedWalletActions,
  WalletAdvancedTransactionActions,
  WalletAdvancedTokenHoldings,
  WalletDropdown,
} from '@coinbase/onchainkit/wallet';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect, useState } from 'react';
import { base } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useSearchParams } from 'next/navigation';
import ChainDropdown from 'apps/web/src/components/ChainDropdown';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { useMediaQuery } from 'usehooks-ts';
import classNames from 'classnames';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import logEvent, { ActionType, AnalyticsEventImportance, identify } from 'base-ui/utils/logEvent';
import sanitizeEventString from 'base-ui/utils/sanitizeEventString';
import { CustomWalletAdvancedAddressDetails } from './CustomWalletAdvancedAddressDetails';

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
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { switchChain } = useSwitchChain();
  const { address, connector, isConnected, isConnecting, isReconnecting, chain } = useAccount();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();
  const { basenameChain } = useBasenameChain();

  const chainSupported = !!chain && supportedChainIds.includes(chain.id);
  const showChainSwitcher = searchParams?.get('showChainSwitcher');

  const userAddressClasses = classNames('text-lg font-display', {
    'text-white': connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg,
    'text-black': connectWalletButtonVariant === ConnectWalletButtonVariants.Basename,
  });

  const buttonClasses = classNames(
    address
      ? 'flex items-center justify-center rounded-lg bg-transparent p-2 hover:bg-gray-40/20'
      : 'min-w-full px-4 py-2 whitespace-nowrap flex items-center justify-center transition-all bg-blue text-white border border-blue hover:bg-blue-80 active:bg-[#06318E] text-md px-4 py-2 gap-3',
  );

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: base.id }),
    [switchChain],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
  }

  if (isConnected && !chainSupported) {
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
        className={buttonClasses}
        disconnectedLabel={
          connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg ? 'Connect' : 'Sign In'
        }
      >
        <UserAvatar />
        {isDesktop && <Name chain={basenameChain} className={userAddressClasses} />}
        {showChainSwitcher && <ChainDropdown />}
      </ConnectWallet>
      <WalletDropdown>
        <WalletAdvancedWalletActions />
        <CustomWalletAdvancedAddressDetails />
        <WalletAdvancedTransactionActions />
        <WalletAdvancedTokenHoldings />
      </WalletDropdown>
    </Wallet>
  );
}

export function DynamicWrappedConnectWalletButton({
  connectWalletButtonVariant = ConnectWalletButtonVariants.BaseOrg,
}: ConnectWalletButtonProps) {
  return (
    <DynamicCryptoProviders theme="base">
      <ConnectWalletButton connectWalletButtonVariant={connectWalletButtonVariant} />
    </DynamicCryptoProviders>
  );
}
