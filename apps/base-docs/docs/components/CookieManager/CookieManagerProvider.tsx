import { useCallback, useRef } from 'react';
import {
  Provider as CoinbaseCookieManagerProvider,
  Region,
  TrackingPreference,
} from '@coinbase/cookie-manager';
import { cookieManagerConfig } from './cookieManagerConfig.ts';

export function CookieManagerProvider({ children }: { children: React.ReactNode }) {
  const trackingPreference = useRef<TrackingPreference>({
    consent: [],
    region: Region.DEFAULT,
  });

  const setTrackingPreference = useCallback((newPreference: TrackingPreference) => {
    const priorConsent = trackingPreference.current?.consent;
    trackingPreference.current = newPreference;

    if (!priorConsent || priorConsent.length === 0) {
      // The first time the modal appears, this function is called with nothing present in
      // trackingPreference.current. To avoid an infinite refresh loop, we return early on
      // the first call.
      return;
    }

    const newConsent = newPreference.consent;

    // Check if the preferences have changed.
    const diff = [
      ...priorConsent.filter((elem) => !newConsent.includes(elem)),
      ...newConsent.filter((elem) => !priorConsent.includes(elem)),
    ];

    // Reload if the preferences have changed.
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);

  const handleLogError = useCallback((err: Error) => console.error(err), []);

  return (
    <CoinbaseCookieManagerProvider
      projectName="base_docs"
      locale="en"
      region={Region.DEFAULT}
      log={console.log}
      onError={handleLogError}
      onPreferenceChange={setTrackingPreference}
      config={cookieManagerConfig}
    >
      {children as JSX.Element}
    </CoinbaseCookieManagerProvider>
  );
}
