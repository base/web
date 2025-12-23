'use client';

import { motion, cubicBezier } from 'motion/react';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Container from 'apps/web/src/components/base-org/Container';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';
import type { HeroBackgroundConfig } from 'apps/web/src/components/Brand/Hero/Background';
import Link from 'apps/web/src/components/Link';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeFn, delay: 0.3 },
  },
};

const subheaderVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeFn, delay: 0.4 },
  },
};

type CtaButton = {
  label: string;
  url: string;
};

type GenericHeroProps = {
  title: string;
  subheader?: string;
  imageUrl: string;
  ctas?: {
    primary?: CtaButton;
    secondary?: CtaButton;
  };
  /** Use 'compact' for shorter hero sections (like enterprises pages) */
  variant?: 'default' | 'compact';
};

export function GenericHero({
  title,
  subheader,
  imageUrl,
  ctas,
  variant = 'default',
}: GenericHeroProps) {
  const heroBackgroundConfig: HeroBackgroundConfig = {
    imageUrl: imageUrl,
    altPattern: {
      url: '/patterns/pat-colorful.png',
      columns: 6,
    },
    className: 'h-full w-full',
    enableInteractivity: true,
    velocityDissipation: 0.94,
    radius: 0.25,
    bottomFade: true,
    fadeX: true,
  };

  const isCompact = variant === 'compact';

  return (
    <Container className={`pointer-events-none gap-y-12 lg:pt-0 ${isCompact ? 'h-[40vh]' : ''}`}>
      <div
        className={`relative w-full pb-0 ${
          isCompact ? 'z-20 col-span-full lg:col-span-10' : 'col-span-full'
        } h-[412px] lg:h-[670px]`}
      >
        <div className="relative z-20 flex h-full w-full flex-col">
          <AnimatedTitle titleLines={[title]} />
          {ctas && (
            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 flex max-w-xs flex-col items-start gap-5 md:flex-row"
            >
              {ctas.primary && (
                <Button
                  variant={ButtonVariants.Primary}
                  size={ButtonSizes.Small}
                  className="pointer-events-auto w-full"
                >
                  <Link href={ctas.primary.url}>{ctas.primary.label}</Link>
                </Button>
              )}
              {ctas.secondary && (
                <Button
                  variant={ButtonVariants.SecondaryOutline}
                  size={ButtonSizes.Small}
                  className="pointer-events-auto w-full"
                >
                  <Link href={ctas.secondary.url}>{ctas.secondary.label}</Link>
                </Button>
              )}
            </motion.div>
          )}
        </div>
        {!isCompact && (
          <div className="pointer-events-auto absolute inset-0 overflow-hidden">
            <HeroBackground config={heroBackgroundConfig} />
          </div>
        )}
      </div>
      {isCompact && (
        <div className="pointer-events-auto absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
          <HeroBackground config={heroBackgroundConfig} />
        </div>
      )}
      {subheader && (
        <motion.div
          variants={subheaderVariants}
          initial="hidden"
          animate="visible"
          className="col-span-8"
        >
          <Title level={TitleLevel.H5Regular} as="h2">
            {subheader}
          </Title>
        </motion.div>
      )}
    </Container>
  );
}
