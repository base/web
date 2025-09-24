import Container from 'apps/web/src/components/base-org/Container';
import AsciiFluidScene from 'apps/web/src/components/WebGL/Scenes/AsciiFluidScene';
import spaceCropImg from 'apps/web/public/images/backgrounds/space-crop.webp';
import { AnimatedTitle } from 'apps/web/src/components/base-org/root/Redesign/Hero/AnimatedTitle';

export function Hero() {
  return (
    <Container className="!lg:mb-0 !mb-0 grid-cols-9 gap-y-12 lg:pt-0">
      <div className="relative col-span-full h-[412px] w-full pb-0 lg:h-[40vh] xl:h-[40vh]">
        <AnimatedTitle />

        <div className="absolute inset-0">
          <div className="w-full h-full">
            <AsciiFluidScene
              className="flex w-full h-full"
              imageUrl={spaceCropImg.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
              altPattern={{
                url: '/patterns/pat-strip.png',
                columns: 6,
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
