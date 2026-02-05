'use client';

import { useEffect, useCallback, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  const [isLoaded, setIsLoaded] = useState(false);

  const initTranslate = useCallback(() => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element',
      );
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Avoid re-initializing if already loaded
    if (document.getElementById('google-translate-script')) {
      if (window.google?.translate?.TranslateElement) {
        initTranslate();
      }
      return;
    }

    window.googleTranslateElementInit = initTranslate;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup callback on unmount
      delete (window as Partial<Window>).googleTranslateElementInit;
    };
  }, [initTranslate]);

  return (
    <div
      className={`flex w-full items-center justify-center bg-blue-5 px-4 py-2 transition-opacity dark:bg-gray-90 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Google Translate"
    >
      <div className="flex items-center gap-2">
        <GlobeIcon className="h-4 w-4 shrink-0 text-base-gray-200 dark:text-gray-40" />
        <div id="google_translate_element" />
      </div>
    </div>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM7.25 2.08296C5.94413 2.25985 4.76898 2.87756 3.87891 3.78125L3.87695 3.7832C3.29171 4.37938 2.82466 5.07909 2.50195 5.84961C2.6885 5.90814 2.90107 5.96555 3.1543 6.01953C3.60853 6.11624 4.18103 6.19147 4.87109 6.22461C4.97088 4.61697 5.39174 3.16445 6.0625 2.14258C6.43694 2.10034 6.82064 2.07663 7.25 2.08296ZM8.75 2.08296C9.17936 2.07663 9.56306 2.10034 9.9375 2.14258C10.6083 3.16445 11.0291 4.61697 11.1289 6.22461C11.819 6.19147 12.3915 6.11624 12.8457 6.01953C13.0989 5.96555 13.3115 5.90814 13.498 5.84961C13.1753 5.07909 12.7083 4.37938 12.123 3.7832L12.1211 3.78125C11.231 2.87756 10.0559 2.25985 8.75 2.08296ZM6.81641 2.63086C6.31655 3.48271 5.97405 4.73604 5.87305 6.15625H7.25V2.58594C7.09727 2.59389 6.95423 2.60893 6.81641 2.63086ZM9.18359 2.63086C9.04577 2.60893 8.90273 2.59389 8.75 2.58594V6.15625H10.127C10.026 4.73604 9.68345 3.48271 9.18359 2.63086ZM2.22852 7.17383C2.12279 7.43286 2.03629 7.70081 1.9707 7.97656C1.98969 7.97753 2.00592 7.9834 2.02539 7.98438C2.53555 8.0093 3.12975 8.01543 3.79102 7.99805C3.82459 7.99805 3.8498 7.99805 3.88281 7.99414C3.87283 7.71735 3.86885 7.44394 3.87695 7.17383H2.22852ZM5.37695 7.17383C5.36885 7.44394 5.36488 7.71538 5.375 7.99023H7.25V7.17383H5.37695ZM8.75 7.17383V7.99023H10.625C10.6351 7.71538 10.6312 7.44394 10.623 7.17383H8.75ZM12.123 7.17383C12.1312 7.44394 12.1272 7.71735 12.1172 7.99414C12.1502 7.99805 12.1754 7.99805 12.209 7.99805C12.8703 8.01543 13.4645 8.0093 13.9746 7.98438C13.9941 7.9834 14.0103 7.97753 14.0293 7.97656C13.9637 7.70081 13.8772 7.43286 13.7715 7.17383H12.123ZM3.88086 9.48828C3.86917 9.76534 3.8693 10.0421 3.88086 10.3164C3.28662 10.3506 2.78369 10.422 2.36523 10.5117C2.1521 10.5575 1.96695 10.6079 1.80469 10.6602C2.0753 11.2566 2.43857 11.8051 2.87891 12.2852L2.88086 12.2871C3.24858 12.6706 3.66382 13.0066 4.1168 13.2871C3.66024 12.2372 3.41127 10.9285 3.41016 9.49219H3.88086V9.48828ZM5.37891 9.48828C5.39474 10.8916 5.67969 12.1133 6.14258 12.9883C6.34815 13.3694 6.57227 13.6662 6.81641 13.8691C6.95423 13.8911 7.09727 13.9061 7.25 13.9141V9.48828H5.37891ZM8.75 9.48828V13.9141C8.90273 13.9061 9.04577 13.8911 9.18359 13.8691C9.42773 13.6662 9.65185 13.3694 9.85742 12.9883C10.3203 12.1133 10.6053 10.8916 10.6211 9.48828H8.75ZM12.1191 9.48828V9.49219C12.1187 10.9285 11.8698 12.2372 11.4121 13.2871C11.8662 13.0066 12.2814 12.6706 12.6484 12.2871L12.6504 12.2852C13.0914 11.8051 13.4547 11.2566 13.7246 10.6602C13.5631 10.6079 13.3779 10.5575 13.1641 10.5117C12.7463 10.422 12.2434 10.3506 11.6484 10.3164C11.6607 10.0421 11.6608 9.76534 11.6484 9.48828H12.1191Z"
        fill="currentColor"
      />
    </svg>
  );
}
