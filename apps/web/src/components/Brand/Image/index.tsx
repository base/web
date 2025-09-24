import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Container from 'apps/web/src/components/base-org/Container';
import { Aside } from '../Aside';
import NextImage from 'next/image';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import { useMemo } from 'react';
import classNames from 'classnames';

export type SvgImport = {
  src: string;
  width: number;
  height: number;
};

export type ImageProps = {
  id: string;
  prefix?: string;
  title?: RichTextContent;
  description?: RichTextContent;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    tag?: RichTextContent;
  }[];
  fullWidth?: boolean;
};

function ImageElement({
  img,
  className,
  fullWidth,
}: {
  img: ImageProps['images'][0];
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={classNames('relative h-full w-full', className)}>
      {img.tag && (
        <span className="absolute left-2 top-2 grid h-6 w-fit place-items-center px-2">
          <Text variant={TextVariant.CaptionMono} as="span" className="!text-base-gray-200">
            {img.tag}
          </Text>
        </span>
      )}
      <NextImage
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        objectFit="contain"
        sizes={fullWidth ? '(max-width: 768px) 100vw, 80vw' : '(max-width: 768px) 100vw, 50vw'}
        quality={99}
        className="h-full w-full rounded-lg"
        draggable={false}
      />
    </div>
  );
}

// renamed cause of linter issue detecting as Image
export function ImageComponent({
  id,
  prefix,
  title,
  description,
  images,
  fullWidth = false,
}: ImageProps) {
  // check images aspect ratios
  const hasUniformSizes = useMemo(() => {
    if (images.length !== 4) return false;
    const firstAspectRatio = images[0].width / images[0].height;
    return images.every((img) => Math.abs(img.width / img.height - firstAspectRatio) < 0.01);
  }, [images]);

  let imagesContent: React.ReactNode;
  if (images.length === 1) {
    imagesContent = <ImageElement img={images[0]} fullWidth={fullWidth} />;
  } else if (images.length === 2) {
    imagesContent = (
      <div className="flex h-full w-full flex-col gap-3 md:gap-6">
        {images.map((img) => (
          <ImageElement img={img} key={`${img.src}-${img.alt}`} className="flex-1" />
        ))}
      </div>
    );
  } else if (images.length === 4) {
    if (hasUniformSizes) {
      // fixed grid for same-sized images
      imagesContent = (
        <div className="grid h-full w-full gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-8">
          {images.map((img) => (
            <ImageElement img={img} key={`${img.src}-${img.alt}`} fullWidth={fullWidth} />
          ))}
        </div>
      );
    } else {
      // masonry-like layout for different sized images
      imagesContent = (
        <div className="w-full gap-8 md:columns-2">
          {images.map((img) => {
            return (
              <div
                className={`mb-8 break-inside-avoid aspect-[${img.width} / ${img.height}]`}
                key={`${img.src}-${img.alt}`}
              >
                <ImageElement img={img} fullWidth={fullWidth} />
              </div>
            );
          })}
        </div>
      );
    }
  } else {
    imagesContent = null;
  }

  if (fullWidth) {
    return (
      <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
        <div className="col-span-full mb-4 grid w-full flex-1 grid-cols-12 gap-x-[min(2.25vw,_32px)] md:mb-8 lg:col-span-9 lg:grid-cols-9">
          <div className="col-span-full flex flex-col items-start gap-2 pb-4 md:col-span-3 md:pb-0">
            {prefix && (
              <Text variant={TextVariant.Body} as="span" className="text-base-gray-200">
                {prefix}
              </Text>
            )}
            <Title level={TitleLevel.H5Regular} as="h5">
              {title}
            </Title>
          </div>
          <div className="col-span-full flex flex-col items-start gap-2 md:col-span-6">
            {description && (
              <Text variant={TextVariant.Body} as="span">
                {description}
              </Text>
            )}
          </div>
        </div>
        <div className="col-span-full h-full w-full flex-1 lg:col-span-9">{imagesContent}</div>
      </Container>
    );
  }
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      {title && <Aside prefix={prefix} title={title} description={description} />}
      <div className="relative col-span-full h-full flex-1 gap-8 md:col-span-9 lg:col-span-6">
        {imagesContent}
      </div>
    </Container>
  );
}
