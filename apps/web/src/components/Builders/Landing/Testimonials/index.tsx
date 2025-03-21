'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';

type Tab = 'build' | 'scale' | 'monetize';

type Testimonial = {
  text: string;
  author: string;
  role: string;
  tab: Tab;
};

const testimonials: Testimonial[] = [
  {
    text: 'Base provides unmatched developer support and fosters a highly constructive community that inspires innovation and encourages you to push boundaries. If you want to build and win, Base is the place to be.',
    author: 'Dhawal Shah',
    role: 'HeyElsa AI',
    tab: 'build',
  },
  {
    text: 'Base stands out for how they support builders at scale. They’ve gone above and beyond to help us onboard users, build new solutions, and tap into real liquidity.',
    author: 'David Johansson',
    role: 'BLOCKLORDS',
    tab: 'scale',
  },
  {
    text: "Base is at the crossroad of DeFi, memecoins, NFT, and Coinbase's large distribution network. It's one of the best L2 to build tools and apps that benefit from synergistic integrations!",
    author: 'Merlin Egalite',
    role: 'Morpho',
    tab: 'monetize',
  },
];

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<Tab>('build');

  const testimonialAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    }),
    [],
  );

  const createTabClickHandler = (tab: Tab) => () => setActiveTab(tab);

  return (
    <section className="mt-16 h-[448px] w-full max-sm:mb-32 md:h-full">
      <div className="rounded-xl border border-palette-line/20 p-6 md:p-8">
        <div className="mb-9 flex space-x-6">
          {(['build', 'scale', 'monetize'] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={createTabClickHandler(tab)}
              className={classNames(
                'rounded px-2 py-0.5 transition-colors',
                activeTab === tab
                  ? 'text-white'
                  : 'text-dark-palette-foregroundMuted hover:bg-dark-gray-10 hover:text-white',
              )}
            >
              <Title level={TitleLevel.Title3}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Title>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {testimonials
            .filter((testimonial) => testimonial.tab === activeTab)
            .map((testimonial) => (
              <motion.div
                key={testimonial.tab}
                initial={testimonialAnimation.initial}
                animate={testimonialAnimation.animate}
                exit={testimonialAnimation.exit}
                transition={testimonialAnimation.transition}
                className="space-y-9"
              >
                <blockquote className="space-y-6">
                  <Title level={TitleLevel.Display3}>&ldquo;{testimonial.text}&rdquo;</Title>
                  <div className="text-dark-palette-foregroundMuted">
                    <Title level={TitleLevel.Title4}>{testimonial.author}</Title>
                    <Title level={TitleLevel.Title4}>{testimonial.role}</Title>
                  </div>
                </blockquote>
                <ButtonWithLinkAndEventLogging
                  variant={ButtonVariants.SecondaryOutline}
                  linkClassNames="w-fit block"
                  buttonClassNames="text-base font-medium text-white flex items-center justify-between px-4 pb-3 pt-3 group"
                  href="/builders/stories"
                  eventName="testimonials"
                >
                  <div className="flex items-center gap-4">
                    <span> More stories</span>
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <Icon name="arrowRight" width={20} height={20} color="white" />
                    </div>
                  </div>
                </ButtonWithLinkAndEventLogging>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
