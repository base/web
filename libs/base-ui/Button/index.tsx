import clsx from 'clsx';
import { ReactNode } from 'react';

const baseStyles = 'text-md flex items-center justify-center rounded-md p-4 font-sans font-bold uppercase transition';
const variants = {
  primary: 'bg-white text-black disabled:bg-stone-500 hover:bg-gray-200 active:bg-gray-300',
  secondary: 'bg-[#32353D] border border-gray-400 text-white hover:bg-gray-500 active:bg-gray-600',
};

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
};

export function Button({ onClick, disabled, children, className, variant = 'primary', type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
