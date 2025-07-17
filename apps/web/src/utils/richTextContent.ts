import React, { ReactElement, isValidElement } from 'react';

export type AllowedTags = 'a' | 'b' | 'u' | 'i' | 'span' | 'svg' | 'ol' | 'li' | 'br' | 'p';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RichTextContent = string | ReactElement<{ children?: RichTextContent }, any>;

/**
 * Checks if a node is a string or a ReactElement of allowed tags (including fragments).
 */
export function isRichTextContent(node: RichTextContent): boolean {
  if (typeof node === 'string') return true;
  if (isValidElement(node)) {
    if (typeof node.type === 'function') {
      return true;
    }
    if (node.type === React.Fragment) {
      const children = node.props.children;
      if (Array.isArray(children)) {
        return children.every(isRichTextContent);
      }
      if (children === undefined) return false;
      return isRichTextContent(children);
    }
    const allowedTags: AllowedTags[] = ['a', 'b', 'u', 'i', 'span', 'svg', 'ol', 'li', 'br', 'p'];
    return allowedTags.includes(node.type as AllowedTags);
  }
  return false;
}
