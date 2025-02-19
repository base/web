import type { ReactNode } from 'react';
import ThemeProvider from './contexts/Theme.tsx';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="vocs-layout antialiased"
      style={{
        fontFamily: 'CoinbaseSans !important',
      }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
