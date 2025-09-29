import Container from 'apps/web/src/components/base-org/Container';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import NextImage from 'next/image';

type GridContent = {
  id: string;
  prefix?: string;
  title: string;
  description: RichTextContent;
  images: GridImage[];
};

// Define the image type
export type GridImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ImageGrid({ content }: { content: GridContent }) {
  const { id, prefix, title, description, images } = content;
  return (
    <Container className="border-t border-[#0A0B0D] pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div className="col-span-full grid w-full gap-4 md:col-span-9 md:grid-cols-3 md:grid-rows-3 md:gap-8 lg:col-span-6">
        {images.map((img) => (
          <NextImage
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            quality={99}
            className="aspect-square h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
            key={img.alt}
          />
        ))}
      </div>
    </Container>
  );
}
