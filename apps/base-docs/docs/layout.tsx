import type { ReactNode } from 'react';
import ThemeProvider from './contexts/Theme.tsx';
import { AppProviders } from './contexts/AppProviders.tsx';
import { Buffer } from 'buffer';

// polyfill Buffer for cookie-banner
globalThis.Buffer = Buffer;

export default function Layout({ children }: { children: ReactNode }) {
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
