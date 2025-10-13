'use client';

import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { AnimatedList } from 'apps/web/src/components/Builders/Shared/AnimatedList';
import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';

type ActionItem = {
  title: string;
};

const ACTIONS: ActionItem[] = [
  {
    title: 'Deploy an NFT',
  },
  {
    title: 'Deploy tokens',
  },
  {
    title: 'Transfer assets',
  },
  {
    title: 'Deposit via Morpho',
  },
  {
    title: 'Get wallet details',
  },
  {
    title: 'Get balances',
  },
  {
    title: 'Anything you can imagine',
  },
];

function Action({ title }: ActionItem) {
  return (
    <figure
      className={classNames(
        'relative mx-auto min-h-fit w-full overflow-hidden rounded-xl bg-dark-palette-backgroundAlternate px-6 py-5',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-lg">{title}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

export function OnchainActions({ className }: { className?: string }) {
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.2,
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex  min-h-[650px] w-full flex-col gap-10" ref={ref}>
      <div>
        <Title level={TitleLevel.Title1}>All onchain actions at your agent&apos;s fingertips</Title>
      </div>
      <div
        className={classNames(
          'bg-background relative flex w-full flex-col overflow-hidden',
          className,
        )}
      >
        <AnimatedList className="gap-3" isInView={isInView} delay={300}>
          {ACTIONS.map((item) => (
            <Action {...item} key={item.title} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
