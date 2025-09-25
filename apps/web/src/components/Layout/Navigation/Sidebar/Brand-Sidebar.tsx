import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { SidebarLogo } from 'apps/web/src/components/Layout/Navigation/Sidebar/Logo';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import Link from 'apps/web/src/components/Link';
import { BRAND_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { ContextMenu } from 'apps/web/src/components/ContextMenu';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';

export default function Sidebar() {
  const { pathname, hash: currentHash, updateHash } = useFullUrl();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const routes = BRAND_ROUTES;

  const isLinkActive = (href: string, link?: string) => {
    if (link) {
      // For items with anchor links
      return pathname === href && currentHash === link;
    }

    return pathname === href;
  };

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const href = event.currentTarget.getAttribute('href');
      if (href) {
        const hashMatch = href.match(/#(.+)$/);
        if (hashMatch) {
          updateHash(`#${hashMatch[1]}`);
        } else {
          updateHash('');
        }
      }
    },
    [updateHash],
  );

  const handleLinkClickWithAccordion = useCallback(
    (accordionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      // handle the normal link click
      handleLinkClick(event);

      // if the accordion is closed, open it
      if (!openAccordions.includes(accordionId)) {
        setOpenAccordions((prev) => [...prev, accordionId]);
      }
    },
    [handleLinkClick, openAccordions],
  );

  return (
    <nav className="sticky top-4 z-10 hidden h-auto min-h-[600px] max-w-full flex-col pl-4 lg:flex lg:h-[calc(100dvh-32px)]">
      <ContextMenu>
        <div className="relative z-20 overflow-clip pl-2 pt-2">
          <SidebarLogo />
        </div>
      </ContextMenu>

      <div className="relative mb-10 mt-6 flex flex-col gap-1 overflow-y-auto scrollbar-gutter-stable">
        <Accordion.Root
          type="multiple"
          className="flex flex-col gap-1"
          value={openAccordions}
          onValueChange={setOpenAccordions}
        >
          {routes.map((route, routeIndex) => (
            <div key={route.href} className="relative flex flex-col">
              {'items' in route && route.items && Array.isArray(route.items) ? (
                <Accordion.Item value={`route-${routeIndex}`} className="group">
                  <div
                    className={classNames(
                      'flex w-full items-center justify-between rounded-lg leading-[114%] transition-colors duration-150',
                      {
                        'bg-base-gray-30': isLinkActive(route.href),
                        'text-black hover:bg-base-gray-30': !isLinkActive(route.href),
                      },
                    )}
                  >
                    <Link
                      href={route.href}
                      onClick={handleLinkClickWithAccordion(`route-${routeIndex}`)}
                      className="flex-1 pb-2.5 pl-2.5 pt-2.5 text-left"
                    >
                      <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
                    </Link>
                    <Accordion.Trigger asChild>
                      <button
                        type="button"
                        className="h-full pb-2.5 pr-2.5 pt-2.5 transition-colors"
                        aria-label={`Toggle ${route.label} section`}
                      >
                        <ChevronRightIcon className="h-3 w-3 transition-transform duration-150 group-data-[state=open]:rotate-90 [&_path]:fill-base-gray-150 [&_path]:transition-colors [&_path]:duration-150 group-hover:[&_path]:fill-black" />
                      </button>
                    </Accordion.Trigger>
                  </div>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="ml-3 mt-3 border-l border-base-gray-50 pb-2">
                      <div className="flex flex-col gap-1">
                        {(
                          route.items as {
                            label: string;
                            link: string;
                            subitems?: { label: string; link: string }[];
                          }[]
                        ).map((item, itemIndex) => (
                          <div key={`${route.href}-${item.label}`} className="flex flex-col">
                            {item.subitems && Array.isArray(item.subitems) ? (
                              <Accordion.Root
                                type="multiple"
                                value={openAccordions}
                                onValueChange={setOpenAccordions}
                              >
                                <Accordion.Item value={`item-${itemIndex}`} className="group/item">
                                  <div
                                    className={classNames(
                                      'group/sub flex w-full items-center justify-between text-sm transition-colors',
                                      {
                                        'text-black': isLinkActive(route.href, item.link),
                                        'text-base-gray-200 hover:text-black': !isLinkActive(
                                          route.href,
                                          item.link,
                                        ),
                                      },
                                    )}
                                  >
                                    <Link
                                      href={`${route.href}${item.link}`}
                                      onClick={handleLinkClickWithAccordion(`item-${itemIndex}`)}
                                      className="flex-1 px-2.5 py-2 text-left"
                                    >
                                      <Text variant={TextVariant.CTALabelSm}>{item.label}</Text>
                                    </Link>
                                    <Accordion.Trigger asChild>
                                      <button
                                        type="button"
                                        className="ml-2 p-1 transition-colors"
                                        aria-label={`Toggle ${item.label} subsection`}
                                      >
                                        <ChevronRightIcon className="transition-transform duration-150 group-data-[state=open]/item:rotate-90 [&_path]:fill-base-gray-150 [&_path]:transition-colors [&_path]:duration-150 group-hover/sub:[&_path]:fill-black" />
                                      </button>
                                    </Accordion.Trigger>
                                  </div>
                                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                    <div className="ml-6 mt-3 border-l border-base-gray-50 pb-2">
                                      <div className="flex flex-col gap-1">
                                        {item.subitems.map((subitem) => (
                                          <Link
                                            key={`${route.href}-${item.label}-${subitem.label}`}
                                            href={`${route.href}${subitem.link}`}
                                            onClick={handleLinkClick}
                                            className={classNames('text-xs transition-colors', {
                                              'text-black': isLinkActive(route.href, subitem.link),
                                              'text-base-gray-200 hover:text-black': !isLinkActive(
                                                route.href,
                                                subitem.link,
                                              ),
                                            })}
                                          >
                                            <Text
                                              className="block px-2.5 py-2"
                                              variant={TextVariant.CTALabelSm}
                                            >
                                              {subitem.label}
                                            </Text>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </Accordion.Content>
                                </Accordion.Item>
                              </Accordion.Root>
                            ) : (
                              <Link
                                href={`${route.href}${item.link}`}
                                onClick={handleLinkClick}
                                className={classNames(
                                  'rounded-lg leading-[114%] transition-colors duration-150',
                                  {
                                    'text-black': isLinkActive(route.href, item.link),
                                    'text-base-gray-200 hover:text-black': !isLinkActive(
                                      route.href,
                                      item.link,
                                    ),
                                  },
                                )}
                              >
                                <Text
                                  className="block px-2.5 py-2"
                                  variant={TextVariant.CTALabelSm}
                                >
                                  {item.label}
                                </Text>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ) : (
                <Link
                  href={route.href}
                  onClick={handleLinkClick}
                  className={classNames(
                    'w-full rounded-lg leading-[114%] transition-colors duration-150',
                    {
                      'bg-base-gray-30': isLinkActive(route.href),
                      'text-black hover:bg-base-gray-30': !isLinkActive(route.href),
                    },
                  )}
                >
                  <Text className="block p-2.5" variant={TextVariant.CTALabelSm}>
                    {route.label}
                  </Text>
                </Link>
              )}
            </div>
          ))}
        </Accordion.Root>
      </div>

      <div className="mt-auto w-full whitespace-nowrap">
        <Button
          type="button"
          className="w-full"
          asChild
          variant={ButtonVariants.Primary}
          size={ButtonSizes.Small}
        >
          <Link prefetch={false} download="/base-brand.zip" href="/base-brand.zip">
            Download brand assets
          </Link>
        </Button>
      </div>
    </nav>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2729 6.00017L4.63655 11.6366L3.36376 10.3638L7.72736 6.00017L3.36376 1.63656L4.63655 0.363769L10.2729 6.00017Z"
        fill="#B1B7C3"
      />
    </svg>
  );
}

function useFullUrl() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  const updateHash = (newHash: string) => {
    setHash(newHash);
  };

  useEffect(() => {
    // update hash when component mounts or when pathname changes
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    // handle direct hash changes
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { pathname, hash, updateHash };
}
