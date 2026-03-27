/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client';

import { stagger } from 'motion';
import { AnimationSequence, useAnimate } from 'motion/react';
import Link from 'apps/web/src/components/Link';
import { SVGProps, useRef, useCallback } from 'react';

export function SidebarLogo() {
  const [scope, animate] = useAnimate();
  const isAnimating = useRef(false);
  const firstTimelineCompleted = useRef(false);
  const secondTimelineRunning = useRef(false);
  const originalSquareOffsets = useRef<number[]>([]);
  const isHovering = useRef(false);
  const shouldPlaySecondSequence = useRef(false);

  const handleHover = useCallback(async () => {
    if (isAnimating.current || firstTimelineCompleted.current) return;

    const squares: HTMLDivElement[] = scope.current?.querySelectorAll('.square');
    if (!squares) return;

    isHovering.current = true;
    shouldPlaySecondSequence.current = false;
    isAnimating.current = true;

    try {
      const firstSquare = squares[0] as HTMLElement;
      const firstSquareRect = firstSquare.getBoundingClientRect();
      const squareOffsets = Array.from(squares).map((square) => {
        const squareElement = square as HTMLElement;
        const squareRect = squareElement.getBoundingClientRect();
        return squareRect.left - firstSquareRect.left;
      });

      // Store original offsets for later use in collapse
      originalSquareOffsets.current = [...squareOffsets];
      const scaleWrapper = scope.current;
      const svg = scope.current?.querySelector('#svg-square');
      const monoChars: HTMLSpanElement[] = scope.current?.querySelectorAll('.charmono');
      const normalChars = scope.current?.querySelectorAll('.char');
      const blockyGrids = scope.current?.querySelectorAll('.blockygrid');

      // === FIRST TIMELINE (PHASES 1-6) ===
      const firstSequence: AnimationSequence = [];

      // === PHASE 1: INITIAL SETUP (0s) ===
      // Make squares 2-4 visible immediately
      firstSequence.push([
        Array.from(squares).slice(1),
        { opacity: 1 },
        { duration: 0.001, at: 0 },
      ]);

      // === PHASE 2: SCALE AND MOVEMENT (0s-0.5s) ===
      // Scale wrapper down
      if (scaleWrapper) {
        firstSequence.push([
          scaleWrapper,
          { scale: 0.6, transformOrigin: 'left bottom' },
          { duration: 0.4, ease: [0.4, 0, 0.2, 1], at: 0 },
        ]);
      }

      // Squares moving into position
      Array.from(squares).forEach((square, index) => {
        const offsetFromFirst = squareOffsets[index];
        firstSequence.push([
          square,
          { x: [-offsetFromFirst, 0] },
          {
            type: 'spring',
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            at: index * 0.05,
          },
        ]);
      });

      // SVG scale
      if (svg) {
        firstSequence.push([
          svg,
          { scaleY: [0, 1] },
          {
            type: 'spring',
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            at: 0.11,
          },
        ]);
      }

      // === PHASE 3: MONO CHARS APPEAR (0.5s) ===
      if (monoChars) {
        Array.from(monoChars).forEach((char, index) => {
          firstSequence.push([
            char,
            { opacity: [0, 1] },
            {
              duration: 0.03,
              at: 0.5 + index * 0.05,
            },
          ]);
        });
      }

      // === PHASE 4: GRID ANIMATIONS (0.5s-1.5s) ===
      if (blockyGrids) {
        Array.from(blockyGrids as NodeListOf<Element>).forEach((grid, gridIndex) => {
          const gridChildren = grid.querySelectorAll('.bg-base-blue');
          const gridDelay = gridIndex * 0.05;

          // Grid appear with stagger (fill from top to bottom) - using stagger function
          firstSequence.push([
            gridChildren,
            { opacity: [0, 1] },
            {
              duration: 0.001,
              delay: stagger(0.001, { startDelay: gridDelay }),
              at: 0,
            },
          ]);

          // Grid disappear with stagger
          firstSequence.push([
            gridChildren,
            { opacity: [1, 0] },
            {
              duration: 0.005,
              delay: stagger(0.008, { startDelay: gridDelay + 1 }),
              at: 0,
            },
          ]);
        });
      }

      // === PHASE 5: SQUARES DISAPPEAR (0.9s) ===
      Array.from(squares).forEach((square, index) => {
        firstSequence.push([
          square,
          { opacity: [1, 0] },
          {
            duration: 0.001,
            at: 0.9 + index * 0.05,
          },
        ]);
      });

      // === PHASE 6: CHAR TRANSITIONS (1.2s) ===
      const charOrder = [2, 0, 3, 1];
      const monoStartDelay = 1.2;
      const charInterval = 0.04;

      charOrder.forEach((charIndex, orderIndex) => {
        const charTime = monoStartDelay + orderIndex * charInterval;

        // Hide mono char
        if (monoChars?.[charIndex]) {
          firstSequence.push([
            monoChars[charIndex],
            { opacity: [1, 0] },
            {
              duration: 0.0001,
              at: charTime,
            },
          ]);
        }

        // Show normal char
        if (normalChars?.[charIndex]) {
          firstSequence.push([
            normalChars[charIndex],
            { opacity: 1 },
            {
              duration: 0.0001,
              at: charTime,
            },
          ]);
        }
      });

      firstSequence.push([
        normalChars,
        { opacity: 1 },
        {
          duration: 0.5,
          at: 1.8,
        },
      ]);

      // execute first timeline
      await animate(firstSequence, { duration: 1.6 });
      firstTimelineCompleted.current = true;

      // If user has hovered out while animation was playing, start second sequence
      if (shouldPlaySecondSequence.current && !isHovering.current) {
        shouldPlaySecondSequence.current = false;
        setTimeout(() => {
          void handleMouseOut();
        }, 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isAnimating.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, scope]);

  const handleMouseOut = useCallback(async () => {
    isHovering.current = false;

    // If first timeline is still running, mark that we should play second sequence when it completes
    if (isAnimating.current && !firstTimelineCompleted.current) {
      shouldPlaySecondSequence.current = true;
      return;
    }

    if (!firstTimelineCompleted.current || secondTimelineRunning.current) return;

    const squares: HTMLDivElement[] = scope.current?.querySelectorAll('.square');
    if (!squares) return;

    secondTimelineRunning.current = true;

    try {
      const scaleWrapper = scope.current;
      const svg = scope.current?.querySelector('#svg-square');
      const monoChars: HTMLSpanElement[] = scope.current?.querySelectorAll('.charmono');
      const blockyGrids = scope.current?.querySelectorAll('.blockygrid');

      // === SECOND TIMELINE (PHASES 7-10) ===
      const secondSequence: AnimationSequence = [];

      // === PHASE 7: LETTER REMOVAL AND GRID SHUFFLE (0s) ===
      const letterIndices = [1, 3, 0, 2];
      const letterRemovalTime = 0;

      letterIndices.forEach((letterIndex, seqIndex) => {
        const currentTime = letterRemovalTime + seqIndex * 0.04;

        // Show specific mono char
        if (monoChars?.[letterIndex]) {
          secondSequence.push([
            monoChars[letterIndex],
            { opacity: [0, 1] },
            {
              duration: 0.001,
              at: currentTime,
            },
          ]);
        }

        // Remove letter
        const letterElement = scope.current?.querySelector(`.char:nth-child(${letterIndex + 1})`);
        if (letterElement) {
          secondSequence.push([
            letterElement,
            { opacity: [1, 0] },
            {
              duration: 0.001,
              at: currentTime + 0.001,
            },
          ]);
        }

        // Grid shuffle
        if (blockyGrids?.[letterIndex]) {
          const grid = blockyGrids[letterIndex] as Element;
          const gridChildren = grid.querySelectorAll('.bg-base-blue');

          Array.from(gridChildren).forEach((child, childIndex) => {
            // Reset grid to invisible first
            secondSequence.push([
              child,
              { opacity: 0 },
              {
                duration: 0.001,
                at: currentTime + 0.001,
              },
            ]);

            // First shuffle wave - fade in from top to bottom
            secondSequence.push([
              child,
              { opacity: [0, 1] },
              {
                duration: 0.02,
                at: currentTime + 0.05 + childIndex * 0.008,
              },
            ]);

            // Second shuffle wave - wave effect (fade out then back in)
            secondSequence.push([
              child,
              { opacity: [1, 0, 1] },
              {
                duration: 0.1,
                at: currentTime + 0.55 + childIndex * 0.01,
              },
            ]);

            // Final fade out for this grid
            secondSequence.push([
              child,
              { opacity: [1, 0] },
              {
                duration: 0.001,
                at: currentTime + 0.5,
              },
            ]);
          });
        }
      });

      // === PHASE 8: SQUARES RETURN (0.36s) ===
      const squareIndices = [2, 0, 3, 1];
      squareIndices.forEach((squareIndex, seqIndex) => {
        if (squares[squareIndex]) {
          secondSequence.push([
            squares[squareIndex],
            { opacity: [0, 1] },
            {
              duration: 0.001,
              at: 0.36 + seqIndex * 0.03,
            },
          ]);
        }
      });

      // === PHASE 9: CLEANUP (0.6s) ===
      // Hide mono chars (grids are already handled in Phase 7)
      if (monoChars) {
        Array.from(monoChars).forEach((char) => {
          secondSequence.push([
            char,
            { opacity: [1, 0] },
            {
              duration: 0.001,
              at: 0.6,
            },
          ]);
        });
      }

      // === PHASE 10: COLLAPSE AND RESET (0.8s) ===
      // Collapse squares using original offsets
      Array.from(squares)
        .slice(1)
        .forEach((square, index) => {
          const originalOffset = originalSquareOffsets.current[index + 1];
          secondSequence.push([
            square,
            { x: [0, -originalOffset] },
            {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              at: 0.8,
            },
          ]);
        });

      // SVG scale down
      if (svg) {
        secondSequence.push([
          svg,
          { scaleY: [1, 0] },
          {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            at: 0.8,
          },
        ]);
      }

      // scale wrapper back
      if (scaleWrapper) {
        secondSequence.push([
          scaleWrapper,
          { scale: 1, transformOrigin: 'left bottom' },
          {
            type: 'spring',
            bounce: 0.5,
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
            at: 1.05,
          },
        ]);
      }

      // hide extra squares
      secondSequence.push([
        Array.from(squares).slice(1),
        { opacity: [1, 0] },
        {
          duration: 0.0001,
          at: 1.8,
        },
      ]);

      secondSequence.push([squares, { x: 0 }, { duration: 0.001, at: 1.9 }]);

      // execute second timeline
      await animate(secondSequence, { duration: 1.2 });
    } catch (error) {
      console.error(error);
    } finally {
      secondTimelineRunning.current = false;
      firstTimelineCompleted.current = false;
    }
  }, [animate, scope]);

  const onMouseEnter = useCallback(() => void handleHover(), [handleHover]);
  const onMouseLeave = useCallback(() => void handleMouseOut(), [handleMouseOut]);

  return (
    <div className="relative">
      <Link
        href="/"
        aria-label="go home"
        id="logo-link"
        className="absolute inset-0 z-50 h-[60px] w-[65px] hover:w-[150px]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <div className="scale-wrapper relative" ref={scope}>
        <Logo />
      </div>
    </div>
  );
}

const createGrid = () => {
  return Array.from({ length: 25 }, (_, index) => (
    <div
      key={index}
      className="aspect-square bg-base-blue transition-colors will-change-transform dark:bg-white"
    />
  ));
};

function Logo() {
  return (
    <div className="relative z-30 flex h-[60px] items-center justify-start gap-2 will-change-transform">
      <div className="square relative aspect-square h-full w-auto text-[#0000FF] transition-colors dark:text-white">
        <LogoSVG
          id="svg-square"
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-[140%] w-auto"
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          style={{ transform: 'scaleY(0)' }}
        />
        <span className="absolute bottom-0 left-0 block aspect-square h-full w-auto rounded-md bg-base-blue transition-colors will-change-transform dark:bg-white" />
      </div>
      <div className="square flex aspect-square h-full items-center justify-center rounded-md bg-base-blue opacity-0 transition-colors dark:bg-white" />
      <div className="square flex aspect-square h-full items-center justify-center rounded-md bg-base-blue opacity-0 transition-colors dark:bg-white" />
      <div className="square flex aspect-square h-full items-center justify-center rounded-md bg-base-blue opacity-0 transition-colors dark:bg-white" />

      {/* mono */}
      <div className="pointer-events-none absolute bottom-[18%] left-0 flex h-full w-full items-center gap-0.5 font-doto text-7xl leading-[70%] tracking-tight text-base-blue transition-colors sm:text-8xl md:text-9xl lg:text-[115px] dark:text-white">
        {'base'.split('').map((char, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index} className="charmono relative block select-none font-bold opacity-0">
            {char}
            <div className="blockygrid absolute bottom-[1.2%] left-[1%] grid w-[85%] grid-cols-5 grid-rows-5 gap-[0.16rem]">
              {createGrid()}
            </div>
          </span>
        ))}
      </div>

      {/* normal */}
      <div className="pointer-events-none absolute bottom-3 left-0 flex h-full w-full select-none items-center font-sans text-7xl font-medium leading-[70%] tracking-[-0.01em] text-base-blue transition-colors duration-150 sm:text-8xl md:text-9xl lg:text-[110px] dark:text-white">
        <span className="char block opacity-0">b</span>
        <span className="char block opacity-0">a</span>
        <span className="char block opacity-0">s</span>
        <span className="char block opacity-0">e</span>
      </div>
    </div>
  );
}

function LogoSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="664"
      height="218"
      viewBox="0 0 664 218"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.786503 5.13191C0 6.74052 0 8.83171 0 13.0141V204.98C0 209.162 0 211.253 0.786503 212.862C1.53955 214.402 2.78253 215.648 4.31969 216.402C5.92514 217.19 8.01222 217.19 12.1864 217.19H142.072C146.246 217.19 148.333 217.19 149.938 216.402C151.475 215.648 152.718 214.402 153.471 212.862C154.258 211.253 154.258 209.162 154.258 204.98V74.8388C154.258 70.6564 154.258 68.5652 153.471 66.9566C152.718 65.4164 151.475 64.171 149.938 63.4164C148.333 62.6284 146.246 62.6284 142.072 62.6284H73.8896C69.7154 62.6284 67.6283 62.6284 66.0229 61.8403C64.4857 61.0858 63.2427 59.8404 62.4897 58.3002C61.7032 56.6916 61.7032 54.6004 61.7032 50.418V13.0141C61.7032 8.83171 61.7032 6.74052 60.9167 5.13191C60.1636 3.59172 58.9206 2.34629 57.3835 1.59176C55.778 0.803711 53.691 0.803711 49.5168 0.803711H12.1864C8.01222 0.803711 5.92514 0.803711 4.31969 1.59176C2.78253 2.34629 1.53955 3.59172 0.786503 5.13191Z"
        fill="currentColor"
      />
    </svg>
  );
}
