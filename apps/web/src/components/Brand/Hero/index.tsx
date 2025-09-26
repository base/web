import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import { useMemo } from 'react';

type AltPatternAtlas = {
  url: string;
  columns: number;
};

type HeroProps = {
  title: string;
  imageUrl?: string;
  altPattern?: AltPatternAtlas;
  greyscale?: boolean;
  useImageColors?: boolean;
  auraAmount?: number;
  size?: number;
};

/**
 * Hero component variants:
 *
 * @param title - Heading text
 * @param imageUrl - Optional - Background image URL. Defaults to default.webp
 * @param altPattern - Optional - Alternative pattern atlas with url and columns. Defaults to colored pattern
 * @param greyscale - Optional - Applies greyscale to pattern (saturation = 0, pattern opacity = 0.25)
 * @param useImageColors - Optionall - Uses the image's original colors
 * @param auraAmount - Optional - Amount of aura to apply to the background
 * @param size - Optional - Size of the brush
 */

export function Hero({
  title,
  imageUrl,
  altPattern,
  greyscale,
  useImageColors,
  auraAmount = 0.94,
  size = 0.25,
}: HeroProps) {
  const heroBackgroundConfig = useMemo(
    () => ({
      className: 'h-full w-full',
      imageUrl: imageUrl,
      enableInteractivity: true,
      altPattern: altPattern,
      greyscale: greyscale,
      useImageColors: useImageColors,
      velocityDissipation: auraAmount,
      radius: size,
    }),
    [imageUrl, altPattern, greyscale, useImageColors, auraAmount, size],
  );

  return (
    <Container>
      <div className="relative z-20 col-span-full h-[412px] w-full pb-0 md:col-span-7 lg:h-[607px]">
        <Title level={TitleLevel.H3Regular} as="h1" className="ml-4 text-nowrap lg:-mt-3.5">
          {title}
        </Title>
      </div>
      <div className="absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
        <HeroBackground config={heroBackgroundConfig} />
      </div>
    </Container>
  );
}
