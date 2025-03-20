import fs from 'fs';
import type { PageLinkCatalog } from './createLinkCatalog.ts';

type Link = {
  href: string;
  valid: boolean;
};

/**
 * Creates a CSV file with the page path and all links in the file.
 */
export async function createLinkCatalogCsv(pages: PageLinkCatalog[], linkType: 'all' | 'broken') {
  const rows: [string, Link][] = [];
  for (const page of pages) {
    const pagePath = Object.keys(page)[0];
    const links = page[pagePath].links;
    for (const link of links) {
      const row: [string, Link] = [pagePath, link];
      rows.push(row);
    }
  }

  const csvContent = ['page, href, valid\n'];
  for (const [page, link] of rows) {
    if (linkType === 'all' || (linkType === 'broken' && !link.valid)) {
      csvContent.push(`${page}, ${link.href}, ${link.valid}`);
    }
  }

  fs.writeFileSync(
    `apps/base-docs/scripts/linkCatalog/link-catalog-${linkType}.csv`,
    csvContent.join('\n'),
  );
}
