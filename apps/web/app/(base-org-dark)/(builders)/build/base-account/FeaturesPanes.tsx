'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
import { BaseAccountCarousel, baseAccountFeatures } from './Carousel';

const features = [
  {
    title: 'Sign in with Base',
    description: 'The fastest way to sign in to apps across the open internet.',
    image: baseAccountFeatures[0].asset.src,
  },
  {
    title: 'Onramp in seconds',
    description: 'Fund your wallet effortlessly with your Coinbase account or debit card.',
    image: baseAccountFeatures[1].asset.src,
  },
  {
    title: 'Pay in one tap',
    description: 'Send money to anyone in the world, instantly.',
    image: baseAccountFeatures[2].asset.src,
  },
];

export function FeaturesPanes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentFeature = features[currentIndex];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorHeight, setIndicatorHeight] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const computeIndicatorPosition = useCallback(({ _currentIndex }: { _currentIndex: number }) => {
    const currentItem = containerRef.current?.querySelector(
      `[data-item-index="${_currentIndex}"]`,
    ) as HTMLLIElement | null;

    if (currentItem) {
      setIndicatorHeight(currentItem.clientHeight);
      setIndicatorTop(currentItem.offsetTop);
    }
  }, []);

  useEffect(() => {
    computeIndicatorPosition({ _currentIndex: currentIndex });
  }, [currentIndex, computeIndicatorPosition]);

  const setIndex = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      computeIndicatorPosition({ _currentIndex: currentIndex });
    }
  }, [isSmallScreen, computeIndicatorPosition, currentIndex]);

  return (
    <>
      <div className="hidden md:flex">
        <BaseAccountCarousel features={baseAccountFeatures} />
      </div>
      <div
        className="flex w-full flex-col gap-10 md:hidden md:flex-row md:gap-6"
        ref={containerRef}
      >
        {isMounted ? (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{
                opacity: 0,
                x: isSmallScreen ? -100 : 0,
                y: isSmallScreen ? 0 : 100,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: isSmallScreen ? 100 : 0,
                y: isSmallScreen ? 0 : -100,
              }}
              key={currentIndex}
              className="flex flex-1 cursor-pointer flex-col gap-9 md:cursor-default"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                const swipeThreshold = 50;
                if (info.offset.x > swipeThreshold && currentIndex > 0) {
                  setCurrentIndex(Math.max(0, currentIndex - 1));
                } else if (info.offset.x < -swipeThreshold && currentIndex < features.length - 1) {
                  setCurrentIndex(Math.min(features.length - 1, currentIndex + 1));
                }
              }}
            >
              <Image
                alt={currentFeature.title}
                src={currentFeature.image}
                width={387}
                height={645}
                className="m-auto max-w-[250px] md:max-w-[400px]"
              />
              <div className="mx-auto flex max-w-[250px] gap-3 md:hidden">
                <div className="font-mono text-sm font-[350] tracking-[0.28px]">
                  0{currentIndex + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm leading-[1.3]">{currentFeature.title}</div>
                  <div className="text-sm leading-[1.3] text-gray-30">
                    {currentFeature.description}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-1">
            <div className="m-auto aspect-[387/645] w-[250px] md:w-[400px]" />
          </div>
        )}
        <ul className="mx-auto flex items-center gap-3 md:hidden">
          {new Array(features.length).fill(null).map((_, idx) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={cx('h-1 w-4 rounded-full transition-all', {
                  'w-8 bg-[#7575FF]': idx === currentIndex,
                  'bg-white': idx !== currentIndex,
                })}
              />
            );
          })}
        </ul>
        <ul className="relative mx-4 hidden flex-col gap-[72px] md:flex md:max-w-[340px]">
          <div
            className="absolute -left-4 w-1 rounded-[100px] bg-[#7575FF] transition-all duration-300 ease-in-out"
            style={{
              height: indicatorHeight,
              transform: `translateY(${indicatorTop}px)`,
            }}
          />
          {features.map((feature, idx) => {
            return (
              <li key={feature.title} data-item-index={idx}>
                <button
                  type="button"
                  onClick={() => setIndex(idx)}
                  className={cx('flex gap-6 text-left transition-opacity', {
                    'opacity-50': idx !== currentIndex,
                  })}
                >
                  <div className="leading-[1. font-mono text-2xl font-light">0{idx + 1}</div>
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl leading-[1.2] tracking-[-0.72px]">{feature.title}</div>
                    <div className="text-2xl leading-[1.2] tracking-[-0.72px] text-gray-20">
                      {feature.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
