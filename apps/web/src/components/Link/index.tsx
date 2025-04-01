'use client';
import { ActionType, ComponentType } from 'apps/web/src/utils/analytics/logEvent';
import NextLink, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, MouseEvent, useCallback } from 'react';
import { useAnalytics } from 'apps/web/contexts/Analytics';

type AnchorProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ children, onClick, ...props }: AnchorProps) {
  const { logEventWithContext } = useAnalytics();

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const target = event.currentTarget;

      try {
        const url = new URL(target.href);
        const { href, hostname, origin, pathname, search } = url;

        // Log event if eventName is defined
        logEventWithContext('link_clicked', ActionType.click, {
          componentType: ComponentType.link,
          href,
          hostname,
          origin,
          pathname,
          search,
        });
      } catch (error) {}

      // Default onClick event
      if (onClick) onClick(event);
    },
    [onClick, logEventWithContext],
  );

  return (
    <NextLink {...props} onClick={handleOnClick}>
      {children}
    </NextLink>
  );
}
