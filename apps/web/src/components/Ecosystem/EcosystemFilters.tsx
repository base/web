'use client';

import Card from '../base-org/Card';
import classNames from 'classnames';
import * as Popover from '@radix-ui/react-popover';
import Text from '../base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { useState, useCallback, SVGProps } from 'react';

type EcosystemFiltersProps = {
  selectedCategories: string[];
  selectedSubcategories: string[];
  setSelectedSubcategories: (subcategories: string[]) => void;
  config: Record<string, string[]>;
};

export function EcosystemFilters({
  selectedCategories,
  selectedSubcategories,
  setSelectedSubcategories,
  config,
}: EcosystemFiltersProps) {
  const categories = ['all', ...Object.keys(config)];
  const [buttonOffsets, setButtonOffsets] = useState<Record<string, number>>({});

  const handleCategorySelect = (category: string) => {
    if (category === 'all') {
      setSelectedSubcategories([]);
      return;
    }

    const categorySubcats = config[category] || [];
    const hasAnyCategorySelected = categorySubcats.some((sub) =>
      selectedSubcategories.includes(sub),
    );

    if (hasAnyCategorySelected) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => !categorySubcats.includes(sub)),
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, ...categorySubcats]);
    }
  };

  const handleSubcategorySelect = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((sub) => sub !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const calculateOffset = (categoryButtonRef: HTMLButtonElement | null) => {
    if (!categoryButtonRef) return 0;

    const categoryButtonWidth = categoryButtonRef.getBoundingClientRect().width;
    const chevronButtonWidth = 32;
    return -(categoryButtonWidth + chevronButtonWidth - 32);
  };

  const createButtonRef = useCallback(
    (category: string) => (el: HTMLButtonElement | null) => {
      if (el) {
        const offset = calculateOffset(el);
        setButtonOffsets((prev) => {
          if (prev[category] !== offset) {
            return { ...prev, [category]: offset };
          }
          return prev;
        });
      }
    },
    [],
  );

  const isAllActive = selectedSubcategories.length === 0;

  const createCategoryClickHandler = (category: string) => () => handleCategorySelect(category);
  const createSubcategoryClickHandler = (subcategory: string) => () =>
    handleSubcategorySelect(subcategory);

  return (
    <div className="flex relative flex-col gap-2 items-start">
      <div className="flex relative flex-wrap gap-1">
        {categories.map((category, index) => {
          const categoryIsSelected = selectedCategories.includes(category);
          return index === 0 ? (
            <button
              type="button"
              key={category}
              onClick={createCategoryClickHandler('all')}
              className={classNames(
                TextVariant.CTALabelSm,
                'h-8 whitespace-nowrap rounded-[8px] border border-[#DEE1E7] px-2 capitalize',
                {
                  'bg-[#F2F2F2] text-base-black': isAllActive,
                  'text-black transition-colors hover:bg-[#F2F2F2] hover:text-black':
                    !isAllActive,
                },
              )}
            >
              {category}
            </button>
          ) : category === 'ai' ? (
            <button
              type="button"
              key={category}
              onClick={createCategoryClickHandler('ai')}
              className={classNames(
                TextVariant.CTALabelSm,
                'h-8 whitespace-nowrap rounded-[8px] border border-[#DEE1E7] px-2 uppercase',
                {
                  'bg-[#F2F2F2] text-base-black transition-colors': categoryIsSelected,
                  'transition-colors hover:bg-[#F2F2F2]': !categoryIsSelected,
                },
              )}
            >
              {category}
            </button>
          ) : (
            <Popover.Root key={category}>
              <div className="hidden items-stretch h-8 rounded-lg transition-colors hover:bg-[#F2F2F2] lg:flex">
                <button
                  type="button"
                  ref={createButtonRef(category)}
                  className={classNames(
                    TextVariant.CTALabelSm,
                    'peer rounded-[8px] border border-[#DEE1E7] px-2 capitalize transition-colors sm:rounded-r-none sm:border-r-0',
                    categoryIsSelected
                      ? 'bg-[#F2F2F2] text-base-black'
                      : 'text-black hover:text-black',
                  )}
                  onClick={createCategoryClickHandler(category)}
                >
                  {category}
                </button>

                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Open Subcategory Menu"
                    className={classNames(
                      'group peer hidden rounded-r-[8px] border border-[#DEE1E7] px-2 transition-colors sm:block sm:border-l-0',
                      categoryIsSelected ? 'bg-[#F2F2F2] text-base-black' : 'text-black',
                    )}
                  >
                    <ArrowIcon
                      className={classNames(
                        'ease-[cubic-bezier(0.87,_0,_0.13,_1)] size-3 transition-transform group-data-[state=open]:rotate-180 [&>path]:fill-black',
                      )}
                    />
                  </button>
                </Popover.Trigger>
              </div>

              <Popover.Portal>
                <Popover.Content
                  className="z-50 w-48"
                  sideOffset={5}
                  align="start"
                  alignOffset={buttonOffsets[category] || -32}
                >
                  <Card radius={8} innerClassName="bg-white py-3 px-2 border border-[#DEE1E7]">
                    <div className="flex flex-col gap-3">
                      {config[category]?.map((subcategory) => {
                        const subcategoryIsSelected = selectedSubcategories.includes(subcategory);
                        return (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={createSubcategoryClickHandler(subcategory)}
                            className="group flex w-full items-start gap-1 rounded-[8px] text-left capitalize transition-colors hover:!text-base-black"
                          >
                            <div className="size-3.5 flex-shrink-0 pt-[3px]">
                              <CheckIcon
                                className={classNames(
                                  'size-3.5 transition-opacity',
                                  subcategoryIsSelected
                                    ? 'text-base-black'
                                    : 'hidden text-base-gray-150',
                                )}
                              />
                              <CheckmarkIcon className={classNames(
                                'size-3.5 transition-opacity',
                                subcategoryIsSelected
                                  ? 'hidden text-base-black'
                                  : 'text-base-gray-150',
                              )} />
                            </div>
                            <Text
                              className={classNames(
                                subcategoryIsSelected ? '!text-base-black' : '!text-[#0A0B0D80]',
                                'ml-0 group-hover:!text-base-black',
                              )}
                              variant={TextVariant.Body}
                            >
                              {subcategory}
                            </Text>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          );
        })}
      </div>
    </div>
  );
}

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00152 9.84863L0.577254 4.42437L1.42578 3.57584L6.00152 8.15158L10.5773 3.57584L11.4258 4.42437L6.00152 9.84863Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="11" height="11" rx="2.5" fill="#0A0B0D"/>
      <rect x="0.5" y="0.5" width="11" height="11" rx="2.5" stroke="#0A0B0D"/>
      <path d="M10.1556 3.70923L4.83573 9.12244L1.82227 6.36274L2.63289 5.47757L4.79184 7.45471L9.29955 2.86792L10.1556 3.70923Z" fill="white"/>
    </svg>
  );
}

function CheckmarkIcon(props: SVGProps<SVGSVGElement>) {
  return(
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="11" height="11" rx="2.5" stroke="#828283" />
    </svg>
  );
}