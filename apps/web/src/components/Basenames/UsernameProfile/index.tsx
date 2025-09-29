'use client';

import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import UsernameProfileSettings from 'apps/web/src/components/Basenames/UsernameProfileSettings';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSettingsProvider from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';
import { useBasenameExpirationBanner } from 'apps/web/src/hooks/useBasenameExpirationBanner';

export default function UsernameProfile() {
  const { showProfileSettings } = useUsernameProfile();
  const { expirationBanner } = useBasenameExpirationBanner();

  if (showProfileSettings)
    return (
      <UsernameProfileSettingsProvider>
        <UsernameProfileSettings />
      </UsernameProfileSettingsProvider>
    );

  return (
    <>
      {expirationBanner}
      <div className="flex flex-col items-center gap-10">
        <div className="mx-auto grid min-h-screen grid-cols-1 gap-10 md:grid-cols-[25rem_minmax(0,1fr)]">
          <div className="w-full">
            <UsernameProfileSidebar />
          </div>
          <div className="w-full">
            <UsernameProfileContent />
          </div>
        </div>
        <span className="mt-24">
          Content displayed on this profile page is rendered directly from the decentralized
          Basenames protocol, and is not maintained or moderated by, nor under the control of,
          Coinbase.
        </span>
      </div>
    </>
  );
}
