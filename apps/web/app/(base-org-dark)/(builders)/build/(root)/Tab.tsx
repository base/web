'use client';

import { useMemo, useState } from 'react';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

export function TabItem() {}

type Props = {
  tabItems: {
    title: string;
    content: string;
    author: string;
    source: string;
  }[];
};

export function Tab({ tabItems }: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeTab = tabItems[activeTabIndex];

  const tabAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    }),
    [],
  );

  return (
    <div className="col-span-12 md:rounded-lg md:bg-gray-90 md:p-6">
      <div className="mb-9 flex flex-col gap-12">
        <div className="flex gap-2">
          {tabItems.map(({ title }, index) => (
            <button
              key={title}
              className={cx('rounded-sm px-2.5 py-1 text-xl font-medium hover:bg-gray-80', {
                'bg-gray-80 text-[#FB9CC6] backdrop-blur-sm': activeTabIndex === index,
              })}
              type="button"
              onClick={() => setActiveTabIndex(index)}
            >
              {title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={tabAnimation.initial}
            animate={tabAnimation.animate}
            exit={tabAnimation.exit}
            transition={tabAnimation.transition}
            className="text-3xl leading-[1.15] tracking-[-1.6px] md:text-4xl"
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col font-mono font-light text-[#B1B7C3]">
        <div>{activeTab.author}</div>
        <div>{activeTab.source}</div>
      </div>
    </div>
  );
}
