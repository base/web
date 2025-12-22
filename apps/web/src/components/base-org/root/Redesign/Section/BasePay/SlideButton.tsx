'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMotionValueEvent, useSpring } from 'framer-motion';
import clsx from 'classnames';

type SlideButtonProps = {
  text?: string;
  revealText?: string;
  finalText?: string;
  className?: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export default function SlideButton({
  text = 'Button',
  revealText = 'Button',
  finalText = 'Done',
  className,
}: SlideButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const [buttonWidth, setButtonWidth] = useState(0);
  const [handleWidth, setHandleWidth] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // progress in [0, 1]
  const [slideProgress, setSlideProgress] = useState(0);
  // Eased progress that follows slideProgress
  const slideProgressSpring = useSpring(0, { stiffness: 450, damping: 32, mass: 0.6 });
  const [animatedProgress, setAnimatedProgress] = useState(0);
  useEffect(() => {
    slideProgressSpring.set(slideProgress);
  }, [slideProgress, slideProgressSpring]);
  useMotionValueEvent(slideProgressSpring, 'change', (v) => {
    setAnimatedProgress(v as number);
  });

  useEffect(() => {
    const btn = buttonRef.current;
    const handle = handleRef.current;
    if (!btn || !handle) return;

    const resizeObserver = new ResizeObserver(() => {
      setButtonWidth(btn.clientWidth);
      setHandleWidth(handle.clientWidth);
    });
    resizeObserver.observe(btn);
    resizeObserver.observe(handle);
    // initialize sizes immediately
    setButtonWidth(btn.clientWidth);
    setHandleWidth(handle.clientWidth);
    return () => resizeObserver.disconnect();
  }, []);

  // Map progress∈[0,1] to pixels based on button width
  const progressToPx = useMemo(() => {
    return (progress: number) => clamp(progress * buttonWidth, 0, buttonWidth + handleWidth);
  }, [buttonWidth, handleWidth]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isMouseDown || !buttonRef.current) return;
      const { left, width } = buttonRef.current.getBoundingClientRect();
      const progress = (event.clientX - left) / (width + handleWidth);
      setSlideProgress(progress);
    },
    [handleWidth, isMouseDown],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const { left, width } = buttonRef.current.getBoundingClientRect();
      const progress = (event.clientX - left) / (width + handleWidth);
      setSlideProgress(progress);
      setIsMouseDown(true);
    },
    [handleWidth],
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runFinish = useCallback(() => {
    if (isFinished) return;
    setIsFinished(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsFinished(false);
      setSlideProgress(0);
    }, 2000);
  }, [isFinished]);

  const endDrag = useCallback(() => {
    setIsMouseDown(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Snap to end if past 50%, else reset to start
    setSlideProgress((p) => {
      const atEnd = p >= 0.2;
      if (atEnd) {
        // trigger finish state when released at the end
        setTimeout(() => {
          runFinish();
        }, 2000);
      }
      return atEnd ? 1 : 0;
    });
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // Derived styles using eased progress
  const revealTranslateX = clamp(progressToPx(animatedProgress), 0, buttonWidth + handleWidth + 2);
  const handleTranslateX = clamp(progressToPx(animatedProgress), 0, buttonWidth + handleWidth);
  const revealBarWidth = clamp((1 - animatedProgress) * buttonWidth, 0, buttonWidth + handleWidth);
  const revealTextOpacity = animatedProgress;

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseUp={endDrag}
      onMouseMove={handleMouseMove}
      onMouseLeave={endDrag}
      className={clsx(
        'group relative flex h-[2.5rem] w-full select-none items-center gap-2 overflow-hidden rounded-md bg-base-gray-50 p-0 text-white',
        className,
        animatedProgress >= 0.9 ? 'pointer-events-none' : '',
      )}
    >
      {/* Sliding reveal background and text */}
      <div
        className="absolute right-[calc(100%-4px)] top-0 z-20 flex h-full w-[calc(100%+4px)] items-end justify-end transition-colors duration-200"
        style={{
          transform: `translateX(${revealTranslateX}px)`,
          backgroundColor: isFinished ? '#66C800' : '#0000ff',
        }}
      >
        {/* Loader + text container, width scales with progress */}
        <div
          style={{ width: `${animatedProgress * buttonWidth}px` }}
          className="relative flex h-full w-[0px] items-center justify-center bg-black/0"
        >
          {/* Reveal text layer */}
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 ease-out"
            style={{
              opacity: isFinished ? 0 : revealTextOpacity,
              filter: isFinished ? 'blur(6px)' : `blur(${(1 - revealTextOpacity) * 8}px)`,
              transform: isFinished
                ? 'scale(0.9)'
                : `translateX(${(1 - revealTextOpacity) * 100}px) scale(1)`,
            }}
          >
            {!isFinished && (
              <span className="loader flex items-center justify-center">
                <svg
                  width="14px"
                  height="14px"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#ffffff"
                >
                  <path
                    d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            {revealText}
          </span>

          {/* Final text layer */}
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-out"
            style={{
              opacity: isFinished ? 1 : 0,
              filter: isFinished ? 'blur(0px)' : 'blur(6px)',
              transform: isFinished ? 'scale(1)' : 'scale(1.1)',
              transitionDelay: isFinished ? '50ms' : '0ms',
            }}
          >
            {finalText}
          </span>
        </div>
        <div
          style={{ width: `${revealBarWidth}px` }}
          className="z-30 flex h-full w-full gap-0 overflow-hidden"
        >
          <div className={clsx('h-full w-full bg-[#3C8AFF]')} />
          <div className="h-full w-full bg-[#77EA23]" />
          <div className="h-full w-full bg-[#FFD12F]" />
          <div className="h-full w-full bg-[#FFA306]" />
          <div className="h-full w-full bg-[#FC401F]" />
        </div>
      </div>

      {/* Handle */}
      <div
        ref={handleRef}
        style={{ transform: `translateX(${handleTranslateX}px)` }}
        className="z-20 flex origin-center items-center justify-center overflow-hidden"
      >
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] bg-black">
          →
        </div>
      </div>

      {/* Default button text */}
      <div className="z-0 flex-1 bg-base-gray-50 pr-4 text-center">
        <div
          style={{
            opacity: 1 - animatedProgress,
            filter: `blur(${animatedProgress * 8}px)`,
            transform: `translateX(${animatedProgress * 50}px)`,
          }}
          className="text-base-black"
        >
          {text}
        </div>
      </div>

      <style jsx>{`
        .loader {
          display: inline-block;
          transform-origin: center;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
