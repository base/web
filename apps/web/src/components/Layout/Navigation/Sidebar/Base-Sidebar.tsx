'use client';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { DEFAULT_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { SidebarLogo } from 'apps/web/src/components/Layout/Navigation/Sidebar/Logo';
import classNames from 'classnames';
import Link from 'apps/web/src/components/Link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from 'apps/web/src/components/Layout/Navigation/icons';
import { ContextMenu } from 'apps/web/src/components/ContextMenu';
import { ExternalLinkIcon } from 'apps/web/src/components/Layout/Navigation/Sidebar/ExternalLinkIcon';

const buildersRoutes = ['/build', '/onchainkit', '/mini-apps', '/base-account', '/appchains'];

// anim variants
const mainMenuVariants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
};

const subMenuVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

const mobileMainMenuVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const mobileSubMenuVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const transition = { type: 'spring' as const, duration: 0.25, bounce: 0.2 };

export const isLinkActive = ({
  pathname,
  href,
  link,
  currentHash,
}: {
  pathname: string;
  href: string;
  link?: string;
  currentHash?: string;
}) => {
  if (link) {
    // For items with anchor links
    return pathname === href && currentHash === link;
  }

  return pathname === href;
};

export default function BaseSidebar() {
  return (
    <nav className="sticky top-4 z-10 hidden h-auto min-h-[600px] w-full flex-col pl-4 lg:flex lg:h-[calc(100dvh-32px)]">
      <ContextMenu>
        <div className="relative z-20 overflow-clip pl-2 pt-2">
          <SidebarLogo />
        </div>
      </ContextMenu>

      <BaseNavigation />
    </nav>
  );
}

