'use client';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { DEFAULT_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';
import { Icon } from 'apps/web/src/components/Layout/Navigation/icons';
import { ExternalLinkIcon } from 'apps/web/src/components/Layout/Navigation/Sidebar/ExternalLinkIcon';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type DefaultRouteItem = {
  icon?: string;
  label: string;
  href?: string;
  description?: string;
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
  const [open, setOpen] = useState(false);

  return (
    // Single hover zone covering both trigger and dropdown — no gap juggling needed.
    // onMouseLeave only fires when cursor fully exits this element and all its descendants.
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-left text-sm leading-[114%] text-black transition-colors duration-150 hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Open ${route.label} menu`}
      >
        <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
      </button>

      <div className="absolute left-0 top-full z-[10001] w-max pt-1">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full min-w-[200px] rounded-xl border border-base-gray-50 bg-white p-1 shadow-lg dark:border-gray-80 dark:bg-black"
            >
              <div className="flex flex-col">
                {route.items!.map((item: DefaultRouteItem, index: number) => (
                  <NavDropdownItem key={item.href ?? `${item.label}-${index}`} item={item} />
                ))}
                {route.appendix && route.appendix.length > 0 && (
                  <>
                    <div className="my-2 border-t border-base-gray-50 dark:border-gray-80" />
                    {route.appendix.map(
                      (
                        appendixItem: { href?: string; label: string; newTab?: boolean },
                        idx: number,
                      ) =>
                        appendixItem.href ? (
                          <Link
                            key={`appendix-${idx}`}
                            href={appendixItem.href}
                            target={appendixItem.newTab ? '_blank' : '_self'}
                            rel={appendixItem.newTab ? 'noopener noreferrer' : undefined}
                            className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm leading-[114%] outline-none transition-colors hover:bg-base-gray-30 dark:hover:bg-gray-90"
                          >
                            <Text variant={TextVariant.CTALabelSm}>{appendixItem.label}</Text>

                            {appendixItem.newTab && (
                              <span className="text-base-gray-200 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-gray-60">
                                <ExternalLinkIcon />
                              </span>
                            )}
                          </Link>
                        ) : null,
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function BaseTopNav() {
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
              className="block rounded-lg px-3 py-2 text-sm leading-[114%] text-black transition-colors duration-150 hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90"
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
  if (item.isDivider) {
    return <div className="my-2 border-t border-base-gray-50 dark:border-gray-80" />;
  }
  if (item.isSubheader) {
    return (
      <div className="mb-1 mt-2 w-fit px-3 first:mt-0">
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
  return (
    <Link
      href={item.href}
      target={item.newTab ? '_blank' : '_self'}
      rel={item.newTab ? 'noopener noreferrer' : undefined}
      className="group flex w-full items-center rounded-lg px-3.5 py-3 text-sm leading-[114%] text-black outline-none transition-colors hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90"
    >
      <div className="flex w-fit flex-col gap-1">
        {item.icon && <Icon name={item.icon} className="mr-2 inline-block" />}
        <Text className="w-fit whitespace-nowrap text-nowrap" variant={TextVariant.CTALabelSm}>
          {item.label}
        </Text>
        {item.description ? (
          <Text className="w-full whitespace-nowrap opacity-50" variant={TextVariant.CTALabelSm}>
            {item.description}
          </Text>
        ) : null}
      </div>
      {item.newTab && (
        <span className="ml-auto text-base-gray-200 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-gray-60">
          <ExternalLinkIcon />
        </span>
      )}
    </Link>
  );
}
