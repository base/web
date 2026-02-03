import classNames from 'classnames';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useAccount } from 'wagmi';
// import your notification system here if available
// import { toast } from 'apps/web/src/components/Toast/toast';

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

  // Error handler for wallet connection failures
  const handleConnectWalletError = (err: Error) => {
    // Show error notification to the user
    // toast.error('Wallet connection failed! Please try again.');
    // Optionally log the error if logEvent is available:
    // if (typeof logEvent === 'function') {
    //   logEvent('wallet_connection_error', { error: err.message });
    // }
    // Fallback to console output if toast or logEvent do not exist:
    console.error('Wallet connection error:', err);
  };

  if (!isConnected) {
    return (
      <ConnectWallet
        className={classNames(
          'bg-button-black text-white hover:bg-button-blackHover active:bg-button-blackActive',
          'px-10 py-3.5 text-sm md:text-lg',
          'rounded-full',
        )}
        disconnectedLabel="Connect wallet"
        // Added error handling for wallet connect
        onError={handleConnectWalletError}
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
