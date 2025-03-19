'use client';

import { useState, useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

const SMART_WALLET_DOCS_LINK =
  'https://docs.base.org/identity/smart-wallet/introduction/getting-started';

export function CopyNpmButton() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <div className="flex w-full gap-4 max-sm:flex-col max-sm:items-center">
      <button
        type="button"
        className="inline-flex items-center gap-2.5 rounded-lg bg-white px-4 pb-3 pt-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90"
        onClick={handleCopy}
      >
        npm create onchain
        {hasCopied ? (
          <div className="text-green-60">
            <Icon name="checkmark" width="16" height="16" color="currentColor" />
          </div>
        ) : (
          <Icon name="copy" width="16" height="16" color="currentColor" />
        )}
      </button>
      <ButtonWithLinkAndEventLogging
        href={SMART_WALLET_DOCS_LINK}
        target="_blank"
        variant={ButtonVariants.SecondaryOutline}
        buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
        eventName="wallet-docs"
      >
        <div className="flex items-center justify-between gap-6">
          <span>Docs</span>
          <div className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrowRight" width={16} height={16} color="white" />
          </div>
        </div>
      </ButtonWithLinkAndEventLogging>
    </div>
  );
}
