import { useCallback, useEffect, useRef, useState } from 'react';

type VideoCanvasProps = {
  src?: string;
  className?: string;
  placeholderSrc?: string; // Optional placeholder image to show while loading
};

function VideoCanvas({ src = '', className = '', placeholderSrc }: VideoCanvasProps) {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoInitializedRef = useRef(false); // Track if video is already initialized

  // State
  const [hasStartedScrubbing, setHasStartedScrubbing] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [frameCache, setFrameCache] = useState<ImageData[]>([]);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  // Refs for values that need to be accessed in stable callbacks
  const scrollProgressRef = useRef(0);
  const framesLoadedRef = useRef(false);
  const frameCacheRef = useRef<ImageData[]>([]);
  const hasStartedScrubbingRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    framesLoadedRef.current = framesLoaded;
  }, [framesLoaded]);

  useEffect(() => {
    frameCacheRef.current = frameCache;
  }, [frameCache]);

  useEffect(() => {
    hasStartedScrubbingRef.current = hasStartedScrubbing;
  }, [hasStartedScrubbing]);

  // Load placeholder image immediately
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

      // Draw placeholder image to canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      setPlaceholderLoaded(true);
      console.log('Placeholder image loaded and displayed');
    } catch (error) {
      console.warn('Failed to load placeholder image:', error);
    }
  }, [placeholderSrc]);

  const handleScroll = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const currentFramesLoaded = framesLoadedRef.current;
    const currentFrameCache = frameCacheRef.current;

    if (!canvas || !context || !currentFramesLoaded || currentFrameCache.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    let progress = 0;

    // Check if element is completely off-screen
    if (rect.bottom <= 0 || rect.top >= windowHeight) {
      // Element is completely outside viewport (above or below) - video at start (0%)
      progress = 0;
    } else {
      // Element is in viewport - calculate progress based on scroll position
      // Progress should be 0% when element just enters viewport and 100% when fully visible

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // Element is larger than viewport and fully covers it
        progress = 1;
      } else if (rect.top >= 0 && rect.bottom <= windowHeight) {
        // Element is fully visible within viewport
        progress = 1;
      } else if (rect.top > 0) {
        // Element is entering from bottom
        const visibleHeight = windowHeight - rect.top;
        progress = Math.min(1, visibleHeight / elementHeight);
      } else {
        // Element is exiting from top
        const visibleHeight = rect.bottom;
        progress = Math.min(1, visibleHeight / elementHeight);
      }
    }

    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    scrollProgressRef.current = progress;

    // Use preloaded frames for instant scrubbing
    const frameIndex = Math.floor(progress * (currentFrameCache.length - 1));
    const clampedIndex = Math.max(0, Math.min(currentFrameCache.length - 1, frameIndex));

    // Find the nearest available frame (handle sparse cache)
    let frameToDraw = currentFrameCache[clampedIndex];
    if (!frameToDraw) {
      // Find the nearest available frame
      for (let offset = 1; offset < currentFrameCache.length; offset++) {
        const lowerIndex = clampedIndex - offset;
        const upperIndex = clampedIndex + offset;

        if (lowerIndex >= 0 && currentFrameCache[lowerIndex]) {
          frameToDraw = currentFrameCache[lowerIndex];
          break;
        }
        if (upperIndex < currentFrameCache.length && currentFrameCache[upperIndex]) {
          frameToDraw = currentFrameCache[upperIndex];
          break;
        }
      }
    }

    // Draw the frame instantly from cache if available
    if (frameToDraw) {
      context.putImageData(frameToDraw, 0, 0);
    }
  }, []);

  // Debounced window resize handler
  const handleWindowResize = useCallback(() => {
    // Clear existing timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    // Set new timeout for debounced execution
    resizeTimeoutRef.current = setTimeout(() => {
      // Update canvas position when window is resized
      handleScroll();
    }, 150); // 150ms debounce delay
  }, [handleScroll]);

  const preloadFrames = useCallback(async () => {
    const video = videoRef.current;
    const context = contextRef.current;
    const canvas = canvasRef.current;

    if (!video || !context || !canvas) {
      console.warn('Video, context, or canvas not available for frame preloading');
      return;
    }

    if (!video.duration || video.duration === 0) {
      console.warn('Video duration not available');
      return;
    }

    const duration = video.duration;
    const fps = 60; // Assuming 30fps, adjust based on your video
    const totalFramesCount = Math.floor(duration * fps);

    // Limit frames for memory management (max 80 frames for faster loading)
    const maxFrames = Math.min(totalFramesCount, 80);

    const newFrameCache: ImageData[] = [];
    setLoadingProgress(0);

    // Use current canvas dimensions
    const currentWidth = canvas.width;
    const currentHeight = canvas.height;

    // Create a temporary canvas for frame extraction
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = currentWidth;
    tempCanvas.height = currentHeight;
    const tempContext = tempCanvas.getContext('2d');

    if (!tempContext) {
      console.error('Failed to get 2D context from temporary canvas');
      return;
    }

    console.log(`Starting to preload ${maxFrames} frames from video (duration: ${duration}s)`);

    // Helper function to seek to a specific time with retry logic
    const seekToTime = async (
      timePosition: number,
      frameIndex: number,
      maxRetries = 3,
    ): Promise<void> => {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error(`Timeout seeking to frame ${frameIndex} (attempt ${attempt + 1})`));
            }, 3000); // Reduced timeout to 3 seconds per frame for faster loading

            const cleanup = () => {
              clearTimeout(timeout);
              video.removeEventListener('seeked', onSeeked);
              video.removeEventListener('error', onError);
            };

            const onSeeked = () => {
              cleanup();
              resolve();
            };

            const onError = () => {
              cleanup();
              reject(new Error(`Error seeking to frame ${frameIndex} (attempt ${attempt + 1})`));
            };

            video.addEventListener('seeked', onSeeked, { once: true });
            video.addEventListener('error', onError, { once: true });

            // Ensure video is ready before seeking
            if (video.readyState >= 2) {
              // HAVE_CURRENT_DATA
              console.log(
                `Seeking to frame ${frameIndex} at time ${timePosition}s (readyState: ${video.readyState})`,
              );
              video.currentTime = timePosition;
            } else {
              // Wait for video to be ready
              console.log(
                `Video not ready for frame ${frameIndex}, waiting... (readyState: ${video.readyState})`,
              );
              const onCanPlay = () => {
                video.removeEventListener('canplay', onCanPlay);
                console.log(`Video ready for frame ${frameIndex}, seeking to ${timePosition}s`);
                video.currentTime = timePosition;
              };
              video.addEventListener('canplay', onCanPlay, { once: true });
            }
          });

          // If we get here, seeking was successful
          return;
        } catch (error) {
          console.warn(`Attempt ${attempt + 1} failed for frame ${frameIndex}:`, error);

          if (attempt === maxRetries - 1) {
            // Last attempt failed, throw the error
            throw error;
          }

          // Wait a bit before retrying
          const retryDelay = 1000 * (attempt + 1);
          console.log(`Waiting ${retryDelay}ms before retry for frame ${frameIndex}...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    };

    // First, load key frames (0%, 25%, 50%, 75%, 100%) for immediate visual feedback
    const keyFramePositions = [0, 0.25, 0.5, 0.75, 1];
    const keyFrameIndices = keyFramePositions.map((pos) => Math.floor(pos * (maxFrames - 1)));

    console.log('Loading key frames first for immediate feedback...');

    // Load key frames first
    for (const frameIndex of keyFrameIndices) {
      const timePosition = (frameIndex / (maxFrames - 1)) * duration;

      try {
        await seekToTime(timePosition, frameIndex);

        // Draw frame to temporary canvas
        tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Calculate cover-style positioning (fill entire canvas)
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = tempCanvas.width / tempCanvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (videoAspect > canvasAspect) {
          // Video is wider - scale to height and crop sides
          drawHeight = tempCanvas.height;
          drawWidth = drawHeight * videoAspect;
          offsetX = (tempCanvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Video is taller - scale to width and crop top/bottom
          drawWidth = tempCanvas.width;
          drawHeight = drawWidth / videoAspect;
          offsetX = 0;
          offsetY = (tempCanvas.height - drawHeight) / 2;
        }

        tempContext.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

        // Extract and store frame data
        const frameData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        newFrameCache[frameIndex] = frameData;

        // Show first frame immediately
        if (frameIndex === 0) {
          context.putImageData(frameData, 0, 0);
          setFramesLoaded(true);
          console.log('First frame displayed immediately');
        }
      } catch (frameError) {
        console.warn(`Failed to load key frame ${frameIndex}:`, frameError);
      }
    }

    // Update progress after key frames
    setLoadingProgress(keyFrameIndices.length / maxFrames);

    // Now load remaining frames in background
    console.log('Loading remaining frames in background...');

    try {
      for (let i = 0; i < maxFrames; i++) {
        // Skip key frames that are already loaded
        if (keyFrameIndices.includes(i)) {
          continue;
        }

        const timePosition = (i / (maxFrames - 1)) * duration;

        try {
          // Seek to the frame position with retry logic
          await seekToTime(timePosition, i);

          // Draw frame to temporary canvas
          tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

          // Calculate cover-style positioning (fill entire canvas)
          const videoAspect = video.videoWidth / video.videoHeight;
          const canvasAspect = tempCanvas.width / tempCanvas.height;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (videoAspect > canvasAspect) {
            // Video is wider - scale to height and crop sides
            drawHeight = tempCanvas.height;
            drawWidth = drawHeight * videoAspect;
            offsetX = (tempCanvas.width - drawWidth) / 2;
            offsetY = 0;
          } else {
            // Video is taller - scale to width and crop top/bottom
            drawWidth = tempCanvas.width;
            drawHeight = drawWidth / videoAspect;
            offsetX = 0;
            offsetY = (tempCanvas.height - drawHeight) / 2;
          }

          tempContext.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

          // Extract and store frame data
          const frameData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          newFrameCache[i] = frameData;

          // Update progress
          setLoadingProgress((i + 1) / maxFrames);
        } catch (frameError) {
          console.warn(`Failed to load frame ${i}, continuing with next frame:`, frameError);
          // Continue with next frame instead of failing completely
          continue;
        }
      }

      // Filter out undefined frames and create a dense array
      const validFrames = newFrameCache.filter((frame) => frame !== undefined);

      // Only mark as loaded if we have at least some frames
      if (validFrames.length > 0) {
        setFrameCache(newFrameCache);
        setFramesLoaded(true);
        setLoadingProgress(1);

        console.log(`Successfully preloaded ${validFrames.length} frames`);

        // Draw the first frame if available
        if (newFrameCache[0] && context) {
          context.putImageData(newFrameCache[0], 0, 0);
        }
      } else {
        throw new Error('No frames were successfully loaded');
      }
    } catch (error) {
      console.error('Error during frame preloading:', error);
      setLoadingProgress(0);
      setFramesLoaded(false);

      // If we have some frames, still use them
      if (newFrameCache.length > 0) {
        console.log(`Using ${newFrameCache.length} partially loaded frames`);
        setFrameCache(newFrameCache);
        setFramesLoaded(true);
        setLoadingProgress(newFrameCache.length / maxFrames);

        if (context) {
          context.putImageData(newFrameCache[0], 0, 0);
        }
      } else {
        // No frames loaded at all, try to show at least the first frame
        console.log('No frames loaded, attempting to show first frame directly...');
        try {
          const video = videoRef.current;
          if (video && video.readyState >= 2) {
            // Set to first frame
            video.currentTime = 0;

            // Wait for seek to complete
            await new Promise<void>((resolve, reject) => {
              const timeout = setTimeout(
                () => reject(new Error('Direct frame seek timeout')),
                5000,
              );

              const onSeeked = () => {
                clearTimeout(timeout);
                video.removeEventListener('seeked', onSeeked);
                resolve();
              };

              video.addEventListener('seeked', onSeeked, { once: true });
            });

            // Draw the first frame directly
            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              setFramesLoaded(true);
              setLoadingProgress(1);
              console.log('Direct frame display successful');
            }
          }
        } catch (directFrameError) {
          console.error('Direct frame display also failed:', directFrameError);
        }
      }
    }
  }, []);

  const initializeVideo = useCallback(async () => {
    const canvas = canvasRef.current;

    if (!canvas || !src) return;

    // Check if video is already initialized
    if (videoInitializedRef.current && videoRef.current && videoRef.current.duration > 0) {
      console.log('Video already initialized, skipping re-initialization');
      return;
    }

    try {
      // Get canvas context
      contextRef.current = canvas.getContext('2d');

      // Create video element only if not already created
      if (!videoRef.current) {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.preload = 'metadata'; // Use metadata to reduce initial loading time
        video.muted = true;
        video.playsInline = true;
        videoRef.current = video;
      }

      // Set up video loading with better readiness checks
      const video = videoRef.current;
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Video loading timeout'));
        }, 30000); // 30 second timeout for video loading

        const cleanup = () => {
          clearTimeout(timeout);
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          video.removeEventListener('canplay', onCanPlay);
          video.removeEventListener('error', onError);
        };

        const onLoadedMetadata = () => {
          console.log('Video metadata loaded, duration:', video.duration);
          // Wait a bit more for the video to be fully ready
          setTimeout(() => {
            if (video.readyState >= 2) {
              // HAVE_CURRENT_DATA
              cleanup();
              resolve();
            }
          }, 500);
        };

        const onCanPlay = () => {
          console.log('Video can play, readyState:', video.readyState);
          if (video.readyState >= 2) {
            // HAVE_CURRENT_DATA
            cleanup();
            resolve();
          }
        };

        const onError = () => {
          cleanup();
          console.error('Error loading video:', src);
          reject(new Error('Failed to load video'));
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);

        // Only set src if it's different from current src
        if (video.src !== src) {
          video.src = src;
        } else if (video.readyState >= 2) {
          // Video is already loaded, resolve immediately
          cleanup();
          resolve();
        }
      });

      // Additional check to ensure video is ready
      if (video.readyState < 2) {
        console.log('Waiting for video to be ready...');
        await new Promise<void>((resolve) => {
          const checkReady = () => {
            if (video.readyState >= 2) {
              resolve();
            } else {
              setTimeout(checkReady, 100);
            }
          };
          checkReady();
        });
      }

      console.log('Video is ready, starting frame preload...');

      // Mark video as initialized
      videoInitializedRef.current = true;

      // Start preloading frames after video is fully ready
      await preloadFrames();
    } catch (error) {
      console.error('Failed to initialize video:', error);

      // Fallback: try to show at least the first frame without preloading
      try {
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
          console.log('Attempting fallback frame display...');

          // Set to first frame
          video.currentTime = 0;

          // Wait for seek to complete
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Fallback seek timeout')), 5000);

            const onSeeked = () => {
              clearTimeout(timeout);
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };

            video.addEventListener('seeked', onSeeked, { once: true });
          });

          // Draw the first frame directly
          const context = contextRef.current;
          const canvas = canvasRef.current;
          if (context && canvas) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            setFramesLoaded(true);
            setLoadingProgress(1);
            console.log('Fallback frame display successful');
          }
        }
      } catch (fallbackError) {
        console.error('Fallback frame display also failed:', fallbackError);
      }
    }
  }, [src, preloadFrames]);

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

          // Regenerate frame cache with new dimensions if video is loaded
          if (videoRef.current && videoRef.current.duration > 0 && videoInitializedRef.current) {
            // Clear existing frame cache and reload with new dimensions
            setFrameCache([]);
            setFramesLoaded(false);
            void preloadFrames();
          } else {
            // Just trigger scroll handler if no video loaded yet
            handleScroll();
          }
        }
      }
    });

    resizeObserverRef.current.observe(canvasContainer);
  }, [handleScroll, preloadFrames]);

  // Duplicate handleScroll removed - using the one defined above

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
          // Trigger initial scroll calculation
          handleScroll();
        } else if (!entry.isIntersecting && currentHasStartedScrubbing) {
          // Stop scrubbing when element is no longer near the viewport
          const rect = canvas.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Stop if element is far above or below viewport (with more generous margin)
          if (rect.bottom < -windowHeight || rect.top > windowHeight * 2) {
            setHasStartedScrubbing(false);
            hasStartedScrubbingRef.current = false;
            window.removeEventListener('scroll', handleScroll);
          } else {
            // Still trigger scroll update even when not intersecting to handle off-screen cases
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
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // Remove scroll listener if it was added
    window.removeEventListener('scroll', handleScroll);

    // Remove window resize listener
    window.removeEventListener('resize', handleWindowResize);

    // Clear resize timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    if (videoRef.current) {
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [handleScroll, handleWindowResize]);

  // Handle canvas resizing separately from video initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;

    if (!canvas || !canvasContainer) return;

    // Call functions directly instead of through callbacks
    // Setup canvas size
    const rect = canvasContainer.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setCanvasWidth(width);
    setCanvasHeight(height);
    canvas.width = width;
    canvas.height = height;

    // Get canvas context
    contextRef.current = canvas.getContext('2d');

    // Load placeholder image immediately if available
    if (placeholderSrc) {
      void loadPlaceholder();
    }

    // Setup resize observer
    setupResizeObserver();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [setupResizeObserver, loadPlaceholder, placeholderSrc]); // Include dependencies

  // Component lifecycle - video initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;

    if (!canvas || !canvasContainer || !src) return;

    let retryCount = 0;
    const maxRetries = 2;

    const attemptInitialization = async () => {
      try {
        await initializeVideo();
      } catch (error) {
        console.error(`Video initialization attempt ${retryCount + 1} failed:`, error);

        if (retryCount < maxRetries) {
          retryCount++;
          console.log(
            `Retrying video initialization (attempt ${retryCount + 1}/${maxRetries + 1})...`,
          );

          // Wait a bit before retrying
          setTimeout(() => {
            void attemptInitialization();
          }, 2000 * retryCount); // Exponential backoff
        } else {
          console.error('All video initialization attempts failed');
        }
      }
    };

    void attemptInitialization();
    setupIntersectionObserver();

    // Add window resize listener
    window.addEventListener('resize', handleWindowResize, { passive: true });

    return cleanup;
  }, [src, initializeVideo, setupIntersectionObserver, cleanup, handleWindowResize]);

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

export default VideoCanvas;
