import { v5 as uuidv5 } from 'uuid';
import { logger } from 'apps/web/src/utils/logger';
import { isDevelopment, analyticsConfig } from 'apps/web/src/constants';
import { NextApiRequest } from 'apps/web/node_modules/next/dist/shared/lib/utils';

type EventProperties = {
  action: string;
  context: string;
  componentType: string;
  projectName: string;
  pagePath?: string;
  error?: string;
  platform?: string;
  locale?: string | null;
  sessionLccId?: string | null;
  timeStart?: number;
  pageKey?: string;
  prevPageKey?: string;
  prevPagePath?: string;
  hasDoubleFired?: boolean;
  sessionUuid?: string;
  height?: number;
  width?: number;
  auth?: number;
};
type SupplementalEventData = {
  userId?: string | null;
  timestamp?: number;
  eventId?: number;
  sessionId?: number;
  versionName?: string;
  platform?: string;
  osName?: string;
  osVersion?: number;
  deviceModel?: string;
  language?: string;
  userProperties?: unknown;
  uuid?: string;
  sequenceNumber?: number;
  userAgent?: unknown;
};

type ServerSideEvent = {
  eventType: string;
  deviceId: string;
  eventProperties: EventProperties;
  timestamp: number;
  sessionId: number;
  platform: string;
  userId?: string | null;
  eventId?: number;
  versionName?: string;
  osName?: string;
  osVersion?: number;
  deviceModel?: string;
  language?: string;
  userProperties?: unknown;
  uuid?: string;
  sequenceNumber?: number;
  userAgent?: unknown;
};

const SERVER_SIDE_EVENT_NAMESPACE = 'b3456910-afdb-4a15-a498-8bd5885fc956';

export default function logServerSideEvent(
  eventName: string,
  deviceId: string,
  eventProperties: Omit<EventProperties, 'projectName'>,
  supplementalEventData: SupplementalEventData = {},
) {
  const event = createEventData(eventName, deviceId, eventProperties, supplementalEventData);
  const stringifiedEvent = JSON.stringify([convertKeys(event)]);
  const uploadTime = new Date().getTime().toString();
  const checksum = uuidv5(stringifiedEvent + uploadTime, SERVER_SIDE_EVENT_NAMESPACE);
  const eventData = {
    e: stringifiedEvent,
    client: analyticsConfig.amplitudeApiKey.prod,
    checksum,
  };
  const postUrl = analyticsConfig.serverSideAnalyticsURL.prod;
  const fetchConfig = {
    method: 'POST',
    body: JSON.stringify(eventData),
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(postUrl, fetchConfig).catch((error) =>
    logger.error('Failed to create server-side event', error),
  );
}

export function createEventData(
  eventName: string,
  deviceId: string,
  eventProperties: Omit<EventProperties, 'projectName'>,
  supplementalEventData: SupplementalEventData = {},
): ServerSideEvent {
  return {
    eventType: eventName,
    deviceId: `node-js-${isDevelopment ? 'dev' : 'prod'}-${deviceId}`,
    eventProperties: {
      ...eventProperties,
      projectName: 'base_web',
    },
    timestamp: new Date().getTime(),
    sessionId: new Date().getTime(),
    platform: 'Web',
    ...supplementalEventData,
  };
}

export function generateDeviceId(req: NextApiRequest) {
  const userAgent = req.headers['user-agent'] ?? 'No user agent';
  let ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'No IP';
  if (typeof ip === 'object') {
    ip = ip.join();
  }
  return uuidv5(`${userAgent}|${ip}`, SERVER_SIDE_EVENT_NAMESPACE);
}

function convertKeys(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [camelToSnakeCase(key), convertKeys(value)]),
  );
}

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
