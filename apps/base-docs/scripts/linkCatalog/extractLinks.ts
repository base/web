import type { Root, RootContent } from 'mdast';

/**
 * Recursively extracts all links from file content.
 */
export function extractLinks(fileContent: Root | RootContent) {
  const links: string[] = [];
  if (hasChildren(fileContent)) {
    for (const node of fileContent.children) {
      if (node.type === 'link') {
        links.push(node.url);
      }
      if (node.type === 'html') {
        const htmlLinks = Array.from(node.value.matchAll(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g));
        for (const htmlLink of htmlLinks) {
          links.push(htmlLink[1]);
        }
      }

      if (hasChildren(node) && node.children.length > 0) {
        const childLinks = extractLinks(node);
        links.push(...childLinks);
      }
    }
  }

  return links;
}

function hasChildren(
  node: Root | RootContent,
): node is Root | (RootContent & { children: RootContent[] }) {
  return 'children' in node && Array.isArray(node.children);
}
