'use client';

/**
 * Ecosystem List Component
 *
 * Renders a grid of ecosystem app cards with animation support.
 * Handles empty states and "load more" pagination.
 */

import classNames from 'classnames';
import { AnimatePresence, motion, cubicBezier } from 'motion/react';
import EcosystemCard from './Card';
import type { DecoratedEcosystemApp } from 'apps/web/src/types/ecosystem';
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

/**
 * Animated wrapper for ecosystem cards with enter/exit transitions.
 */
function AnimatedEcosystemCard({ app }: { app: DecoratedEcosystemApp }) {
  return (
    <motion.div
      layout
      initial={cardAnimations.initial}
      animate={cardAnimations.animate}
      exit={cardAnimations.exit}
      transition={transition}
      className="col-span-full flex flex-col items-stretch justify-stretch md:col-span-1"
    >
      <EcosystemCard {...app} />
    </motion.div>
  );
}

/**
 * Props for the List component
 */
interface ListProps {
  /** Currently selected category filters */
  selectedCategories: string[];
  /** Current search query text */
  searchText: string;
  /** Filtered array of ecosystem apps to display */
  apps: DecoratedEcosystemApp[];
  /** Number of apps currently shown (for pagination) */
  showCount: number;
  /** Callback to update the show count */
  setShowCount: Dispatch<SetStateAction<number>>;
  /** Callback to clear the search query */
  onClearSearch: () => void;
}

/**
 * List component displays a paginated grid of ecosystem app cards.
 *
 * Features:
 * - Animated card grid with staggered transitions
 * - Empty state with helpful messaging
 * - "View more" pagination button
 * - Responsive grid layout (1-3 columns)
 */
export function List({
  selectedCategories,
  searchText,
  apps,
  showCount,
  setShowCount,
  onClearSearch,
}: ListProps) {
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
          'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
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
          <div className="col-span-full flex items-center gap-2 max-sm:flex-col max-sm:items-start">
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
