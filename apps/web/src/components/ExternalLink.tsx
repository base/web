import * as React from 'react';

type AnchorBase = Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string;
};

type Props = AnchorBase & {
  /** Домены, которые считаем «внутренними» (включая сабдомены). */
  internalDomains?: string[];
  /** Открывать внешние ссылки в новой вкладке. */
  openExternalInNewTab?: boolean;
};

const ABS_HTTP = /^https?:\/\//i;

/** Протокол-родственная ссылка: //example.com/path */
function isProtocolRelative(href?: string): boolean {
  return typeof href === 'string' && href.startsWith('//');
}

/** Явно относительная ссылка: начинается с /, ./, ../, #, ? или пустая */
function isExplicitRelative(href?: string): boolean {
  if (!href) return true;
  return (
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../') ||
    href.startsWith('#') ||
    href.startsWith('?')
  );
}

/** Абсолютный http(s) URL (включая протокол-родственный) */
function isAbsoluteHttpUrl(href?: string): boolean {
  if (!href) return false;
  return ABS_HTTP.test(href) || isProtocolRelative(href);
}

/** Безопасно получить hostname из абсолютного URL */
function getHostname(href: string): string | null {
  try {
    // поддержим //example.com — допишем https:
    const u = isProtocolRelative(href) ? new URL('https:' + href) : new URL(href);
    return u.hostname.toLowerCase();
  } catch {
    return null;
  }
}

/** Совпадение по домену: exact или *.domain */
function matchesInternal(host: string, internalDomains: string[]): boolean {
  const h = host.toLowerCase();
  return internalDomains.some((d) => {
    const dom = d.trim().toLowerCase();
    return h === dom || h.endsWith('.' + dom);
  });
}

function mergeRel(base: string | undefined, required: string[]) {
  const tokens = new Set((base ?? '').split(/\s+/).filter(Boolean));
  required.forEach((t) => tokens.add(t));
  return tokens.size ? Array.from(tokens).join(' ') : undefined;
}

export default function ExternalLink({
  href,
  children,
  internalDomains = ['base.org'],
  openExternalInNewTab = true,
  rel: propRel,
  target: propTarget,
  ...rest
}: Props) {
  // 1) всё, что не абсолютный http(s), считаем внутренним (якоря, относительные, mailto:, tel:, blob:, data:)
  let external = false;

  if (isAbsoluteHttpUrl(href)) {
    const host = href ? getHostname(href) : null;
    if (host) {
      external = !matchesInternal(host, internalDomains);
    }
  }

  const target = external && openExternalInNewTab ? '_blank' : propTarget;
  const rel = target === '_blank' ? mergeRel(propRel, ['noopener', 'noreferrer']) : propRel;

  return (
    <a {...rest} href={href} target={target} rel={rel}>
      {children}
    </a>
  );
}
