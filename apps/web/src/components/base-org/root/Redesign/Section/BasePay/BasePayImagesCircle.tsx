'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'motion/react';
import './BasePayStyle.css';
import classNames from 'classnames';

import BallImage from './images/ball.webp';
import BikeImage from './images/bike2.webp';
import ChairImage from './images/chair.webp';
import DeskImage from './images/desk.webp';
import GuitarImage from './images/guitar.webp';
import HammerImage from './images/tennis.webp';
import HeadphonesImage from './images/headphones2.webp';
import LampImage from './images/lamp.webp';
import PerfumeImage from './images/perfume.webp';
import ShoeImage from './images/shoe-l.webp';
import SoapImage from './images/soap2.webp';
import SpeakerImage from './images/speaker2.webp';
import TvImage from './images/tv.webp';
import WatchImage from './images/watch.webp';
import { BasePayDialog } from './BasePayDialog';

const stickers: { image: string; alt: string; color: string; hidden?: boolean }[] = [
  { image: BallImage.src, alt: 'Ball', color: '#FFDCC3' },
  { image: BikeImage.src, alt: 'Bike', color: '#C0C4FF' },
  { image: ChairImage.src, alt: 'Chair', color: '#D4FFA5' },
  { image: DeskImage.src, alt: 'Desk', color: '#F7FBFF' },
  { image: GuitarImage.src, alt: 'Guitar', color: '#FFD5C7' },
  { image: HammerImage.src, alt: 'Hammer', color: '#BEF1DF' },
  { image: HeadphonesImage.src, alt: 'Headphones', color: '#FFBCBC' },
  { image: LampImage.src, alt: 'Lamp', color: '#FFB485' },
  { image: PerfumeImage.src, alt: 'Perfume', hidden: true, color: '#CC99FF' },
  { image: ShoeImage.src, alt: 'Shoe', color: '#94C3FF' },
  { image: SoapImage.src, alt: 'Soap', hidden: true, color: '#000fff' },
  { image: SpeakerImage.src, alt: 'Speaker', color: '#BBDAFF' },
  { image: TvImage.src, alt: 'TV', hidden: true, color: '#000fff' },
  { image: WatchImage.src, alt: 'Watch', hidden: true, color: '#000fff' },
];

// Computed once at module level so it's available for hook initialization.
const visibleStickers = stickers.filter((s) => !s.hidden);

type StickerItemProps = {
  sticker: { image: string; alt: string; color: string };
  angle: number;
  orbitRadius: number;
  stickerSize: number;
  rotationMV: MotionValue<number>;
  isActive: boolean;
  tickIntervalMs: number;
  /** Fraction of tickIntervalMs to stay frozen before preemptively returning. Default 0.6 */
  freezeFraction?: number;
};

function StickerItem({
  sticker,
  angle,
  orbitRadius,
  stickerSize,
  rotationMV,
  isActive,
  tickIntervalMs,
  freezeFraction = 0.7,
}: StickerItemProps) {
  const toX = useCallback(
    (deg: number) =>
      orbitRadius + orbitRadius * Math.cos(angle + (deg * Math.PI) / 180) - stickerSize / 2,
    [angle, orbitRadius, stickerSize],
  );
  const toY = useCallback(
    (deg: number) =>
      orbitRadius + orbitRadius * Math.sin(angle + (deg * Math.PI) / 180) - stickerSize / 2,
    [angle, orbitRadius, stickerSize],
  );

  // Orbit target — only updated when not frozen
  const orbitX = useMotionValue(toX(rotationMV.get()));
  const orbitY = useMotionValue(toY(rotationMV.get()));

  // Spring chases the orbit target, giving a smooth sweep-back when unfreezing
  const x = useSpring(orbitX, { stiffness: 80, damping: 38 });
  const y = useSpring(orbitY, { stiffness: 80, damping: 38 });

  // Local freeze flag — decoupled from isActive so we can unfreeze early
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setFrozen(true);
    const timer = setTimeout(() => setFrozen(false), tickIntervalMs * freezeFraction);
    return () => clearTimeout(timer);
  }, [isActive, tickIntervalMs, freezeFraction]);

  useEffect(() => {
    return rotationMV.on('change', (deg) => {
      if (!frozen) {
        orbitX.set(toX(deg));
        orbitY.set(toY(deg));
      }
    });
  }, [frozen, rotationMV, orbitX, orbitY, toX, toY]);

  return (
    <motion.div
      className="absolute"
      animate={{
        opacity: isActive ? 1 : 0.75,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }}
      style={{ x, y, width: stickerSize, height: stickerSize }}
    >
      <img
        src={sticker.image}
        alt={sticker.alt}
        className="h-full w-full object-contain drop-shadow-md"
        draggable={false}
      />
    </motion.div>
  );
}

