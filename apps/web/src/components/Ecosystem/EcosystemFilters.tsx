'use client';

import Card from '../base-org/Card';
import classNames from 'classnames';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

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

  const isAllActive = selectedSubcategories.length === 0;

  const createCategoryClickHandler = (category: string) => () => handleCategorySelect(category);
  const createSubcategoryClickHandler = (subcategory: string) => () => handleSubcategorySelect(subcategory);

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="relative flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const categoryIsSelected = selectedCategories.includes(category);
          return index === 0 ? (
            <button
              type="button"
              key={category}
              onClick={createCategoryClickHandler('all')}
              className={classNames(
                'h-10 whitespace-nowrap rounded-full border border-white/20 px-4 uppercase tracking-wider transition-colors',
                {
                  'bg-white text-black': isAllActive,
                  'text-white/50 hover:bg-white/20 hover:text-white': !isAllActive,
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
                'h-10 whitespace-nowrap rounded-full border border-white/20 px-4 uppercase tracking-wider transition-colors',
                {
                  'bg-white text-black': categoryIsSelected,
                  'text-white/50 hover:bg-white/20 hover:text-white': !categoryIsSelected,
                },
              )}
            >
              {category}
            </button>
          ) : (
            <Popover.Root key={category}>
              <div className="flex h-10 items-stretch">
                <button
                  type="button"
                  className={classNames(
                    'peer rounded-full border border-white/20 px-4 uppercase tracking-wider transition-colors sm:rounded-r-none sm:border-r-0',
                    categoryIsSelected
                      ? 'bg-white text-black'
                      : 'text-white/50 hover:bg-white/20 hover:text-white',
                  )}
                  onClick={createCategoryClickHandler(category)}
                >
                  {category}
                </button>

                <div className="hidden w-px bg-white/20 peer-hover:bg-white/30 sm:block" />

                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Open Subcategory Menu"
                    className={classNames(
                      'group peer hidden rounded-r-full border border-white/20 px-2 pr-3 transition-colors sm:block sm:border-l-0',
                      categoryIsSelected
                        ? 'bg-white text-black'
                        : 'text-white/50 hover:bg-white/20 hover:text-white',
                    )}
                  >
                    <ChevronDownIcon className="h-4 w-4 transition-transform ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                  </button>
                </Popover.Trigger>
              </div>

              <Popover.Portal>
                <Popover.Content className="z-50 w-64" sideOffset={5}>
                  <Card radius={8} innerClassName="bg-dark-palette-backgroundAlternate p-4">
                    <div className="flex flex-col gap-2">
                      {config[category]?.map((subcategory) => {
                        const subcategoryIsSelected = selectedSubcategories.includes(subcategory);
                        return (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={createSubcategoryClickHandler(subcategory)}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm uppercase transition-colors hover:bg-white/10"
                          >
                            <div className="h-4 w-4 flex-shrink-0">
                              {subcategoryIsSelected && (
                                <CheckIcon className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <span
                              className={classNames(
                                subcategoryIsSelected ? 'text-white' : 'text-white/50',
                              )}
                            >
                              {subcategory}
                            </span>
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
