'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import sun from 'apps/web/src/components/Developers/Shared/sun.svg';
import moon from 'apps/web/src/components/Developers/Shared/moon.svg';
import Image, { StaticImageData } from 'next/image';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import CodeSnippet from 'apps/web/src/components/Developers/Shared/CodeSnippet';
import { CheckoutButton } from '@coinbase/onchainkit/checkout';
import { Checkout } from '@coinbase/onchainkit/checkout';
import { TransactionDefault } from '@coinbase/onchainkit/transaction';
import { COMPONENT_CODE_SNIPPETS } from 'apps/web/src/components/Developers/Onchainkit/constants';

const TABS = ['Wallet', 'Earn', 'Fund', 'Pay', 'Buy', 'Checkout', 'Mint', 'Transact'];

const styles = `
  .code-snippet::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .code-snippet::-webkit-scrollbar-track {
    background: transparent;
  }
  .code-snippet::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
  .code-snippet::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .code-snippet {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }
  /* Default theme (light) */
  .shiki,
  .shiki span {
    color: var(--shiki-light) !important;
    background-color: var(--shiki-light-bg) !important;
    font-style: var(--shiki-light-font-style) !important;
    font-weight: var(--shiki-light-font-weight) !important;
    text-decoration: var(--shiki-light-text-decoration) !important;
  }
  /* Dark theme overrides */
  .dark .shiki,
  .dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
`;

export function Demo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const handleClick = useCallback((header: string) => {
    return () => setSelectedTab(header);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const codeSnippet = useMemo(() => {
    return COMPONENT_CODE_SNIPPETS?.[selectedTab];
  }, [selectedTab]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeSnippet]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const component = useMemo(() => {
    if (selectedTab === 'Transact') {
      return <TransactionDefault calls={[]} className="mr-auto w-auto" />;
    }
    if (selectedTab === 'Checkout') {
      return (
        <Checkout className="mr-auto w-auto">
          <CheckoutButton />
        </Checkout>
      );
    }
    return <WalletDefault />;
  }, [selectedTab]);

  if (!isMounted) {
    return (
      <div id="demo" className="bg-black pb-32 pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="bg-neutral-900/50 mx-auto overflow-hidden rounded-xl border border-white/10">
            <div className="flex h-[500px] items-center justify-center">
              <div className="text-white/50">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <style>{styles}</style>
      <div className="mb-9 flex flex-row gap-2">
        <Title level={TitleLevel.Title1} className="max-sm:hidden">
          Onboard millions of users with one simple SDK.
        </Title>
        <Title level={TitleLevel.Title3} className="sm:hidden">
          Onboard millions of users with one simple SDK.
        </Title>
      </div>
      <div
        className={classNames(
          'rounded-xl border transition-colors',
          theme === 'dark'
            ? 'border-dark-palette-line/50 bg-black'
            : 'border-dark-palette-line/50 bg-white',
        )}
      >
        <div
          className={`flex items-center justify-between border-b py-2 pl-6 pr-2 transition-colors ${
            theme === 'dark' ? 'border-dark-palette-line/50' : 'border-dark-palette-line/50'
          }`}
        >
          <div className="flex gap-12">
            {TABS.map((header) => {
              const isSelected = selectedTab === header;
              return (
                <button
                  className={isSelected ? 'text-white' : 'text-dark-palette-foregroundMuted'}
                  key={header}
                  onClick={handleClick(header)}
                  type="button"
                >
                  {header}
                </button>
              );
            })}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopy}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                theme === 'dark'
                  ? 'border-dark-palette-line/50 hover:bg-white/10'
                  : 'border-dark-palette-line/50 text-dark-palette-backgroundAlternate hover:bg-white/10',
              )}
            >
              {copied ? (
                <div className="text-green-60">
                  <Icon name="checkmark" color="currentColor" width={16} height={16} />
                </div>
              ) : (
                <Icon name="copy" color="currentColor" width={16} height={16} />
              )}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                theme === 'dark'
                  ? 'border-dark-palette-line/50 hover:bg-white/10'
                  : 'border-dark-palette-line/50 text-black hover:bg-white/10',
              )}
            >
              {theme === 'dark' ? (
                <Image src={sun as StaticImageData} alt="light mode" width={16} height={16} />
              ) : (
                <Image
                  src={moon as StaticImageData}
                  alt="dark mode"
                  width={16}
                  height={16}
                  className="invert-0 dark:invert"
                />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className={classNames(
              'h-[300px] p-8 lg:h-[500px] lg:p-12',
              'border-b lg:border-b-0 lg:border-r',
              'flex items-center justify-center transition-colors',
              'overflow-visible',
              theme === 'dark' ? 'border-dark-palette-line/50' : 'border-dark-palette-line/50',
            )}
          >
            <DynamicCryptoProviders>{component}</DynamicCryptoProviders>
          </div>
          <div className="h-[300px] py-6 pl-6 pr-1 lg:h-[500px]">
            <div className={`${theme} relative h-full`}>
              <CodeSnippet code={codeSnippet} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
