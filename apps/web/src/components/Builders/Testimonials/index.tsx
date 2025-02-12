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
    text: "Base's developer platform helped us launch our NFT marketplace in days instead of months.",
    author: 'Sarah Chen',
    role: 'CTO at ArtBlock',
    tab: 'build',
  },
  {
    text: 'We scaled from 100 to 100k daily active users without changing our infrastructure.',
    author: 'Michael Rodriguez',
    role: 'Founder at GameFi',
    tab: 'scale',
  },
  {
    text: 'Implementing Base Pay increased our revenue by 300% in the first month.',
    author: 'David Kim',
    role: 'CEO at DeFiPro',
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

  return (
    <section className="mt-16 h-[448px] w-full md:h-full">
      <div className="rounded-xl border border-palette-line/20 p-6 md:p-8">
        <div className="mb-9 flex space-x-6">
          {(['build', 'scale', 'monetize'] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
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
                  linkClassNames="text-base font-medium text-white block"
                  buttonClassNames="flex w-40 items-center justify-between px-4 py-3 group"
                  href="/builders/stories"
                  eventName="testimonials"
                >
                  <div className="flex w-40 items-center justify-between">
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
