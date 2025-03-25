'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/BottomCta/CtaBanner';

export function BottomCta() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <CtaBanner
      title="What will you build?"
      description="To start building, run the command in your terminal, explore docs, or use llms.txt to build with AI."
      sectionClassName="my-24"
      cta={
        <>
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
            variant={ButtonVariants.SecondaryOutline}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group"
            target="_blank"
            href="https://docs.base.org"
            eventName="bottom-cta-documentation"
          >
            <div className="flex items-center justify-between gap-6">
              <span>Docs</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group"
            target="_blank"
            href="https://docs.base.org/llms.txt"
            eventName="bottom-cta-llms-txt"
          >
            <div className="flex items-center justify-between gap-6">
              <span>AI docs</span>
              <div className="transition-transform duration-200">
                <Icon name="ai" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </>
      }
    />
  );
}
