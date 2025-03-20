import { createLinkCatalog } from './createLinkCatalog.ts';
import { createLinkCatalogCsv } from './createLinkCatalogCsv.ts';
import { createLinkCatalogJson } from './createLinkCatalogJson.ts';



const linkType = process.argv[2] as `all` | `broken`; // linkType: 'all' or 'broken'
const outputType = process.argv[3] as `json` | `csv`; // outputType: 'json' or 'csv'
const file = process.argv[4]; // file: null (default, returns all files) or 'app/base-docs/docs/pages/<file>'

/**
 * Creates a link catalog for the given file.
 * initiated via `npx tsx apps/base-docs/scripts/linkCatalog/linkCatalog.ts <linkType> <outputType> <file>`
 *
 * arguments (optional):
 * linkType: accepts `all` (default) or `broken`
 * output: accepts `json` (default) or `csv`
 * file: accepts null (default, returns all files) or `app/base-docs/docs/pages/<file>`
 */
async function linkCatalog() {
  const pages = await createLinkCatalog(file);
  if (outputType === 'csv') {
    return createLinkCatalogCsv(pages, linkType);
  } else {
    return createLinkCatalogJson(pages, linkType);
  }
}

void linkCatalog();
