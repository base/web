'use client';

import { motion } from 'framer-motion';
import {
  contentVariants,
  itemContentVariants,
  viewport as defaultViewport,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';

type Props = {
  contentBlocks: ReactNode[];
  className?: string;
  initial?: 'hidden' | 'visible';
  wrapperComponent?: keyof JSX.IntrinsicElements;
  contentComponent?: keyof JSX.IntrinsicElements;
  viewport?: ComponentProps<typeof motion.div>['viewport'];
  extraContent?: ReactNode;
};

export function BuildersSection({
  contentBlocks,
  className,
  initial = 'hidden',
  wrapperComponent = 'section',
  contentComponent = 'div',
  viewport = defaultViewport,
  extraContent,
}: Props) {
  const WrapperComponent = motion(wrapperComponent);
  const ContentComponent = motion(contentComponent);

  return (
    <WrapperComponent
      className={cx('col-span-12', className)}
      variants={contentVariants}
      initial={initial}
      whileInView="visible"
      viewport={viewport}
    >
      {contentBlocks.map((block, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ContentComponent key={index} variants={itemContentVariants}>
          {block}
        </ContentComponent>
      ))}
      {extraContent}
    </WrapperComponent>
  );
}
