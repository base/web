'use client';

import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Banner } from 'apps/web/src/components/Banner';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { GRACE_PERIOD_DURATION_MS } from 'apps/web/src/utils/usernames';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
// Time until expiration for showing the expiration banner
const EXPIRATION_THRESHOLD_MS = GRACE_PERIOD_DURATION_MS;

type BannerConfig = {
  message: string;
  bgColor: string;
  textColor: string;
} | null;

function isInExpirationWindow(msUntilExpiration: number): boolean {
  return msUntilExpiration > 0 && msUntilExpiration < EXPIRATION_THRESHOLD_MS;
}

function isInGracePeriod(msUntilExpiration: number): boolean {
  return msUntilExpiration < 0 && Math.abs(msUntilExpiration) < GRACE_PERIOD_DURATION_MS;
}

function shouldShowExpirationBanner(msUntilExpiration: number | undefined): boolean {
  if (msUntilExpiration === undefined) return false;
  return isInExpirationWindow(msUntilExpiration) || isInGracePeriod(msUntilExpiration);
}

function formatRenewalDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBanner(msUntilExpiration: number): BannerConfig {
  if (msUntilExpiration > 0) {
    const daysUntilExpiration = Math.ceil(msUntilExpiration / MILLISECONDS_PER_DAY);
    return {
      message: `This Basename expires in ${daysUntilExpiration} days. Extend your registration so you can own it for longer.`,
      bgColor: 'bg-yellow-20',
      textColor: 'text-black',
    };
  }

  const msExpiredAgo = Math.abs(msUntilExpiration);
  const daysExpiredAgo = Math.ceil(msExpiredAgo / MILLISECONDS_PER_DAY);
  const gracePeriodRemaining = (GRACE_PERIOD_DURATION_MS - msExpiredAgo) / MILLISECONDS_PER_DAY;
  const renewalDeadline = formatRenewalDate(gracePeriodRemaining);

  return {
    message: `This Basename expired ${daysExpiredAgo} days ago. Renew by ${renewalDeadline} to maintain ownership.`,
    bgColor: 'bg-red-10',
    textColor: 'text-red-80',
  };
}

/**
 * Returns a banner component if the basename is in the expiration window or grace period.
 * Must be used inside UsernameProfileProvider.
 */
export function useBasenameExpirationBanner() {
  const { currentWalletIsProfileEditor, msUntilExpiration, profileUsername } = useUsernameProfile();

  const expirationBannerConfig = useMemo((): BannerConfig => {
    if (
      !msUntilExpiration ||
      !currentWalletIsProfileEditor ||
      !shouldShowExpirationBanner(msUntilExpiration)
    ) {
      return null;
    }

    return getBanner(msUntilExpiration);
  }, [msUntilExpiration, currentWalletIsProfileEditor]);

  const expirationBanner = useMemo(() => {
    // Document may be undefined during SSR
    if (typeof document === 'undefined') return null;

    const portalElement = document.getElementById('name-expiration-banner-portal');
    if (!portalElement || !expirationBannerConfig) return null;

    // Portal is needed because the banner is positioned at the very top of the page,
    // above the layout.
    return createPortal(
      <Banner
        message={expirationBannerConfig.message}
        actionText="Extend your registration"
        actionUrl={`/name/${profileUsername}/renew`}
        bgColor={expirationBannerConfig.bgColor}
        textColor={expirationBannerConfig.textColor}
      />,
      portalElement,
    );
  }, [expirationBannerConfig, profileUsername]);

  return { expirationBanner };
}
