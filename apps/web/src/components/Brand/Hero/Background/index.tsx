'use client';

import { useMedia } from 'apps/web/src/hooks/useMedia';
import { CameraProps, Canvas } from '@react-three/fiber';
import { memo, useRef, useMemo } from 'react';
import { Scene } from 'apps/web/src/components/Brand/Hero/Background/scene';
import defaultImg from 'apps/web/public/images/backgrounds/default.webp';
import { hexToRgb } from 'apps/web/src/utils/shaderUtils';

type AltPatternAtlas = {
  url: string;
  columns: number;
};

const DEFAULT_BACKGROUND_IMAGE = defaultImg.src;
const CANVAS_STYLE = { width: '100%', height: '100%' };
const CANVAS_RESIZE_CONFIG = { scroll: false, debounce: { scroll: 50, resize: 0 } };
const CAMERA_CONFIG = {
  position: [0, 0, 10],
  zoom: 120,
  near: 0.1,
  far: 15,
};

export type HeroBackgroundConfig = {
  imageUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  verticalAlign?: 'top' | 'center' | 'bottom';
  enableInteractivity?: boolean;
  altPattern?: AltPatternAtlas;
  greyscale?: boolean;
  useImageColors?: boolean;
  radius?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  bottomFade?: boolean;
  sideFade?: boolean;
  backgroundColor?: string; // Hex color code (e.g., "#ffffff" or "#000000")
  primaryColor?: string; // Hex color code (e.g., "#ff0000") - applied to some halftone tiles
};

const DEFAULT_CONFIG: HeroBackgroundConfig = {
  imageUrl: DEFAULT_BACKGROUND_IMAGE,
  className: 'w-full h-full',
  minWidth: 300,
  maxWidth: 2400,
  minHeight: 200,
  maxHeight: 1200,
  enableInteractivity: true,
  greyscale: false,
  useImageColors: false,
  radius: 0.25,
  velocityDissipation: 0.94,
  densityDissipation: 0.98,
  bottomFade: false,
  sideFade: false,
};

type HeroBackgroundProps = {
  config?: HeroBackgroundConfig;
};

function HeroBackground({ config = {} }: HeroBackgroundProps) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const {
    imageUrl,
    className,
    style,
    enableInteractivity,
    altPattern,
    greyscale,
    useImageColors,
    radius,
    velocityDissipation,
    densityDissipation,
    bottomFade,
    sideFade,
    backgroundColor,
    primaryColor,
  } = finalConfig;

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMedia('(max-width: 1024px)');

  const interactivityEnabled = enableInteractivity && !isMobile;

  // Convert hex color to normalized RGB (0-1 range) for shader
  const backgroundColorRgb = useMemo(() => {
    if (!backgroundColor) return null;
    try {
      const rgb = hexToRgb(backgroundColor);
      if (!rgb) return null;
      return {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
      };
    } catch {
      return null;
    }
  }, [backgroundColor]);

  // Convert primary color hex to normalized RGB (0-1 range) for shader
  const primaryColorRgb = useMemo(() => {
    if (!primaryColor) return null;
    try {
      const rgb = hexToRgb(primaryColor);
      if (!rgb) return null;
      return {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
      };
    } catch {
      return null;
    }
  }, [primaryColor]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <Canvas
        style={CANVAS_STYLE}
        resize={CANVAS_RESIZE_CONFIG}
        orthographic
        camera={CAMERA_CONFIG as CameraProps}
      >
        <Scene
          imageUrl={imageUrl ?? DEFAULT_BACKGROUND_IMAGE}
          enableInteractivity={interactivityEnabled}
          altPattern={altPattern}
          greyscale={greyscale ?? false}
          useImageColors={useImageColors ?? false}
          radius={radius}
          velocityDissipation={velocityDissipation}
          densityDissipation={densityDissipation}
          bottomFade={bottomFade}
          sideFade={sideFade}
          backgroundColor={backgroundColorRgb}
          primaryColor={primaryColorRgb}
        />
      </Canvas>
    </div>
  );
}

const MemoizedHeroBackground = memo(HeroBackground);

MemoizedHeroBackground.displayName = 'HeroBackground';

export default MemoizedHeroBackground;