type Props = {
  /** Milliseconds between each tick (one sticker advancing to the top). Default: 3000 */
  tickIntervalMs?: number;
  /** Steps per full rotation — controls how many degrees each tick advances. Default: 10 */
  ticksPerRotation?: number;
  /** Orbit radius as a fraction of the container's width (0–1). Default: 0.5 */
  orbitRadiusFraction?: number;
  /** Sticker size as a fraction of the container's width (0–1). Default: 0.3 */
  stickerSizeFraction?: number;
};

export function BasePayImagesCircle({
  tickIntervalMs = 5000,
  ticksPerRotation = 10,
  orbitRadiusFraction = 0.5,
  stickerSizeFraction = 0.3,
}: Props) {
  const [hoverActive, setHoverActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [topItemCount, setTopItemCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25, once: true });
  const stickersActive = isInView;

  const orbitRadius = containerWidth * orbitRadiusFraction;
  const stickerSize = containerWidth * stickerSizeFraction;

  const tickCount = useRef(0);
  const rotationMV = useMotionValue(0);
  const bgColorMV = useMotionValue(visibleStickers[0]?.color ?? '#000');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous rotation: top item lags slowly, then jumps ahead to the next position.
  useEffect(() => {
    if (!stickersActive || orbitRadius === 0) return;

    const totalDuration = (tickIntervalMs * ticksPerRotation) / 1000;
    const stepDeg = 360 / ticksPerRotation;
    // During the lag phase the ring covers only this fraction of stepDeg (always moving, just slowly).
    const lagFraction = 0.65; // portion of each tick spent lagging
    const lagCoverage = 0.08; // fraction of stepDeg covered during the lag phase

    const keyframes: number[] = [0];
    const times: number[] = [0];
    const eases: string[] = [];

    for (let i = 0; i < ticksPerRotation; i++) {
      const lagEndTime = (i + lagFraction) / ticksPerRotation;
      const jumpEndTime = (i + 1) / ticksPerRotation;

      // End of lag phase: ring has crept forward only lagCoverage of a step.
      keyframes.push(-(i * stepDeg + stepDeg * lagCoverage));
      times.push(lagEndTime);
      eases.push('easeIn'); // gradually accelerates into the jump

      // End of jump phase: snap forward to the full next step position.
      keyframes.push(-((i + 1) * stepDeg));
      times.push(jumpEndTime);
      eases.push('easeOut'); // gradually decelerates back to the slow drift
    }

    const controls = animate(rotationMV, keyframes, {
      duration: totalDuration,
      times,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: eases as any,
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [stickersActive, orbitRadius, tickIntervalMs, ticksPerRotation, rotationMV]);

  // Side effects: update active sticker and bg color on each tick.
  useEffect(() => {
    if (!stickersActive) return;
    const id = setInterval(() => {
      tickCount.current += 1;
      const topIdx = tickCount.current % visibleStickers.length;
      animate(bgColorMV, visibleStickers[topIdx].color, { duration: 0.5, ease: 'easeOut' });
      setTopItemCount((c) => c + 1);
    }, tickIntervalMs);
    return () => clearInterval(id);
  }, [stickersActive, tickIntervalMs, bgColorMV]);

  return (
    <motion.div
      ref={ref}
      // style={{ backgroundColor: bgColorMV }}
      className={classNames(
        'group relative h-full w-full overflow-hidden rounded-2xl p-6 transition-all duration-300',
        stickersActive ? 'bg-base-gray-25/0' : 'bg-base-gray-25/0',
      )}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      role="presentation"
    >
      <div className="absolute inset-0 z-20 flex h-full w-full items-end justify-end">
        <div
          style={{
            background:
              'linear-gradient(to bottom, rgba(250, 250, 250, 0), rgba(250, 250, 250, 1))',
          }}
          className=" h-[20%] w-full items-center justify-center "
        ></div>
      </div>
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <motion.div
          className="z-0 aspect-square w-[300px] rounded-md"
          style={{ backgroundColor: bgColorMV }}
        />
      </div>
      <div className="relative flex h-full items-center justify-center">
        {/* Orbit ring — motion.div driven by a ticking spring instead of CSS animation */}
        <motion.div
          className="pointer-events-none absolute"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: '50%',
            top: '50%',
            marginLeft: -orbitRadius,
            marginTop: 0,
          }}
          animate={{ opacity: stickersActive && orbitRadius > 0 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {orbitRadius > 0 &&
            visibleStickers.map((sticker, i) => {
              const angle = (i / visibleStickers.length) * 2 * Math.PI - Math.PI / 2;
              const isActive = i === topItemCount % visibleStickers.length;
              return (
                <StickerItem
                  key={sticker.alt}
                  sticker={sticker}
                  angle={angle}
                  orbitRadius={orbitRadius}
                  stickerSize={stickerSize}
                  rotationMV={rotationMV}
                  isActive={isActive}
                  tickIntervalMs={tickIntervalMs}
                />
              );
            })}
        </motion.div>

        {/* Central card */}
        <div className="relative z-20 spring-bounce-20 spring-duration-300">
          <div className="z-10 w-[350px] translate-y-[0%] scale-[0.9]">
            <BasePayDialog triggerCount={topItemCount} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
