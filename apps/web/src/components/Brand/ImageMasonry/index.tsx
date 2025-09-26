import Container from 'apps/web/src/components/base-org/Container';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import NextImage from 'next/image';

type MasonryContent = {
  id: string;
  prefix?: string;
  title: string;
  description?: RichTextContent;
  images: MasonryImage[];
};

// Define the image type
export type MasonryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ImageMasonry({ id, prefix, title, description, images }: MasonryContent) {
  return (
    <Container className="border-t border-[#0A0B0D] pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div className="col-span-6 gap-8 w-full columns-2">
        {images.map((img) => (
          <div key={img.alt} className="mb-8 break-inside-avoid">
            <NextImage
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              quality={99}
              draggable={false}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
