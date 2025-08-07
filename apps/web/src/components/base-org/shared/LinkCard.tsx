'use client';

import Link from 'apps/web/src/components/Link';
import Image from 'next/image';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {
  href?: string;
  copyText?: string;
  title: string;
  actionCta: string;
  hoverImage?: string;
  imageClassName?: string;
};

export function LinkCard({ href, title, actionCta, hoverImage, imageClassName, copyText }: Props) {
  const isExternal = href?.startsWith('http');
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isCopied) {
      timerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isCopied]);
  const containerClassName =
    'group relative flex aspect-[373/247] flex-col gap-4 overflow-hidden rounded-[4px] bg-gray-80 px-6 py-[30px] transition-colors md:aspect-[326/407] md:rounded-lg md:bg-gray-90 md:hover:bg-gray-80';

  const content = (
    <>
      {hoverImage && (
        <Image
          src={hoverImage}
          alt={title}
          fill
          className={cx(
            'absolute inset-0 object-contain opacity-20 transition-opacity md:opacity-0 md:group-hover:opacity-20',
            imageClassName,
          )}
        />
      )}
      <div className="text-2xl leading-[1.3] tracking-[-0.48px]">{title}</div>
      <div className="absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between border-t border-t-[#D7D7D7] px-6 py-5">
        <div className="font-mono text-[15px] uppercase leading-[1.3] tracking-[0.3px]">
          {actionCta}
        </div>
        {copyText ? (
          <Icon name={isCopied ? 'checkmark' : 'copy'} width={20} height={20} />
        ) : (
          <div className="ml-auto text-2xl">{'/>'}</div>
        )}
      </div>
    </>
  );

  if (copyText) {
    return (
      // @ts-expect-error - CopyToClipboard is not a valid JSX element
      <CopyToClipboard text={copyText} onCopy={() => setIsCopied(true)}>
        <div className={containerClassName}>{content}</div>
      </CopyToClipboard>
    );
  }

  return (
    <Link
      href={href ?? ''}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={containerClassName}
    >
      {content}
    </Link>
  );
}
