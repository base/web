'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { CtaBanner as DefaultCtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const ONCHAINKIT_DOCS_LINK = 'https://docs.base.org/builderkits/onchainkit/getting-started';

export function CtaBanner() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <DefaultCtaBanner
      title="What will you build?"
      description="To start building, run the command in your terminal or explore documentation."
      cta={
        <>
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-lg bg-white px-4 pb-2.5 pt-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90"
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
            href={ONCHAINKIT_DOCS_LINK}
            target="_blank"
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 group font-medium"
            eventName="onchainkit-docs"
          >
            <div className="flex items-center justify-between gap-6">
              <span>Docs</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </>
      }
    />
  );
}
