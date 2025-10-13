'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { ComponentPropsWithoutRef, useEffect, useMemo, useState } from 'react';

const animations = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, originY: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: 'spring', stiffness: 350, damping: 40 },
};

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export type AnimatedListProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
  delay?: number;
  isInView?: boolean;
};

export const AnimatedList = React.memo(
  ({ children, className, isInView = true, delay = 500, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    useEffect(() => {
      if (index < childrenArray.length - 1 && isInView) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length, isInView]);

    const itemsToShow = useMemo(() => {
      if (!isInView && index < childrenArray.length - 1) {
        return [];
      }
      const result = childrenArray.slice(0, index + 1);
      return result;
    }, [index, childrenArray, isInView]);

    return (
      <div className={`flex flex-col items-center gap-2 ${className}`} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = 'AnimatedList';
