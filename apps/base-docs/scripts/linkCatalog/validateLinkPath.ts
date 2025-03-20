import fs from 'fs';

export function validateLinkPath(path: string) {
  const resolvedPath = 'apps/base-docs/docs/pages' + path;

  if (
    fs.existsSync(resolvedPath) ||
    fs.existsSync(resolvedPath + '.mdx') ||
    fs.existsSync(resolvedPath + '.md')
  ) {
    return true;
  }

  return false;
}
