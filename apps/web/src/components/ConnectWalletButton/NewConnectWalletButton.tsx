import { Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletAdvanced,
  WalletAdvancedWalletActions,
  WalletAdvancedTransactionActions,
  WalletAdvancedTokenHoldings,
  ConnectWalletText,
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

export enum ConnectWalletButtonVariants {
  BaseOrg,
  Basename,
}

type ConnectWalletButtonProps = {
  connectWalletButtonVariant: ConnectWalletButtonVariants;
};

export function NewConnectWalletButton({
  connectWalletButtonVariant = ConnectWalletButtonVariants.BaseOrg,
}: ConnectWalletButtonProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { switchChain } = useSwitchChain();
  const { isConnecting, isReconnecting, chain } = useAccount();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();
  const { basenameChain } = useBasenameChain();

  const chainSupported = !!chain && supportedChainIds.includes(chain.id);
  const showChainSwitcher = searchParams?.get('showChainSwitcher');

  const userAddressClasses = classNames('text-lg font-display', {
    'text-white': connectWalletButtonVariant === ConnectWalletButtonVariants.BaseOrg,
    'text-black': connectWalletButtonVariant === ConnectWalletButtonVariants.Basename,
  });

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: base.id }),
    [switchChain],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
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
      <ConnectWallet className="flex items-center justify-center rounded-lg bg-transparent p-2 hover:bg-gray-40/20">
        <ConnectWalletText>Connect</ConnectWalletText>
        <UserAvatar />
        {isDesktop && <Name chain={basenameChain} className={userAddressClasses} />}
        {showChainSwitcher && <ChainDropdown />}
      </ConnectWallet>
      <WalletAdvanced>
        <WalletAdvancedWalletActions />
        <WalletAdvancedTransactionActions />
        <WalletAdvancedTokenHoldings />
      </WalletAdvanced>
    </Wallet>
  );
}

export function NewDynamicWrappedConnectWalletButton({
  connectWalletButtonVariant = ConnectWalletButtonVariants.BaseOrg,
}: ConnectWalletButtonProps) {
  return (
    <DynamicCryptoProviders theme="base">
      <NewConnectWalletButton connectWalletButtonVariant={connectWalletButtonVariant} />
    </DynamicCryptoProviders>
  );
}