export function BaseNavigation({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  //   const [showAppLinks, setShowAppLinks] = useState(false);

  const routes = DEFAULT_ROUTES;
  const isBuilders = buildersRoutes.some((route) => pathname.includes(route));

  const handleMenuItemClick = useCallback(
    (route: {
      href: string;
      items?: { label: string; href?: string; isSubheader?: boolean; isDivider?: boolean }[];
    }) => {
      if (route.items && route.items.length > 0) {
        setIsExiting(true);
        // Small delay to allow exit animation to start
        setTimeout(() => {
          setActiveSubMenu(route.href);
          setIsExiting(false);
        }, 100);
      }
    },
    [],
  );

  const handleBackToMenu = useCallback(() => {
    setIsExiting(true);
    // Small delay to allow exit animation to start
    setTimeout(() => {
      setActiveSubMenu(null);
      setIsExiting(false);
    }, 100);
  }, []);

  const getCurrentMenuItems = () => {
    if (activeSubMenu) {
      const activeRoute = routes.find((route) => route.href === activeSubMenu);
      return activeRoute?.items ?? [];
    }
    return routes;
  };

  // Use mobile variants when on mobile
  const currentMainMenuVariants = isMobile ? mobileMainMenuVariants : mainMenuVariants;
  const currentSubMenuVariants = isMobile ? mobileSubMenuVariants : subMenuVariants;

  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div
        className={classNames(
          'mt-6 flex flex-1 flex-col gap-2.5 overflow-y-auto overflow-x-hidden px-4 lg:px-0',
        )}
      >
        <div className="relative flex-1">
          <AnimatePresence initial={false}>
            {!activeSubMenu ? (
              <motion.div
                key="main-menu"
                variants={currentMainMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="absolute inset-0 flex max-h-max flex-col gap-1 overflow-y-auto overflow-x-hidden"
              >
                {routes.map((route) => {
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  const handleClick = () => handleMenuItemClick(route);

                  return (
                    <motion.div key={route.href} className="relative flex flex-col">
                      {route.items ? (
                        <button
                          type="button"
                          onClick={handleClick}
                          className={classNames(
                            'group flex w-full items-center justify-between rounded-lg p-2.5 text-left leading-[114%] transition-colors duration-150',
                            {
                              'bg-base-gray-30 dark:bg-gray-90': isLinkActive({
                                pathname,
                                href: route.href,
                              }),
                              'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90':
                                !isLinkActive({
                                  pathname,
                                  href: route.href,
                                }) && !isExiting,
                              'text-black dark:text-white': isExiting,
                            },
                          )}
                        >
                          <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
                          <ChevronRightIcon className="h-3 w-3 text-[#B1B7C3] dark:text-[#4E483C] [&_path]:transition-colors [&_path]:duration-200 group-hover:[&_path]:fill-black group-hover:dark:[&_path]:fill-white" />
                        </button>
                      ) : (
                        <Link
                          href={route.href}
                          target={route.newTab ? '_blank' : '_self'}
                          rel={route.newTab ? 'noopener noreferrer' : undefined}
                          className={classNames(
                            'w-full rounded-lg p-2.5 leading-[114%] transition-colors duration-150',
                            {
                              'bg-base-gray-30 dark:bg-gray-90': isLinkActive({
                                pathname,
                                href: route.href,
                              }),
                              'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90':
                                !isLinkActive({
                                  pathname,
                                  href: route.href,
                                }) && !isExiting,
                              'text-black dark:text-white': isExiting,
                            },
                          )}
                        >
                          <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="sub-menu"
                variants={currentSubMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="absolute inset-0 flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden"
              >
                <motion.button
                  type="button"
                  onClick={handleBackToMenu}
                  className={classNames(
                    'flex w-full items-center gap-2 rounded-lg p-2.5 text-left leading-[114%] text-base-gray-200 transition-colors duration-150 dark:text-white',
                    {
                      'hover:bg-base-gray-30 dark:hover:bg-gray-90': !isExiting,
                    },
                  )}
                >
                  <ChevronLeftIcon className="fill-current h-3 w-3" />
                  <Text variant={TextVariant.CTALabelSm}>Back to Menu</Text>
                </motion.button>

                <div className="pt-2">
                  {getCurrentMenuItems().map(
                    (
                      item: {
                        href?: string;
                        label: string;
                        icon?: string;
                        newTab?: boolean;
                        isSubheader?: boolean;
                        isDivider?: boolean;
                      },
                      index: number,
                    ) => (
                      <motion.div
                        key={item.href ?? `${item.label}-${index}`}
                        className="relative flex flex-col"
                      >
                        {item.isDivider ? (
                          <div className="my-2 border-t border-base-gray-50 dark:border-gray-80" />
                        ) : item.isSubheader ? (
                          <div className="mb-1 mt-4 px-2.5 first:mt-0">
                            <Text
                              variant={TextVariant.CTALabelSm}
                              className="text-xs font-medium uppercase tracking-wider text-base-gray-200 dark:text-gray-60"
                            >
                              {item.label}
                            </Text>
                          </div>
                        ) : item.href ? (
                          <Link
                            href={item.href}
                            target={item.newTab ? '_blank' : '_self'}
                            rel={item.newTab ? 'noopener noreferrer' : undefined}
                            className={classNames(
                              'flex w-full items-center rounded-lg p-2.5 leading-[114%] transition-colors duration-150',
                              {
                                'bg-base-gray-30 dark:bg-gray-90': isLinkActive({
                                  pathname,
                                  href: item.href,
                                }),
                                'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90':
                                  !isLinkActive({
                                    pathname,
                                    href: item.href,
                                  }) && !isExiting,
                                'text-black dark:text-white': isExiting,
                              },
                            )}
                          >
                            {item.icon && <Icon name={item.icon} className="mr-2 inline-block" />}
                            <Text variant={TextVariant.CTALabelSm}>{item.label}</Text>
                          </Link>
                        ) : null}
                      </motion.div>
                    ),
                  )}
                </div>

                {/* appendix if so */}
                {activeSubMenu &&
                  routes.find((route) => route.href === activeSubMenu)?.appendix && (
                    <div className="mt-2 border-t border-base-gray-50 pt-2 dark:border-gray-80">
                      {routes
                        .find((route) => route.href === activeSubMenu)
                        ?.appendix?.map(
                          (
                            appendixItem: { href?: string; label: string; newTab?: boolean },
                            index: number,
                          ) => (
                            <motion.div
                              key={appendixItem.href ?? `appendix-${index}`}
                              className="relative flex flex-col"
                            >
                              {appendixItem.href && (
                                <Link
                                  href={appendixItem.href}
                                  target={appendixItem.newTab ? '_blank' : '_self'}
                                  rel={appendixItem.newTab ? 'noopener noreferrer' : undefined}
                                  className={classNames(
                                    'group flex w-full items-center justify-between rounded-lg px-2.5 py-2 leading-[114%] transition-colors duration-150',
                                    {
                                      'bg-base-gray-30 dark:bg-gray-90': isLinkActive({
                                        pathname,
                                        href: appendixItem.href,
                                      }),
                                      'text-black hover:bg-base-gray-30 dark:text-white dark:hover:bg-gray-90':
                                        !isLinkActive({
                                          pathname,
                                          href: appendixItem.href,
                                        }) && !isExiting,
                                      'text-black dark:text-white': isExiting,
                                    },
                                  )}
                                >
                                  <Text variant={TextVariant.CTALabelSm}>{appendixItem.label}</Text>
                                  {appendixItem.newTab && (
                                    <div className="text-[#B1B7C3] group-hover:text-black dark:text-[#1E2025] group-hover:dark:text-white">
                                      <ExternalLinkIcon />
                                    </div>
                                  )}
                                </Link>
                              )}
                            </motion.div>
                          ),
                        )}
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!isBuilders ? (
        <div className="mt-auto flex w-full flex-col gap-2 whitespace-nowrap px-4 pb-4 lg:px-0 lg:pb-0">
          <div className="flex items-center gap-2 border-t border-base-gray-50 p-2 pt-4">
            <span className="block size-2.5 rounded-[2px] bg-base-blue" />
            <span className="font-sans text-xs text-base-blue">START HERE</span>
          </div>


          <Button
            type="button"
            className="w-full"
            asChild
            variant={ButtonVariants.Secondary}
            size={ButtonSizes.Small}
          >
            <Link href="/build" className="group">
              Build on Base
            </Link>
          </Button>
          <Button
            type="button"
            className="w-full"
            asChild
            variant={ButtonVariants.Blue}
            size={ButtonSizes.Small}
          >
            <Link href="https://base.app" className="group" target="_blank">
              Get Base App
            </Link>
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="mt-auto flex flex-col gap-2 px-4 pb-4 lg:px-0 lg:pb-0"
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initial={{ opacity: 0 }}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            animate={{ opacity: 1 }}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            exit={{ opacity: 0 }}
          >
            <Button
              variant={ButtonVariants.SecondaryOutline}
              size={ButtonSizes.Small}
              asChild
              className="w-full"
            >
              <Link
                href="https://docs.base.org/get-started/base"
                target="_blank"
                rel="noreferrer noopener"
              >
                See the docs
              </Link>
            </Button>
            <Button
              variant={ButtonVariants.Secondary}
              size={ButtonSizes.Small}
              asChild
              className="w-full"
            >
              <Link href="https://www.base.dev/" target="_blank" rel="noreferrer noopener">
                Start building
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
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
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M2.72705 5.99983L8.36345 0.363437L9.63624 1.63623L5.27263 5.99983L9.63624 10.3634L8.36345 11.6362L2.72705 5.99983Z"
        fill="#717886"
      />
    </svg>
  );
}
