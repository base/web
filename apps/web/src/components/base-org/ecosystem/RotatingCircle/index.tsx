'use client';
import { useRef, useEffect, useState } from 'react';

type RotatingCircleProps = {
  theme: number;
};

type Position = {
  top: number;
  left: number;
};

export default function RotatingCircle({ theme }: RotatingCircleProps) {
  const [angle, setAngle] = useState(0);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState<Position>({ top: 0, left: 0 });
  const elRef = useRef<HTMLDivElement>(null);

  const getColor2 = (t: number): string => {
    switch (t) {
      case 0:
        return '#FF00FF';
      case 1:
        return '#1652F0';
      case 2:
        return '#00FF00';
      case 3:
        return '#ED7255';
      case 4:
        return '#231815';
      case 5:
        return '#00D395';
      default:
        return '#1652F0';
    }
  };

  const updateRotation = (clientX: number, clientY: number) => {
    if (!elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const boxCenterX = rect.left + rect.width / 2;
    const boxCenterY = rect.top + rect.height / 2;
    const newAngle = Math.atan2(clientY - boxCenterY, clientX - boxCenterX);
    setAngle(newAngle * (180 / Math.PI));
  };

  const updatePosition = () => {
    if (elRef.current) {
      const viewportOffset = elRef.current.getBoundingClientRect();
      setPosition({ top: viewportOffset.top, left: viewportOffset.left });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ top: e.clientY, left: e.clientX });
      updateRotation(e.clientX, e.clientY);
      updatePosition();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ top: touch.clientY, left: touch.clientX });
        updateRotation(touch.clientX, touch.clientY);
        updatePosition();
      }
    };

    const handleScroll = () => {
      updatePosition();
      // Use the last known mouse position to update rotation
      updateRotation(mousePosition.left, mousePosition.top);
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePosition]); // Add mousePosition to the dependency array

  const color1 = '#0052FF';
  const color2 = getColor2(theme);
  const color3 = '#FFF';

  return (
    <div
      ref={elRef}
      className="aspect-square w-full max-w-[400px] -rotate-90 overflow-hidden rounded-full"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `rotate(${angle}deg)`,
          background: `conic-gradient(from 180deg at 50% 50%, ${color1} 0deg, ${color2} 105.66210508346558deg, ${color3} 360deg, white 360deg)`,
        }}
      />
    </div>
  );
}
