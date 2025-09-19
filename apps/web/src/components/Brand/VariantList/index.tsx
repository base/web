import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { Aside } from 'apps/web/src/components/Brand/Aside';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { RichTextContent } from 'apps/web/src/utils/richTextContent';
import Image from 'next/image';
import classNames from 'classnames';

export type ImageItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VariantsProps = {
  id: string;
  prefix?: string;
  title: RichTextContent;
  description?: RichTextContent;
  content: {
    tag: string | RichTextContent;
    items: ImageItem[] | RichTextContent[];
  }[];
  useImgsNaturalSize?: boolean;
  respectColsOnMobile?: boolean;
  fullWidth?: boolean;
  columns?: 1 | 2 | 3;
};

export function VariantListComponent({
  fullWidth,
  id,
  prefix,
  title,
  description,
  content,
  useImgsNaturalSize,
  respectColsOnMobile,
  columns = 1,
}: VariantsProps) {
  if (fullWidth) {
    return (
      <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
        <div className="col-span-full mb-4 grid w-full flex-1 grid-cols-12 gap-x-[min(2.25vw,_32px)] gap-y-4 md:mb-8 md:gap-y-0 lg:col-span-9 lg:grid-cols-9">
          <div
            className={classNames(
              'col-span-3 flex flex-col items-start gap-2',
              !description && 'col-span-full',
            )}
          >
            {prefix && (
              <Text variant={TextVariant.Body} as="span" className="!text-base-gray-150">
                {prefix}
              </Text>
            )}
            <Title level={TitleLevel.H6Regular} as="h6">
              {title}
            </Title>
          </div>
          <div className="col-span-full flex flex-col items-start gap-2 md:col-span-9 lg:col-span-6">
            {description && (
              <Text variant={TextVariant.Body} as="span">
                {description}
              </Text>
            )}
          </div>
        </div>
        <div className="col-span-full h-full w-full flex-1 lg:col-span-9">
          <VariantsContent
            respectColsOnMobile={respectColsOnMobile}
            useImgsNaturalSize={useImgsNaturalSize}
            content={content}
            columns={columns}
          />
        </div>
      </Container>
    );
  }
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside prefix={prefix} title={title} description={description} />
      <div className="relative col-span-full h-full flex-1 gap-8 md:col-span-9 lg:col-span-6">
        <VariantsContent
          respectColsOnMobile={respectColsOnMobile}
          useImgsNaturalSize={useImgsNaturalSize}
          content={content}
          columns={columns}
        />
      </div>
    </Container>
  );
}

function VariantsContent({
  content,
  useImgsNaturalSize = false,
  respectColsOnMobile,
  columns = 1,
}: {
  content: VariantsProps['content'];
  useImgsNaturalSize?: boolean;
  respectColsOnMobile?: boolean;
  columns?: 1 | 2 | 3;
}) {
  // find maximum width among all image items
  const maxWidth = content.reduce((max: number, { items }): number => {
    if (
      Array.isArray(items) &&
      items.length > 0 &&
      typeof items[0] === 'object' &&
      'src' in items[0] &&
      typeof items[0].width === 'number'
    ) {
      return (items as ImageItem[]).reduce((m, item) => Math.max(m, item.width), max);
    }
    return max;
  }, 0);

  function chunkArray(
    array: typeof content,
    size: number,
  ): { id: string; items: typeof content }[] {
    const result: { id: string; items: typeof content }[] = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      const id = chunk.map((item) => item.tag).join('-') + '-' + i;
      result.push({ id, items: chunk });
    }
    return result;
  }

  // multi-column layout (2 or 3 columns)
  if (columns > 1) {
    const rows = chunkArray(content, columns);
    const positions = columns === 2 ? ['left', 'right'] : ['left', 'center', 'right'];

    return (
      <div className="flex flex-col gap-8">
        {rows.map((row) => (
          <div
            key={row.id}
            className={classNames(
              `grid items-start gap-8`,
              columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
              respectColsOnMobile && columns === 2 && 'grid-cols-2',
              respectColsOnMobile && columns === 3 && 'grid-cols-3',
            )}
          >
            {Array.from({ length: columns }, (_, index) => (
              <div key={index} className="flex flex-col">
                {row.items[index] && (
                  <VariantItem
                    key={`${row.items[index].tag}-${positions[index]}`}
                    tag={row.items[index].tag}
                    items={row.items[index].items}
                    maxWidth={maxWidth}
                    useNaturalSize={useImgsNaturalSize}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {content.map((item) => {
        const items = item.items;
        let itemKey = `${item.tag}-`;
        if (Array.isArray(items)) {
          itemKey += items
            .map((it) => (typeof it === 'object' && 'src' in it ? it.src : JSON.stringify(it)))
            .join('-');
        } else {
          itemKey += JSON.stringify(items ?? '').slice(0, 20);
        }

        return <VariantItem key={itemKey} tag={item.tag} items={items} maxWidth={maxWidth} />;
      })}
    </div>
  );
}

function VariantItem({
  tag,
  items,
  maxWidth,
  useNaturalSize = false,
}: {
  tag: string | RichTextContent;
  items: ImageItem[] | RichTextContent[];
  maxWidth: number;
  useNaturalSize?: boolean;
}) {
  // Helper to render a single image
  const renderImage = (item: ImageItem, idx: number) => (
    <div
      key={item.src + idx}
      className={classNames(
        `relative rounded-lg bg-base-gray-25 p-4`,
        useNaturalSize && 'flex items-center',
      )}
    >
      <div
        style={
          useNaturalSize
            ? {
                width: `${item.width}px`,
                aspectRatio: `${item.width} / ${item.height}`,
              }
            : {
                width: `${(item.width / maxWidth) * 100}%`,
                aspectRatio: `${item.width} / ${item.height}`,
              }
        }
        className="relative"
      >
        <Image
          src={item.src}
          alt={item.alt}
          draggable={false}
          fill
          className="h-full w-full object-contain"
          sizes={useNaturalSize ? `${item.width}px` : `${(item.width / maxWidth) * 100}vw`}
        />
      </div>
    </div>
  );

  return (
    <div className="border-t border-base-gray-100 pt-4">
      <span className="mb-4 grid w-fit place-items-center rounded-lg bg-base-gray-50 px-2 py-1">
        <Text variant={TextVariant.CaptionMono} as="span">
          {tag}
        </Text>
      </span>
      {Array.isArray(items) &&
      items.length > 0 &&
      typeof items[0] === 'object' &&
      'src' in items[0] ? (
        <div className="flex flex-col gap-8">
          {(items as ImageItem[]).map((img, idx) => renderImage(img, idx))}
        </div>
      ) : Array.isArray(items) ? (
        <div
          className={classNames(
            'mt-4 flex h-full flex-col gap-4 rounded-lg bg-base-gray-25 p-4 lg:gap-2',
            useNaturalSize && 'justify-center',
          )}
        >
          {(items as RichTextContent[]).map((node) => (
            <span key={typeof node === 'string' ? node : JSON.stringify(node)}>{node}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
