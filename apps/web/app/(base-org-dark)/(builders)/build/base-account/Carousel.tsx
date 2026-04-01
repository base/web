'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, Variants, cubicBezier } from 'motion/react';
import { itemContentVariants } from 'apps/web/src/components/base-org/root/Redesign/Section';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import classNames from 'classnames';
import baseAccountFeatures1 from './base-account-features-1.svg';
import baseAccountFeatures2 from './base-account-features-2.svg';
import baseAccountFeatures3 from './base-account-features-3.svg';
import { StaticImageData } from 'next/image';

const features1Image = baseAccountFeatures1 as StaticImageData;
const features2Image = baseAccountFeatures2 as StaticImageData;
const features3Image = baseAccountFeatures3 as StaticImageData;

type Feature = {
  number: string;
  title: string;
  description: string;
  asset: { src: string; alt: string; width: number; height: number };
};

export const baseAccountFeatures: Feature[] = [
  {
    number: '01',
    title: 'Sign in with Base',
    description: 'The fastest way to sign in to apps across the open internet.',
    asset: {
      src: features1Image.src,
      alt: 'Sign in with Base',
      width: features1Image.width,
      height: features1Image.height,
    },
  },
  {
    number: '02',
    title: 'Onramp in seconds',
    description: 'Fund your wallet effortlessly with your Coinbase account or debit card.',
    asset: {
      src: features2Image.src,
      alt: 'Onramp in seconds',
      width: features2Image.width,
      height: features2Image.height,
    },
  },
  {
    number: '03',
    title: 'Pay in one tap',
    description: 'Send money to anyone in the world, instantly.',
    asset: {
      src: features3Image.src,
      alt: 'Pay in one tap',
      width: features3Image.width,
      height: features3Image.height,
    },
  },
];

const easeFn = cubicBezier(0.4, 0, 0.2, 1);
const transition = { duration: 0.24, ease: easeFn };

const assetVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const featureItemHover = {
  active: { opacity: 1 },
  inactive: { opacity: 0.6 },
};

const featureItemAnimate = {
  active: { opacity: 1 },
  inactive: { opacity: 0.3 },
};

const verticalLineAnimation = {
  initial: { height: 0 },
  animate: { height: '100%' },
  exit: { height: 0 },
};

const carouselViewport = { once: true, amount: 0.4 };

function FeatureItem({
  feature,
  isActive,
  onClick,
  animationKey,
  animationInterval,
}: {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
  animationKey: number;
  animationInterval: number;
}) {
  const lineTransition = useMemo(
    () => ({
      duration: animationInterval / 1000,
      ease: 'linear',
    }),
    [animationInterval],
  );

  return (
    <motion.button
      onClick={onClick}
      className={classNames(
        'relative flex w-full flex-wrap items-start justify-start gap-6 p-0 pl-6 text-left transition-opacity duration-300',
        {
          'opacity-30': !isActive,
          'opacity-100': isActive,
        },
      )}
      whileHover={isActive ? featureItemHover.active : featureItemHover.inactive}
      animate={isActive ? featureItemAnimate.active : featureItemAnimate.inactive}
    >
      {isActive && (
        <motion.div
          key={animationKey}
          initial={verticalLineAnimation.initial}
          animate={verticalLineAnimation.animate}
          exit={verticalLineAnimation.exit}
          transition={lineTransition}
          className="absolute left-0 top-0 w-[4px] rounded-full bg-blue-500"
        />
      )}

      <Title level={TitleLevel.H6Mono} as="h3">
        {feature.number}
      </Title>

      <div className="flex max-w-[350px] flex-1 flex-col items-start gap-2">
        <Title level={TitleLevel.H6Regular} as="h3" className="text-base-black">
          {feature.title}
        </Title>

        <Text variant={TextVariant.Body} className="!text-base-gray-200">
          {feature.description}
        </Text>
      </div>
    </motion.button>
  );
}

export function BaseAccountCarousel({
  features,
}: {
  features: {
    number: string;
    title: string;
    description: string;
    asset: { src: string; alt: string; width: number; height: number };
  }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ANIMATION_INTERVAL = 2400;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setAnimationKey((prev) => prev + 1);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
      setAnimationKey((prev) => prev + 1);
    }, ANIMATION_INTERVAL);
  }, [clearTimer, features.length]);

  const handleFeatureClick = useCallback(
    (index: number) => () => {
      setCurrentIndex(index);
      startTimer();
    },
    [startTimer],
  );

  useEffect(() => {
    startTimer();

    return () => {
      clearTimer();
    };
  }, [startTimer, clearTimer]);

  const currentFeature = features[currentIndex];

  return (
    <motion.div
      className="col-span-full flex h-full w-full flex-col items-start gap-6 py-8 lg:flex-row lg:gap-[clamp(32px,_calc(32px_+_(100vw_-_1440px)_*_0.067),_64px)]"
      variants={itemContentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={carouselViewport}
    >
      <div className="relative order-2 flex min-h-[620px] flex-1 items-center justify-start bg-transparent lg:order-1">
        <div className="relative h-full min-h-0 w-full max-w-[400px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={currentFeature.asset.src}
              alt={currentFeature.asset.alt}
              width={currentFeature.asset.width}
              height={currentFeature.asset.height}
              className="h-full w-full object-contain"
              variants={assetVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="order-1 flex flex-1 items-center lg:order-2">
        <div className="flex h-fit w-full flex-col items-start gap-12 pl-3">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.number}
              feature={feature}
              isActive={index === currentIndex}
              onClick={handleFeatureClick(index)}
              animationKey={animationKey}
              animationInterval={ANIMATION_INTERVAL}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
