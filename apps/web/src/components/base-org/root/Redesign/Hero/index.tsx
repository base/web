'use client';

import Container from 'apps/web/src/components/base-org/Container';
import { AnimatedTitle } from 'apps/web/src/components/base-org/root/Redesign/Hero/AnimatedTitle';
import { LogoHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/LogoHero';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { LogoHeroAlt } from 'apps/web/src/components/base-org/root/Redesign/Hero/LogoHeroAlt';

import { motion, cubicBezier, Variants, spring } from 'motion/react';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const motionConfig: any = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: spring, bounce: 0.3, duration: 0.5, delay: 0.3 },
};

export function Hero() {
  return (
    <Container className="!lg:mb-0 !mb-0 grid-cols-9 gap-y-12">
      <div className="col-span-full flex h-fit flex-col justify-start gap-y-6 md:h-fit md:justify-start">
        <div className="relative col-span-full w-full pb-0">
          {/* <LogoHeroAlt /> */}
          <LogoHero />
          {/* <AnimatedTitle /> */}
        </div>
        <div className="grid-base col-span-full w-full">
          {/* <div className="col-span-2 md:col-span-1 md:col-start-3">
            <div className="w-full">
              <Title level={TitleLevel.H2Regular}>A full stack for the onchain economy</Title>
            </div>
          </div> */}
          <div className="col-span-full md:col-span-2 md:col-start-1">
            <div className="w-full">
              <AnimatedTitle />
            </div>
          </div>
          <motion.div
            initial={motionConfig.initial}
            animate={motionConfig.animate}
            transition={motionConfig.transition}
            className="col-span-full md:col-span-2 md:col-start-3"
          >
            <div className="w-full">
              <Text variant={TextVariant.Body} className="!text-base-gray-200">
                Base is a full stack for the onchain economy — empowering builders, creators, and
                people everywhere to build apps, grow businesses, create what they love, and earn
                onchain.
              </Text>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
