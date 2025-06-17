import { Basename } from '@coinbase/onchainkit/identity';
import {
  getBasenameAddress,
  getBasenameEditor,
  getBasenameOwner,
} from 'apps/web/src/utils/usernames';
import { redirect } from 'next/navigation';

export async function redirectIfNameDoesNotExist(username: Basename) {
  const [address, editor, owner] = await Promise.all([
    getBasenameAddress(username),
    getBasenameEditor(username),
    getBasenameOwner(username),
  ]).catch(() => {
    redirect(`/name/not-found?name=${username}`);
  });
  // Domain does not have address or editor (ie: doesn't exist)
  if (!address || !editor || !owner) {
    redirect(`/name/not-found?name=${username}`);
  }
}
