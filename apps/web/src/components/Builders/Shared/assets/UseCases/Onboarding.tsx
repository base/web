'use client';

import classNames from 'classnames';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import './styles.css';

export function AnimatedOnboarding() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const topRectangleRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - container.left,
      y: e.clientY - container.top,
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      },
    );

    if (topRectangleRef.current) {
      observer.observe(topRectangleRef.current);
    }

    return () => {
      if (topRectangleRef.current) {
        observer.unobserve(topRectangleRef.current);
      }
    };
  }, []);

  return (
    <div
      className={classNames('relative mx-auto w-full max-w-sm space-y-2')}
      onMouseMove={updateMousePosition}
    >
      <div
        ref={topRectangleRef}
        className={classNames(
          'relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-black',
          'transition-colors hover:before:opacity-100',
          'before:absolute before:inset-0',
          'before:opacity-0 before:transition-opacity',
          'before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]',
          isVisible && 'shimmer-effect',
        )}
        style={
          {
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex h-12 items-center justify-center gap-2 font-medium tracking-normal text-white">
          <Icon name="wallet" width={24} height={24} color="white" />
          Coinbase Wallet
        </div>
      </div>
      <div className="h-12 w-full rounded-xl bg-dark-state-s-hovered" />
      <div className="h-12 w-full rounded-xl bg-dark-state-s-hovered" />
    </div>
  );
}
