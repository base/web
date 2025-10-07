'use client';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import cx from 'classnames';

const copyText = 'npx create-onchain@latest';
const copyTextMinikit = 'npx create-onchain@latest --mini';

const ockDocsUrl = 'https://docs.base.org/onchainkit/getting-started';
const miniDocsUrl = 'https://docs.base.org/mini-apps/quickstart/migrate-existing-apps';

export function ExploreDocsButton({
  type = 'onchainkit',
  ctaLabel = 'Start building',
  url,
}: {
  type?: 'onchainkit' | 'minikit';
  ctaLabel?: string;
  url?: string;
}) {
  return (
    <Button
      variant={ButtonVariants.Primary}
      asChild
      className="w-full px-6 leading-none md:w-auto md:min-w-[280px]"
      size={ButtonSizes.Small}
    >
      <Link
        href={url ?? (type === 'onchainkit' ? ockDocsUrl : miniDocsUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel}
      </Link>
    </Button>
  );
}

export function CtaActions({ type = 'onchainkit' }: { type?: 'onchainkit' | 'minikit' }) {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isCopied) {
      timerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timerRef.current);
  }, [isCopied]);

  return (
    <div className="flex flex-col gap-2">
      {/** @ts-expect-error - CopyToClipboard is not a valid JSX element */}
      <CopyToClipboard
        text={type === 'onchainkit' ? copyText : copyTextMinikit}
        onCopy={() => setIsCopied(true)}
      >
        <Button
          variant={ButtonVariants.Secondary}
          size={ButtonSizes.Small}
          className={cx('w-full px-6 leading-none md:w-auto md:min-w-[310px]')}
        >
          {type === 'onchainkit' ? copyText : copyTextMinikit}
          <Icon name={isCopied ? 'checkmark' : 'copy'} width={16} height={16} />
        </Button>
      </CopyToClipboard>
      <ExploreDocsButton type={type} />
    </div>
  );
}

export function CtaFooterSection(props: Pick<ComponentProps<typeof CtaActions>, 'type'>) {
  return (
    <div className="flex flex-col gap-9 md:flex-row md:items-end md:gap-[140px]">
      <div className="flex max-w-[450px] flex-col gap-6">
        <div className="text-7xl leading-none tracking-[-2.56px]">What will you build?</div>
        <div className="text-2xl leading-[1.116] tracking-[-0.72px]">
          To start building, run the command in your terminal or explore documentation.
        </div>
      </div>
      <CtaActions {...props} />
    </div>
  );
}
