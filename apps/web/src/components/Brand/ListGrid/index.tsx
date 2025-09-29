import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { isRichTextContent, RichTextContent } from 'apps/web/src/utils/richTextContent';
import classNames from 'classnames';

export type ListContent = {
  id?: string;
  label: RichTextContent;
  description?: RichTextContent;
  items: ListGridItem[];
};

export type ListGridItem = {
  title?: RichTextContent;
  content?: RichTextContent;
};

function chunkArray(array: ListGridItem[], size: number): { id: string; items: ListGridItem[] }[] {
  const result: { id: string; items: ListGridItem[] }[] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    const id = chunk.map(async (item: ListGridItem) => item.title ?? '').join('-') + '-' + i;
    result.push({ id, items: chunk });
  }
  return result;
}

export function ListGrid({ content }: { content: ListContent }) {
  const { id, label, description, items } = content;
  const rows = chunkArray(items, 2);

  for (const item of items) {
    if (item.title && !isRichTextContent(item.title)) {
      console.warn('ListGrid: Invalid title', item.title);
      return null;
    }
    if (item.content && !isRichTextContent(item.content)) {
      console.warn('ListGrid: Invalid content', item.content);
      return null;
    }
  }

  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside title={label} description={description} />
      <div className="col-span-full gap-8 md:col-span-9 lg:col-span-6">
        {rows.map((row, rowIndex) => (
          <div key={row.id} className="grid items-stretch md:grid-cols-2 md:gap-8">
            {row.items.map((item, colIndex) => (
              <div
                key={typeof item.title === 'string' ? item.title : colIndex}
                className={classNames(
                  `flex flex-col gap-3 md:gap-2`,
                  rowIndex !== 0
                    ? 'mb-4 border-t border-[#D9D9E3] pt-4 md:mt-4'
                    : 'mb-4 border-t border-[#D9D9E3] pt-4 md:border-t-0',
                )}
              >
                {item.title && <Text variant={TextVariant.Body}>{item.title}</Text>}
                {item.content && (
                  <Text variant={TextVariant.Body} className="text-[#717886]" as="span">
                    {item.content}
                  </Text>
                )}
              </div>
            ))}
            {row.items.length === 1 && <div className="hidden md:block" />}
          </div>
        ))}
      </div>
    </Container>
  );
}
