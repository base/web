import clsx from 'clsx';

const variants = {
  primary: 'bg-white text-black disabled:bg-stone-500',
  secondary: 'bg-[#32353D] border-gray-400 text-white',
};

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  children: string;
  variant?: 'primary' | 'secondary';
};

function Button({ onClick, disabled, children, className, variant = 'primary' }: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        className ??
          'text-md flex items-center justify-center rounded-md p-4 font-sans font-bold uppercase',
        variants[variant],
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button };
