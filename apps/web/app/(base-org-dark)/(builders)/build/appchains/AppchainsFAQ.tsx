'use client';
import Link from 'apps/web/src/components/Link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { FAQ_ITEMS } from 'apps/web/src/components/Builders/Appchains/FAQ';
import { appchainDocsUrl } from 'apps/web/app/(base-org-dark)/(builders)/build/appchains/constants';
import cx from 'classnames';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

const caret = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.00072 11.6313L1.43504 5.06566L2.56641 3.93429L8.00072 9.36861L13.435 3.93429L14.5664 5.06566L8.00072 11.6313Z"
      fill="white"
    />
  </svg>
);

export function AppchainsFAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <AnalyticsProvider context="appchains-faq">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="text-7xl leading-none tracking-[-1.92px]">FAQs</div>
        <div className="flex flex-col">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              className={cx('border-gray-200 border-b', {
                'border-t': index === 0,
              })}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="group flex w-full flex-col py-4 hover:bg-gray-90"
              >
                <div className="flex w-full items-center justify-between text-left">
                  <div className="text-2xl leading-[1.116] tracking-[-0.72px] transition-colors">
                    {item.question}
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex-shrink-0"
                  >
                    {caret}
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openItems.has(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex overflow-hidden text-left"
                    >
                      <div className="pt-4 text-lg leading-[1.116] tracking-[-0.72px] text-gray-20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <Button
            asChild
            variant={ButtonVariants.Secondary}
            size={ButtonSizes.Small}
            className="w-full min-w-[250px] px-3 md:w-auto"
          >
            <Link href={appchainDocsUrl} target="_blank" rel="noopener noreferrer">
              View all FAQs
            </Link>
          </Button>
        </div>
      </div>
    </AnalyticsProvider>
  );
}
