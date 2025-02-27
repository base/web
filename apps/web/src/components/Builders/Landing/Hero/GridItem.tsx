import { useCallback, useEffect, useState } from 'react';
import './styles.css';

const MIN_DELAY = 2000;
const MAX_DELAY = 8000;
const FLASH_PROBABILITY = 0.1;
const BLUE_FLASH_PROBABILITY = 0.04;

type GridItemProps = {
  hasBlue?: boolean;
};

export function GridItem({ hasBlue = false }: GridItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashColor, setFlashColor] = useState<'gray' | 'blue'>('gray');

  let blueFlashProbability = BLUE_FLASH_PROBABILITY;
  if (!hasBlue) {
    blueFlashProbability = BLUE_FLASH_PROBABILITY * 0;
  }

  const getRandomDelay = () => {
    return Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  };

  const playFlash = useCallback(
    (delay: number) => {
      if (!isAnimating) {
        setFlashColor(Math.random() < blueFlashProbability ? 'blue' : 'gray');
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, delay);
      }
    },
    [blueFlashProbability, isAnimating],
  );

  useEffect(() => {
    const scheduleNextFlash = () => {
      const timeout = setTimeout(() => {
        if (Math.random() < FLASH_PROBABILITY) {
          playFlash(1000);
        }
        scheduleNextFlash();
      }, getRandomDelay());

      return timeout;
    };

    const timeout = scheduleNextFlash();
    return () => clearTimeout(timeout);
  }, [isAnimating, playFlash]);

  const handleMouseEnter = useCallback(() => playFlash(10), [playFlash]);

  return (
    <div
      className={`grid-item pointer-events-auto aspect-square w-full bg-opacity-90 ${
        isAnimating ? (flashColor === 'blue' ? 'flash-blue' : 'flash-gray') : ''
      }`}
      onMouseEnter={handleMouseEnter}
      style={{ touchAction: 'none' }}
    />
  );
}
