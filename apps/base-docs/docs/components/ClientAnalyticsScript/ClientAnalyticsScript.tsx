'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSavedTrackingPreference, useCookie } from '@coinbase/cookie-manager';
import { initCCA } from './initCCA.ts';
import { isDevelopment } from '@/constants.ts';
import { useLocation } from 'react-router-dom';

export type NextJsRouterEventTypes =
  | 'routeChangeStart'
  | 'beforeHistoryChange'
  | 'routeChangeComplete'
  | 'routeChangeError'
  | 'hashChangeStart'
  | 'hashChangeComplete';

export type AnalyticsEventHandler = () => void;

export type NextJSRouter = Record<string, unknown> & {
  events: {
    on: (event: NextJsRouterEventTypes, callback: AnalyticsEventHandler) => void;
  };
};

export default function ClientAnalyticsScript() {
  const trackingPreference = useSavedTrackingPreference();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [deviceIdCookie, setDeviceIdCookie] = useCookie('base_device_id');

  // Coinbase's CCA is designed for Page Router.
  // CCA cannot use the App router logic, since "router.events.on" is deprecated.
  // As a result we have to mock this behavior

  // CCA expects to call a handler on path change, so we need to

  // 1. Keep track of the path
  const pathname = useLocation();

  // 2. Keep track of the handler
  const onRouteChangeHandler = useRef<AnalyticsEventHandler | null>(null);

  // 3. Mock the old router behavior, save the handler
  const oldRouterEvent: NextJSRouter = useMemo(() => {
    return {
      events: {
        on: (event: NextJsRouterEventTypes, analyticsHandler: AnalyticsEventHandler) => {
          if (event === 'routeChangeComplete' && analyticsHandler) {
            onRouteChangeHandler.current = analyticsHandler;
          }
        },
      },
    };
  }, []);

  // 4. Call the onRouteChangeHandler on page change via useEffect
  useEffect(() => {
    if (onRouteChangeHandler.current) {
      onRouteChangeHandler.current();
    }
  }, [onRouteChangeHandler, pathname]);

  const onLoadHandler = useCallback(() => {
    initCCA(oldRouterEvent, trackingPreference, deviceIdCookie, setDeviceIdCookie);
  }, [oldRouterEvent, trackingPreference, deviceIdCookie, setDeviceIdCookie]);

  if (isDevelopment) {
    return null;
  }

  return (
    <script src="https://static-assets.coinbase.com/js/cca/v0.0.1.js" onLoad={onLoadHandler} />
  );
}
