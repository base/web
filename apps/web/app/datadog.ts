// Necessary if using App Router to ensure this file runs on the client
'use client';

import { datadogRum } from '@datadog/browser-rum';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import { useEffect } from 'react';

const nextPublicDatadogAppId = process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? '';
const nextPublicDatadogClientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '';

export default function DatadogInit() {
  useEffect(() => {
    // Disabled for development
    if (isDevelopment) return;

    if (!nextPublicDatadogAppId || !nextPublicDatadogClientToken) {
      logger.warn('Datadog is not configured');
      return;
    }
    datadogRum.init({
      applicationId: nextPublicDatadogAppId,
      clientToken: nextPublicDatadogClientToken,
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      service: 'base-org',
      env: process.env.NODE_ENV,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask',
      allowedTracingUrls: [
        {
          match: (url: string) => url.startsWith('https://base.org/api'),
          propagatorTypes: ['datadog'],
        },
      ],
    });
  }, []);

  return null;
}
