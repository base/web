import * as Dialog from '@radix-ui/react-dialog';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence, cubicBezier, Variants, Transition } from 'motion/react';
import classNames from 'classnames';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

const tagChipVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const getTagChipTransition = (categoryIndex: number, chipIndex: number): Transition => ({
  duration: 0.15,
  delay: 0.1 + categoryIndex * 0.05 + chipIndex * 0.02,
  ease: easeFn,
});

export default function EcosystemFiltersMobile({
  categories,
  selectedSubcategories,
  onSubcategorySelect,
}: {
  categories: Record<string, string[]>;
  selectedSubcategories: string[];
  onSubcategorySelect: (subcategories: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosingFromResize, setIsClosingFromResize] = useState<boolean>(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    setIsClosingFromResize(false);
    document.body.style.overflowY = open ? 'hidden' : 'auto';
  }, []);

  const handleSubcategorySelect = useCallback(
    (subcategory: string) => {
      if (selectedSubcategories.includes(subcategory)) {
        onSubcategorySelect(selectedSubcategories.filter((sc) => sc !== subcategory));
      } else {
        onSubcategorySelect([...selectedSubcategories, subcategory]);
      }
    },
    [onSubcategorySelect, selectedSubcategories],
  );

  const handleClearFilters = useCallback(() => onSubcategorySelect([]), [onSubcategorySelect]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsClosingFromResize(true);
        setIsOpen(false);
        document.body.style.overflowY = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger
          aria-label="Open Filters"
          aria-expanded={isOpen}
          aria-controls="mobile-filters"
          data-focus-visible="false"
          className="grid size-8 place-items-center whitespace-nowrap rounded-[8px] border border-base-black text-base-black transition-colors hover:bg-white/20 hover:text-white focus:outline-none"
        >
          <FilterIcon />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Content
            className={classNames(
              'fixed inset-0 z-[151] flex flex-col bg-base-white outline-none',
              isClosingFromResize
                ? 'transition-none'
                : 'transition ease-in-out data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
            )}
          >
            <Dialog.Title className="sr-only">Mobile Filters</Dialog.Title>
            <Dialog.Description className="sr-only">
              Mobile ecosystem filters menu.
            </Dialog.Description>

            {/* Fixed header */}
            <div className="sticky top-0 z-10 flex h-16 items-end justify-between gap-4 bg-base-white px-4 pb-3 pt-5">
              <TagChip tag="Clear filters" isSelected={false} selectTag={handleClearFilters} />
              <Dialog.Close
                aria-label="Close Filters"
                className="relative z-20 grid size-8 place-items-center focus:outline-none"
              >
                <XIcon />
              </Dialog.Close>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-auto px-4 pb-20">
              <div className="flex flex-col gap-5">
                <AnimatePresence>
                  {isOpen &&
                    Object.entries(categories).map(([category, subcategories], categoryIndex) => (
                      <div key={`${category}-mobile`} className="flex flex-col gap-2 capitalize">
                        <Title level={TitleLevel.H6Regular}>{category}</Title>
                        <div className="flex flex-wrap gap-2">
                          {subcategories.map((subcategory, chipIndex) => (
                            <motion.div
                              key={subcategory}
                              variants={tagChipVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={getTagChipTransition(categoryIndex, chipIndex)}
                            >
                              <TagChip
                                tag={subcategory}
                                isSelected={selectedSubcategories.includes(subcategory)}
                                selectTag={handleSubcategorySelect}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.65384 1.99658H3.3208V3.19701H0.988281V4.79701H3.3208V5.9957H4.65384V4.79701H14.9883V3.19701H4.65384V1.99658Z"
        fill="#0A0B0D"
      />
      <path
        d="M0.988281 8.79701H9.31958V9.9946H10.6526V8.79701H14.9883V7.19701H10.6526V5.99548H9.31958V7.19701H0.988281V8.79701Z"
        fill="#0A0B0D"
      />
      <path
        d="M5.32056 12.797H0.988281V11.197H5.32056V9.99481H6.6536V11.197H14.9883V12.797H6.6536V13.9939H5.32056V12.797Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6.85346 7.99516L0.988281 2.12998L2.12315 0.995117L7.98832 6.86029L13.8535 0.995117L14.9884 2.12998L9.12319 7.99516L14.9883 13.8602L13.8534 14.9951L7.98832 9.13003L2.12324 14.9951L0.988368 13.8602L6.85346 7.99516Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}
