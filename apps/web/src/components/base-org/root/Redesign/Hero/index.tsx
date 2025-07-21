import Container from 'apps/web/src/components/base-org/Container';
import AsciiFluidScene from 'apps/web/src/components/WebGL/Scenes/AsciiFluidScene';
import defaultImg from 'apps/web/public/images/backgrounds/default.webp';
import { AnimatedTitle } from 'apps/web/src/components/base-org/root/Redesign/Hero/AnimatedTitle';

export function Hero() {
  return (
    <Container className="grid-cols-9 gap-y-12 lg:pt-0">
      <div className="relative col-span-full h-[412px] w-full pb-0 lg:h-[670px] xl:h-[870px]">
        <AnimatedTitle />

        <div className="absolute inset-0">
          <div className="h-full w-full">
            <AsciiFluidScene
              className="flex h-full w-full"
              imageUrl={defaultImg.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
