'use client';

import { useAnalytics } from 'apps/web/contexts/Analytics';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/* Settings tabs */
export enum SettingsTabs {
  ManageProfile = 'manage-profile',
  Ownership = 'ownership',
}

export const settingTabsForDisplay = {
  [SettingsTabs.ManageProfile]: 'Manage Profile',
  [SettingsTabs.Ownership]: 'Ownership',
};

export const allSettingsTabs = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];

// Other features are not yet supported
export const settingsTabsEnabled = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];

/* Context */
export type UsernameProfileSettingsContextProps = {
  currentSettingsTab: SettingsTabs;
  setCurrentSettingsTab: Dispatch<SetStateAction<SettingsTabs>>;
};

export const UsernameProfileSettingsContext = createContext<UsernameProfileSettingsContextProps>({
  currentSettingsTab: SettingsTabs.ManageProfile,
  setCurrentSettingsTab: () => undefined,
});

/* Provider */
type UsernameProfileSettingsProviderProps = {
  children: ReactNode;
};

export default function UsernameProfileSettingsProvider({
  children,
}: UsernameProfileSettingsProviderProps) {
  const [currentSettingsTab, setCurrentSettingsTab] = useState<SettingsTabs>(
    SettingsTabs.ManageProfile,
  );

  const { logEventWithContext } = useAnalytics();

  const values = useMemo(
    () => ({
      currentSettingsTab,
      setCurrentSettingsTab,
    }),
    [currentSettingsTab],
  );

  useEffect(() => {
    logEventWithContext(`settings_current_tab_${currentSettingsTab}`, ActionType.change);
  }, [currentSettingsTab, logEventWithContext]);

  return (
    <UsernameProfileSettingsContext.Provider value={values}>
      {children}
    </UsernameProfileSettingsContext.Provider>
  );
}

/* Hook */
export function useUsernameProfileSettings() {
  const context = useContext(UsernameProfileSettingsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
