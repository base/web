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
    async function checkAlternatives() {
      if (!doLookup || !nameNeedingAlternatives || nameNeedingAlternatives.length < 3) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(`/api/name/${nameNeedingAlternatives}`);
        if (response.ok) {
          const suggestionData = (await response.json()) as NameSuggestionResponseData;
          setSuggestions(suggestionData.suggestion);
        }
      } catch (e) {
        logError(e, 'Failed to fetch alternative names');
        setError('error fetching name suggestions');
      } finally {
        setIsLoading(false);
      }
    }
    void checkAlternatives();
  }, [doLookup, logError, nameNeedingAlternatives]);

  const normalizedNames = useMemo(
    () =>
      (suggestions ?? []).map(normalizeEnsDomainName).filter((name) => {
        const { valid } = validateEnsDomainName(name);
        return valid;
      }),
    [suggestions],
  );
  // check contracts
  const { data: availableNames } = useAreNamesAvailable(normalizedNames ?? []);
  const result = useMemo(() => {
    return normalizedNames
      .map((name, i) => {
        if (!availableNames) return null;
        if (!availableNames[i]) return null;
        return availableNames[i].result ? name : null;
      })
      .filter((name): name is string => Boolean(name));
  }, [availableNames, normalizedNames]);
  return { data: result, error, isLoading };
}
