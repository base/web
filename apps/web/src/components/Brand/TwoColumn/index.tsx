import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import NextImage from 'next/image';

type ColumnItem = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  content: RichTextContent;
};

type TwoColumnContent = {
  id: string;
  prefix?: string;
  title: string;
  description: string;
  columnOne: ColumnItem;
  columnTwo: ColumnItem;
};

export function TwoColumn({ content }: { content: TwoColumnContent }) {
  const { id, prefix, title, description, columnOne, columnTwo } = content;
  return (
    <Container className="border-t border-[#0A0B0D] pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div className="col-span-full grid grid-cols-6 gap-3 md:col-span-6 md:gap-8">
        <div className="col-span-3 flex flex-col">
          <div className="flex flex-col gap-4">
            <NextImage
              src={columnOne.image.src}
              alt={columnOne.image.alt}
              width={columnOne.image.width}
              height={columnOne.image.height}
              objectFit="contain"
              quality={99}
              className="h-full w-full"
              draggable={false}
            />
            <Text variant={TextVariant.Body} as="span">
              {columnOne.content}
            </Text>
          </div>
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="flex flex-col gap-4">
            <NextImage
              src={columnTwo.image.src}
              alt={columnTwo.image.alt}
              width={columnTwo.image.width}
              height={columnTwo.image.height}
              objectFit="contain"
              quality={99}
              className="h-full w-full"
              draggable={false}
            />
            <Text variant={TextVariant.Body} as="span">
              {columnTwo.content}
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
}
