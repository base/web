import { Button, ButtonSizes } from 'apps/web/src/components/Button/Redesign/Button';

import Container from 'apps/web/src/components/base-org/Container';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';
import type { HeroBackgroundConfig } from 'apps/web/src/components/Brand/Hero/Background';

type ButtonProps = {
  text: string;
  href: string;
};

type HalftoneProps = {
  imageUrl: string;
  backgroundColor?: string;
  primaryColor?: string; // Hex color code (e.g., "#ff0000") - applied to some halftone tiles
  altPattern?: {
    url: string;
    columns: number;
  };
  bottomFade?: boolean;
};

export function Halftone({
  imageUrl,
  backgroundColor,
  primaryColor,
  altPattern = {
    url: '/patterns/pat-colorful.png',
    columns: 6,
  },
  bottomFade = true,
}: HalftoneProps) {
  const heroBackgroundConfig: HeroBackgroundConfig = {
    imageUrl: imageUrl,
    altPattern: {
      url: altPattern.url,
      columns: altPattern.columns,
    },
    className: 'h-full w-full',
    enableInteractivity: true,
    velocityDissipation: 0.94,
    radius: 0.1,
    bottomFade: bottomFade,
    backgroundColor: backgroundColor,
    primaryColor: primaryColor,
  };
  return (
    <div className="relative inset-0 h-full w-full">
      <div className="pointer-events-auto absolute inset-0 z-10 overflow-hidden">
        <HeroBackground config={heroBackgroundConfig} />
      </div>
    </div>
  );
}
