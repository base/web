'use client';

import Link, { LinkProps } from 'apps/web/node_modules/next/link';
import Button, { ButtonProps } from 'apps/web/src/components/base-org/Button';

export type ButtonWithLinkProps = Omit<ButtonProps, 'href' | 'className'> & {
  href: string;
  linkClassNames?: string;
  linkProps?: Omit<LinkProps, 'href' | 'passHref'>;
  target?: string;
  rel?: string;
  buttonClassNames?: string;
};

export function ButtonWithLink({
  href,
  target,
  rel,
  linkClassNames,
  linkProps,
  variant,
  size,
  children,
  buttonClassNames,
  roundedFull = false,
  fullWidth = false,
  disabled = false,
  iconSize,

  ...buttonProps
}: ButtonWithLinkProps) {
  // If the link opens in a new tab and no rel is specified,
  // default to "noopener noreferrer" to prevent tab-nabbing.
  const computedRel =
    rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

  return (
    <Link
      href={href}
      target={target}
      rel={computedRel}
      className={`${linkClassNames}${disabled ? ' pointer-events-none' : ''}`}
      {...linkProps}
    >
      <Button
        variant={variant}
        size={size}
        className={buttonClassNames}
        roundedFull={roundedFull}
        fullWidth={fullWidth}
        disabled={disabled}
        iconSize={iconSize}
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
}

