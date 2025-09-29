'use client';

import { useMedia } from 'apps/web/src/hooks/useMedia';
import { CameraProps, Canvas } from '@react-three/fiber';
import { memo, useRef } from 'react';
import { Scene } from 'apps/web/src/components/Brand/Hero/Background/scene';
import defaultImg from 'apps/web/public/images/backgrounds/default.webp';

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
  } = finalConfig;

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMedia('(max-width: 1024px)');

  const interactivityEnabled = enableInteractivity && !isMobile;

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
        />
      </Canvas>
    </div>
  );
}

const MemoizedHeroBackground = memo(HeroBackground);

MemoizedHeroBackground.displayName = 'HeroBackground';

export default MemoizedHeroBackground;
