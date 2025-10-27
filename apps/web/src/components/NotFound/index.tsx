'use client';
import notFoundSvg from 'apps/web/public/images/404-msg.svg';
import { motion, AnimatePresence } from 'motion/react';
import Image, { StaticImageData } from 'next/image';
import useMousePosition from 'apps/web/src/hooks/useMousePos';
import { useRef, useState, useEffect, useMemo, memo, useCallback } from 'react';
import { useMedia } from 'apps/web/src/hooks/useMedia';
import Link from 'apps/web/src/components/Link';

const notFoundImg = notFoundSvg as StaticImageData;

type WindowPosition = {
  id: string;
  x: number;
  y: number;
  timestamp: number;
};

function useMouseTrail(containerRef: React.RefObject<HTMLDivElement>) {
  const isMobile = useMedia('(max-width: 1024px)');
  const [trail, setTrail] = useState<WindowPosition[]>([]);
  const mousePos = useMousePosition(containerRef);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // initial trail
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const initialTrail: WindowPosition[] = [];

      for (let i = 0; i < 8; i++) {
        const progress = i / 7;
        const startX = containerRect.width * 0.01; // bottom left
        const endX = containerRect.width * (isMobile ? 0.5 : 0.4); // center
        const startY = containerRect.height * 0.95;
        const endY = containerRect.height * 0.5;

        const curveIntensity = containerRect.width * 0.15;
        const x =
          startX + (endX - startX) * progress - Math.sin(progress * Math.PI) * curveIntensity;
        const y = startY + (endY - startY) * progress;

        initialTrail.push({
          id: `initial-${i}`,
          x,
          y,
          timestamp: Date.now() + i * 100,
        });
      }

      setTrail(initialTrail);
    }

    // cleanup interval - 2 secs (only on desktop)
    let interval: NodeJS.Timeout | null = null;

    if (!isMobile) {
      interval = setInterval(() => {
        const now = Date.now();
        setTrail((prev) => prev.filter((window) => now - window.timestamp < 2000));
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleMouseMove = useCallback(() => {
    if (!isMobile && mousePos.x !== null && mousePos.y !== null) {
      const now = Date.now();

      // calculate distance moved since last spawn
      let distanceMoved = 0;
      if (lastSpawnPos.current) {
        const dx = mousePos.x - lastSpawnPos.current.x;
        const dy = mousePos.y - lastSpawnPos.current.y;
        distanceMoved = Math.sqrt(dx * dx + dy * dy);
      }

      // spawn window every X amount of pixels of movement
      const spawnDistance = 48;
      const shouldSpawn = !lastSpawnPos.current || distanceMoved >= spawnDistance;

      if (shouldSpawn) {
        const newWindow: WindowPosition = {
          id: `window-${now}-${Math.random()}`,
          x: mousePos.x,
          y: mousePos.y,
          timestamp: now,
        };

        setTrail((prev) => {
          let updated = [...prev, newWindow];
          // Limit amount of popups
          if (updated.length > 40) {
            updated = updated.slice(updated.length - 40);
          }
          return updated;
        });

        lastSpawnPos.current = { x: mousePos.x, y: mousePos.y };
      }
    }
  }, [isMobile, mousePos.x, mousePos.y]);

  useEffect(() => {
    handleMouseMove();
  }, [handleMouseMove]);

  const memoizedTrail = useMemo(() => trail, [trail]);
  return memoizedTrail;
}

export function Windows() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trail = useMouseTrail(containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <AnimatePresence>
        {trail.map((window) => (
          <Link href="/" key={window.id}>
            <NotFoundSvg key={window.id} windowPos={window} />
          </Link>
        ))}
      </AnimatePresence>
    </div>
  );
}

const NotFoundSvg = memo(function NotFoundSvg({ windowPos }: { windowPos: WindowPosition }) {
  const isInitialWindow = windowPos.id.startsWith('initial-');
  const delay = isInitialWindow ? parseInt(windowPos.id.split('-')[1]) * 0.1 : 0;

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-auto"
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      initial={{
        x: windowPos.x,
        y: windowPos.y,
        scale: 0.2,
        opacity: 0,
      }}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      animate={{
        x: windowPos.x,
        y: windowPos.y,
        scale: 1,
        opacity: 1,
      }}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      exit={{
        scale: 0.8,
        opacity: 0,
      }}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.01,
        delay,
      }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <Image src={notFoundImg} alt="404" className="max-md:max-w-[248px] lg:aspect-[1.468]" />
      </div>
    </motion.div>
  );
});
