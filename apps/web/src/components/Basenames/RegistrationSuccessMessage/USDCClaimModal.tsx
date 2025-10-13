import classNames from 'classnames';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';

type USDCClaimModalProps = {
  message: string;
  onClose: () => void;
};

function handleButtonClick() {
  window.open('https://www.coinbase.com/usdc', '_blank', 'noopener noreferrer');
}

function USDCClaimModal({ message, onClose }: USDCClaimModalProps) {
  const popupClasses = classNames(
    'fixed top-0 left-0 w-full h-full flex items-center justify-center',
  );

  return (
    <div className={popupClasses}>
      <div className="relative w-11/12 max-w-lg rounded-lg bg-white p-8 opacity-95 shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 absolute right-2 top-0"
        >
          &times;
        </button>
        <p className="text-center text-lg font-bold">{message}</p>
        <Button
          variant={ButtonVariants.SecondaryDarkBounce}
          rounded
          className="mx-auto mt-4 block"
          onClick={handleButtonClick}
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}

export default USDCClaimModal;
