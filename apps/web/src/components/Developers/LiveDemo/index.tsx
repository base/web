'use client';

// import { WalletAdvancedDefault } from '@coinbase/onchainkit/wallet';
// import { Buy } from '@coinbase/onchainkit/buy';
import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';
import { SwapDefault } from '@coinbase/onchainkit/swap';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createHighlighter } from 'shiki';
import sun from './assets/sun.svg';
import moon from './assets/moon.svg';
import Image, { StaticImageData } from 'next/image';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import type { Token } from '@coinbase/onchainkit/token';

type Tab = 'onboard' | 'onramp' | 'pay' | 'swap' | 'earn';

const degenToken: Token[] = [
  {
    name: 'DEGEN',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    symbol: 'DEGEN',
    decimals: 18,
    image:
      'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 8453,
  },
];

const ethToken: Token[] = [
  {
    name: 'ETH',
    address: '',
    symbol: 'ETH',
    decimals: 18,
    image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
    chainId: 8453,
  },
];

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

const codeSnippets = {
  onboard: `import {
  WalletAdvancedDefault,
} from '@coinbase/onchainkit/wallet';

function WalletAdvancedDefaultDemo() {
  return <WalletAdvancedDefault />
}`,
  onramp: `import { Buy } from '@coinbase/onchainkit/buy';
import type { Token } from '@coinbase/onchainkit/token';

function BuyDemo() {
  const degenToken: Token = {
    name: 'DEGEN',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    symbol: 'DEGEN',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 8453,
  };

  return (
    <Buy toToken={degenToken} />
  );
}`,
  pay: `import {
  Checkout,
  CheckoutButton,
} from '@coinbase/onchainkit/checkout';

function CheckoutDemo() {
  return (
    <Checkout productId='my-product-id'>
      <CheckoutButton coinbaseBranded={true}/>
    </Checkout>
  )
}`,
  swap: `import { SwapDefault } from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';

function SwapDemo() {
  const { address } = useAccount();
  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: "",
  };

  const degenToken: Token[] = [{
    name: 'DEGEN',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    symbol: 'DEGEN',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 8453,
  }];

  const swappableTokens: Token[] = [ETHToken, USDCToken];

  return (
    <SwapDefault
      from={swappableTokens}
      to={swappableTokens}
    />
  )
}`,
  earn: `import { Earn } from '@coinbase/onchainkit/earn';

function EarnDemo() {
  return <Earn />;
}`,
};

export function LiveDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('onboard');
  const [copied, setCopied] = useState(false);

  const buttonClasses = useMemo(
    () => ({
      active: theme === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
      inactive:
        theme === 'dark'
          ? 'text-dark-palette-foregroundMuted hover:text-white'
          : 'text-dark-gray-50 hover:text-dark-palette-backgroundAlternate',
    }),
    [theme],
  );

  const demoComponent = useMemo(() => {
    if (!isMounted) {
      return null;
    }

    switch (activeTab) {
      case 'onboard':
        return <div>WalletAdvancedDefault</div>;
      // return <WalletAdvancedDefault />;
      case 'onramp':
        return <div>Buy</div>;
      // return <Buy toToken={degenToken} />;
      case 'pay':
        return (
          <Checkout productId="my-product-id">
            <CheckoutButton coinbaseBranded />
          </Checkout>
        );
      case 'swap':
        return <SwapDefault to={degenToken} from={ethToken} />;
      case 'earn':
        return <div>Earn yield</div>;
      default:
        return null;
    }
  }, [isMounted, activeTab]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    async function highlightCode() {
      const highlighter = await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['typescript'],
      });

      const code = highlighter.codeToHtml(codeSnippets[activeTab], {
        lang: 'typescript',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
      });

      // Remove Shiki formatting
      const cleanedCode = code.replace(
        /<pre[^>]*class="([^"]*)"[^>]*>/,
        (_match: string, className: string) =>
          `<pre class="${className}" style="margin: 0; padding: 0; background: transparent">`,
      );

      setHighlightedCode(cleanedCode);
    }

    void highlightCode();
  }, [isMounted, activeTab]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

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
        <Title level={TitleLevel.Title1}>Try it out!</Title>
        <Title level={TitleLevel.Title1} className="text-dark-palette-foregroundMuted">
          Experience how easy it is to build on Base.
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
          <div className="no-scrollbar flex items-center space-x-8 overflow-x-auto">
            <div className="flex space-x-8 px-1">
              <button
                type="button"
                onClick={() => setActiveTab('onboard')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  activeTab === 'onboard' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('onramp')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  activeTab === 'onramp' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Onramp
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pay')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  activeTab === 'pay' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Pay
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('swap')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  activeTab === 'swap' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Swap
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('earn')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  activeTab === 'earn' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Earn yield
              </button>
            </div>
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
                  : 'border-dark-palette-line/50 hover:bg-white/10',
              )}
            >
              {theme === 'dark' ? (
                <Image src={sun as StaticImageData} alt="light mode" width={16} height={16} />
              ) : (
                <Image src={moon as StaticImageData} alt="dark mode" width={16} height={16} />
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
            <DynamicCryptoProviders>{demoComponent}</DynamicCryptoProviders>
          </div>
          <div className="h-[300px] py-6 pl-6 pr-1 lg:h-[500px]">
            <div className={`${theme} relative h-full`}>
              {highlightedCode ? (
                <div
                  className="code-snippet h-full overflow-auto rounded-lg transition-colors"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              ) : (
                <div className="h-full overflow-auto rounded-lg transition-colors">
                  <div className="text-neutral-400">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
