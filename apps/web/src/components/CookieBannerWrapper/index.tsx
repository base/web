'use client';

import { CookieBanner } from '@coinbase/cookie-banner';

export const cookieBannerTheme = {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#FFFFFF',
    backgroundMuted: '#EEF0F3',
    onBackground: '#050F1A',
    onBackgroundMuted: '#0A0B0D',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    hidden: 0,
    normal: 1,
    elevated: 2,
    high: 2,
    extraHigh: 3,
    backdrop: 999,
    overlay: 1000,
    top: 1001,
  },
};

export default function CookieBannerWrapper() {
  return <CookieBanner companyName="Base" link="/cookie-policy" theme={cookieBannerTheme} />;
}
