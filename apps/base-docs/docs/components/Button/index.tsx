'use client';

import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Icon, IconProps } from '../base-org/Icon/Icon.tsx';
import { ButtonVariants, ButtonSizes } from './types.ts';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  connectWallet?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  iconName?: IconProps['name'];
  roundedFull?: boolean;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariants, string> = {
  // Blue button
  [ButtonVariants.Primary]:
    'bg-blue text-white border border-blue hover:bg-blue-80 active:bg-[#06318E]',

  // White button
  [ButtonVariants.Secondary]:
    'bg-white border border-white text-palette-foreground hover:bg-zinc-15 active:bg-zinc-30',

  // White outlined
  [ButtonVariants.Outlined]:
    'bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-[#E3E7E9]',
};

const sizeStyles: Record<ButtonSizes, string> = {
  // Blue button
  [ButtonSizes.Medium]: 'text-md px-4 py-2 gap-3',

  // White button
  [ButtonSizes.Large]: 'text-lg px-6 py-4 gap-5',
};

const sizeIconRatio: Record<ButtonSizes, string> = {
  // Blue button
  [ButtonSizes.Medium]: '0.75rem',

  // White button
  [ButtonSizes.Large]: '1rem',
};

export default function Button({
  children,
  onClick,
  disabled,
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Medium,
  iconName,
  roundedFull = false,
  className,
  fullWidth = false,
}: ButtonProps) {
  const buttonClasses = classNames(
    // Shared - base
    'text-md px-4 py-2 whitespace-nowrap',

    // Shared - layout
    'flex items-center justify-center',

    // Shared - Disabled
    'disabled:opacity-40 disabled:pointer-events-none',

    // Shared - transition
    'transition-all',

    // Variants
    variantStyles[variant],

    // Sizes
    sizeStyles[size],

    // Rounded, mostly for connect wallet
    roundedFull ? 'rounded-full' : 'rounded-lg',

    fullWidth ? 'w-full' : 'w-auto',

    className,
  );

  const iconSize = sizeIconRatio[size];

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={buttonClasses}>
      <span>{children}</span>
      {iconName && (
        <Icon name={iconName as string} width={iconSize} height={iconSize} color="currentColor" />
      )}
    </button>
  );
}
