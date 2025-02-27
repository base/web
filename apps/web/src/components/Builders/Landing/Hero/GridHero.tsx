import { useEffect, useRef, useState, useCallback } from 'react';

const FLASH_PROBABILITY = 0.1;
const BLUE_FLASH_PROBABILITY = 0.04;
const FLASH_DURATION = 1000;
const FRAME_INTERVAL = 400;
const BLUE = '#0052ff';
const BLACK = '#000';
const GREY = 'hsl(0, 0%, 10%)';

type GridHeroProps = {
  cellSize?: number;
  hasBlue?: boolean;
};

export function GridHero({ cellSize = 70, hasBlue = false }: GridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasWidth(window.innerWidth);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
    
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    const rows = Math.floor(canvas.height / cellSize);
    const cols = Math.floor(canvas.width / cellSize);

    function drawCell(x: number, y: number, color: string) {
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
    }

    let animationFrameId: NodeJS.Timeout;
    function animate() {
      for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
          if(Math.random() < FLASH_PROBABILITY) {
            const color = Math.random() < BLUE_FLASH_PROBABILITY && hasBlue ? BLUE : GREY;
            drawCell(x, y, color);
            setTimeout(() => drawCell(x, y, BLACK), FLASH_DURATION);
          }
        }
      }
      animationFrameId = setTimeout(animate, FRAME_INTERVAL);
    }

    animate();
    return () => clearTimeout(animationFrameId);
  }, [canvasWidth]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full"
      width={canvasWidth}
      height={700}
    />
  );
}
