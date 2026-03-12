'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface RollingTextAnimationConfig {
  /** Duration of the roll animation in seconds. @default 0.4 */
  duration?: number;
  /** Stagger delay between each letter in seconds. @default 0.04 */
  staggerDelay?: number;
  /** Base delay before animation starts in seconds. @default 0 */
  baseDelay?: number;
  /** Cubic bezier easing curve. @default [0.4, 0, 0.2, 1] */
  ease?: [number, number, number, number];
  /** Direction of the roll animation. @default 'up' */
  direction?: 'up' | 'down';
  /** Whether to apply blur effect to animating letters. @default true */
  blur?: boolean;
  /** Blur amount in pixels when letter is transitioning. @default 4 */
  blurAmount?: number;
}

export interface RollingTextProps {
  /** The text to display. When this value changes, the component animates from the previous value to the new one. */
  text: string;
  /** Animation configuration */
  animation?: RollingTextAnimationConfig;
  /** Additional className for the container */
  className?: string;
  /** Test ID for testing. @default 'rolling-text' */
  testId?: string;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_CONFIG: Required<RollingTextAnimationConfig> = {
  duration: 0.4,
  staggerDelay: 0.04,
  baseDelay: 0,
  ease: [0.4, 0, 0.2, 1],
  direction: 'up',
  blur: true,
  blurAmount: 4,
};

const ROLL_OFFSET_PX = 20;
const CONTAINER_HEIGHT = '1.4em';

// ============================================================================
// Utilities
// ============================================================================

interface TextDiff {
  prefix: string;
  fromMiddle: string;
  toMiddle: string;
  suffix: string;
}

function computeTextDiff(from: string, to: string): TextDiff {
  let prefixLen = 0;
  const minLen = Math.min(from.length, to.length);

  while (prefixLen < minLen && from[prefixLen] === to[prefixLen]) {
    prefixLen++;
  }

  const prefix = from.slice(0, prefixLen);
  const fromRest = from.slice(prefixLen);
  const toRest = to.slice(prefixLen);

  let suffixLen = 0;
  const minRestLen = Math.min(fromRest.length, toRest.length);

  while (
    suffixLen < minRestLen &&
    fromRest[fromRest.length - 1 - suffixLen] === toRest[toRest.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  return {
    prefix,
    fromMiddle: suffixLen > 0 ? fromRest.slice(0, -suffixLen) : fromRest,
    toMiddle: suffixLen > 0 ? toRest.slice(0, -suffixLen) : toRest,
    suffix: suffixLen > 0 ? fromRest.slice(-suffixLen) : '',
  };
}

function renderChar(char: string): string {
  return char === ' ' ? '\u00A0' : char;
}

// ============================================================================
// Components
// ============================================================================

interface AnimatedLetterProps {
  char: string;
  index: number;
  entering: boolean;
  config: Required<RollingTextAnimationConfig>;
  totalLetters: number;
}

function AnimatedLetter({ char, index, entering, config, totalLetters }: AnimatedLetterProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = config.direction === 'up' ? -ROLL_OFFSET_PX : ROLL_OFFSET_PX;

  const delay = config.baseDelay + index * config.staggerDelay;

  if (shouldReduceMotion) {
    return <span style={{ opacity: entering ? 1 : 0 }}>{renderChar(char)}</span>;
  }

  const blurValue = config.blur ? `blur(${config.blurAmount}px)` : 'blur(0px)';

  return (
    <motion.span
      initial={
        entering
          ? { y: -offset, opacity: 0, filter: blurValue }
          : { y: 0, opacity: 1, filter: 'blur(0px)' }
      }
      animate={
        entering
          ? { y: 0, opacity: 1, filter: 'blur(0px)' }
          : { y: offset, opacity: 0, filter: blurValue }
      }
      transition={{ duration: config.duration, delay, ease: config.ease }}
      style={{ display: 'inline-block' }}
    >
      {renderChar(char)}
    </motion.span>
  );
}

interface MeasureSpanProps {
  letters: string[];
  measureRef: React.RefObject<HTMLSpanElement>;
}

function MeasureSpan({ letters, measureRef }: MeasureSpanProps) {
  return (
    <span
      ref={measureRef}
      aria-hidden
      style={{
        position: 'absolute',
        visibility: 'hidden',
        display: 'inline-flex',
        pointerEvents: 'none',
      }}
    >
      {letters.map((char, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          {renderChar(char)}
        </span>
      ))}
    </span>
  );
}

interface LetterGroupProps {
  letters: string[];
  entering: boolean;
  config: Required<RollingTextAnimationConfig>;
}

function LetterGroup({ letters, entering, config }: LetterGroupProps) {
  return (
    <span
      style={{ position: 'absolute', left: 0, top: 0, display: 'inline-flex' }}
      aria-hidden={!entering}
    >
      {letters.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          index={i}
          entering={entering}
          config={config}
          totalLetters={letters.length}
        />
      ))}
    </span>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * RollingText - Animated text transition with rolling letters.
 *
 * Accepts a single `text` prop and animates from the previous value when it changes.
 * Automatically detects shared prefixes and suffixes, keeping them static while
 * animating only the differing characters. Supports any number of sequential
 * changes (e.g. "Buy" → "Buying" → "Bought").
 *
 * @example
 * ```tsx
 * <RollingText text={isLoading ? "Buying" : "Buy"} />
 * <RollingText text={status} /> // status: "Buy" | "Buying" | "Bought"
 * ```
 */
export function RollingTextUpdate({
  text,
  animation,
  className,
  testId = 'rolling-text',
}: RollingTextProps) {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...animation }), [animation]);

