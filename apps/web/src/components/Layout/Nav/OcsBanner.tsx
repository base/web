import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { usePathname } from 'next/navigation';

const href = '/onchainsummer?utm_source=dotorg&utm_campaign=onchainsummer';
export function OcsBanner() {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isOcsBannerVisible', true);
  const pathname = usePathname();
  const isOnPage = pathname === href.split('?')[0];

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible || isOnPage) {
    return null;
  }

  return (
    <div className="z-10 flex w-full flex-row justify-center bg-yellow-20 text-black">
      <div className="z-10 flex w-full max-w-[1440px] flex-row items-center justify-between self-center bg-yellow-20 p-2 pl-8 pr-6">
        <Link href={href}>
          <span className="text-xs underline md:text-base">Build Onchain this Summer!</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link href={href}>
            <span className="hidden text-xs md:inline md:text-base" />
          </Link>
          <button
            className="cursor-pointer p-2 text-sm"
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
            aria-label="Close banner"
          >
            <Icon name="close" color="black" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
