'use client';
import classNames from 'classnames';

import Tooltip from 'apps/web/src/components/Tooltip';

import {
  allSettingsTabs,
  SettingsTabs,
  settingsTabsEnabled,
  settingTabsForDisplay,
  useUsernameProfileSettings,
} from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';
import { useCallback } from 'react';

function UsernameProfileSettingsButton({ settingTab }: { settingTab: SettingsTabs }) {
  const { currentSettingsTab, setCurrentSettingsTab } = useUsernameProfileSettings();

  const featureFlagEnabled = settingsTabsEnabled.includes(settingTab);

  const onClick = useCallback(() => {
    setCurrentSettingsTab(settingTab);
  }, [setCurrentSettingsTab, settingTab]);

  // Enabled
  if (featureFlagEnabled) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames('text-sm font-bold uppercase', {
          'text-black': settingTab === currentSettingsTab,
          'text-gray-40': settingTab !== currentSettingsTab,
        })}
      >
        {settingTabsForDisplay[settingTab]}
      </button>
    );
  }

  // Unsupported / Coming soon
  return (
    <Tooltip content="Coming soon" className="cursor-default	">
      <span
        className={classNames(' mb-2 text-sm font-bold uppercase ', {
          'text-black': settingTab === currentSettingsTab,
          'text-gray-40': settingTab !== currentSettingsTab,
        })}
      >
        {settingTabsForDisplay[settingTab]}
      </span>
    </Tooltip>
  );
}

export default function UsernameProfileSettingsMenu() {
  return (
    <nav>
      <ul className="flex w-full flex-col gap-4">
        {allSettingsTabs.map((settingTab) => (
          <li key={settingTab}>
            <UsernameProfileSettingsButton settingTab={settingTab} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
