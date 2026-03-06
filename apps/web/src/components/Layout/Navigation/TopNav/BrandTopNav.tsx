'use client';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { BRAND_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import classNames from 'classnames';
import Link from 'apps/web/src/components/Link';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useRef, useEffect } from 'react';

const CLOSE_DELAY_MS = 150;

type BrandSubItem = { label: string; link: string };
type BrandItem = BrandSubItem | { label: string; link: string; subitems: BrandSubItem[] };

type BrandRoute = {
  label: string;
  href: string;
  newTab?: boolean;
  items?: BrandItem[];
};

function isItemWithSubitems(item: BrandItem): item is { label: string; link: string; subitems: BrandSubItem[] } {
  return 'subitems' in item && Array.isArray(item.subitems);
}

function BrandNavDropdown({ route }: { route: BrandRoute }) {
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

  const isActive = pathname === route.href;

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={classNames(
            'flex items-center gap-1 rounded-lg px-3 py-2 text-left text-sm font-medium leading-[114%] transition-colors duration-150',
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
          <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[10001] min-w-[220px] max-h-[70vh] overflow-y-auto rounded-lg border border-base-gray-50 bg-white px-3 py-2 shadow-lg dark:border-gray-80 dark:bg-black"
          sideOffset={4}
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          <div className="flex flex-col">
            {(route.items as BrandItem[]).map((item) => {
              if (isItemWithSubitems(item)) {
                return (
                  <div key={`${route.href}-${item.label}`} className="flex flex-col">
                    <div className="mb-1 mt-2 px-3 first:mt-0">
                      <Text
                        variant={TextVariant.CTALabelSm}
                        className="text-xs font-medium uppercase tracking-wider text-base-gray-200 dark:text-gray-60"
                      >
                        {item.label}
                      </Text>
                    </div>
                    {item.subitems.map((subitem) => (
                      <DropdownMenu.Item asChild key={`${route.href}-${item.label}-${subitem.label}`}>
                        <Link
                          href={`${route.href}${subitem.link}`}
                          className="flex w-full rounded-lg px-3 py-2 text-sm leading-[114%] outline-none transition-colors hover:bg-base-gray-30 dark:hover:bg-gray-90"
                        >
                          <Text variant={TextVariant.CTALabelSm}>{subitem.label}</Text>
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                  </div>
                );
              }
              return (
                <DropdownMenu.Item asChild key={`${route.href}-${item.label}`}>
                  <Link
                    href={`${route.href}${item.link}`}
                    className="flex w-full rounded-lg px-3 py-2 text-sm leading-[114%] outline-none transition-colors hover:bg-base-gray-30 dark:hover:bg-gray-90"
                  >
                    <Text variant={TextVariant.CTALabelSm}>{item.label}</Text>
                  </Link>
                </DropdownMenu.Item>
              );
            })}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default function BrandTopNav() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {BRAND_ROUTES.map((route) => {
        const hasItems = route.items && route.items.length > 0;
        const isActive = pathname === route.href;
        if (hasItems) {
          return (
            <li key={route.href}>
              <BrandNavDropdown route={route} />
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
                'block rounded-lg px-3 py-2 text-sm font-medium leading-[114%] transition-colors duration-150',
                {
                  'bg-base-gray-30 dark:bg-gray-90': isActive,
                  'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90': !isActive,
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
