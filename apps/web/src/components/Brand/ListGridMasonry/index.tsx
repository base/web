import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { isRichTextContent, RichTextContent } from 'apps/web/src/utils/richTextContent';

export type ListGridContent = {
  id?: string;
  label: RichTextContent;
  description?: RichTextContent;
  items: ListGridItem[];
  appendix?: React.ReactNode;
};

export type ListGridItem = {
  title?: RichTextContent;
  content?: RichTextContent;
  items?: ListGridItem[];
};

const EMPTY_ARRAY: ListGridItem[] = [];

export function ListGrid({ content }: { content: ListGridContent }) {
  const { id, label, description, items } = content;
  if (!items || items.length === 0) return null;
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside title={label} description={description} />
      <ListGridComponent items={items || EMPTY_ARRAY} />
      {content.appendix && (
        <div className="col-span-full md:col-span-6 md:col-start-4">{content.appendix}</div>
      )}
    </Container>
  );
}

const MAX_NESTING = 3;

function renderItems(items: ListGridItem[], level = 1, isFirstLevel = false) {
  if (level > MAX_NESTING) {
    console.warn(`ListGrid: Nested items deeper than level ${MAX_NESTING} are not rendered.`);
    return null;
  }

  return (
    <ul className={`pl-${level * 2}`}>
      {items.map((item, idx) => (
        <li
          key={
            typeof item.title === 'string'
              ? item.title
              : typeof item.content === 'string'
              ? item.content
              : idx
          }
          className={isFirstLevel ? 'mt-4 border-t border-[#D9D9E3] pt-4 md:mb-4' : 'mb-4'}
        >
          {item.title && isRichTextContent(item.title) && (
            <Text variant={TextVariant.Body} className="mb-2">
              {item.title}
            </Text>
          )}
          <div className="relative mb-4 flex items-start md:mb-5">
            {!isFirstLevel && (
              <span className="mr-2 mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#717886] lg:mt-2.5" />
            )}
            {item.content && isRichTextContent(item.content) ? (
              <Text variant={TextVariant.Body} as="span" className="text-[#717886]">
                {item.content}
              </Text>
            ) : null}
          </div>
          {item.items && renderItems(item.items, level + 1)}
        </li>
      ))}
    </ul>
  );
}

function ListGridComponent({ items }: { items: ListGridItem[] }) {
  return (
    <div className="col-span-full md:col-span-6">
      <div className="columns-1 gap-8 md:columns-2">
        {items.map((group, idx) => (
          <div
            key={
              typeof group.title === 'string'
                ? group.title
                : typeof group.content === 'string'
                ? group.content
                : idx
            }
            className="mb-10 break-inside-avoid md:mb-8"
          >
            {group.title && isRichTextContent(group.title) && (
              <Title level={TitleLevel.H6Regular} as="h6">
                {group.title}
              </Title>
            )}
            {group.content && isRichTextContent(group.content) && (
              <Text variant={TextVariant.Body} as="span" className="mb-2 text-[#ECECEC]">
                {group.content}
              </Text>
            )}
            {group.items && group.items.length > 0 && (
              <div className="flex flex-col">{renderItems(group.items, 1, true)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
