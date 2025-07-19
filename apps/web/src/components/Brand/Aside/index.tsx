import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { RichTextContent, isRichTextContent } from 'apps/web/src/utils/richTextContent';

type AsideProps = {
  prefix?: RichTextContent;
  title: RichTextContent;
  description?: RichTextContent;
  hierarchy?: 'default' | 'large';
};

export function Aside({ prefix, title, description, hierarchy = 'default' }: AsideProps) {
  if (title && !isRichTextContent(title)) {
    console.warn('Aside: Invalid title', title);
    return null;
  }
  if (description && !isRichTextContent(description)) {
    console.warn('Aside: Invalid description', description);
    return null;
  }

  return (
    <div className="col-span-full h-full flex-1 gap-8 md:col-span-3">
      <div className="sticky top-8 z-10 flex flex-col gap-4 self-start pb-4 md:pb-8">
        {prefix && (
          <Text variant={TextVariant.Body} as="span" className="-mb-2 !text-base-gray-150">
            {prefix}
          </Text>
        )}
        <Title level={hierarchy === 'large' ? TitleLevel.H5Regular : TitleLevel.H6Regular} as="h2">
          {title}
        </Title>
        {description && (
          <Text variant={TextVariant.Body} as="span" className="pr-4">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}
