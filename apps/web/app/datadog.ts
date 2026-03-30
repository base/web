'use client';

import { datadogRum } from '@datadog/browser-rum';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import { useEffect } from 'react';

// Environment variables are constants retrieved at build time.
const DATADOG_APP_ID = process.env.NEXT_PUBLIC_DATADOG_APP_ID;
const DATADOG_CLIENT_TOKEN = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
const DATADOG_SERVICE_NAME = 'base-org'; // Standard service name for the application
const DATADOG_SITE = 'datadoghq.com'; // Standard Datadog site

/**
 * @component DatadogInit
 * @description Initializes Datadog Real User Monitoring (RUM) client.
 * Runs only once on the client side and is disabled during development.
 */
export default function DatadogInit() {
  useEffect(() => {
    // 1. Skip initialization in development mode
    if (isDevelopment) {
      return;
    }

    // 2. Configuration check
    if (!DATADOG_APP_ID || !DATADOG_CLIENT_TOKEN) {
      logger.warn('Datadog RUM is disabled. Missing NEXT_PUBLIC_DATADOG_APP_ID or CLIENT_TOKEN.');
      return;
    }

    // 3. Initialize Datadog RUM
    datadogRum.init({
      applicationId: DATADOG_APP_ID,
      clientToken: DATADOG_CLIENT_TOKEN,
      
      // Configuration details
      site: DATADOG_SITE,
      service: DATADOG_SERVICE_NAME,
      env: process.env.NODE_ENV,
      
      // Session and Replay Sampling
      sessionSampleRate: 100, // Capturing 100% of user sessions
      sessionReplaySampleRate: 20, // Capturing 20% of session replays
      
      // Tracking
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask', // Enhanced privacy: masks all text content by default
      
      // Distributed Tracing Configuration
      // Allows Datadog to inject headers for tracing requests made to the internal API.
      allowedTracingUrls: [
        {
          match: (url: string) => url.startsWith('https://base.org/api'),
          propagatorTypes: ['datadog'],
        },
      ],
    });
  }, []); // Empty dependency array ensures this runs only once after initial render

  // This component is purely for side effects and renders nothing.
  return null;
}
