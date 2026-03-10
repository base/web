'use client';

import { StaticSiwbCodeblock } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/StaticSiwbCodeblock';
import { UseCaseCard } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/UseCaseCard';
import { AnimatedBaseAgent } from 'apps/web/src/components/Builders/Shared/assets/UseCases/BaseAgent';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatedGrowthChart } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/AnimatedGrowthChart';
import { LaunchAChainSteps } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/LaunchAChainSteps';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

const useCases = [
  {
    cardNumber: 1,
    title: "Kickstart your app's growth",
    description:
      'Access millions of active users and grow your app by publishing it on the Base App. ',
    href: 'https://docs.base.org/cookbook/onchain-social',
    content: (
      <div className="flex flex-1 items-center justify-center">
        <AnimatedGrowthChart />
      </div>
    ),
  },
  {
    cardNumber: 2,
    title: 'Onboard everyone',
    description:
      'Let users sign up and sign in with Base Account — the universal account for the onchain world.',
    href: 'https://docs.base.org/cookbook/onboard-any-user',
    content: <StaticSiwbCodeblock />,
  },
  {
    cardNumber: 3,
    title: 'Accept crypto payments',
    description:
      'Accept crypto payments in your apps and ecommerce stores. Available for every business and live for Shopify merchants.',
    href: 'https://docs.base.org/cookbook/accept-crypto-payments',
    content: (
      <Image
        src="/images/base-pay.png"
        alt="Accept crypto payments"
        width={288}
        height={272}
        className="mx-auto"
      />
    ),
  },
  {
    cardNumber: 4,
    title: 'Integrate DeFi',
    description: 'Unlock the power of DeFi protocols and services directly in your app. ',
    href: 'https://docs.base.org/cookbook/defi-your-app',
    content: (
      <div className="flex flex-1 items-center justify-center">
        <Image alt="Integrate DeFi" src="/images/integrate-defi.svg" width={402} height={269} />
      </div>
    ),
  },
  {
    cardNumber: 5,
    title: 'Launch AI agents',
    description: 'Deploy AI agents that can interact with onchain data and smart contracts.',
    href: 'https://docs.base.org/cookbook/launch-ai-agents',
    content: <AnimatedBaseAgent className="!my-0 w-full font-sans md:w-full" />,
  },
  {
    cardNumber: 6,
    title: 'Launch a dedicated chain on Base',
    description:
      'Scale your app with dedicated blockspace and customized settings built for your users.',
    href: 'https://docs.base.org/cookbook/deploy-a-chain',
    content: (
      <div className="flex flex-1 items-center justify-center">
        <LaunchAChainSteps />
      </div>
    ),
  },
];

export function UseCasesSection() {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && cardWidth > 0) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const gap = window.innerWidth >= 768 ? 24 : 12; // md:gap-6 = 24px, gap-3 = 12px
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));
        setCurrentIndex(Math.max(0, Math.min(newIndex, useCases.length - 1)));
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [cardWidth]);

  const onNext = useCallback(() => {
    if (scrollContainerRef.current) {
      const gap = window.innerWidth >= 768 ? 24 : 12; // md:gap-6 = 24px, gap-3 = 12px
      const nextIndex = currentIndex >= useCases.length - 1 ? 0 : currentIndex + 1;
      const targetScrollLeft = nextIndex * (cardWidth + gap);

      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, cardWidth]);

  const onPrevious = useCallback(() => {
    if (scrollContainerRef.current) {
      const gap = window.innerWidth >= 768 ? 24 : 12; // md:gap-6 = 24px, gap-3 = 12px
      const prevIndex = currentIndex <= 0 ? useCases.length - 1 : currentIndex - 1;
      const targetScrollLeft = prevIndex * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, cardWidth]);

  return (
    <AnalyticsProvider context="builder-use-cases">
      <div className="relative z-[10] flex flex-col gap-6">
        <ul
          className="scrollbar-hidden flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto scroll-smooth md:gap-6"
          ref={scrollContainerRef}
        >
          {useCases.map((useCase) => (
            <li key={useCase.cardNumber} className="snap-start">
              <UseCaseCard {...useCase} ref={cardRef} />
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-[4px] border-[2px] border-gray-15 p-2.5"
            onClick={onPrevious}
          >
            <div className="rotate-180">
              <Icon name="arrowRight" width={16} height={16} />
            </div>
          </button>
          <button
            type="button"
            className="rounded-[4px] border-[2px] border-gray-15 p-2.5"
            onClick={onNext}
          >
            <Icon name="arrowRight" width={16} height={16} />
          </button>
        </div>
      </div>
    </AnalyticsProvider>
  );
}
