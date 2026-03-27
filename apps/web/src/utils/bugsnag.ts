// import React from 'react';
import type { BugsnagPluginReactResult } from '@bugsnag/plugin-react';
import type { OnErrorCallback } from '@bugsnag/core/types/common';
import { formatMissingEnvMessage, getEnv } from 'apps/web/src/utils/env';

type BugsnagClientType = {
  notify: (error: Error | string, onError?: OnErrorCallback) => void;
  getPlugin: (plugin: string) => BugsnagPluginReactResult;
  start: (options: {
    apiKey: string;
    endpoints: { notify: string; sessions: string };
    plugins: unknown[];
  }) => void;
};

let BugsnagClient: BugsnagClientType | null = null;
let BugsnagPluginReactInstance = null;

async function inititializeBugsnag() {
  if (BugsnagClient) {
    return;
  }

  // BugsnagClient and BugsnagPluginReactInstance are not available during build
  // so we import them dynamically to avoid build errors
  BugsnagClient = (await import('@bugsnag/js')).default as BugsnagClientType;
  BugsnagPluginReactInstance = (await import('@bugsnag/plugin-react')).default;

  try {
    const apiKey = getEnv('NEXT_PUBLIC_BUGSNAG_API_KEY');
    const notifyUrl = getEnv('NEXT_PUBLIC_BUGSNAG_NOTIFY_URL');
    const sessionsUrl = getEnv('NEXT_PUBLIC_BUGSNAG_SESSIONS_URL');

    // Bugsnag is optional; only initialize when it is configured.
    if (!apiKey || !notifyUrl || !sessionsUrl) {
      if (process.env.NODE_ENV !== 'production') {
        const missing = [
          !apiKey ? 'NEXT_PUBLIC_BUGSNAG_API_KEY' : null,
          !notifyUrl ? 'NEXT_PUBLIC_BUGSNAG_NOTIFY_URL' : null,
          !sessionsUrl ? 'NEXT_PUBLIC_BUGSNAG_SESSIONS_URL' : null,
        ].filter(Boolean);
        console.warn(
          formatMissingEnvMessage(missing.join(', '), { feature: 'Bugsnag' }),
        );
      }
      BugsnagClient = null;
      return;
    }

    BugsnagClient.start({
      apiKey,
      endpoints: {
        notify: notifyUrl,
        sessions: sessionsUrl,
      },
      plugins: [new BugsnagPluginReactInstance()],
    });
  } catch (error) {
    console.error('Error initializing Bugsnag', error);
  }
}

export async function bugsnagNotify(error: Error | string, onError?: OnErrorCallback) {
  if (!BugsnagClient) {
    await inititializeBugsnag();
  }

  if (!BugsnagClient) {
    return;
  }

  try {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    BugsnagClient.notify(errorObj, onError);
  } catch (e) {
    console.error('Error notifying Bugsnag', e);
  }
}
