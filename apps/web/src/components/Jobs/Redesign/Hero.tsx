import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import AsciiFluidScene from 'apps/web/src/components/WebGL/Scenes/AsciiFluidScene';
import jobs from 'apps/web/public/images/backgrounds/jobs.webp';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';

export function Hero() {
  return (
    <Container className="gap-y-10 lg:pt-0">
      <div className="relative col-span-full h-[412px] w-full pb-0 lg:h-[670px] xl:h-[870px]">
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <AsciiFluidScene
              className="flex w-full h-full"
              imageUrl={jobs.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
            />
          </div>
        </div>

        <AnimatedTitle titleLines={['Join our team']} />
      </div>

      <Title
        level={TitleLevel.H5Regular}
        as="h2"
        className="col-span-full row-start-2 row-end-3 lg:col-span-5"
      >
        Help build the future of onchain. Explore open roles and be part of what&apos;s next.
      </Title>
    </Container>
  );
}
