'use client';
import classNames from 'classnames';
import { AnimatePresence, motion, cubicBezier } from 'motion/react';
import EcosystemCard from './Card';
import { EcosystemApp } from 'apps/web/src/components/Ecosystem/Content';
import { Dispatch, SetStateAction, useCallback } from 'react';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { NotFoundScene } from 'apps/web/src/components/Ecosystem/NotFoundScene';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);
const transition = { duration: 0.24, ease: easeFn };

const cardAnimations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function AnimatedEcosystemCard({ app }: { app: EcosystemApp }) {
  return (
    <motion.div
      layout
      initial={cardAnimations.initial}
      animate={cardAnimations.animate}
      exit={cardAnimations.exit}
      transition={transition}
      className="flex flex-col col-span-full items-stretch justify-stretch md:col-span-1"
    >
      <EcosystemCard {...app} />
    </motion.div>
  );
}

export function List({
  selectedCategories,
  searchText,
  apps,
  showCount,
  setShowCount,
  onClearSearch,
}: {
  selectedCategories: string[];
  searchText: string;
  apps: EcosystemApp[];
  showCount: number;
  setShowCount: Dispatch<SetStateAction<number>>;
  onClearSearch: () => void;
}) {
  const canShowMore = showCount < apps.length;
  const showEmptyState = apps.length === 0;
  const truncatedApps = apps.slice(0, showCount);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowCount(showCount + 16);
    },
    [setShowCount, showCount],
  );

  return (
    <>
      <Container
        className={classNames(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8',
          showEmptyState && 'hidden',
        )}
      >
        <AnimatePresence mode="popLayout">
          {truncatedApps.map((app) => (
            <AnimatedEcosystemCard key={app.url} app={app} />
          ))}
        </AnimatePresence>
      </Container>
      {showEmptyState && (
        <div className="grid grid-cols-9 gap-5 pt-[106px]">
          <Title level={TitleLevel.H4Regular} className="col-span-full">
            No results found for &ldquo;
            {searchText === '' ? selectedCategories.join(', ') : searchText}
            &rdquo;
          </Title>
          <div className="flex col-span-full gap-2 items-center max-sm:flex-col max-sm:items-start">
            <Title level={TitleLevel.H6Regular}>Try searching for another term.</Title>
            <Button
              size={ButtonSizes.Small}
              variant={ButtonVariants.Secondary}
              className="px-4"
              onClick={onClearSearch}
            >
              Clear search
            </Button>
          </div>

          <div className="relative col-span-full aspect-square lg:col-span-6">
            <NotFoundScene />
          </div>
        </div>
      )}
      {canShowMore && (
        <div className="flex justify-center">
          <Button
            size={ButtonSizes.Small}
            variant={ButtonVariants.Secondary}
            className="px-4"
            onClick={onClick}
          >
            View more
          </Button>
        </div>
      )}
    </>
  );
}
