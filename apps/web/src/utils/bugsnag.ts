// import React from 'react';
import type { BugsnagPluginReactResult } from '@bugsnag/plugin-react';
import type { OnErrorCallback } from '@bugsnag/core/types/common';

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
    BugsnagClient.start({
      apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY as string,
      endpoints: {
        notify: process.env.NEXT_PUBLIC_BUGSNAG_NOTIFY_URL as string,
        sessions: process.env.NEXT_PUBLIC_BUGSNAG_SESSIONS_URL as string,
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
