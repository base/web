'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue } from 'motion/react';
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

const SLIDE_DURATION_MS = 850;
const COPIES = 4;
const GAP = 24;

const ADJACENT_OFFSET = 16;

type StickerItemProps = {
  sticker: { image: string; alt: string; color: string };
  stickerSize: number;
  isCenter: boolean;
  position: 'left' | 'right' | null;
};

function StickerItem({ sticker, stickerSize, isCenter, position }: StickerItemProps) {
  const isAdjacent = position !== null;
  return (
    <motion.div
      className="flex shrink-0 items-center justify-center"
      animate={{
        opacity: isCenter ? 1 : isAdjacent ? 0.85 : 0.6,
        scale: isCenter ? 1.2 : isAdjacent ? 0.9 : 0.75,
        x: position === 'left' ? -ADJACENT_OFFSET : position === 'right' ? ADJACENT_OFFSET : 0,
      }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      style={{ width: stickerSize, height: stickerSize }}
    >
      <img
        src={sticker.image}
        alt={sticker.alt}
        className={classNames(
          'sticker-image h-full w-full object-contain drop-shadow-md spring-bounce-20 spring-duration-300',
          isCenter && 'sticker-pulse',
        )}
        draggable={false}
      />
    </motion.div>
  );
}

type Props = {
  /** Milliseconds between each tick (one sticker advancing to center). Default: 5000 */
  tickIntervalMs?: number;
  /** Fixed sticker size in pixels. Default: 120 */
  stickerSize?: number;
};

export function BasePayImagesCircle({ tickIntervalMs = 5000, stickerSize = 220 }: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [shiftIndex, setShiftIndex] = useState(visibleStickers.length);
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25, once: true });
  const stickersActive = isInView;
  const totalStickers = visibleStickers.length * COPIES;
  const startIndex = visibleStickers.length;
  const endIndex = visibleStickers.length * 2 - 1;
  const centerStickerIndex = shiftIndex % visibleStickers.length;

  const translateXMV = useMotionValue(0);
  const bgColorMV = useMotionValue(visibleStickers[0]?.color ?? '#000');
  const tickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const cancelledRef = useRef(false);
  const shiftIndexRef = useRef(shiftIndex);
  shiftIndexRef.current = shiftIndex;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update track position when shiftIndex or container size changes
  useEffect(() => {
    if (containerWidth === 0 || visibleStickers.length === 0) return;
    const halfWidth = containerWidth / 2;
    const shiftAmount = shiftIndex * (stickerSize + GAP);
    const x = halfWidth - stickerSize / 2 - shiftAmount;
    translateXMV.set(x);
  }, [containerWidth, shiftIndex, stickerSize, translateXMV]);

  // Tick-based loop: advance one step, animate slide, then schedule next tick (same rate as before)
  useEffect(() => {
    if (!stickersActive || containerWidth === 0 || visibleStickers.length === 0) return;

    const slideDurationSec = SLIDE_DURATION_MS / 1000;
    const halfWidth = containerWidth / 2;
    const stepPx = stickerSize + GAP;

    cancelledRef.current = false;
    function runTick() {
      if (cancelledRef.current) return;
      const current = shiftIndexRef.current;
      const next = current + 1;

      const isReset = next > endIndex;
      const targetIndex = isReset ? endIndex + 1 : next;
      const targetX = halfWidth - stickerSize / 2 - targetIndex * stepPx;

      setShiftIndex(next);
      const nextStickerIndex = next % visibleStickers.length;
      animate(bgColorMV, visibleStickers[nextStickerIndex].color, {
        duration: 0.5,
        ease: 'easeOut',
      });

      const controls = animate(translateXMV, targetX, {
        duration: slideDurationSec,
        ease: [0.33, 0, 0.2, 1],
      });
      animationControlsRef.current = controls;
      controls.then(() => {
        if (cancelledRef.current) return;
        if (isReset) {
          const resetX = halfWidth - stickerSize / 2 - startIndex * stepPx;
          translateXMV.set(resetX);
          setShiftIndex(startIndex);
        }
        const pauseMs = Math.max(0, tickIntervalMs - SLIDE_DURATION_MS);
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
  }, [stickersActive, containerWidth, tickIntervalMs, stickerSize, translateXMV, bgColorMV]);

  const duplicatedStickers = Array.from({ length: COPIES }).flatMap(() => visibleStickers);

  return (
    <motion.div
      ref={ref}
      className={classNames(
        'group relative h-full w-full overflow-hidden rounded-2xl p-0 transition-all duration-300',
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
          className="h-[20%] w-full items-center justify-center"
        />
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* Horizontal carousel track: one item centered, same tick rate */}
        <div className="absolute h-full w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            className="absolute left-0 top-1/2 flex  items-center"
            style={{
              x: translateXMV,
              gap: GAP,
              y: '-50%',
            }}
            animate={{ opacity: stickersActive && containerWidth > 0 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {duplicatedStickers.map((sticker, index) => {
              const isCenter = index === shiftIndex;
              const position =
                index === shiftIndex - 1 ? 'left' : index === shiftIndex + 1 ? 'right' : null;
              return (
                <StickerItem
                  key={`${sticker.alt}-${index}`}
                  sticker={sticker}
                  stickerSize={stickerSize}
                  isCenter={isCenter}
                  position={position}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Central card */}
        <div className="relative z-20 spring-bounce-20 spring-duration-300">
          <div className="z-10 w-[350px] scale-[0.8]  md:scale-[0.9]">
            <BasePayDialog
              triggerCount={centerStickerIndex}
              company={visibleStickers[centerStickerIndex].company}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
