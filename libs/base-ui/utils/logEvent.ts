import { isDevelopment } from '../constants';

declare const window: Window &
  typeof globalThis & {
  ClientAnalytics: {
    logEvent: LogEvent;
  };
};

enum ComponentType {
  unknown = 'unknown',
  banner = 'banner',
  button = 'button',
  card = 'card',
  chart = 'chart',
  content_script = 'content_script',
  dropdown = 'dropdown',
  link = 'link',
  page = 'page',
  modal = 'modal',
  table = 'table',
  search_bar = 'search_bar',
  service_worker = 'service_worker',
  text = 'text',
  text_input = 'text_input',
  tray = 'tray',
  checkbox = 'checkbox',
  icon = 'icon',
}

enum ActionType {
  unknown = 'unknown',
  blur = 'blur',
  click = 'click',
  change = 'change',
  dismiss = 'dismiss',
  focus = 'focus',
  hover = 'hover',
  select = 'select',
  measurement = 'measurement',
  move = 'move',
  process = 'process',
  render = 'render',
  scroll = 'scroll',
  view = 'view',
  search = 'search',
  keyPress = 'keyPress',
  error = 'error',
}

enum AnalyticsEventImportance {
  low = 'low',
  high = 'high',
}

enum AnalyticsEventContext {
  // Navigation/UI contexts
  Navbar = 'navbar',
  Build = 'build',
  Explore = 'explore',
  Community = 'community',
  About = 'about',
  Socials = 'socials',

  // Feature-specific contexts
  BasenamesClaimFrame = 'basenames_claim_frame',
  SliceSo = 'slice.so',
  HypersubXyz = 'hypersub.xyz',
  HighlightXyz = 'highlight.xyz',
  EventsXyz = 'events.xyz',
  PaycasterCo = 'paycaster.co',
  SocialDex = 'social-dex',
}

type CCAEventData = {
  // Standard Attributes
  action?: ActionType;
  componentType?: ComponentType;
  // Custom Attributes
  doc_helpful?: boolean;
  doc_feedback_reason?: string | null;
  page_path?: string;
  conversation_id?: number;
  message_id?: number;
  response_helpful?: boolean;
  address?: string;
  context?: string | AnalyticsEventContext;
  userId?: string;
  error?: string;
  wallet_type?: string;
  wallet_connector_id?: string;
  flag_key?: string;
  variant?: string | undefined;
  experiment_key?: string | undefined;
  href?: string;
  hostname?: string;
  origin?: string;
  pathname?: string;
  search?: string;
};

type AnalyticsEventData = {
  name: string;
  event: CCAEventData;
  importance: AnalyticsEventImportance;
};

type LogEvent = (
  eventName: string,
  eventData: CCAEventData,
  importance?: AnalyticsEventImportance,
) => void;

export default function logEvent(
  name: string,
  event: CCAEventData,
  importance: AnalyticsEventImportance | undefined,
) {
  if (isDevelopment) {
    return console.log('logEvent: ', {
      name,
      event,
      importance,
    });
  }

  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent(name, event, importance);
  }
}

export function identify(event: CCAEventData) {
  if (isDevelopment) {
    return console.log('identify: ', {
      event,
    });
  }

  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent('identify', event, AnalyticsEventImportance.low);
  }
}

export { ActionType, AnalyticsEventImportance, ComponentType, AnalyticsEventContext };
export type { AnalyticsEventData, LogEvent, CCAEventData };
