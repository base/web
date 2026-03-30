import React, { useCallback } from 'react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { usePathname } from 'next/navigation';

import { Icon } from '../../../Icon';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from '../../../utils/logEvent';

// Type definition enforcing a specific naming convention for the banner storage key.
type BannerName = `${string}Banner`;

type BannerProps = {
  bannerName: BannerName;
  href: string;
  text: string;
};

// Banner component displays a dismissible, persistent notification link.
export default function Banner({ href, text, bannerName }: BannerProps) {
  // Use Local Storage to persist the visibility state of the banner.
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage(
    `${bannerName}Visible`,
    true,
  );
  
  const pathname = usePathname();
  
  // Check if the user is currently on the destination page (ignoring query parameters).
  const isOnPage = pathname === href.split('?')[0];

  // Memoized callback for logging the click event on the banner link.
  const linkClick = useCallback(() => {
    logEvent(
      bannerName,
      {
        action: ActionType.click,
        componentType: ComponentType.banner,
        context: 'navbar',
      },
      AnalyticsEventImportance.high,
    );
  }, [bannerName]); // logEvent is assumed to be a static utility and excluded from dependencies.

  // Memoized callback to hide the banner permanently (via Local Storage update).
  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  // Hide the banner if:
  // 1. The user has previously dismissed it.
  // 2. The user is currently on the page the banner links to.
  if (!isBannerVisible || isOnPage) {
    return null;
  }

  return (
    // Outer container with z-index.
    <div className="bg-yellow-20 z-10 flex w-full flex-row justify-center text-black">
      {/* Inner container for max width and padding */}
      <div className="bg-yellow-20 flex w-full max-w-[1440px] flex-row items-center justify-between self-center p-2 pl-8 pr-6">
        <Link href={href} onClick={linkClick}>
          <span className="text-xs underline md:text-base">{text}</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <button
            className="cursor-pointer p-2 text-sm"
            onClick={hideBanner}
            // Removed redundant onKeyDown as native button handles Enter/Space keys for click event.
            type="button"
            aria-label="Close Banner"
          >
            {/* The Icon component is correctly used for the close button visual. */}
            <Icon name="close" color="black" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
