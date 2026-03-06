'use client';

import { usePathname } from 'next/navigation';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import MobileNav from 'apps/web/src/components/Layout/Navigation/MobileNav';
import Sidebar from 'apps/web/src/components/Layout/Navigation/Sidebar';
import TopNav from 'apps/web/src/components/Layout/Navigation/TopNav';
import { DynamicWrappedGasPriceDropdown } from 'apps/web/src/components/Layout/Navigation/GasPriceDropdown';
import { CONTENT_WIDTH_CLASS } from 'apps/web/src/components/Layout/Navigation/TopNav/contentWidth';

type LayoutSwitcherProps = {
  children: React.ReactNode;
  wrapperClassName: string;
};

export default function LayoutSwitcher({ children, wrapperClassName }: LayoutSwitcherProps) {
  const pathname = usePathname();
  const isBrand = pathname.includes('/brand');

  if (isBrand) {
    return (
      <div className={wrapperClassName}>
        <div className="min-w-screen relative mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 selection:bg-blue-5 selection:text-base-blue lg:grid-cols-[13.438rem_1fr]">
          <Sidebar />
          <MobileNav />
          <div>
            <main className={`flex justify-center ${CONTENT_WIDTH_CLASS}`}>{children}</main>
            <Footer />
          </div>
        </div>
        <div className="fixed right-4 top-4 z-50 hidden lg:block">
          <DynamicWrappedGasPriceDropdown />
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <div className="min-w-screen relative mx-auto min-h-screen w-full max-w-[1920px] selection:bg-blue-5 selection:text-base-blue">
        <TopNav />
        <MobileNav />
        <main className={`flex justify-center ${CONTENT_WIDTH_CLASS}`}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
