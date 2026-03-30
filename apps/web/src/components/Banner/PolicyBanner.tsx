'use client';

import { useCallback, useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'cb-org-banner-policy';

export function PolicyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  const onDismiss = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'false');
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    setIsVisible(storedValue !== 'false');
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="dark:border-gray-95 fixed left-0 right-0 top-0 z-[10000] border-b bg-white px-4 py-8 text-black duration-300 animate-in slide-in-from-top lg:px-12 dark:bg-black dark:text-white">
      <div className="max-w-8xl mx-auto flex items-center">
        <div className="flex items-center">
          <div className="mr-2">
            We&apos;re updating the Base Privacy Policy, effective July 25, 2025, to reflect an
            expansion of Base services. Please review the updated policy here:{' '}
            <a
              href="https://docs.base.org/privacy-policy-2025"
              target="_blank"
              className="whitespace-nowrap underline"
              rel="noopener"
            >
              Base Privacy Policy
            </a>
            . By continuing to use Base services, you confirm that you have read and understand the
            updated policy.
          </div>
          <button
            className="text-md text-md transition-allactive:bg-[#06318E] flex w-auto items-center justify-center gap-3 whitespace-nowrap rounded-lg border px-4 py-2 text-black disabled:pointer-events-none disabled:opacity-40 dark:text-white"
            type="button"
            onClick={onDismiss}
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
