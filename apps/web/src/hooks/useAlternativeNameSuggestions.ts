import { useErrors } from 'apps/web/contexts/Errors';
import { NameSuggestionResponseData } from 'apps/web/app/(basenames)/api/name/[alreadyClaimedName]/route';
import { useAreNamesAvailable } from 'apps/web/src/hooks/useIsNameAvailable';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo, useState } from 'react';

export function useAlternativeNameSuggestions(nameNeedingAlternatives: string, doLookup: boolean) {
  const [suggestions, setSuggestions] = useState<string[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { logError } = useErrors();

  useEffect(() => {
    if (!doLookup || !nameNeedingAlternatives || nameNeedingAlternatives.length < 3) {
      setSuggestions(undefined);
      setError(undefined);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchSuggestions() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/name/${nameNeedingAlternatives}`, { signal });

        if (response.ok) {
          const suggestionData = (await response.json()) as NameSuggestionResponseData;
          setSuggestions(suggestionData.suggestion);
          setError(undefined);
        } else {
          setSuggestions(undefined);
          setError('Could not retrieve name suggestions');
        }
      } catch (e) {
        if (!signal.aborted) {
          const err = e instanceof Error ? e : new Error(String(e));
          logError(err, 'Failed to fetch alternative names');
          setError('Error fetching name suggestions');
          setSuggestions(undefined);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchSuggestions();

    return () => controller.abort();
  }, [doLookup, nameNeedingAlternatives, logError]);

  const normalizedNames = useMemo(() => {
    return (suggestions ?? [])
      .map(normalizeEnsDomainName)
      .filter((name) => validateEnsDomainName(name).valid);
  }, [suggestions]);

  const { data: availableNames } = useAreNamesAvailable(normalizedNames);

  const availableSuggestions = useMemo(() => {
    if (!availableNames) return [];

    return availableNames
      .map((res, i) => (res.result ? normalizedNames[i] : null))
      .filter((name): name is string => Boolean(name));
  }, [availableNames, normalizedNames]);

  return {
    data: availableSuggestions,
    error,
    isLoading,
  };
}
