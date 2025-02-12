'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function BottomCta() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <section className="my-24 w-full bg-black">
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16">
        <Title level={TitleLevel.Title1} as="h2">
          Together, we&apos;re updating the Internet with a new dev platform.
        </Title>
        <Title level={TitleLevel.Title4} as="p" className="mt-2">
          Start building with a starter template or see documentation.
        </Title>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-4 py-2 font-bold text-dark-palette-primaryForeground transition-colors hover:bg-white/90"
            onClick={handleCopy}
          >
            npm create onchain
            {hasCopied ? (
              <div className="text-green-60">
                <Icon name="checkmark" width="20" height="20" color="currentColor" />
              </div>
            ) : (
              <Icon name="copy" width="20" height="20" color="currentColor" />
            )}
          </button>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            iconName="arrowRight"
            iconSize="24"
            buttonClassNames="flex w-40 items-center justify-between px-4 py-3"
            href=""
            eventName="bottom-cta"
          >
            Documentation
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </section>
  );
}
