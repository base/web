'use client';
import { useRef, useEffect } from 'react';

const maxRows = 52;
const minRows = 6;
const dotsPerRow = 31;
const dotRadius = 3;
const dotSpacing = 9;

type AnimatedFeeDotsProps = {
  isBase?: boolean;
  color?: string;
  progress: number;
  title: string;
};

export default function AnimatedFeeDots({
  isBase = false,
  color = '#4083CD',
  progress,
  title,
}: AnimatedFeeDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const visibleRows = isBase ? Math.round(maxRows - progress * (maxRows - minRows)) : maxRows;
    const canvasWidth = dotsPerRow * dotSpacing;
    const canvasHeight = visibleRows * dotSpacing;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = color;

    for (let y = 0; y < visibleRows; y++) {
      for (let x = 0; x < dotsPerRow; x++) {
        ctx.beginPath();
        ctx.arc(x * dotSpacing + dotRadius, y * dotSpacing + dotRadius, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [isBase, color, progress]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} title={title} />;
}
