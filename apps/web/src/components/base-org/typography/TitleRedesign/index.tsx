import { ElementType, ReactNode } from 'react';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import classNames from 'classnames';

const defaultTags: Record<TitleLevel, ElementType> = {
  [TitleLevel.H0Medium]: 'h1',
  [TitleLevel.H1Medium]: 'h1',
  [TitleLevel.H1Regular]: 'h1',
  [TitleLevel.H2Medium]: 'h2',
  [TitleLevel.H2Regular]: 'h2',
  [TitleLevel.H3Medium]: 'h3',
  [TitleLevel.H3Regular]: 'h3',
  [TitleLevel.H4Regular]: 'h4',
  [TitleLevel.H4Mono]: 'h4',
  [TitleLevel.H4MonoSmall]: 'h4',
  [TitleLevel.H5Medium]: 'h5',
  [TitleLevel.H5Regular]: 'h5',
  [TitleLevel.H6Regular]: 'h6',
  [TitleLevel.H6Mono]: 'h6',
};

export const levelStyles: Record<TitleLevel, string> = {
  [TitleLevel.H0Medium]:
    'font-sans text-[3.5rem] lg:text-[5rem] leading-[100%] tracking-[-0.175rem] lg:tracking-[-0.25rem]',
  [TitleLevel.H1Medium]: 'font-sans text-[5rem] leading-[100%] font-medium tracking-[-0.25rem]',
  [TitleLevel.H1Regular]: 'font-sans text-[2.25rem] leading-[110%] tracking-[-0.0625rem]',
  [TitleLevel.H2Medium]:
    'font-sans text-[1.5rem] leading-[110%] font-medium tracking-[-0.03125rem]',
  [TitleLevel.H2Regular]: 'font-sans text-[1.5rem] leading-[110%] tracking-[-0.03125rem]',
  [TitleLevel.H3Medium]:
    'font-sans text-[3rem] lg:text-[5rem] leading-[100%] tracking-[-0.12rem] font-medium',
  [TitleLevel.H3Regular]: 'font-sans text-[3rem] lg:text-[5rem] leading-[100%] tracking-[-0.12rem]',
  [TitleLevel.H4Regular]:
    'font-sans text-[3.25rem] lg:text-[4rem] leading-[110%] tracking-[-0.125rem] lg:tracking-[-0.22rem]',
  [TitleLevel.H4Mono]:
    'font-mono text-[2.25rem] lg:text-[4rem] leading-[110%] tracking-[-0.1125rem] font-light',
  [TitleLevel.H4MonoSmall]:
    'font-mono text-[1.625rem] lg:text-[2rem] leading-[105%] tracking-[-0.04875rem] font-light',
  [TitleLevel.H5Medium]:
    'font-sans text-[1.625rem] lg:text-[2rem] leading-[105%] tracking-[-0.04875rem] font-medium',
  [TitleLevel.H5Regular]:
    'font-sans text-[1.625rem] lg:text-[2rem] leading-[105%] tracking-[-0.04875rem]',
  [TitleLevel.H6Regular]:
    'font-sans text-[1.25rem] lg:text-[1.5rem] leading-[120%] tracking-[-0.0375rem]',
  [TitleLevel.H6Mono]:
    'font-mono text-[1.25rem] lg:text-[1.5rem] leading-[120%] tracking-[-0.0375rem] font-light',
};

type TitleProps = {
  children: ReactNode;
  level?: TitleLevel;
  as?: ElementType;
  className?: string;
};

export default function Title({
  level = TitleLevel.H2Medium,
  children,
  as,
  className,
}: TitleProps) {
  const Tag = as ?? defaultTags[level];

  const titleClasses = classNames('text-currentColor text-balance', levelStyles[level], className);
  return <Tag className={titleClasses}>{children}</Tag>;
}
