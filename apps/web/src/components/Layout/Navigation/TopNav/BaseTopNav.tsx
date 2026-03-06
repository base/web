'use client';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { DEFAULT_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import classNames from 'classnames';
import Link from 'apps/web/src/components/Link';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icon } from 'apps/web/src/components/Layout/Navigation/icons';
import { ExternalLinkIcon } from 'apps/web/src/components/Layout/Navigation/Sidebar/ExternalLinkIcon';
import { isLinkActive } from 'apps/web/src/components/Layout/Navigation/Sidebar/Base-Sidebar';
import { useState, useRef, useEffect } from 'react';

const CLOSE_DELAY_MS = 150;

type DefaultRouteItem = {
  icon?: string;
  label: string;
  href?: string;
  newTab?: boolean;
  isSubheader?: boolean;
  isDivider?: boolean;
};

type DefaultRoute = {
  label: string;
  href: string;
  newTab?: boolean;
  items?: DefaultRouteItem[];
  appendix?: DefaultRouteItem[];
};

function BaseNavDropdown({ route }: { route: DefaultRoute }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleTriggerMouseEnter = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const handleTriggerMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  const handleContentMouseEnter = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const handleContentMouseLeave = () => {
    setOpen(false);
  };

  const isActive = isLinkActive({ pathname, href: route.href });

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={classNames(
            'flex items-center gap-1 rounded-lg px-3 py-2 text-left text-sm leading-[114%] transition-colors duration-150',
            {
              'bg-base-gray-30 dark:bg-gray-90': isActive,
              'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90': !isActive,
            },
          )}
          aria-label={`Open ${route.label} menu`}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
        >
          <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
          {/* <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 opacity-70" /> */}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[10001] min-w-[200px] rounded-xl border border-base-gray-50 bg-white p-1 shadow-lg dark:border-gray-80 dark:bg-black"
          sideOffset={4}
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          <div className="flex flex-col">
            {route.items!.map((item: DefaultRouteItem, index: number) => (
              <NavDropdownItem key={item.href ?? `${item.label}-${index}`} item={item} />
            ))}
            {route.appendix && route.appendix.length > 0 && (
              <>
                <div className="my-2 border-t border-base-gray-50 dark:border-gray-80" />
                {route.appendix.map(
                  (appendixItem: { href?: string; label: string; newTab?: boolean }, idx: number) =>
                    appendixItem.href ? (
                      <DropdownMenu.Item asChild key={`appendix-${idx}`}>
                        <Link
                          href={appendixItem.href}
                          target={appendixItem.newTab ? '_blank' : '_self'}
                          rel={appendixItem.newTab ? 'noopener noreferrer' : undefined}
                          className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm leading-[114%] outline-none transition-colors hover:bg-base-gray-30 dark:hover:bg-gray-90"
                        >
                          <Text variant={TextVariant.CTALabelSm}>{appendixItem.label}</Text>
                          {appendixItem.newTab && (
                            <span className="text-base-gray-200 dark:text-gray-60">
                              <ExternalLinkIcon />
                            </span>
                          )}
                        </Link>
                      </DropdownMenu.Item>
                    ) : null,
                )}
              </>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default function BaseTopNav() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {DEFAULT_ROUTES.map((route) => {
        if (route.items && route.items.length > 0) {
          return (
            <li key={route.href}>
              <BaseNavDropdown route={route} />
            </li>
          );
        }
        return (
          <li key={route.href}>
            <Link
              href={route.href}
              target={route.newTab ? '_blank' : '_self'}
              rel={route.newTab ? 'noopener noreferrer' : undefined}
              className={classNames(
                'block rounded-lg px-3 py-2 text-sm leading-[114%] transition-colors duration-150',
                {
                  'bg-base-gray-30 dark:bg-gray-90': isLinkActive({ pathname, href: route.href }),
                  'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90':
                    !isLinkActive({ pathname, href: route.href }),
                },
              )}
            >
              <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function NavDropdownItem({ item }: { item: DefaultRouteItem }) {
  const pathname = usePathname();
  if (item.isDivider) {
    return <div className="my-2 border-t border-base-gray-50 dark:border-gray-80" />;
  }
  if (item.isSubheader) {
    return (
      <div className="mb-1 mt-2 px-3 first:mt-0">
        <Text
          variant={TextVariant.CTALabelSm}
          className="text-xs font-medium uppercase tracking-wider text-base-gray-200 dark:text-gray-60"
        >
          {item.label}
        </Text>
      </div>
    );
  }
  if (!item.href) return null;
  const active = isLinkActive({ pathname, href: item.href });
  return (
    <DropdownMenu.Item asChild>
      <Link
        href={item.href}
        target={item.newTab ? '_blank' : '_self'}
        rel={item.newTab ? 'noopener noreferrer' : undefined}
        className={classNames(
          'group flex w-full items-center rounded-lg px-3 py-2 text-sm leading-[114%] outline-none transition-colors',
          {
            'bg-base-gray-30 dark:bg-gray-90': active,
            'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90': !active,
          },
        )}
      >
        {item.icon && <Icon name={item.icon} className="mr-2 inline-block" />}
        <Text variant={TextVariant.CTALabelSm}>{item.label}</Text>
        {item.newTab && (
          <span className="ml-auto text-base-gray-200 dark:text-gray-60">
            <ExternalLinkIcon />
          </span>
        )}
      </Link>
    </DropdownMenu.Item>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.72705 5.99983L6.00017 9.27295L9.27329 5.99983L10.2729 7.00017L6.00017 11.2729L1.72745 7.00017L2.72705 5.99983Z"
        fill="currentColor"
      />
    </svg>
  );
}
