import { Icon } from 'apps/web/src/components/Icon/Icon';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { variantStyles as textVariantStyles } from 'apps/web/src/components/base-org/typography/TextRedesign';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  SecondaryOutline = 'secondary-outline',
  Blue = 'blue',
}

export enum ButtonSizes {
  Small = 'small',
  Large = 'large',
}

const variantStyles = {
  [ButtonVariants.Primary]:
    'text-white bg-base-black dark:bg-white dark:text-black hover:dark:text-white hover:bg-base-blue hover:dark:bg-base-blueDark active:bg-base-blue active:dark:bg-base-blueDark border border-base-black dark:border-base-blackInvert hover:border-base-blue hover:dark:border-base-blueDark active:border-base-blue active:dark:border-base-blueDark',
  [ButtonVariants.Secondary]:
    'text-black bg-base-gray-50 dark:bg-white dark:text-black hover:dark:text-white hover:bg-state-bA-hovered hover:dark:bg-base-blueDark active:bg-state-bA-pressed active:dark:bg-base-blueDark border-none border-base-black dark:border-base-blackInvert hover:border-base-blue hover:dark:border-base-blueDark active:border-base-blue active:dark:border-base-blueDark',
  [ButtonVariants.SecondaryOutline]:
    'bg-white text-black border border-[#e5e5e5] hover:bg-[#f7f7f7] hover:border-[#dcdcdc] dark:bg-black dark:text-white hover:dark:text-black dark:border-base-gray-90 hover:dark:bg-base-gray-90 hover:dark:border-base-gray-90',
  [ButtonVariants.Blue]:
    'text-white bg-base-blue hover:bg-black active:bg-black',
};

const sizeStyles = {
  [ButtonSizes.Small]: 'h-9 rounded-[8px] px-4',
  [ButtonSizes.Large]: 'h-[52px] rounded-[12px] px-6',
};

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  fullWidth?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
};

export function Button({
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Large,
  children,
  className,
  fullWidth = false,
  isLoading = false,
  asChild = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const buttonClasses = classNames(
    // Base styles
    'font-sans font-normal inline-flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-gray-100',
    // Text styles - always include CTALabel styles so they cascade to children
    textVariantStyles[TextVariant.CTALabel],
    // Variant styles
    variantStyles[variant],
    // Size styles
    sizeStyles[size],
    // State styles
    {
      'w-full': fullWidth,
      [disabledStyles]: disabled ?? isLoading,
    },
    className,
  );

  const content = isLoading ? (
    <>
      <Icon name="spinner" color="currentColor" />
      {children}
    </>
  ) : (
    children
  );

  return (
    <Comp
      className={buttonClasses}
      disabled={disabled ?? isLoading}
      {...(!asChild && { type: 'button' })}
      {...props}
    >
      {asChild ? children : content}
    </Comp>
  );
}
