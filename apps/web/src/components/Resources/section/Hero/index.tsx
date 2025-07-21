import Container from 'apps/web/src/components/base-org/Container';
import AsciiFluidScene from 'apps/web/src/components/WebGL/Scenes/AsciiFluidScene';
import defaultImg from 'apps/web/public/images/backgrounds/wasp.webp';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';

export function ResourcesHero() {
  return (
    <Container className="grid-cols-9 gap-y-12 lg:pt-0">
      <div className="relative col-span-full h-[412px] w-full pb-0 lg:h-[670px] xl:h-[870px]">
        <AnimatedTitle titleLines={['Resources', 'for Builders']} />

        <div className="absolute inset-0">
          <div className="w-full h-full">
            <AsciiFluidScene
              className="flex w-full h-full"
              imageUrl={defaultImg.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
            />
          </div>
        </div>
      </div>

      <Title
        level={TitleLevel.H5Regular}
        as="h2"
        className="col-span-full row-start-2 row-end-3 lg:col-span-5"
      >
        Get help to build and grow your project on Base with our Builder Resource Kit.
      </Title>
    </Container>
  );
}