  const [committedText, setCommittedText] = useState(text);

  const from = committedText;
  const to = text;
  const isAnimating = from !== to;

  const { prefix, fromMiddle, toMiddle, suffix } = useMemo(
    () => computeTextDiff(from, to),
    [from, to],
  );

  const fromLetters = useMemo(() => fromMiddle.split(''), [fromMiddle]);
  const toLetters = useMemo(() => toMiddle.split(''), [toMiddle]);

  useEffect(() => {
    if (!isAnimating) return;

    const maxLetters = Math.max(fromLetters.length, toLetters.length);
    const lastIndex = Math.max(0, maxLetters - 1);
    const totalMs = (config.baseDelay + lastIndex * config.staggerDelay + config.duration) * 1000;

    const rollingTextTimer = setTimeout(() => {
      setCommittedText(to);
    }, totalMs + 50);

    return () => clearTimeout(rollingTextTimer);
  }, [
    isAnimating,
    to,
    fromLetters.length,
    toLetters.length,
    config.baseDelay,
    config.staggerDelay,
    config.duration,
  ]);

  // Width: snap to `from` width immediately, then animate to `to` width after paint
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const [widthAnim, setWidthAnim] = useState({ width: 0, animate: false });

  useLayoutEffect(() => {
    const fromWidth = fromRef.current?.offsetWidth ?? 0;
    const toWidth = toRef.current?.offsetWidth ?? 0;
    setWidthAnim({ width: fromWidth, animate: false });

    const frame = requestAnimationFrame(() => {
      setWidthAnim({ width: toWidth, animate: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [fromMiddle, toMiddle]);

  const shouldReduceMotion = useReducedMotion();
  const currentWidth = widthAnim.width;
  const shouldAnimate = !shouldReduceMotion && widthAnim.animate;

  const transitionKey = `${from}\u2192${to}`;

  return (
    <span
      className={className}
      data-testid={testId}
      style={{
        position: 'relative',
        display: 'inline-flex',
        whiteSpace: 'nowrap',
      }}
    >
      {prefix && <span data-testid={`${testId}-prefix`}>{prefix}</span>}

      <motion.span
        initial={false}
        animate={{ width: currentWidth }}
        transition={
          shouldAnimate ? { duration: config.duration, ease: config.ease } : { duration: 0 }
        }
        style={{
          position: 'relative',
          display: 'inline-block',
          height: CONTAINER_HEIGHT,
          overflow: 'visible',
          verticalAlign: 'text-bottom',
        }}
      >
        <MeasureSpan letters={fromLetters} measureRef={fromRef} />
        <MeasureSpan letters={toLetters} measureRef={toRef} />

        {isAnimating && (
          <>
            <LetterGroup
              key={`from-${transitionKey}`}
              letters={fromLetters}
              entering={false}
              config={config}
            />
            <LetterGroup
              key={`to-${transitionKey}`}
              letters={toLetters}
              entering={true}
              config={config}
            />
          </>
        )}
      </motion.span>

      {suffix && <span data-testid={`${testId}-suffix`}>{suffix}</span>}
    </span>
  );
}
