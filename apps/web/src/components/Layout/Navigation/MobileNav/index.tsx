'use client';

import * as Dialog from '@radix-ui/react-dialog';
import MobileLogo from 'apps/web/src/components/Layout/Navigation/MobileNav/MobileLogo';
import classNames from 'classnames';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';
import { BRAND_ROUTES, DEFAULT_ROUTES } from 'apps/web/src/components/Layout/Navigation/navigation';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import {
  BaseNavigation,
  isLinkActive,
} from 'apps/web/src/components/Layout/Navigation/Sidebar/Base-Sidebar';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';

const navItemVariants = {
  initial: { opacity: 0, x: -20 },
  buttonInitial: { opacity: 0, y: 30 },
  animate: { opacity: 1, x: 0 },
  buttonAnimate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 },
};

const getNavItemTransition = (index: number): Transition => ({
  duration: 0.3,
  delay: 0.14 + index * 0.05,
  ease: [0.4, 0, 0.2, 1],
});

const getButtonTransition = (index: number, routesLength: number): Transition => ({
  duration: 0.5,
  delay: routesLength * 0.04 + index * 0.1,
  ease: [0.4, 0, 0.2, 1],
});

export default function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const isBrand = pathname.includes('/brand');
  const routes = isBrand ? BRAND_ROUTES : DEFAULT_ROUTES;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isClosingFromResize, setIsClosingFromResize] = useState<boolean>(false);

  const handleToggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newValue = !prev;

      setIsClosingFromResize(false);
      document.body.style.overflowY = newValue ? 'hidden' : 'auto';
      return newValue;
    });
  }, []);

  const handleOpenAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const handleLinkClick = useCallback(
    (route: { items?: unknown[] }) => {
      if (!route.items || route.items.length === 0) {
        handleToggleMenu();
      }
    },
    [handleToggleMenu],
  );

  const createLinkClickHandler = useCallback(
    (route: { items?: unknown[] }) => () => handleLinkClick(route),
    [handleLinkClick],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsClosingFromResize(true);
        setIsMobileMenuOpen(false);
        document.body.style.overflowY = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={classNames(
        'sticky top-0 z-[150] mx-auto flex h-[72px] w-full items-center justify-between p-4 md:px-4 lg:hidden',
        className,
      )}
    >
      <Link href="/" className="flex justify-between items-center w-fit">
        <MobileLogo className="size-10" />
      </Link>
      <Dialog.Root open={isMobileMenuOpen} onOpenChange={handleToggleMenu}>
        <Dialog.Trigger
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          data-focus-visible="false"
          className="focus:outline-none"
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Content
            className={classNames(
              'fixed inset-y-0 left-0 top-[72px] z-[100] flex h-[calc(100dvh-72px)] w-full flex-col gap-4 outline-none',
              isClosingFromResize
                ? 'transition-none'
                : 'transition ease-in-out data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
            )}
            onOpenAutoFocus={handleOpenAutoFocus}
          >
            <Dialog.Title className="sr-only">Mobile Menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Mobile site navigation menu.
            </Dialog.Description>

            <div className="pointer-events-none absolute inset-0 -top-[72px] -z-10 h-[calc(100dvh+72px)] w-full bg-white dark:bg-black" />

            <nav className="flex flex-col flex-1 h-full">
              {isBrand ? (
                <div className="flex relative flex-col flex-1 h-full">
                  <ul className="ml-4 mt-3 flex flex-col gap-2.5 overflow-y-auto md:mb-10 md:ml-6">
                    <AnimatePresence>
                      {isMobileMenuOpen &&
                        routes.map((route, index) => (
                          <motion.li
                            key={route.href}
                            variants={navItemVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={getNavItemTransition(index)}
                          >
                            <Link
                              target={route.newTab ? '_blank' : '_self'}
                              rel={route.newTab ? 'noopener noreferrer' : undefined}
                              href={route.href}
                              className={classNames(
                                'flex w-fit items-center justify-between rounded-[4px] p-3 leading-[114%] transition-colors duration-150 hover:bg-base-gray-30',
                                isLinkActive({
                                  pathname,
                                  href: route.href,
                                }) && 'bg-base-gray-30 dark:bg-gray-90 dark:active:text-black',
                              )}
                              onClick={createLinkClickHandler(route)}
                            >
                              <Text variant={TextVariant.CTALabelSm}>{route.label}</Text>
                            </Link>
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </ul>

                  <div className="flex flex-col gap-3 px-4 pb-4 mt-auto md:px-6">
                    <AnimatePresence>
                      {isMobileMenuOpen && (
                        <motion.div
                          variants={navItemVariants}
                          initial="buttonInitial"
                          animate="buttonAnimate"
                          exit="exit"
                          transition={getButtonTransition(1, routes.length)}
                        >
                          <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small} asChild>
                            <Link
                              prefetch={false}
                              download="/base-brand.zip"
                              href="/base-brand.zip"
                              className="w-full h-10"
                            >
                              Download Brand Assets
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <BaseNavigation isMobile onLinkClick={handleLinkClick} />
              )}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="grid relative place-items-center rounded-md size-10 bg-base-gray-30 will-change-transform">
      <div
        className={classNames(
          'ease-[cubic-bezier(0.4,0.2,0,1)] absolute size-5 h-[1px] bg-black transition-all duration-300',
          isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[35%] -translate-y-1/2',
        )}
      />
      <div
        className={classNames(
          'ease-[cubic-bezier(0.4,0.2,0,1)] absolute size-5 h-[1px] bg-black transition-all duration-300',
          isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[65%] -translate-y-1/2',
        )}
      />
    </div>
  );
}
