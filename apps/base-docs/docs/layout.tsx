import { useEffect, type ReactNode } from 'react';
import ThemeProvider from './contexts/Theme.tsx';
import { AppProviders } from './contexts/AppProviders.tsx';
import { Buffer } from 'buffer';

// polyfill Buffer for cookie-banner
globalThis.Buffer = Buffer;

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.addEventListener('vite:preloadError', handlePreloadError);
    return () => {
      window.removeEventListener('vite:preloadError', handlePreloadError);
    };
  }, []);

  return (
    <div
      className="vocs-layout antialiased"
      style={{
        fontFamily: 'CoinbaseSans !important',
      }}
    >
      <ThemeProvider>
        <AppProviders>{children}</AppProviders>
      </ThemeProvider>
    </div>
  );
}

/**
 * https://vite.dev/guide/build#load-error-handling
 * This is a workaround for a known issue with Vite, where a user who visited
 * before a new deployment might encounter an import error. This error happens
 * because the assets running on that user's device are outdated and it tries to
 * import the corresponding old chunk, which is deleted.
 */
function handlePreloadError() {
  window.location.reload();
}
