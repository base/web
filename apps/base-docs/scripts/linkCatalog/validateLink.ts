import { validateLinkPath } from './validateLinkPath.ts';

export async  function validateLink(href: string) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return await validateExternalLink(href);
  }
  return validateInternalLink(href);
}

export function validateInternalLink(href: string) {
  const [path] = href.split('#');

  if (path) {
    return validateLinkPath(path);
  }

  return false;
}

export async function validateExternalLink(href: string) {
  try {
    const res = await fetch(href, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(2000),
    });

    return res.status < 400;
  } catch {
    return false;
  }
}
