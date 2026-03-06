'use client';

import { usePathname } from 'next/navigation';
import { DynamicWrappedGasPriceDropdown } from 'apps/web/src/components/Layout/Navigation/GasPriceDropdown';
import BaseTopNav from 'apps/web/src/components/Layout/Navigation/TopNav/BaseTopNav';
import BrandTopNav from 'apps/web/src/components/Layout/Navigation/TopNav/BrandTopNav';
import { CONTENT_WIDTH_CLASS } from 'apps/web/src/components/Layout/Navigation/TopNav/contentWidth';
import Link from 'apps/web/src/components/Link';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';

const buildersRoutes = ['/build', '/onchainkit', '/mini-apps', '/base-account', '/appchains'];

export default function TopNav() {
  const pathname = usePathname();
  const isBrand = pathname.includes('/brand');
  const isBuilders = buildersRoutes.some((route) => pathname.includes(route));

  return (
    <header
      className="sticky top-0 z-[10000] hidden w-full flex-col border-b border-base-gray-50 bg-white lg:flex dark:border-gray-80 dark:bg-black"
      role="banner"
    >
      <div className={`flex h-14 items-center gap-6 ${CONTENT_WIDTH_CLASS}`}>
        <Link
          href="/"
          className="relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-base-blue dark:bg-base-blueDark"
          aria-label="Go to home"
        >
          <span className="sr-only">Base</span>
        </Link>

        <nav
          className="flex min-w-0 flex-1 items-center justify-start"
          aria-label="Main navigation"
        >
          {isBrand ? <BrandTopNav /> : <BaseTopNav />}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {/* <DynamicWrappedGasPriceDropdown /> */}
          {isBrand ? (
            <Button type="button" variant={ButtonVariants.Primary} size={ButtonSizes.Small} asChild>
              <Link prefetch={false} download="/base-brand.zip" href="/base-brand.zip">
                Download brand assets
              </Link>
            </Button>
          ) : isBuilders ? (
            <>
              <Button
                type="button"
                variant={ButtonVariants.SecondaryOutline}
                size={ButtonSizes.Small}
                asChild
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
                type="button"
                variant={ButtonVariants.Secondary}
                size={ButtonSizes.Small}
                asChild
              >
                <Link href="https://www.base.dev/" target="_blank" rel="noreferrer noopener">
                  Start building
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant={ButtonVariants.Secondary}
                size={ButtonSizes.Small}
                asChild
              >
                <Link href="/build">Build on Base</Link>
              </Button>
              <Button type="button" variant={ButtonVariants.Blue} size={ButtonSizes.Small} asChild>
                <Link href="https://base.app" target="_blank" rel="noopener noreferrer">
                  Get Base App
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
