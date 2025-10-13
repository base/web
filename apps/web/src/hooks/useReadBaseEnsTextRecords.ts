import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  textRecordsKeysEnabled,
  getBasenameTextRecords,
} from 'apps/web/src/utils/usernames';
import { useQuery } from '@tanstack/react-query';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';

export type UseReadBaseEnsTextRecordsProps = {
  username: BaseEnsNameData;
  refetchInterval?: number;
};

export default function useReadBaseEnsTextRecords({
  username,
  refetchInterval = Infinity,
}: UseReadBaseEnsTextRecordsProps) {
  const { basenameChain } = useBasenameChain(username);

  const defaultTextRecords = useMemo(() => {
    return {
      [UsernameTextRecordKeys.Description]: '',
      [UsernameTextRecordKeys.Twitter]: '',
      [UsernameTextRecordKeys.Farcaster]: '',
      [UsernameTextRecordKeys.Lens]: '',
      [UsernameTextRecordKeys.Telegram]: '',
      [UsernameTextRecordKeys.Discord]: '',
      [UsernameTextRecordKeys.Keywords]: '',
      [UsernameTextRecordKeys.Url]: '',
      [UsernameTextRecordKeys.Url2]: '',
      [UsernameTextRecordKeys.Url3]: '',
      [UsernameTextRecordKeys.Github]: '',
      [UsernameTextRecordKeys.Email]: '',
      [UsernameTextRecordKeys.Phone]: '',
      [UsernameTextRecordKeys.Location]: '',
      [UsernameTextRecordKeys.Avatar]: '',
      [UsernameTextRecordKeys.Frames]: '',
      [UsernameTextRecordKeys.Casts]: '',
    };
  }, []);

  const [existingTextRecords, setExistingTextRecords] =
    useState<UsernameTextRecords>(defaultTextRecords);

  const updateExistingTextRecords = useCallback((key: UsernameTextRecordKeys, value: string) => {
    setExistingTextRecords((previousTextRecords) => {
      return {
        ...previousTextRecords,
        [key]: value,
      };
    });
  }, []);

  const getExistingTextRecords = useCallback(async () => {
    if (!username) return;
    const result = await getBasenameTextRecords(username);
    return result;
  }, [username]);

  const {
    data: textRecordsData,
    isLoading: existingTextRecordsIsLoading,
    refetch: refetchExistingTextRecords,
    error: existingTextRecordsError,
  } = useQuery({
    queryKey: ['useReadBaseEnsTextRecords', textRecordsKeysEnabled, basenameChain.id, username],
    queryFn: getExistingTextRecords,
    enabled: !!username,
    retry: false,
    refetchInterval,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // we got an array of result matching our multicall length
    if (
      typeof textRecordsData === 'object' &&
      textRecordsData.length === textRecordsKeysEnabled.length
    ) {
      textRecordsKeysEnabled.map((key, index) => {
        // We have a string value returned
        const currentValue = textRecordsData[index].result;
        if (typeof currentValue === 'string') {
          updateExistingTextRecords(key, currentValue);
        }
      });
    }
  }, [textRecordsData, updateExistingTextRecords]);

  useEffect(() => {
    if (!username) {
      setExistingTextRecords(defaultTextRecords);
    }
  }, [defaultTextRecords, username]);

  return {
    existingTextRecordsIsLoading,
    existingTextRecords,
    refetchExistingTextRecords,
    existingTextRecordsError,
  };
}
