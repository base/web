'use client';

import { ONCHAINKIT_DEMO_TABS } from 'apps/web/src/components/Builders/Shared/LiveDemo/constants';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

export function ComponentDropdown({
  activeTab,
  setActiveTab,
  theme,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
}) {
  const [isComponentMenuOpen, setIsComponentMenuOpen] = useState(false);
  const buttonClasses = useMemo(
    () => ({
      active: theme === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
      inactive:
        theme === 'dark'
          ? 'text-dark-palette-foregroundMuted hover:text-white'
          : 'text-dark-gray-50 hover:text-dark-palette-backgroundAlternate',
    }),
    [theme],
  );

  const handleTabClick = useCallback(
    (tab: string) => {
      return () => {
        setActiveTab(tab);
        setIsComponentMenuOpen(false);
      };
    },
    [setActiveTab],
  );

  return (
    <div
      className={classNames(
        'rounded-xl border transition-colors',
        theme === 'dark'
          ? 'border-dark-palette-line/20 bg-black'
          : 'border-dark-palette-line/20 bg-white',
      )}
    >
      <button
        type="button"
        aria-label="Toggle component menu"
        onClick={() => setIsComponentMenuOpen((prev) => !prev)}
        className={classNames(
          'relative rounded-lg border p-2 transition-colors md:hidden',
          theme === 'dark'
            ? 'border-dark-palette-line/20 hover:bg-white/10'
            : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate hover:bg-white/10',
        )}
      >
        <div
          className={classNames(
            theme === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
          )}
        >
          <Icon name="hamburger" color="currentColor" width={16} height={16} />
        </div>
      </button>
      {isComponentMenuOpen && (
        <div
          className={classNames(
            'md:hidden',
            'h-full w-3/4 p-6',
            'absolute right-0 top-0 z-10',
            'border-l border-palette-lineHeavy/65',
            'rounded-r-xl',
            'font-medium',
            theme === 'dark' ? 'bg-palette-foreground' : 'bg-white',
          )}
        >
          <div className="flex w-full flex-col items-start space-y-4 px-1">
            <button
              type="button"
              aria-label="Close component menu"
              onClick={() => setIsComponentMenuOpen(false)}
              className={classNames(
                'absolute right-4 top-7 rounded-lg p-2',
                theme === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
              )}
            >
              <Icon name="close" color="currentColor" width={16} height={16} />
            </button>
            {ONCHAINKIT_DEMO_TABS?.map((tab) => {
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={handleTabClick(tab)}
                  className={classNames(
                    'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                    activeTab === tab ? buttonClasses.active : buttonClasses.inactive,
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
