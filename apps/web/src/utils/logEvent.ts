declare const window: Window &
  typeof globalThis & {
    ClientAnalytics: {
      logEvent: (name: string, event: unknown) => void;
    };
  };

export default function logEvent(name: string, event: unknown) {
  if (window.ClientAnalytics) {
    window.ClientAnalytics?.logEvent(name, event);
  }
}

export function identify(event: unknown) {
  if (window.ClientAnalytics) {
    window.ClientAnalytics?.logEvent('identify', event);
  }
}
