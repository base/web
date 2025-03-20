import fs from 'fs';
import type { PageLinkCatalog } from './createLinkCatalog.ts';

/**
 * Creates a CSV file with the page path and all links in the file.
 */
export async function createLinkCatalogJson(pages: PageLinkCatalog[], linkType: 'all' | 'broken') {
  console.log(pages);
  if (linkType === 'all') {
    fs.writeFileSync(
      `apps/base-docs/scripts/linkCatalog/link-catalog-all.json`,
      JSON.stringify(pages, null, 2),
    );
    return;
  }

  const pagesWithBrokenLinks: PageLinkCatalog[] = [];
  for (const page of pages) {
    const pagePath = Object.keys(page)[0];
    const brokenLinks = page[pagePath].links.filter((link) => !link.valid);
    if (brokenLinks.length !== 0) {
      pagesWithBrokenLinks.push({
        [pagePath]: {
          links: brokenLinks,
        },
      });
    }
  }

  fs.writeFileSync(
    `apps/base-docs/scripts/linkCatalog/link-catalog-broken.json`,
    JSON.stringify(pagesWithBrokenLinks, null, 2),
  );
  return;
}
