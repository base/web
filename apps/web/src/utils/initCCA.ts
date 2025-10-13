// The CCA team said this lite version of the library is temporary and not officially supported.
// They recommended disabling linting and type-checking for now, since this version is not typed.
/* eslint-disable */
// @ts-nocheck
import { NextRouter } from 'next/router';
import { TrackingPreference } from '@coinbase/cookie-manager';
import { isDevelopment } from 'apps/web/src/constants';
import { NextJSRouter } from 'apps/web/src/components/ClientAnalyticsScript/ClientAnalyticsScript';
import { v4 } from 'uuid';

// CCA library loads in ClientAnalyticsScript component
const initCCA = (
  router: NextJSRouter,
  trackingPreference: TrackingPreference | undefined,
  deviceIdCookie: string | undefined,
  setDeviceIdCookie,
) => {
  let deviceId: string | undefined = deviceIdCookie;
  const trackingAllowed: boolean = trackingPreference?.consent.includes('performance');
  const amplitudeApiKey: string = isDevelopment
    ? 'ca92bbcb548f7ec4b8ebe9194b8eda81'
    : '2b38c7ac93c0dccc83ebf9acc5107413';

  if (!trackingAllowed) {
    deviceId = 'base_web_device_id';
  } else if (!deviceId) {
    deviceId = v4();
    setDeviceIdCookie(deviceId);
  }

  if (window.ClientAnalytics) {
    const { init, identify, PlatformName, initNextJsTrackPageview } = window.ClientAnalytics;

    init({
      isProd: !isDevelopment,
      amplitudeApiKey,
      platform: PlatformName.web,
      projectName: 'base_web',
      showDebugLogging: isDevelopment,
      version: '1.0.0',
      apiEndpoint: 'https://cca-lite.coinbase.com',
    });

    identify({ deviceId: deviceId });
    initNextJsTrackPageview({
      nextJsRouter: router,
    });
  }
};

export default initCCA;
