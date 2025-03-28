import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { ActionType } from 'apps/web/src/utils/analytics/logEvent';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';

export default function TryNowHero() {
  const { profileUsername } = useUsernameProfile();
  const { logEventWithContext } = useAnalytics();
  const handleAddFrameLinkClick = useCallback(() => {
    logEventWithContext('basename_profile_frame_try_now_clicked', ActionType.click);
  }, [logEventWithContext]);
  return (
    <section className="relative flex flex-row items-center justify-start gap-2 rounded-xl border border-palette-line/20 pl-1 pr-6">
      <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
      <div className="grow">
        <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
        <p className="max-w-80 text-illoblack">
          Add fun and interactive experiences to your profile with a frame.
        </p>
      </div>
      <Link
        onClick={handleAddFrameLinkClick}
        className="rounded-full bg-button-black text-white hover:bg-button-blackHover active:bg-button-blackActive"
        href={`/name/${profileUsername}/configure-frames`}
      >
        Try it now
      </Link>
      <ImageAdaptive
        alt=""
        src={cornerGarnish as StaticImageData}
        className="absolute bottom-0 left-0 z-0 rounded-bl-xl"
      />
    </section>
  );
}
