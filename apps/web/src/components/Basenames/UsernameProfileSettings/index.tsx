'use client';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback } from 'react';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  SettingsTabs,
  settingTabsForDisplay,
  useUsernameProfileSettings,
} from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';
import UsernameProfileSettingsMenu from 'apps/web/src/components/Basenames/UsernameProfileSettingsMenu';
import UsernameProfileSettingsName from 'apps/web/src/components/Basenames/UsernameProfileSettingsName';
import UsernameProfileSettingsManageProfile from 'apps/web/src/components/Basenames/UsernameProfileSettingsManageProfile';
import UsernameProfileSettingsAvatar from 'apps/web/src/components/Basenames/UsernameProfileSettingsAvatar';
import UsernameProfileSettingsOwnership from 'apps/web/src/components/Basenames/UsernameProfileSettingsOwnership';

export default function UsernameProfileSettings() {
  const { currentWalletIsProfileEditor, setShowProfileSettings } = useUsernameProfile();

  const { currentSettingsTab } = useUsernameProfileSettings();
  const { logEventWithContext } = useAnalytics();

  logEventWithContext('settings_loaded', ActionType.render);

  const closeSettings = useCallback(() => {
    setShowProfileSettings(false);
  }, [setShowProfileSettings]);

  return !currentWalletIsProfileEditor ? (
    <p>You don&apos;t have the permission to edit this profile</p>
  ) : (
    <div className="items-left mx-auto flex w-full max-w-[60rem] flex-col">
      <div className="mb-6">
        <button type="button" onClick={closeSettings} className="flex items-center gap-2">
          <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" />
          Back to profile
        </button>
      </div>

      {/* Settings UI: Full layout  */}
      <div className="relative flex flex-col rounded-2xl border border-[#EBEBEB] shadow-lg md:flex-row">
        {/* Settings UI: Left side  */}
        <div className="w-full border-b border-[#EBEBEB] md:max-w-[21rem] md:border-r">
          <div className="flex w-full flex-col gap-6 p-4 md:p-8">
            <UsernameProfileSettingsAvatar />
            <UsernameProfileSettingsName />
          </div>

          <div className="border-t border-[#EBEBEB] p-4 md:p-8 ">
            <UsernameProfileSettingsMenu />
          </div>
        </div>
        {/* Settings UI: Right side  */}
        <div className="w-full">
          <h2 className="w-full p-4 pb-0 text-3xl font-bold text-illoblack md:p-8 md:pb-0">
            {settingTabsForDisplay[currentSettingsTab]}
          </h2>
          {currentSettingsTab === SettingsTabs.ManageProfile && (
            <UsernameProfileSettingsManageProfile />
          )}
          {currentSettingsTab === SettingsTabs.Ownership && <UsernameProfileSettingsOwnership />}
        </div>
      </div>
    </div>
  );
}
