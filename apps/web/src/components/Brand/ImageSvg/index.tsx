import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Container from 'apps/web/src/components/base-org/Container';
import { Aside } from '../Aside';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import { CopyButton } from 'apps/web/src/components/CopyButton/CopyButton';

type ImageSvgProps = {
  id: string;
  prefix?: string;
  title: RichTextContent;
  description?: RichTextContent;
  svg?: string;
  fullWidth?: boolean;
};

function createSvgMarkup(svg: string) {
  return { __html: svg };
}

export function ImageSvg({
  id,
  prefix,
  title,
  description,
  svg,
  fullWidth = false,
}: ImageSvgProps) {
  const renderVisual = () => {
    if (svg) {
      return (
        <div className="relative flex items-center justify-center w-full h-full py-10 rounded-lg bg-base-gray-25 md:py-40">
          <div className="absolute right-6 top-3">
            <CopyButton text={svg} />
          </div>
          <div
            className="flex items-center justify-center w-full h-full scale-50 md:scale-100"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={createSvgMarkup(svg)}
          />
        </div>
      );
    }
    return null;
  };

  if (fullWidth) {
    return (
      <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
        <div className="col-span-full mb-4 grid w-full flex-1 grid-cols-12 gap-x-[min(2.25vw,_32px)] md:mb-8 lg:col-span-9 lg:grid-cols-9">
          <div className="flex flex-col items-start gap-2 pb-4 col-span-full md:col-span-3 md:pb-0">
            {prefix && (
              <Text variant={TextVariant.Body} as="span" className="text-base-gray-200">
                {prefix}
              </Text>
            )}
            <Title level={TitleLevel.H5Regular} as="h5">
              {title}
            </Title>
          </div>
          <div className="flex flex-col items-start gap-2 col-span-full md:col-span-9 lg:col-span-6">
            {description && (
              <Text variant={TextVariant.Body} as="span">
                {description}
              </Text>
            )}
          </div>
        </div>
        <div className="flex-1 w-full h-full col-span-full lg:col-span-9">{renderVisual()}</div>
      </Container>
    );
  }
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div className="flex-1 h-full gap-8 col-span-full md:col-span-9 lg:col-span-6">
        {renderVisual()}
      </div>
    </Container>
  );
}
