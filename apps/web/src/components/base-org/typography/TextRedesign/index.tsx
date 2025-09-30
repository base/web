import { ElementType, ReactNode } from 'react';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import classNames from 'classnames';

const defaultTags: Record<TextVariant, ElementType> = {
  [TextVariant.Body]: 'p',
  [TextVariant.BodyLarge]: 'p',
  [TextVariant.BodyMono]: 'p',
  [TextVariant.CTALabel]: 'span',
  [TextVariant.CTALabelSm]: 'span',
  [TextVariant.Caption]: 'span',
  [TextVariant.CaptionMono]: 'span',
};

export const variantStyles: Record<TextVariant, string> = {
  [TextVariant.BodyLarge]: 'font-sans-text text-[1.125rem] leading-[130%] tracking-[-0.015625rem]',
  [TextVariant.Body]: 'font-sans-text text-[1rem] leading-[130%]',
  [TextVariant.BodyMono]: 'font-mono font-[350] text-[1rem] tracking-[0.0175rem] leading-[100%]',
  [TextVariant.CTALabel]: 'font-sans text-[0.9375rem] font-medium leading-[114%]',
  [TextVariant.CTALabelSm]:
    'font-sans text-[0.875rem] font-regular leading-[114%] tracking-[0.01em]',
  [TextVariant.Caption]: 'font-sans text-[0.75rem] leading-[130%]',
  [TextVariant.CaptionMono]:
    'font-mono text-[0.6875rem] leading-[140%] uppercase tracking-[0.055rem]',
};

type TextProps = {
  children: ReactNode;
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
};

export default function Text({ variant = TextVariant.Body, children, as, className }: TextProps) {
  const Tag = as ?? defaultTags[variant];

  const textClasses = classNames(
    'text-currentColor text-pretty',
    variantStyles[variant],
    className,
  );
  return <Tag className={textClasses}>{children}</Tag>;
}
