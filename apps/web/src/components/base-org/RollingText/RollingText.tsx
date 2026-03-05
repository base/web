'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'react';

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
  /** The initial text value */
  from: string;
  /** The target text value */
  to: string;
  /** Whether to show the 'to' text (true) or 'from' text (false) */
  active: boolean;
  /** Animation configuration */
  animation?: RollingTextAnimationConfig;
  /** Auto-revert to 'from' text after this many milliseconds */
  revertAfter?: number;
  /** Callback when auto-revert happens */
  onRevert?: () => void;
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
    fromRest[fromRest.length - 1 - suffixLen] ===
      toRest[toRest.length - 1 - suffixLen]
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
  isVisible: boolean;
  config: Required<RollingTextAnimationConfig>;
  totalLetters: number;
}

function AnimatedLetter({
  char,
  index,
  isVisible,
  config,
  totalLetters,
}: AnimatedLetterProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = config.direction === 'up' ? -ROLL_OFFSET_PX : ROLL_OFFSET_PX;

  const delay = isVisible
    ? config.baseDelay + index * config.staggerDelay
    : config.baseDelay + (totalLetters - 1 - index) * config.staggerDelay;

  if (shouldReduceMotion) {
    return (
      <span style={{ opacity: isVisible ? 1 : 0 }}>{renderChar(char)}</span>
    );
  }

  return (
    <motion.span
      initial={false}
      animate={{
        y: isVisible ? 0 : offset,
        opacity: isVisible ? 1 : 0,
        filter:
          config.blur && !isVisible
            ? `blur(${config.blurAmount}px)`
            : 'blur(0px)',
      }}
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
  isVisible: boolean;
  config: Required<RollingTextAnimationConfig>;
  keyPrefix: string;
}

function LetterGroup({
  letters,
  isVisible,
  config,
  keyPrefix,
}: LetterGroupProps) {
  return (
    <span
      style={{ position: 'absolute', left: 0, top: 0, display: 'inline-flex' }}
      aria-hidden={!isVisible}
    >
      {letters.map((char, i) => (
        <AnimatedLetter
          key={`${keyPrefix}-${i}`}
          char={char}
          index={i}
          isVisible={isVisible}
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
 * Automatically detects shared prefixes and suffixes between two strings,
 * keeping them static while animating only the differing characters.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RollingText from="Copy" to="Copied" active={copied} />
 *
 * // With auto-revert
 * <RollingText
 *   from="Copy"
 *   to="Copied"
 *   active={copied}
 *   revertAfter={1500}
 *   onRevert={() => setCopied(false)}
 * />
 * ```
 */
export function RollingText({
  from,
  to,
  active,
  animation,
  revertAfter,
  onRevert,
  className,
  testId = 'rolling-text',
}: RollingTextProps) {
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...animation }),
    [animation]
  );

  const { prefix, fromMiddle, toMiddle, suffix } = useMemo(
    () => computeTextDiff(from, to),
    [from, to]
  );

  const fromLetters = useMemo(() => fromMiddle.split(''), [fromMiddle]);
  const toLetters = useMemo(() => toMiddle.split(''), [toMiddle]);

  // Auto-revert logic
  const [internalActive, setInternalActive] = useState(active);

  const handleRevert = useCallback(() => {
    setInternalActive(false);
    onRevert?.();
  }, [onRevert]);

  useEffect(() => {
    setInternalActive(active);

    if (active && revertAfter != null && revertAfter > 0) {
      const timer = setTimeout(handleRevert, revertAfter);
      return () => clearTimeout(timer);
    }
  }, [active, revertAfter, handleRevert]);

  const isActive = revertAfter != null ? internalActive : active;

  // Width measurement
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<{ from: number; to: number } | null>(
    null
  );
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    const fromWidth = fromRef.current?.offsetWidth ?? 0;
    const toWidth = toRef.current?.offsetWidth ?? 0;
    setWidths({ from: fromWidth, to: toWidth });

    requestAnimationFrame(() => {
      hasAnimatedRef.current = true;
    });
  }, [fromMiddle, toMiddle]);

  const shouldReduceMotion = useReducedMotion();
  const currentWidth = widths ? (isActive ? widths.to : widths.from) : 'auto';
  const shouldAnimate = !shouldReduceMotion && hasAnimatedRef.current;

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
          shouldAnimate
            ? { duration: config.duration, ease: config.ease }
            : { duration: 0 }
        }
        style={{
          position: 'relative',
          display: 'inline-block',
          height: CONTAINER_HEIGHT,
          overflow: 'hidden',
          verticalAlign: 'text-bottom',
        }}
      >
        <MeasureSpan letters={fromLetters} measureRef={fromRef} />
        <MeasureSpan letters={toLetters} measureRef={toRef} />

        <LetterGroup
          letters={fromLetters}
          isVisible={!isActive}
          config={config}
          keyPrefix="from"
        />
        <LetterGroup
          letters={toLetters}
          isVisible={isActive}
          config={config}
          keyPrefix="to"
        />
      </motion.span>

      {suffix && <span data-testid={`${testId}-suffix`}>{suffix}</span>}
    </span>
  );
}
