import './global.css';

import AppProviders from 'apps/web/app/AppProviders';

import localFont from 'next/font/local';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import DatadogInit from 'apps/web/app/datadog';

const coinbaseDisplay = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseDisplay-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-display',
});

const coinbaseSans = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseSans-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-sans',
});

const coinbaseMono = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseMono-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-mono',
});

const britney = localFont({
  src: [
    {
      path: '../src/fonts/BritneyVariableVF.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-britney',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClassNames = [
    coinbaseDisplay.variable,
    coinbaseSans.variable,
    coinbaseMono.variable,
    britney.variable,
  ].join(' ');
  return (
    <html lang="en" className={fontClassNames}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/document/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/document/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/document/favicon-16x16.png" />
        <link rel="manifest" href="/document/site.webmanifest" />
        <link rel="mask-icon" href="/document/safari-pinned-tab.svg" color="#0052ff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="lqwNRCxYlFLIcX9EiKAvE4k4ZT8JGpdWgehEIPA7y1Y"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <AppProviders>
          <DatadogInit />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
