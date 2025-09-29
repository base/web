import { useEffect, useState } from 'react';

const isClient = typeof document !== 'undefined';

const isApiSupported = (api: string) => isClient && api in window;

export const useMedia = (mediaQuery: string, initialValue?: boolean) => {
  const [isVerified, setIsVerified] = useState<boolean | undefined>(initialValue);

  useEffect(() => {
    if (!isApiSupported('matchMedia')) {
      console.warn('matchMedia is not supported by your current browser');
      return;
    }
    const mediaQueryList = window.matchMedia(mediaQuery);
    const changeHandler = () => setIsVerified(!!mediaQueryList.matches);

    changeHandler();
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', changeHandler, {
        passive: true,
      });
      return () => {
        mediaQueryList.removeEventListener('change', changeHandler);
      };
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(changeHandler);
      return () => {
        mediaQueryList.removeListener(changeHandler);
      };
    }
  }, [mediaQuery]);

  return isVerified;
};
