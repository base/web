import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';

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
  const { openConnectModal } = useConnectModal();

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <Button
              type="button"
              variant={ButtonVariants.Black}
              size={ButtonSizes.Medium}
              onClick={openConnectModal}
              rounded
            >
              Connect wallet
            </Button>
          );
        }

        return (
          <Button
            onClick={correctChain ? renewNameCallback : switchToIntendedNetwork}
            type="button"
            variant={ButtonVariants.Black}
            size={ButtonSizes.Medium}
            disabled={disabled}
            isLoading={isLoading}
            rounded
            fullWidth
          >
            {correctChain ? 'Renew name' : 'Switch to Base'}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
