import classNames from 'classnames';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useAccount } from 'wagmi';

type RenewalButtonProps = {
  correctChain: boolean;
  renewNameCallback: () => void;
  switchToIntendedNetwork: () => void;
  disabled: boolean;
  isLoading: boolean;
};

export function RenewalButton({
  correctChain,
  renewNameCallback,
  switchToIntendedNetwork,
  disabled,
  isLoading,
}: RenewalButtonProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <ConnectWallet
        className={classNames(
          'bg-button-black text-white hover:bg-button-blackHover active:bg-button-blackActive',
          'px-10 py-3.5 text-sm md:text-lg',
          'rounded-full',
        )}
        disconnectedLabel="Connect wallet"
      />
    );
  }

  return (
    <Button
      onClick={correctChain ? renewNameCallback : switchToIntendedNetwork}
      type="button"
      variant={ButtonVariants.Black}
      size={ButtonSizes.Medium}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      rounded
      fullWidth
    >
      {correctChain ? 'Extend registration' : 'Switch to Base'}
    </Button>
  );
}
