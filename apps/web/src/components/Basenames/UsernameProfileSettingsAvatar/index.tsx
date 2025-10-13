'use client';

import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import UsernameAvatarField from 'apps/web/src/components/Basenames/UsernameAvatarField';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { PinResponse } from 'pinata';

export default function UsernameProfileSettingsAvatar() {
  const { profileUsername, currentWalletIsProfileEditor } = useUsernameProfile();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();

  const [avatarIsLoading, setAvatarIsLoading] = useState<boolean>(false);
  const [avatarUploadAndReadyToSave, setAvatarUploadedAndReadyToSave] = useState<boolean>(false);

  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  // Write text records
  const {
    updateTextRecords,
    updatedTextRecords,
    writeTextRecords,
    writeTextRecordsIsPending,
    hasChanged,
  } = useWriteBaseEnsTextRecords({
    username: profileUsername,
    onSuccess: () => {
      setAvatarFile(undefined);
    },
  });

  const uploadFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return Promise.resolve();

      try {
        setAvatarIsLoading(true);
        const data = new FormData();
        data.set('file', file);
        const uploadRequest = await fetch(
          `/api/basenames/avatar/ipfsUpload?username=${profileUsername}`,
          {
            method: 'POST',
            body: data,
          },
        );

        if (uploadRequest.ok) {
          const uploadData = (await uploadRequest.json()) as PinResponse;
          updateTextRecords(UsernameTextRecordKeys.Avatar, `ipfs://${uploadData.IpfsHash}`);
          setAvatarIsLoading(false);
          return uploadData;
        } else {
          alert(uploadRequest.statusText);
          logError(uploadRequest, 'Failed to upload Avatar');
          setAvatarIsLoading(false);
        }
      } catch (e) {
        alert('Trouble uploading file');
      }
    },
    [logError, profileUsername, updateTextRecords],
  );

  const saveAvatar = useCallback(() => {
    // Write the records
    writeTextRecords()
      .then()
      .catch((error) => {
        logError(error, 'Failed to write text records');
      });
  }, [logError, writeTextRecords]);

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!currentWalletIsProfileEditor) return false;

      if (avatarFile) {
        uploadFile(avatarFile)
          .then((result) => {
            // set the uploaded result as the url
            if (result) {
              logEventWithContext('avatar_upload_success', ActionType.change);
              setAvatarUploadedAndReadyToSave(true);
            }
          })
          .catch((error) => {
            logError(error, 'Failed to upload avatar');
            logEventWithContext('avatar_upload_failed', ActionType.error);
          });
      } else {
        saveAvatar();
      }
    },
    [
      currentWalletIsProfileEditor,
      avatarFile,
      uploadFile,
      logEventWithContext,
      logError,
      saveAvatar,
    ],
  );

  useEffect(() => {
    if (avatarUploadAndReadyToSave) {
      saveAvatar();
      setAvatarUploadedAndReadyToSave(false);
    }
  }, [avatarUploadAndReadyToSave, saveAvatar]);

  const onChangeAvatarFile = useCallback((file: File | undefined) => {
    setAvatarFile(file);
  }, []);

  const isLoading = avatarIsLoading || writeTextRecordsIsPending;

  if (isLoading) {
    return (
      <div className="flex h-[10rem] max-h-[10rem] min-h-[10rem] w-[10rem] min-w-[10rem] max-w-[10rem] items-center justify-center rounded-full border-4 border-white bg-gray-40/20 text-gray-40">
        <Icon name="spinner" color="currentColor" />
      </div>
    );
  }

  return (
    <>
      <UsernameAvatarField
        onChangeFile={onChangeAvatarFile}
        onChange={updateTextRecords}
        currentAvatarUrl={updatedTextRecords[UsernameTextRecordKeys.Avatar]}
        disabled={writeTextRecordsIsPending}
        username={profileUsername}
      />

      {Boolean(hasChanged || avatarFile) && (
        <Button
          variant={ButtonVariants.Gray}
          size={ButtonSizes.Small}
          rounded
          fullWidth
          disabled={isLoading}
          isLoading={isLoading}
          onClick={onClickSave}
        >
          Save avatar
        </Button>
      )}
    </>
  );
}
