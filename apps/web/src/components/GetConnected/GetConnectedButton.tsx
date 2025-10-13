'use client';

import { useCallback } from 'react';
import Link from 'apps/web/node_modules/next/link';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../contexts/Analytics';
import { Icon } from '../Icon/Icon';

type GetConnectedButtonProps = {
  iconName: string;
  href: string;
  eventName: string;
  title: string;
  ariaLabel?: string;
};

export default function GetConnectedButton({
  iconName,
  href,
  eventName,
  title,
  ariaLabel,
}: GetConnectedButtonProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, { componentType: ComponentType.icon });
  }, [logEventWithContext, eventName]);

  return (
    <div className="h-full w-full rounded-full border border-white p-5 lg:h-[90px] lg:w-[90px]">
      <Link
        href={href}
        title={title}
        aria-label={ariaLabel ?? title}
        target="_blank"
        rel="noreferrer noopener"
        onClick={handleClick}
      >
        <Icon name={iconName} width="100%" height="100%" />
      </Link>
    </div>
  );
}
