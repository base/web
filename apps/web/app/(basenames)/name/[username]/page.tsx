import { Basename } from '@coinbase/onchainkit/identity';
import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import { redirectIfNotNameOwner } from 'apps/web/src/utils/redirectIfNotNameOwner';
import {
  formatDefaultUsername,
  getBasenameTextRecord,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { Metadata } from 'next';

export type UsernameProfileProps = {
  params: Promise<{ username: Basename }>;
};

export async function generateMetadata(props: UsernameProfileProps): Promise<Metadata> {
  const params = await props.params;
  const username = await formatDefaultUsername(params.username);
  const defaultDescription = `${username}, a Basename`;
  const description = await getBasenameTextRecord(username, UsernameTextRecordKeys.Description);

  return {
    metadataBase: new URL('https://base.org'),
    title: `Basenames | ${username}`,
    description: description ?? defaultDescription,
    openGraph: {
      title: `Basenames | ${username}`,
      url: `/name/${params.username}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function Username(props: UsernameProfileProps) {
  const params = await props.params;
  let username = await formatDefaultUsername(decodeURIComponent(params.username) as Basename);
  await redirectIfNotNameOwner(username);

  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-16 md:flex-row md:px-8',
  );

  return (
    <ErrorsProvider context="profile">
      <ProfileProviders username={username}>
        <main className={usernameProfilePageClasses}>
          <UsernameProfile />
        </main>
      </ProfileProviders>
    </ErrorsProvider>
  );
}
