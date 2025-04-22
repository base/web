import { useEffect, useRef, useState } from 'react';

const FLASH_PROBABILITY = 0.1;
const BLUE_FLASH_PROBABILITY = 0.04;
const FLASH_DURATION = 1000;
const FRAME_INTERVAL = 400;
const BLUE = '#0052ff';
const BLACK = '#000';
const GREY = 'hsl(0, 0%, 10%)';
const GRID_COLOR = 'hsl(0, 0%, 20%)';

type GridHeroProps = {
  hasBlue?: boolean;
};

export function GridHero({ hasBlue = false }: GridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);
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

    const cellSize = Math.floor(Math.min(Math.max(25, canvas.width / 20), 70));

    const rows = Math.floor(canvas.height / cellSize);
    const cols = Math.floor(canvas.width / cellSize);

    function drawGridLines() {
      const grid = gridRef.current;
      const gridCtx = grid?.getContext('2d');
      if (!grid || !gridCtx) return;
      gridCtx.strokeStyle = GRID_COLOR;
      gridCtx.lineWidth = 1;

      for (let x = 0; x <= grid.width; x += cellSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, grid.height);
        gridCtx.stroke();
      }

      for (let y = 0; y <= grid.height; y += cellSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(grid.width, y);
        gridCtx.stroke();
      }
    }

    function drawCell(x: number, y: number, color: string) {
      if (!ctx) {
        return;
      }

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

    drawGridLines();
    animate();
    return () => clearTimeout(animationFrameId);
  }, [hasBlue, canvasWidth]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full absolute"
        width={canvasWidth}
        height={700}
      />
      <canvas
        ref={gridRef}
        className="w-full absolute"
        width={canvasWidth}
        height={700}
      />
    </div>
  );
}
