'use client';
import Container from 'apps/web/src/components/base-org/Container';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Redesign/Button';
import { SidebarLogo } from 'apps/web/src/components/Layout/Navigation/Sidebar/Logo';
import Link from 'apps/web/src/components/Link';
import { Windows } from 'apps/web/src/components/NotFound';
import { NotFoundTitle } from 'apps/web/src/components/NotFound/Title';
import MobileLogo from 'apps/web/src/components/Layout/Navigation/MobileNav/MobileLogo';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

export default function NotFound() {
  return (
    <>
      <nav className="fixed top-4 z-[150] hidden max-h-max w-full flex-col pl-4 lg:flex lg:h-[calc(100dvh-32px)]">
        <div className="relative z-20 pl-2 pt-2">
          <SidebarLogo />
        </div>
      </nav>

      <div className="min-w-screen relative mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 overflow-y-clip selection:bg-blue-5 selection:text-base-blue lg:grid-cols-[13.438rem_1fr]">
        <div className="mx-auto flex w-full max-w-[clamp(1024px,calc(1024px+(100vw-1024px)*0.25),1248px)] justify-center px-4 max-lg:overflow-clip md:px-6 lg:col-start-2 lg:px-8">
          <Link href="/" className="absolute left-4 top-4 size-10 lg:hidden">
            <MobileLogo className="size-10" />
          </Link>

          <Container className="relative col-span-full h-full w-full max-lg:overflow-y-clip lg:pt-0">
            <Windows />

            <NotFoundTitle className="-z-1 col-span-full row-start-1 mt-20 lg:mt-12" />

            <div className="absolute bottom-0 right-0 h-40 w-full bg-gradient-to-t from-base-white to-transparent" />
            <AnalyticsProvider context="404">
              <Link
                href="/"
                className="absolute bottom-10 right-0 min-w-[194px] max-lg:w-full max-lg:px-4 lg:right-4"
              >
                <Button className="w-full" variant={ButtonVariants.Primary}>
                  Back to home
                </Button>
              </Link>
            </AnalyticsProvider>
          </Container>
        </div>
      </div>
    </>
  );
}
