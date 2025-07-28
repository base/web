import { Basename } from '@coinbase/onchainkit/identity';
import {
  getBasenameAddress,
  getBasenameEditor,
  getBasenameOwner,
  isBasenameInGracePeriod,
} from 'apps/web/src/utils/usernames';
import { redirect } from 'next/navigation';
import { logger } from 'apps/web/src/utils/logger';

export async function redirectIfNameDoesNotExist(username: Basename) {
  let address, editor, owner;
  let apiError = false;

  try {
    [address, editor, owner] = await Promise.all([
      getBasenameAddress(username),
      getBasenameEditor(username),
      getBasenameOwner(username),
    ]);
  } catch (error) {
    logger.error('Error fetching basename address, editor, or owner', {
      error,
      username,
    });
    apiError = true;
  }

  // If API calls failed OR returned null/undefined values, the name doesn't exist or is expired
  const nameNotFound = apiError || !address || !editor || !owner;

  if (nameNotFound) {
    logger.info('Basename not found, checking grace period', {
      username,
      apiError,
      address: !!address,
      editor: !!editor,
      owner: !!owner,
    });

    // Only allow access if the name is in grace period (expired but renewable)
    const inGracePeriod = await isBasenameInGracePeriod(username);
    if (!inGracePeriod) {
      redirect(`/name/not-found?name=${username}`);
    }
  }
}
