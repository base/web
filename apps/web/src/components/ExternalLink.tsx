import * as React from 'react';

type AnchorBase = Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string;
};

type Props = AnchorBase & {
  /** Человекочитаемое имя для aria-label (если не передан aria-label напрямую). */
  name?: string;
  /** Домены, которые считаем «внутренними» (включая сабдомены). */
  internalDomains?: string[];
  /** Внешние ссылки открывать в новой вкладке (если target не задан вручную). */
  openExternalInNewTab?: boolean;
  /** Показ иконки ↗︎: true | false | "auto" (по умолчанию "auto" = только для внешних). */
  showIcon?: boolean | 'auto';
  /** Позиция иконки, если она показывается. */
  iconPosition?: 'end' | 'start';
  /** Доп.класс к иконке. */
  iconClassName?: string;
};

const ABS_HTTP = /^https?:\/\//i;

/** Протокол-родственная ссылка: //example.com/path */
function isProtocolRelative(href?: string): boolean {
  return typeof href === 'string' && href.startsWith('//');
}

/** Абсолютный http(s) URL (включая протокол-родственный) */
function isAbsoluteHttpUrl(href?: string): boolean {
  if (!href) return false;
  return ABS_HTTP.test(href) || isProtocolRelative(href);
}

/** Безопасно получить hostname из абсолютного URL */
function getHostname(href: string): string | null {
  try {
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

/** Простой вытягиватель текста из children, если это ровно строка. */
function getChildrenText(children: React.ReactNode): string | undefined {
  return typeof children === 'string' ? children : undefined;
}

export default function ExternalLink({
  href,
  children,
  className,
  name,
  internalDomains = ['base.org'],
  openExternalInNewTab = true,
  showIcon = 'auto',
  iconPosition = 'end',
  iconClassName,
  rel: propRel,
  target: propTarget,
  title,
  ...rest
}: Props) {
  // 1) Определяем внешняя/внутренняя
  let external = false;
  if (isAbsoluteHttpUrl(href)) {
    const host = href ? getHostname(href) : null;
    if (host) external = !matchesInternal(host, internalDomains);
  }

  // 2) Решаем target (приоритет у явно переданного target)
  const target = propTarget ?? (external && openExternalInNewTab ? '_blank' : undefined);

  // 3) rel: мёрджим noopener noreferrer если будет новая вкладка
  const rel = target === '_blank' ? mergeRel(propRel, ['noopener', 'noreferrer']) : propRel;

  // 4) aria-label
  // Если пользователь передал aria-label вручную — используем его, иначе сконструируем.
  const providedAriaLabel = (rest as any)['aria-label'] as string | undefined;
  const baseText = name ?? getChildrenText(children) ?? href;
  const computedAriaLabel =
    providedAriaLabel ??
    (baseText
      ? `Visit ${baseText}${target === '_blank' ? ' (opens in new tab)' : ''}`
      : undefined);

  // 5) Показывать ли иконку
  const showIconFinal = showIcon === 'auto' ? external : Boolean(showIcon);

  // 6) Классы: видимая рамка по Tab, аккуратный андерлайн
  const baseClass =
    'inline-flex items-center gap-1 underline decoration-transparent hover:decoration-current ' +
    'outline-none rounded-[6px] ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-60';
  const rootClassName = [baseClass, className].filter(Boolean).join(' ');

  const iconEl = showIconFinal ? (
    <span
      aria-hidden="true"
      className={[
        'inline-block leading-none text-[0.9em]',
        iconPosition === 'end' ? 'ml-1 order-last' : 'mr-1 order-first',
        iconClassName || '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      ↗︎
    </span>
  ) : null;

  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel}
      title={title}
      className={rootClassName}
      aria-label={computedAriaLabel}
    >
      {iconPosition === 'start' && iconEl}
      {children}
      {iconPosition === 'end' && iconEl}
    </a>
  );
}
