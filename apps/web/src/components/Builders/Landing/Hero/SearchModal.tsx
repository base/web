'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from 'apps/web/src/components/Input';
import { createPortal } from 'react-dom';
import Link from 'apps/web/src/components/Link';

type SearchCategory = {
  category: string;
  subCategories: SubCategory[];
};

type SubCategory = {
  label: string;
  href: string;
  icon: string;
  iconRotation?: string;
  onClick?: () => void;
  description?: React.ReactNode;
};

const searchConfig: SearchCategory[] = [
  {
    category: 'Quickstart',
    subCategories: [
      {
        label: 'npm create onchain',
        description: (
          <div className="mt-0.5 px-3 pb-2 text-xs tracking-wide text-dark-palette-foregroundMuted">
            Run this command in your terminal to start building with
            <Link
              href="https://docs.base.org/builderkits/onchainkit/getting-started"
              color="white"
              className="pl-1 text-xs tracking-wide text-white"
              target="_blank"
            >
              OnchainKit quickstart template
            </Link>
          </div>
        ),
        href: '',
        icon: 'copy',
        onClick: () => {
          void navigator.clipboard.writeText('npm create onchain');
        },
      },
      {
        label: 'AI docs',
        description: (
          <div className="mt-0.5 px-3 pb-2 text-xs tracking-wide text-dark-palette-foregroundMuted">
            Use this LLM-optimized context file to accelerate your workflow with AI
          </div>
        ),
        href: 'https://docs.base.org/llms-full.txt',
        icon: 'ai',
      },
    ],
  },
  // другие категории без изменений...
];

const matchesQuery = (text: string, query: string) =>
  text.toLowerCase().includes(query.toLowerCase());

export function SearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const clearInput = useCallback(() => {
    setSearchQuery('');
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClick = (e: MouseEvent) => {
        const modalEl = document.querySelector('[aria-label="search-modal"]');
        if (modalEl && !modalEl.contains(e.target as Node)) {
          clearInput();
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [isOpen, clearInput, setIsOpen]);

  const activeSearchConfig = useMemo(() => {
    if (!searchQuery) return searchConfig;

    return searchConfig
      .map((category) => ({
        ...category,
        subCategories: category.subCategories.filter((sub) =>
          matchesQuery(sub.label, searchQuery),
        ),
      }))
      .filter((category) => category.subCategories.length > 0);
  }, [searchQuery]);

  const handleSearchInputFocus = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const createCategoryClickHandler = (subCategory: SubCategory) =>
    subCategory.href
      ? () => window.open(subCategory.href, '_blank')
      : subCategory.onClick;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 text-white selection:bg-[#C5DAFC] selection:text-blue">
      <div
        aria-label="search-modal"
        aria-modal="true"
        role="dialog"
        className="fixed left-1/2 top-1/2 max-h-[460px] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-muted/20 bg-illoblack p-2 hover:border-gray-muted/20 md:w-[555px]"
      >
        <Input
          ref={searchInputRef}
          onFocus={handleSearchInputFocus}
          onChange={onSearchInputChange}
          className="w-full border-b border-gray-muted/20 bg-illoblack p-3 pt-2 hover:border-gray-muted/20 focus:outline-none"
          placeholder="Find tools, templates, or guides"
        />
        {activeSearchConfig.length > 0 && (
          <div className="flex w-full flex-col gap-4 pb-2 pt-2">
            {activeSearchConfig.map((searchCategory) => (
              <div key={searchCategory.category} className="w-full">
                <div className="mt-3 w-full px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-muted">
                  {searchCategory.category}
                </div>
                {searchCategory.subCategories.map((subCategory) => (
                  <div key={subCategory.label} className="flex flex-col">
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-white hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary"
                      onClick={createCategoryClickHandler(subCategory)}
                    >
                      <span className="tracking-wide">{subCategory.label}</span>
                      <div
                        className={classNames(
                          'opacity-0 transition-opacity group-hover:opacity-100',
                          subCategory.iconRotation,
                        )}
                      >
                        <Icon name={subCategory.icon} width="16" height="16" />
                      </div>
                    </button>
                    {subCategory.description}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
