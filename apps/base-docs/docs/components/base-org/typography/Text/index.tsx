import { ElementType, ReactNode } from 'react';
import classNames from 'classnames';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';

const defaultTags: Record<TextVariant, ElementType> = {
  [TextVariant.Body]: 'p',
  [TextVariant.Label1]: 'p',
  [TextVariant.Label2]: 'p',
};

export const variantStyles: Record<TextVariant, string> = {
  [TextVariant.Body]: 'font-sans text-[1rem] leading-[1.6em]',
  [TextVariant.Label1]: 'font-display text-[0.875rem] leading-[1.1em]',
  [TextVariant.Label2]: 'font-sans text-[0.75rem] leading-[1.0625rem]',
};

type TextProps = {
  children: ReactNode;
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
};

export default function Text({ variant = TextVariant.Body, children, as, className }: TextProps) {
  const Tag = as ?? defaultTags[variant];

  const textClasses = classNames('text-currentColor', variantStyles[variant], className);
  return <Tag className={textClasses}>{children}</Tag>;
}
