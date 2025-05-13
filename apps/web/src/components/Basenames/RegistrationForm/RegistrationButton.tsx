import classNames from 'classnames';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useAccount } from 'wagmi';

type RegistrationButtonProps = {
  correctChain: boolean;
  registerNameCallback: () => void;
  switchToIntendedNetwork: () => void;
  insufficientFundsNoAuxFundsAndCorrectChain: boolean;
  registerNameIsPending: boolean;
};

export function RegistrationButton({
  correctChain,
  registerNameCallback,
  switchToIntendedNetwork,
  insufficientFundsNoAuxFundsAndCorrectChain,
  registerNameIsPending,
}: RegistrationButtonProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <ConnectWallet
        className={classNames(
          'bg-button-black text-white hover:bg-button-blackHover active:bg-button-blackActive', // ButtonVariants.Black
          'px-10 py-3.5 text-sm md:text-lg', // ButtonSizes.Medium
          'rounded-full', // rounded
        )}
        disconnectedLabel="Connect wallet"
      />
    );
  }

  return (
    <Button
      onClick={correctChain ? registerNameCallback : switchToIntendedNetwork}
      type="button"
      variant={ButtonVariants.Black}
      size={ButtonSizes.Medium}
      disabled={insufficientFundsNoAuxFundsAndCorrectChain || registerNameIsPending}
      isLoading={registerNameIsPending}
      rounded
      fullWidth
    >
      {correctChain ? 'Register name' : 'Switch to Base'}
    </Button>
  );
}
