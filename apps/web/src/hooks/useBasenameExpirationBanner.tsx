'use client';

import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Banner } from 'apps/web/src/components/Banner';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';

// Days until expiration for showing the expiration banner
const EXPIRATION_THRESHOLD = 90;
// Grace period in days after expiration for renewal
const GRACE_PERIOD_DAYS = 90;

type BannerConfig = {
  message: string;
  bgColor: string;
  textColor: string;
} | null;

function isInExpirationWindow(days: number): boolean {
  return days > 0 && days < EXPIRATION_THRESHOLD;
}

function isInGracePeriod(days: number): boolean {
  return days < 0 && Math.abs(days) < GRACE_PERIOD_DAYS;
}

function shouldShowExpirationBanner(days: number | undefined): boolean {
  if (!days) return false;
  return isInExpirationWindow(days) || isInGracePeriod(days);
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

function getBanner(daysUntilExpiration: number): BannerConfig {
  if (daysUntilExpiration > 0) {
    return {
      message: `This Basename expires in ${daysUntilExpiration} days. Extend your registration so you can own it for longer.`,
      bgColor: 'bg-yellow-20',
      textColor: 'text-black',
    };
  }

  const daysExpiredAgo = Math.abs(daysUntilExpiration);
  const gracePeriodRemaining = GRACE_PERIOD_DAYS - daysExpiredAgo;
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
  const { currentWalletIsProfileEditor, daysUntilExpiration, profileUsername } =
    useUsernameProfile();

  const expirationBannerConfig = useMemo((): BannerConfig => {
    if (
      !daysUntilExpiration ||
      !currentWalletIsProfileEditor ||
      !shouldShowExpirationBanner(daysUntilExpiration)
    ) {
      return null;
    }

    return getBanner(daysUntilExpiration);
  }, [daysUntilExpiration, currentWalletIsProfileEditor]);

  const expirationBanner = useMemo(() => {
    const portalElement = document.getElementById('name-expiration-banner-portal');
    if (!portalElement || !expirationBannerConfig) return null;

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
