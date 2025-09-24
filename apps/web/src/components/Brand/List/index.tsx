import Container from 'apps/web/src/components/base-org/Container';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import classNames from 'classnames';
import React from 'react';
import { ReactElement, isValidElement } from 'react';
import { handleInvalidComponentContent } from 'apps/web/src/utils/handleInvalidComponentContent';
import { Aside } from 'apps/web/src/components/Brand/Aside';

type AllowedTags = 'a' | 'b' | 'u' | 'i' | 'span';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllowedContent = string | ReactElement<{ children?: AllowedContent }, any>;

export type ListContent = {
  id?: string;
  label: string;
  description?: string;
  items: {
    content: AllowedContent;
  }[];
  hierarchy: 'lg' | 'md' | 'sm';
};

function isAllowedContent(node: AllowedContent): boolean {
  if (typeof node === 'string') return true;
  if (isValidElement(node)) {
    if (node.type === React.Fragment) {
      const children = node.props.children;
      if (Array.isArray(children)) {
        return children.every(isAllowedContent);
      }
      if (children === undefined) return false; // ensure every item has visible content
      return isAllowedContent(children);
    }
    const allowedTags: AllowedTags[] = ['a', 'b', 'u', 'i', 'span'];
    return allowedTags.includes(node.type as AllowedTags);
  }
  return false;
}

function TextComponent({
  content,
  hierarchy,
}: {
  content: AllowedContent;
  hierarchy: 'lg' | 'md' | 'sm';
}) {
  if (handleInvalidComponentContent(!isAllowedContent(content), 'List', content)) {
    return null;
  }
  switch (hierarchy) {
    case 'lg':
      return (
        <Title level={TitleLevel.H5Regular} as="span">
          {content}
        </Title>
      );
    case 'md':
      return (
        <Title level={TitleLevel.H6Regular} as="span">
          {content}
        </Title>
      );
    case 'sm':
      return (
        <Text variant={TextVariant.Body} as="span">
          {content}
        </Text>
      );
  }
}

export function List({ content }: { content: ListContent }) {
  const { id, label, description, items, hierarchy } = content;
  return (
    <Container className="border-t border-[#0A0B0D] pt-4 md:pt-5" id={id}>
      <Aside title={label} description={description} />
      <div className="flex flex-col col-span-full md:col-span-9 lg:col-span-6">
        {items.map((item, index) => (
          <div
            key={typeof item.content === 'string' ? item.content : index}
            className={classNames(
              'flex flex-col gap-4 pb-4 md:pb-8',
              index !== items.length - 1 && 'border-b border-base-gray-100',
              index !== 0 && 'pt-4',
              index === 0 && 'border-t border-base-gray-100 pt-4 md:border-none md:pt-0',
            )}
          >
            <TextComponent content={item.content} hierarchy={hierarchy} />
          </div>
        ))}
      </div>
    </Container>
  );
}
