'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../../contexts/Analytics';
import { ResourceCardProps } from '../resourceTypes';

export default function ResourceCard({
  href,
  title,
  description,
  topLeft = null,
  topRight = null,
  classnames,
}: ResourceCardProps) {
  const { logEventWithContext } = useAnalytics();

  const resourceCardWrapperStyle = `
    group border-2 p-7 text-white
    duration-200
    hover:scale-105 hover:shadow-lg hover:shadow-gray-80
    ${classnames}
  `;

  const handleClick = useCallback(() => {
    logEventWithContext(title.replace(/ /g, '_').replace(/\W/g, ''), ActionType.click, {
      componentType: ComponentType.link,
    });
  }, [logEventWithContext, title]);

  return (
    <div key={href} className={resourceCardWrapperStyle}>
      <Link href={href} onClick={handleClick}>
        <div className="flex w-full flex-row justify-between">
          {topLeft}
          {topRight}
        </div>
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-lg uppercase sm:text-xl">{title}</h3>
          <p className="font-sans text-sm sm:text-base">{description}</p>
        </div>
      </Link>
    </div>
  );
}
