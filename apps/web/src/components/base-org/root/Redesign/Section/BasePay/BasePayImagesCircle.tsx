'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
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

const stickers: { image: string; alt: string; color: string; hidden?: boolean; company: string }[] =
  [
    { image: BallImage.src, alt: 'Ball', color: '#FFDCC3', company: 'Arial Inc.' },
    { image: BikeImage.src, alt: 'Bike', color: '#C0C4FF', company: 'Acme Inc.' },
    { image: ChairImage.src, alt: 'Chair', color: '#D4FFA5', company: 'Chakra Co.' },
    { image: DeskImage.src, alt: 'Desk', color: '#F7FBFF', company: 'October Inc.' },
    { image: GuitarImage.src, alt: 'Guitar', color: '#FFD5C7', company: 'Geneva Inc.' },
    { image: HammerImage.src, alt: 'Hammer', color: '#BEF1DF', company: 'Helvetica LLC' },
    { image: HeadphonesImage.src, alt: 'Headphones', color: '#FFBCBC', company: 'Texas Inc.' },
    { image: LampImage.src, alt: 'Lamp', color: '#FFB485', company: 'Cooper LLC' },
    {
      image: PerfumeImage.src,
      alt: 'Perfume',
      hidden: true,
      color: '#CC99FF',
      company: 'Acme Inc.',
    },
    { image: ShoeImage.src, alt: 'Shoe', color: '#94C3FF', company: 'Northwest LLC' },
    { image: SoapImage.src, alt: 'Soap', hidden: true, color: '#000fff', company: 'Charcoal Inc.' },
    { image: SpeakerImage.src, alt: 'Speaker', color: '#BBDAFF', company: 'Southwest LLC' },
    { image: TvImage.src, alt: 'TV', hidden: true, color: '#000fff', company: 'Eastwest LLC' },
    {
      image: WatchImage.src,
      alt: 'Watch',
      hidden: true,
      color: '#000fff',
      company: 'Westwest LLC',
    },
  ];

const visibleStickers = stickers.filter((s) => !s.hidden);

const ROTATE_DURATION_MS = 850;

type StickerItemProps = {
  sticker: { image: string; alt: string; color: string };
  left: number;
  top: number;
  stickerSize: number;
  isActive: boolean;
  rotationMV: MotionValue<number>;
};

function StickerItem({ sticker, left, top, stickerSize, isActive, rotationMV }: StickerItemProps) {
  const counterRotate = useTransform(rotationMV, (v) => -v);
  return (
    <motion.div
      className="absolute"
      animate={{
        opacity: isActive ? 1 : 0.75,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      style={{
        left,
        top,
        width: stickerSize,
        height: stickerSize,
        rotate: counterRotate,
      }}
    >
      <img
        src={sticker.image}
        alt={sticker.alt}
        className={classNames(
          'sticker-image h-full w-full object-contain drop-shadow-md spring-bounce-20 spring-duration-300',
          isActive && 'sticker-pulse',
        )}
        draggable={false}
      />
    </motion.div>
  );
}

type Props = {
  /** Milliseconds between each tick (one sticker advancing to the top). Default: 5000 */
  tickIntervalMs?: number;
  /** Orbit radius as a fraction of the container's width (0–1). Default: 0.5 */
  orbitRadiusFraction?: number;
  /** Sticker size as a fraction of the container's width (0–1). Default: 0.3 */
  stickerSizeFraction?: number;
};

export function BasePayImagesCircle({
  tickIntervalMs = 5000,
  orbitRadiusFraction = 0.5,
  stickerSizeFraction = 0.3,
}: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25, once: true });
  const stickersActive = isInView;

  const orbitRadius = containerWidth * orbitRadiusFraction;
  const stickerSize = containerWidth * stickerSizeFraction;

  const rotationMV = useMotionValue(0);
  const bgColorMV = useMotionValue(visibleStickers[0]?.color ?? '#000');
  const tickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const cancelledRef = useRef(false);
  const topIndexRef = useRef(0);
  topIndexRef.current = topIndex;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Tick-based loop: rotate one step, pause, then repeat. Single source of truth for topIndex.
  useEffect(() => {
    if (!stickersActive || orbitRadius === 0 || visibleStickers.length === 0) return;

    const stepDeg = 360 / visibleStickers.length;
    const rotateDurationSec = ROTATE_DURATION_MS / 1000;

    cancelledRef.current = false;
    function runTick() {
      if (cancelledRef.current) return;
      const next = (topIndexRef.current + 1) % visibleStickers.length;
      topIndexRef.current = next;
      setTopIndex(next);
      animate(bgColorMV, visibleStickers[next].color, {
        duration: 0.5,
        ease: 'easeOut',
      });
      const current = rotationMV.get();
      const nextRotation = current - stepDeg;
      const controls = animate(rotationMV, nextRotation, {
        duration: rotateDurationSec,
        ease: [0.33, 0, 0.2, 1],
      });
      animationControlsRef.current = controls;
      controls.then(() => {
        if (cancelledRef.current) return;
        const pauseMs = Math.max(0, tickIntervalMs - ROTATE_DURATION_MS);
        tickTimeoutRef.current = setTimeout(runTick, pauseMs);
      });
    }

    runTick();
    return () => {
      cancelledRef.current = true;
      if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
      tickTimeoutRef.current = null;
      animationControlsRef.current?.stop();
      animationControlsRef.current = null;
    };
  }, [stickersActive, orbitRadius, tickIntervalMs, rotationMV, bgColorMV]);

  return (
    <motion.div
      ref={ref}
      className={classNames(
        'group relative h-full w-full overflow-hidden rounded-2xl p-6 transition-all duration-300',
        'bg-base-gray-25/0',
      )}
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
        {/* Single orbit container: one rotating wrapper, stickers at fixed angles */}
        <motion.div
          className="pointer-events-none absolute"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: '50%',
            top: '50%',
            marginLeft: -orbitRadius,
            marginTop: 0,
            rotate: rotationMV,
          }}
          animate={{ opacity: stickersActive && orbitRadius > 0 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {orbitRadius > 0 &&
            visibleStickers.map((sticker, i) => {
              const angleRad = (i / visibleStickers.length) * 2 * Math.PI - Math.PI / 2;
              const left = orbitRadius + orbitRadius * Math.cos(angleRad) - stickerSize / 2;
              const top = orbitRadius + orbitRadius * Math.sin(angleRad) - stickerSize / 2;
              const isActive = i === topIndex;
              return (
                <StickerItem
                  key={sticker.alt}
                  sticker={sticker}
                  left={left}
                  top={top}
                  stickerSize={stickerSize}
                  isActive={isActive}
                  rotationMV={rotationMV}
                />
              );
            })}
        </motion.div>

        {/* Central card */}
        <div className="relative z-20 spring-bounce-20 spring-duration-300">
          <div className="z-10 w-[350px] translate-y-[2%] scale-[0.9]">
            <BasePayDialog triggerCount={topIndex} company={visibleStickers[topIndex].company} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
