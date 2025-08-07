import './global.css';

import AppProviders from 'apps/web/app/AppProviders';

import localFont from 'next/font/local';
import DatadogInit from 'apps/web/app/datadog';
import { Inter, Inter_Tight, Roboto_Mono } from 'next/font/google';

const GOOGLE_ANALYTICS_ID = 'G-D1QGEV3B07';
const googleAnalyticsInitScriptContent = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GOOGLE_ANALYTICS_ID}');
  `,
};

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
      path: '../src/fonts/base-sans/BaseSans-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans/BaseSans-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-sans',
});

const baseSans = localFont({
  src: [
    {
      path: '../src/fonts/base-sans/BaseSans-RegularText.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-base-sans-text',
});

const coinbaseMono = localFont({
  src: [
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../src/fonts/base-sans-mono/BaseSansMono-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-mono',
});

const doto = localFont({
  src: '../src/fonts/doto.ttf',
  variable: '--font-doto',
  display: 'swap',
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

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  weight: ['400'],
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400'],
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  weight: ['400'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClassNames = [
    coinbaseDisplay.variable,
    coinbaseSans.variable,
    coinbaseMono.variable,
    britney.variable,
    doto.variable,
    interTight.variable,
    inter.variable,
    robotoMono.variable,
    baseSans.variable,
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
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          async
          defer
        />
        <script
          id="gtag-init"
          // eslint-disable-next-line react/no-danger -- necessary for google analytics
          dangerouslySetInnerHTML={googleAnalyticsInitScriptContent}
        />
      </head>

      <body className="flex flex-col min-h-screen antialiased">
        <AppProviders>
          <DatadogInit />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
