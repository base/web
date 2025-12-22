import { useCallback, useEffect, useRef, useState } from 'react';

type ImageSequenceCanvasProps = {
  srcPrefix?: string; // e.g. "/videos/basepay-frames/"
  frames?: string[]; // Optional explicit list of frame URLs
  totalFrames?: number; // If frames not provided, how many numbered frames exist (1..N)
  extension?: 'jpg' | 'jpeg' | 'png' | 'webp';
  className?: string;
  placeholderSrc?: string;
};

function ImageSequenceCanvas({
  srcPrefix = '/videos/basepay-frames/',
  frames,
  totalFrames = 39,
  extension = 'jpg',
  className = '',
  placeholderSrc,
}: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hasStartedScrubbing, setHasStartedScrubbing] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageElements, setImageElements] = useState<HTMLImageElement[]>([]);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

  const scrollProgressRef = useRef(0);
  const hasStartedScrubbingRef = useRef(false);
  const imageElementsRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    imageElementsRef.current = imageElements;
  }, [imageElements]);

  const loadPlaceholder = useCallback(async () => {
    if (!placeholderSrc || !canvasRef.current || !contextRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load placeholder image'));
        img.src = placeholderSrc;
      });

      const canvas = canvasRef.current;
      const context = contextRef.current;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      // Non-fatal
    }
  }, [placeholderSrc]);

  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
  ) => {
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imageAspect > canvasAspect) {
      drawHeight = h;
      drawWidth = drawHeight * imageAspect;
      offsetX = (w - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = w;
      drawHeight = drawWidth / imageAspect;
      offsetX = 0;
      offsetY = (h - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const handleScroll = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const currentImages = imageElementsRef.current;

    if (!canvas || !context || currentImages.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    let progress = 0;

    if (rect.bottom <= 0 || rect.top >= windowHeight) {
      progress = 0;
    } else {
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        progress = 1;
      } else if (rect.top >= 0 && rect.bottom <= windowHeight) {
        progress = 1;
      } else if (rect.top > 0) {
        const visibleHeight = windowHeight - rect.top;
        progress = Math.min(1, visibleHeight / elementHeight);
      } else {
        const visibleHeight = rect.bottom;
        progress = Math.min(1, visibleHeight / elementHeight);
      }
    }

    progress = Math.max(0, Math.min(1, progress));

    // Start advancing frames when at least 25% of the element is visible.
    // Map 0..0.25 → 0 and 0.25..1 → 0..1 linearly.
    const adjustedProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.75));
    scrollProgressRef.current = adjustedProgress;

    const frameIndex = Math.floor(adjustedProgress * (currentImages.length - 1));
    const clampedIndex = Math.max(0, Math.min(currentImages.length - 1, frameIndex));
    const img = currentImages[clampedIndex];
    if (img) drawImageCover(context, img, canvas.width, canvas.height);
  }, []);

  const handleWindowResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      handleScroll();
    }, 150);
  }, [handleScroll]);

  const discoverFrames = useCallback(() => {
    if (frames && frames.length > 0) return frames;
    const urls: string[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      urls.push(`${srcPrefix}${i}.${extension}`);
    }
    return urls;
  }, [frames, srcPrefix, totalFrames, extension]);

  const preloadImages = useCallback(async () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const urls = discoverFrames();
    const imageList: HTMLImageElement[] = new Array(urls.length);

    let loadedCount = 0;
    setLoadingProgress(0);

    await Promise.all(
      urls.map(
        (url, index) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.decoding = 'async';
            img.loading = 'eager';
            img.onload = () => {
              imageList[index] = img;
              loadedCount++;
              setLoadingProgress(loadedCount / urls.length);
              if (loadedCount === 1) {
                drawImageCover(context, img, canvas.width, canvas.height);
              }
              resolve();
            };
            img.onerror = () => {
              resolve();
            };
            img.src = url;
          }),
      ),
    );

    const filtered = imageList.filter(Boolean);
    setImageElements(filtered);
    setFramesLoaded(filtered.length > 0);
    if (filtered[0]) drawImageCover(context, filtered[0], canvas.width, canvas.height);
  }, [discoverFrames]);

  const setupResizeObserver = useCallback(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const canvas = canvasRef.current;

        setCanvasWidth(width);
        setCanvasHeight(height);

        if (canvas) {
          canvas.width = width;
          canvas.height = height;
          handleScroll();
        }
      }
    });

    resizeObserverRef.current.observe(canvasContainer);
  }, [handleScroll]);

  const setupIntersectionObserver = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const currentHasStartedScrubbing = hasStartedScrubbingRef.current;

        if (entry.isIntersecting && !currentHasStartedScrubbing) {
          setHasStartedScrubbing(true);
          hasStartedScrubbingRef.current = true;
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();
        } else if (!entry.isIntersecting && currentHasStartedScrubbing) {
          const rect = canvas.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.bottom < -windowHeight || rect.top > windowHeight * 2) {
            setHasStartedScrubbing(false);
            hasStartedScrubbingRef.current = false;
            window.removeEventListener('scroll', handleScroll);
          } else {
            handleScroll();
          }
        }
      },
      {
        threshold: [0, 0.1, 1],
        rootMargin: `${window.innerHeight}px 0px ${window.innerHeight}px 0px`,
      },
    );

    intersectionObserverRef.current.observe(canvas);
  }, [handleScroll]);

  const cleanup = useCallback(() => {
    if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
    if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleWindowResize);
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
  }, [handleScroll, handleWindowResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;

    if (!canvas || !canvasContainer) return;

    const rect = canvasContainer.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setCanvasWidth(width);
    setCanvasHeight(height);
    canvas.width = width;
    canvas.height = height;

    contextRef.current = canvas.getContext('2d');

    if (placeholderSrc) void loadPlaceholder();
    setupResizeObserver();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [setupResizeObserver, loadPlaceholder, placeholderSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;

    if (!canvas || !canvasContainer) return;

    void preloadImages();
    setupIntersectionObserver();

    window.addEventListener('resize', handleWindowResize, { passive: true });

    return cleanup;
  }, [preloadImages, setupIntersectionObserver, cleanup, handleWindowResize]);

  return (
    <div ref={canvasContainerRef} className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="block h-full w-full object-cover"
        style={{ imageRendering: 'auto' }}
      >
        Your browser does not support the canvas element.
      </canvas>

      {!framesLoaded && loadingProgress > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-gray-25 bg-opacity-75 text-base-black">
          <div className="text-center">
            <div className="mb-2">Loading frames...</div>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-base-gray-150">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm">{Math.round(loadingProgress * 100)}%</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSequenceCanvas;
