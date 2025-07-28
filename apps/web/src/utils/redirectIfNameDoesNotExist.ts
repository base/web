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
      address,
      editor,
      owner,
    });
    // If API calls throw errors, check grace period before redirecting
    const inGracePeriod = await isBasenameInGracePeriod(username);
    if (!inGracePeriod) {
      redirect(`/name/not-found?name=${username}`);
    }
    return;
  }

  // Domain does not have address or editor (ie: doesn't exist)
  if (!address || !editor || !owner) {
    // Before redirecting, check if the name is in grace period
    // Names in grace period should be allowed to access renewal flow
    const inGracePeriod = await isBasenameInGracePeriod(username);
    if (!inGracePeriod) {
      redirect(`/name/not-found?name=${username}`);
    }
  }
}
