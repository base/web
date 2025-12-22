'use client';

import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';

import { motion, Variants, cubicBezier, spring } from 'motion/react';
import Link from 'apps/web/src/components/Link';
import Container from 'apps/web/src/components/base-org/Container';
import classNames from 'classnames';

export type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type SectionContent = {
  prefix?: ImageType;
  title: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
};

type SectionProps = {
  content: SectionContent;
  children?: React.ReactNode;
  className?: string;
  disableWrapperAnimation?: boolean;
};

export const viewport = { once: true, amount: 0.1 };

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
      duration: 0.25,
      ease: easeFn,
    },
  },
};

export const itemContentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: spring, bounce: 0.3, duration: 0.6 } },
};

export function Section({ content, children, className, disableWrapperAnimation }: SectionProps) {
  const WrapperComponent = disableWrapperAnimation ? 'div' : motion.div;

  const itemProps = {
    variants: itemContentVariants,
    ...(disableWrapperAnimation && {
      initial: 'hidden',
      whileInView: 'visible',
      viewport: viewport,
    }),
  };

  return (
    <Container className={classNames('relative lg:py-40', className)}>
      <WrapperComponent
        className="col-span-full grid grid-cols-12 gap-x-[min(2.25vw,_32px)] gap-y-6 lg:gap-y-8"
        {...(!disableWrapperAnimation && {
          variants: contentVariants,
          initial: 'hidden',
          whileInView: 'visible',
          viewport: viewport,
        })}
      >
        {content.prefix && (
          <motion.div {...itemProps} className="col-span-full">
            <Title
              level={TitleLevel.H1Regular}
              className="-mb-6 !text-3xl !leading-[1.125] !tracking-[-0.96px] lg:-mb-8"
              as="h2"
            >
              {content?.prefix?.alt}
            </Title>
          </motion.div>
        )}

        <motion.div {...itemProps} className="col-span-full lg:col-span-6 lg:max-w-[400px]">
          <Title
            level={TitleLevel.H1Regular}
            className={classNames('!text-3xl !leading-[1.125] !tracking-[-0.96px]', {
              '!text-base-gray-200': content.prefix?.alt,
            })}
            as="h2"
          >
            {content.title}
          </Title>
        </motion.div>

        <div className="flex flex-col col-span-full gap-6 lg:col-span-6 lg:mt-0 lg:items-end lg:justify-end">
          {content.cta?.label && (
            <motion.div {...itemProps} className="block col-span-full sm:col-span-3">
              <Link href={content.cta.href}>
                <AnimatedButton
                  text={content.cta.label}
                  backgroundColor="#0000ff"
                  textColor="#fff"
                />
              </Link>
            </motion.div>
          )}
        </div>

        {children && (
          <div className="col-span-full grid grid-cols-9 gap-x-[min(2.25vw,_32px)] gap-y-10 pt-2">
            {children}
          </div>
        )}

        {content.description && (
          <motion.div {...itemProps} className="col-span-full lg:col-span-6 lg:max-w-[400px]">
            <Text
              className="!whitespace-pre-wrap !text-base-gray-200"
              variant={TextVariant.BodyLarge}
            >
              {content.description}
            </Text>
          </motion.div>
        )}
      </WrapperComponent>
    </Container>
  );
}
