import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import defaultImg from 'apps/web/public/images/backgrounds/default.webp';
import { ReactNode } from 'react';
import cx from 'classnames';
import AsciiFluidSceneBuilders from 'apps/web/app/(base-org-dark)/(builders)/AsciiFluidSceneBuilders';

export function BuildersContainer({
  children,
  title,
  asciiImageSrc,
  asciiImageContainerClassName,
  titleClassName,
  sectionClassName,
}: {
  children: React.ReactNode;
  title: ReactNode;
  asciiImageSrc?: string;
  asciiImageContainerClassName?: string;
  titleClassName?: string;
  sectionClassName?: string;
}) {
  return (
    <>
      <div id="webgl-canvas" className="overflow-hidden absolute top-0 left-0 w-full h-full">
        <div className="-z-1 h-[40vh] w-full">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="gap-y-[144px] pt-[64px] font-sans md:gap-y-[168px] md:pt-[60px] lg:pt-6">
        <section className={cx('relative col-span-12', sectionClassName)}>
          <div className={cx('absolute inset-0', asciiImageContainerClassName)}>
            <div className="w-full h-full">
              <AsciiFluidSceneBuilders
                className="flex w-full h-full"
                imageUrl={asciiImageSrc ?? defaultImg.src}
                enableInteractivity
                greyscale={false}
                radius={0.35}
                velocityDissipation={0.9}
                darkMode
              />
            </div>
          </div>
          <Title
            level={TitleLevel.H0Medium}
            as="h1"
            className={cx('mb-[240px] md:mb-[500px]', titleClassName)}
          >
            {title}
          </Title>
        </section>
        {children}
      </Container>
    </>
  );
}
