import React from 'react';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { handleInvalidComponentContent } from 'apps/web/src/utils/handleInvalidComponentContent';

const ALLOWED_INLINE_ELEMENTS = [
  'span',
  'strong',
  'em',
  'b',
  'i',
  'p',
  'u',
  'a',
  'code',
  'img',
  'small',
  'sub',
  'sup',
  'mark',
  'abbr',
  'cite',
  'q',
  's',
  'del',
  'ins',
  'kbd',
  'samp',
  'var',
  'time',
  'br',
  'wbr',
];

function validContent(node: React.ReactNode): boolean {
  if (typeof node === 'string' || typeof node === 'number' || node == null) {
    return true;
  }
  if (Array.isArray(node)) {
    return node.every((child: React.ReactNode) => validContent(child));
  }
  if (React.isValidElement(node)) {
    if (!(typeof node.type === 'string' && ALLOWED_INLINE_ELEMENTS.includes(node.type))) {
      return false;
    }
    return validContent(node.props.children as React.ReactNode);
  }
  return false;
}

export function Banner({ children }: { children: React.ReactNode }) {
  if (handleInvalidComponentContent(!validContent(children), 'Banner', children)) {
    return null;
  }

  return (
    <Container className="border-t border-[#0A0B0D] !pb-0 pt-4 md:!mb-[88px] md:pt-5">
      <div className="col-span-full">
        <Title level={TitleLevel.H6Regular} as="span" className="!text-pretty">
          {children}
        </Title>
      </div>
    </Container>
  );
}
