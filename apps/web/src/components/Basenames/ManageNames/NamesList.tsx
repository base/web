'use client';

import { useCallback } from 'react';
import NameDisplay from './NameDisplay';
import { useNameList } from 'apps/web/src/components/Basenames/ManageNames/hooks';
import { useErrors } from 'apps/web/contexts/Errors';
import Link from 'apps/web/src/components/Link';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

const usernameManagementListAnalyticContext = 'username_management_list';

function NamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider context={usernameManagementListAnalyticContext}>
      <div className="mx-auto max-w-2xl space-y-4 px-6 pb-16 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-4 text-3xl font-bold">My Basenames</h1>
          <Link
            className="rounded-lg bg-palette-backgroundAlternate p-2 text-sm text-palette-foreground"
            href="/names/"
          >
            <Icon name="plus" color="currentColor" width="12px" height="12px" />
          </Link>
        </div>
        {children}
      </div>
    </AnalyticsProvider>
  );
}

export default function NamesList() {
  const {
    namesData,
    isLoading,
    error,
    refetch,
    goToNextPage,
    goToPreviousPage,
    hasPrevious,
    hasNext,
    totalCount,
    currentPageNumber,
  } = useNameList();
  const { logError } = useErrors();

  const refetchNames = useCallback(() => {
    refetch().catch((e) => {
      logError(e, 'Failed to refetch names');
    });
  }, [logError, refetch]);

  if (error) {
    return (
      <NamesLayout>
        <div className="text-palette-error">
          <span className="text-lg">Failed to load names. Please try again later.</span>
        </div>
      </NamesLayout>
    );
  }

  if (isLoading) {
    return (
      <NamesLayout>
        <div>Loading names...</div>
      </NamesLayout>
    );
  }

  if (!namesData?.data?.length) {
    return (
      <NamesLayout>
        <div>
          <span className="text-lg">No names found.</span>
          <br />
          <br />
          <Link href="/names/" className="text-lg font-bold text-palette-primary underline">
            Get a Basename!
          </Link>
        </div>
      </NamesLayout>
    );
  }

  return (
    <NamesLayout>
      <ul className="mx-auto flex max-w-2xl flex-col gap-4">
        {namesData.data.map((name) => (
          <NameDisplay
            key={name.token_id}
            domain={name.domain}
            isPrimary={name.is_primary}
            tokenId={name.token_id}
            expiresAt={name.expires_at}
            refetchNames={refetchNames}
          />
        ))}
      </ul>

      {/* Pagination Controls */}
      {(hasPrevious || hasNext) && (
        <div className="mt-8 flex flex-col gap-4">
          {/* Page indicator */}
          <div className="text-center text-sm text-palette-foregroundMuted">
            Page {currentPageNumber} • {totalCount} total names
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={!hasPrevious}
              className={`flex w-20 items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                hasPrevious
                  ? 'hover:bg-blue-700 bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={!hasNext}
              className={`flex w-20 items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                hasNext
                  ? 'hover:bg-blue-700 bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </NamesLayout>
  );
}
