'use client';

import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import {
  FramesProvider,
  useFrameContext,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import FarcasterAccountModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FarcasterAccountModal';
import FrameListItem from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameListItem';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { ActionType } from 'apps/web/src/utils/analytics/logEvent';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';

function SectionContent() {
  const { profileUsername, currentWalletIsProfileOwner } = useUsernameProfile();
  const { frameUrls, existingTextRecordsIsLoading } = useFrameContext();
  const { logEventWithContext } = useAnalytics();
  const handleAddFrameLinkClick = useCallback(() => {
    logEventWithContext('basename_profile_frame_try_now_clicked', ActionType.click);
  }, [logEventWithContext]);
  if (frameUrls.length === 0 && !currentWalletIsProfileOwner) return null;
  if (currentWalletIsProfileOwner && frameUrls.length === 0 && !existingTextRecordsIsLoading) {
    return (
      <section className="relative flex flex-row-reverse items-center justify-between gap-0 rounded-xl border border-palette-line/20 pb-5 pl-5 pt-5 lg:flex-row lg:justify-start lg:gap-2 lg:pb-0 lg:pl-1 lg:pr-6 lg:pt-0">
        <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
        <div className="flex grow flex-col items-start gap-1">
          <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
          <p className="max-w-80 text-illoblack">
            Add fun and interactive experiences to your profile with a frame.
          </p>
          <Link
            onClick={handleAddFrameLinkClick}
            href={`/name/${profileUsername}/configure-frames`}
            className="rounded-full bg-illoblack px-6 py-2 text-white xl:hidden"
          >
            Try it now
          </Link>
        </div>
        <Link
          onClick={handleAddFrameLinkClick}
          href={`/name/${profileUsername}/configure-frames`}
          className="hidden rounded-full bg-illoblack px-9 py-3 text-white xl:block"
        >
          Try it now
        </Link>
        <ImageAdaptive
          alt=""
          src={cornerGarnish as StaticImageData}
          className="absolute right-0 top-0 z-0 rotate-180 rounded-bl-xl lg:bottom-0 lg:left-0 lg:right-[unset] lg:top-[unset] lg:rotate-0"
        />
      </section>
    );
  }
  return (
    <section>
      <div className="flex flex-row-reverse justify-between">
        {currentWalletIsProfileOwner && (
          <Link
            onClick={handleAddFrameLinkClick}
            className="rounded-lg bg-palette-backgroundAlternate p-2 text-sm text-palette-foreground"
            href={`/name/${profileUsername}/configure-frames`}
          >
            <Icon name="plus" color="currentColor" width="12px" height="12px" />
          </Link>
        )}
      </div>
      <div className="columns-1 p-4 xl:columns-2">
        {frameUrls.map((url) => (
          <FrameListItem url={url} key={url} />
        ))}
      </div>
    </section>
  );
}

function UsernameProfileSectionFrames() {
  return (
    <FramesProvider>
      <SectionContent />
      <FarcasterAccountModal />
    </FramesProvider>
  );
}

export default UsernameProfileSectionFrames;
